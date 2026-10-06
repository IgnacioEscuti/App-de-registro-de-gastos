import pg from "pg";
import { env } from "./env.js";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: true,
});

// Neon cierra las conexiones inactivas: sin este listener, ese error
// en una conexión ociosa del pool tiraría abajo todo el proceso.
pool.on("error", (error) => {
  console.error("Error en una conexión inactiva de la base:", error.message);
});

export async function verificarConexion() {
  await pool.query("SELECT 1");
  console.log("Conectado a PostgreSQL");
}
