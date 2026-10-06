import axios from 'axios';
import { obtenerToken } from './token.storage';

// Expo reemplaza process.env.EXPO_PUBLIC_* al compilar: hay que leerla así, sin desestructurar.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.warn('Falta EXPO_PUBLIC_API_URL en app/.env (mirá .env.example).');
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await obtenerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function obtenerMensajeDeError(error) {
  if (error.response) return error.response.data?.error ?? 'Ocurrió un error inesperado.';
  return 'No se pudo conectar con el servidor. Revisá tu conexión.';
}
