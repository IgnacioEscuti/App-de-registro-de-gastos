import passport from "passport";
import { ErrorHttp } from "../utils/errorHttp.utils.js";

function autenticarCon(estrategia, statusPorDefecto, mensajePorDefecto) {
  return (req, res, next) => {
    passport.authenticate(estrategia, { session: false }, (err, usuario, info) => {
      if (err) return next(err);
      if (!usuario) {
        return next(new ErrorHttp(info?.statusCode ?? statusPorDefecto, info?.message ?? mensajePorDefecto));
      }
      req.usuario = usuario;
      next();
    })(req, res, next);
  };
}

export const autenticarRegistro = autenticarCon("registro", 400, "No se pudo registrar el usuario");
export const autenticarLogin = autenticarCon("login", 401, "Credenciales inválidas");

// En passport-jwt, "info" es el error de la librería (token vencido, firma
// inválida...): no se reenvía su mensaje, se responde siempre lo mismo.
export function autenticarActual(req, res, next) {
  passport.authenticate("actual", { session: false }, (err, usuario) => {
    if (err) return next(err);
    if (!usuario) return next(new ErrorHttp(401, "No hay una sesión válida"));
    req.usuario = usuario;
    next();
  })(req, res, next);
}
