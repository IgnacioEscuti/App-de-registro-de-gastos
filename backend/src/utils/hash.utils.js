import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export function crearHash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function esPasswordValida(password, hash) {
  return bcrypt.compare(password, hash);
}
