export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const requeridas = ["DATABASE_URL", "JWT_SECRET"];
const faltantes = requeridas.filter((nombre) => !env[nombre]);

if (faltantes.length > 0) {
  console.error(
    `Faltan variables de entorno obligatorias: ${faltantes.join(", ")}. ` +
      `Cargalas en el archivo .env (o en el panel del hosting) antes de iniciar el servidor.`
  );
  process.exit(1);
}
