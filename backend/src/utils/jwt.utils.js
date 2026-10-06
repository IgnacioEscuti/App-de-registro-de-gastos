import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const JWT_ALGORITMO = "HS256";
const JWT_DURACION = "30d";

export function generarToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { algorithm: JWT_ALGORITMO, expiresIn: JWT_DURACION });
}
