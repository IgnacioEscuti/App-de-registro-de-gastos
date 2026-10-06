import { createContext, useContext, useEffect, useState } from 'react';
import { iniciarSesion, obtenerUsuarioActual, registrarUsuario } from '@/services/auth.service';
import { borrarToken, guardarToken, obtenerToken } from '@/services/token.storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function restaurarSesion() {
      try {
        const token = await obtenerToken();
        if (!token) return;
        setUsuario(await obtenerUsuarioActual());
      } catch (error) {
        // Solo un 401 significa token inválido o vencido. Si el back no responde,
        // se conserva el token y se muestra el Login igual.
        if (error.response?.status === 401) await borrarToken();
      } finally {
        setCargando(false);
      }
    }

    restaurarSesion();
  }, []);

  async function login(email, password) {
    const { token, usuario } = await iniciarSesion(email, password);
    await guardarToken(token);
    setUsuario(usuario);
  }

  async function registro(nombre, email, password) {
    const { token, usuario } = await registrarUsuario(nombre, email, password);
    await guardarToken(token);
    setUsuario(usuario);
  }

  async function logout() {
    await borrarToken();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth tiene que usarse dentro de <AuthProvider>.');
  return contexto;
}
