# PLAN — Auto Capital

App personal para registrar ingresos y egresos. Uso propio por ahora (quizás venderla a futuro). Solo mobile, solo pesos argentinos.

## Idea general

- Fuentes de dinero: **Mercado Pago** (carga automática, idealmente con webhook directo; Make como alternativa) y **efectivo** (carga manual).
- Todo el dinero junto, sin separar por cuenta. Retiros de efectivo de MP y transferencias entre cuentas propias = movimiento interno.
- Cada usuario tiene su propia cuenta de MP asociada (diseño multiusuario desde el inicio).
- Funciones a futuro (de a una, cuando se pidan): categorías con autocategorización por reglas, reportes (saldo, resumen mensual, gráficos, comparación entre meses), presupuestos por categoría, exportar a Excel/PDF, carga rápida de efectivo, cuadrar caja, gastos fijos recurrentes, deudas/plata prestada.
- Fuera de alcance por ahora: cuotas de tarjeta, fotos de comprobantes.

## Stack

- **Front:** React Native + Expo.
- **Back:** Node + Express, Passport (local + jwt), bcryptjs. Deploy en Koyeb.
- **Base:** PostgreSQL en Neon, con el driver `pg` (SQL a mano, sin ORM).
- Primera vez con React Native, Expo y PostgreSQL: explicar conceptos nuevos comparando con React web y MongoDB/Mongoose. No sumar tecnologías nuevas sin hablarlo.

## Estructura del repo

```
/backend   API en Express
/app       App mobile en Expo
/docs      Diseños y referencias
```

## Diseño

Referencia: `docs/diseño/` (pantallas de Login, Registro, Inicio y hoja de paleta/tipografía de Claude Design).

- Solo modo oscuro. Fondo liso gris oscuro (#1A1B1E) con resplandor naranja sutil arriba (`expo-linear-gradient`). Sin imágenes de fondo.
- Acento naranja (#FF8A3D) solo para acciones: botones, "+", pestaña activa, links.
- Ingresos en verde (#3DDC84), egresos en rojo (#FF4D5E). Números importantes en blanco.
- Tipografía **Outfit** (`@expo-google-fonts/outfit`). Montos con `fontVariant: ['tabular-nums']`.
- Tarjetas un tono más claro que el fondo (#25262A), radios amplios.
- Navbar flotante glass (`expo-blur`) con 4 pestañas: Inicio, Movimientos, Reportes, Ajustes; botón "+" al costado. Dejar espacio abajo de las listas para que el navbar no tape el último ítem.
- Animaciones (Reanimated): **para más adelante**.

## Base de datos

```sql
CREATE TABLE users (
  id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- El esquema vive en `backend/schema.sql` y se ejecuta en la consola SQL de Neon.
- Convenciones: tablas en plural, columnas en `snake_case`. Plata siempre en `NUMERIC`.
- Consultas siempre parametrizadas (`$1`, `$2`…), nunca concatenando strings.

## Autenticación

Basada en la de AnimalPiletas, adaptada a Postgres y mobile.

- Capas: rutas → middlewares → controller → service → repository. DTO para no devolver nunca el hash.
- Passport: estrategias `registro` y `login` (passport-local) y `actual` (passport-jwt).
- Validación en middleware: datos obligatorios, formato de email, contraseña de mínimo 8 caracteres.
- Email normalizado (minúsculas, sin espacios) en el back antes de guardar y de buscar.
- Rate limit en login y registro (`express-rate-limit`).
- Bloqueo: 10 intentos fallidos → 2 minutos bloqueado.
- Mensaje genérico "Credenciales inválidas" (no revelar qué emails existen).
- Email duplicado: error de Postgres `23505` → 409.
- JWT de **30 días**, devuelto en el JSON del login, enviado por la app en el header `Authorization: Bearer <token>`.
- En la app, el token se guarda en `expo-secure-store`.
- Sin roles ni aprobación de cuentas.

## Etapas

### Etapa 1 — Registro + login ⬅ actual
- [x] Back: conexión a Neon con `pg`, `schema.sql`, endpoints de registro, login y usuario actual.
  - [x] `POST /api/auth/registro`, `POST /api/auth/login`, `GET /api/auth/actual` (Bearer token).
  - [x] Passport (`registro`, `login`, `actual`), bcryptjs, JWT de 30 días, DTO sin `password_hash`.
  - [x] Validación, email normalizado, rate limit, bloqueo 10 intentos / 2 min, 409 por `23505`.
  - [x] Middleware de errores central y 404 en JSON para rutas inexistentes.
  - [x] Contraseña de máximo 72 caracteres (límite de bcrypt).
  - [ ] Probar contra la base real de Neon.
- [ ] App: pantallas de Login y Registro según diseño, guardado del token.

### Después de las pantallas principales
- **Face ID** (`expo-local-authentication`): pedirlo al abrir la app y al volver de segundo plano tras más de 1 minuto. La contraseña se pide solo si el token venció, se cerró sesión o falla Face ID. Requiere development build (Expo Go no soporta Face ID en iPhone).
- **Recuperar contraseña:** código de 6 dígitos por email, vence en 15 minutos. Columnas nuevas: `reset_code_hash`, `reset_code_expires_at` (con `ALTER TABLE`). Envío con Nodemailer + Gmail (contraseña de aplicación). Primero probar un mail desde Koyeb: si el SMTP está bloqueado, pasar a un servicio por API.

## Movimientos, reglas y sueldo (definido para más adelante)

- **Reglas por persona:** "si el movimiento viene de / va a *tal persona* → categoría *tal*". Se aplican automáticamente a los movimientos de MP que entren **desde que se crea la regla**; no se aplican a los viejos.
- **Sueldo neto:** una categoría puede tener movimientos que suman y que restan. Transferencias de ciertas personas → "Sueldo" (suman); pagos a empleados → también "Sueldo" (restan). Sueldo = suma de la categoría. Los pagos a empleados nunca cuentan como gasto en los reportes.
- **Editar movimientos:** cualquier movimiento se puede editar a mano. Una edición manual tiene prioridad: ninguna regla la pisa.
  - Movimientos de MP: se edita categoría y descripción; el **monto no** (viene del banco).
  - Movimientos de efectivo: se edita todo.
- Depende de que la API de MP identifique a la contraparte (nombre, CUIT/CVU o ID fijo). **Verificar en la documentación antes de diseñar.**

## Pendientes a definir

- Rendimientos de MP: definir después de ver qué da la API.
- Antes de diseñar algo que dependa de Mercado Pago, verificar qué datos da realmente la API.
