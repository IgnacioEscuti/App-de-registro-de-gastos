import { ErrorHttp } from "../utils/errorHttp.utils.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_CARACTERES = 8;
const PASSWORD_MAX_CARACTERES = 72;

const esTextoConContenido = (valor) => typeof valor === "string" && valor.trim() !== "";

export function validarRegistro(req, res, next) {
  const { name, email, password } = req.body ?? {};

  if (!esTextoConContenido(name) || !esTextoConContenido(email) || !esTextoConContenido(password)) {
    return next(new ErrorHttp(400, "Nombre, email y contraseña son obligatorios"));
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return next(new ErrorHttp(400, "El email no tiene un formato válido"));
  }
  if (password.length < PASSWORD_MIN_CARACTERES) {
    return next(new ErrorHttp(400, `La contraseña debe tener al menos ${PASSWORD_MIN_CARACTERES} caracteres`));
  }
  if (password.length > PASSWORD_MAX_CARACTERES) {
    return next(new ErrorHttp(400, `La contraseña puede tener como máximo ${PASSWORD_MAX_CARACTERES} caracteres`));
  }

  next();
}

export function validarLogin(req, res, next) {
  const { email, password } = req.body ?? {};

  if (!esTextoConContenido(email) || !esTextoConContenido(password)) {
    return next(new ErrorHttp(400, "Email y contraseña son obligatorios"));
  }

  next();
}
