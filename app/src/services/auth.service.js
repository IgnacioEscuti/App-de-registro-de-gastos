import { api } from './api';

export async function iniciarSesion(email, password) {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data;
}

export async function registrarUsuario(nombre, email, password) {
  const { data } = await api.post('/api/auth/registro', { name: nombre, email, password });
  return data;
}

export async function obtenerUsuarioActual() {
  const { data } = await api.get('/api/auth/actual');
  return data.usuario;
}
