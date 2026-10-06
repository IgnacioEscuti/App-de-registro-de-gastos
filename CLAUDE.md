# CLAUDE.md — Auto Capital

Leé `PLAN.md` al empezar cada sesión: tiene la idea, el stack, el diseño y la etapa actual.

## Calidad

- Escribí el código con calidad profesional, aplicando buenas prácticas de seguridad y arquitectura dentro del stack definido.

## Cómo explicarme

- Conozco React web (Vite, React Router, Context, Axios) y Node + Express + MongoDB/Mongoose.
- Es mi primera vez con **React Native, Expo y PostgreSQL**. Cuando uses algo nuevo, explicalo brevemente comparándolo con lo que ya conozco (React web, Mongoose).
- Respondé en español rioplatense, con vos, breve.

## Cómo trabajamos

- **No hagas commits ni push.** Los hago yo siempre.
- Hacé solo lo que pide el prompt. Si ves algo más que haría falta, proponelo al final en vez de hacerlo.
- No sumes librerías ni tecnologías que no estén en `PLAN.md` sin preguntarme antes.
- Soluciones simples, sin sobrediseñar.
- Si algo no funciona después de un intento razonable, avisame en vez de seguir probando.
- Al terminar, actualizá el checklist de la etapa en `PLAN.md` y decime cómo probar lo que hiciste.

## Convenciones

- Estructura: `/backend` (Express), `/app` (Expo), `/docs` (diseños).
- Back: ES modules, capas routes → middlewares → controllers → services → repositories. DTO para no exponer datos sensibles.
- SQL: tablas en plural, columnas en `snake_case`, plata en `NUMERIC`. Consultas siempre parametrizadas (`$1`, `$2`…). Cambios de esquema en `backend/schema.sql`.
- Código (variables, funciones) en español, como en mis otros proyectos; columnas de la base en inglés.
- Nunca subir `.env` ni secretos.

## Diseño

- Referencia visual en `docs/diseños/`. Respetá colores, tipografía y radios de la hoja de paleta.
- Si una pantalla no está diseñada, preguntame antes de inventarla.
