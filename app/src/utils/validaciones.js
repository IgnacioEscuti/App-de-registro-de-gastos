// Mismas reglas que backend/src/middlewares/validacion.middlewares.js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_CARACTERES = 8;
const PASSWORD_MAX_CARACTERES = 72;

const estaVacio = (valor) => valor.trim() === '';

function validarEmail(email) {
  if (estaVacio(email)) return 'Ingresá tu email.';
  if (!EMAIL_REGEX.test(email.trim())) return 'El email no tiene un formato válido.';
}

export function validarLogin({ email, password }) {
  const errores = {};
  const errorEmail = validarEmail(email);
  if (errorEmail) errores.email = errorEmail;
  if (estaVacio(password)) errores.password = 'Ingresá tu contraseña.';
  return errores;
}

export function validarRegistro({ nombre, email, password }) {
  const errores = {};
  if (estaVacio(nombre)) errores.nombre = 'Ingresá tu nombre.';

  const errorEmail = validarEmail(email);
  if (errorEmail) errores.email = errorEmail;

  if (estaVacio(password)) {
    errores.password = 'Ingresá una contraseña.';
  } else if (password.length < PASSWORD_MIN_CARACTERES) {
    errores.password = `La contraseña debe tener al menos ${PASSWORD_MIN_CARACTERES} caracteres.`;
  } else if (password.length > PASSWORD_MAX_CARACTERES) {
    errores.password = `La contraseña puede tener como máximo ${PASSWORD_MAX_CARACTERES} caracteres.`;
  }
  return errores;
}

export const tieneErrores = (errores) => Object.keys(errores).length > 0;
