import express from "express";
import passport from "passport";
import "./config/passport.config.js";
import authRoutes from "./routes/auth.routes.js";
import { rutaNoEncontrada, errorHandler } from "./middlewares/error.middlewares.js";

const app = express();

app.disable("x-powered-by");
// Koyeb pone un proxy adelante: sin esto, el rate limit vería la IP del
// proxy y todos los usuarios compartirían el mismo contador.
app.set("trust proxy", 1);

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.use(rutaNoEncontrada);
app.use(errorHandler);

export default app;
