import { Router } from "express";
import { registrar, login, getUsuarioActual } from "../controllers/auth.controllers.js";
import { validarRegistro, validarLogin } from "../middlewares/validacion.middlewares.js";
import { autenticarRegistro, autenticarLogin, autenticarActual } from "../middlewares/passport.middlewares.js";
import { limiterLogin, limiterRegistro } from "../middlewares/rateLimit.middlewares.js";

const router = Router();

router.post("/registro", limiterRegistro, validarRegistro, autenticarRegistro, registrar);
router.post("/login", limiterLogin, validarLogin, autenticarLogin, login);
router.get("/actual", autenticarActual, getUsuarioActual);

export default router;
