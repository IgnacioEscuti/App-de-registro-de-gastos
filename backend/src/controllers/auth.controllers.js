import { usuarioService } from "../services/usuario.service.js";
import { UsuarioDTO } from "../DTOs/usuario.dto.js";

export function registrar(req, res) {
  const token = usuarioService.generarToken(req.usuario);
  res.status(201).json({ token, usuario: new UsuarioDTO(req.usuario) });
}

export function login(req, res) {
  const token = usuarioService.generarToken(req.usuario);
  res.status(200).json({ token, usuario: new UsuarioDTO(req.usuario) });
}

export function getUsuarioActual(req, res) {
  res.status(200).json({ usuario: new UsuarioDTO(req.usuario) });
}
