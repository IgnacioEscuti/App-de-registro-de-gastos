import * as SecureStore from 'expo-secure-store';

const CLAVE_TOKEN = 'token_sesion';

export const obtenerToken = () => SecureStore.getItemAsync(CLAVE_TOKEN);
export const guardarToken = (token) => SecureStore.setItemAsync(CLAVE_TOKEN, token);
export const borrarToken = () => SecureStore.deleteItemAsync(CLAVE_TOKEN);
