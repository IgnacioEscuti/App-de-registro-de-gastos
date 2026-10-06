import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { usuarioService } from "../services/usuario.service.js";
import { JWT_ALGORITMO } from "../utils/jwt.utils.js";
import { env } from "./env.js";

function manejarErrorDeEstrategia(error, done) {
  if (error.statusCode) {
    return done(null, false, { message: error.message, statusCode: error.statusCode });
  }
  return done(error);
}

passport.use(
  "registro",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const usuario = await usuarioService.registrar({ nombre: req.body.name, email, password });
        return done(null, usuario);
      } catch (error) {
        return manejarErrorDeEstrategia(error, done);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    try {
      const usuario = await usuarioService.login(email, password);
      return done(null, usuario);
    } catch (error) {
      return manejarErrorDeEstrategia(error, done);
    }
  })
);

passport.use(
  "actual",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
      algorithms: [JWT_ALGORITMO],
    },
    async (payload, done) => {
      try {
        const usuario = await usuarioService.buscarPorId(payload.id);
        return done(null, usuario ?? false);
      } catch (error) {
        return done(error);
      }
    }
  )
);
