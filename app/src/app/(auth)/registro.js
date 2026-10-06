import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BotonPrimario from '@/components/BotonPrimario';
import CampoFormulario, { SeparadorCampos, TarjetaCampos } from '@/components/CampoFormulario';
import EncabezadoAuth from '@/components/EncabezadoAuth';
import MensajeError from '@/components/MensajeError';
import PantallaAuth from '@/components/PantallaAuth';
import { useAuth } from '@/context/AuthContext';
import { obtenerMensajeDeError } from '@/services/api';
import { colores, fuentes } from '@/theme';
import { tieneErrores, validarRegistro } from '@/utils/validaciones';

const HTTP_CONFLICTO = 409;

export default function RegistroScreen() {
  const { registro } = useAuth();
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);
  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function actualizarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
    setErrorGeneral('');
  }

  async function crearCuenta() {
    if (enviando) return;

    const erroresValidacion = validarRegistro(datos);
    setErrores(erroresValidacion);
    setErrorGeneral('');
    if (tieneErrores(erroresValidacion)) return;

    setEnviando(true);
    try {
      await registro(datos.nombre.trim(), datos.email.trim(), datos.password);
    } catch (error) {
      if (error.response?.status === HTTP_CONFLICTO) {
        setErrores({ email: 'Este email ya está registrado.' });
      } else {
        setErrorGeneral(obtenerMensajeDeError(error));
      }
      setEnviando(false);
    }
  }

  return (
    <PantallaAuth paddingSuperior={56}>
      <EncabezadoAuth subtitulo="Creá tu cuenta y empezá a ordenar tu plata." />

      <TarjetaCampos style={styles.tarjeta}>
        <CampoFormulario
          ref={nombreRef}
          icono="person-outline"
          etiqueta="Nombre"
          placeholder="Tu nombre"
          value={datos.nombre}
          onChangeText={(valor) => actualizarCampo('nombre', valor)}
          error={errores.nombre}
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <SeparadorCampos />
        <CampoFormulario
          ref={emailRef}
          icono="mail-outline"
          etiqueta="Email"
          placeholder="tu@email.com"
          value={datos.email}
          onChangeText={(valor) => actualizarCampo('email', valor)}
          error={errores.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="username"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <SeparadorCampos />
        <CampoFormulario
          ref={passwordRef}
          icono="lock-outline"
          etiqueta="Contraseña"
          placeholder="••••••••"
          value={datos.password}
          onChangeText={(valor) => actualizarCampo('password', valor)}
          error={errores.password}
          ayuda="Mínimo 8 caracteres"
          esPassword
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={crearCuenta}
        />
      </TarjetaCampos>

      <View style={styles.espacio} />

      <View style={styles.pie}>
        <MensajeError mensaje={errorGeneral} />
        <BotonPrimario titulo="Crear cuenta" tituloCargando="Creando cuenta…" cargando={enviando} onPress={crearCuenta} />
        <Text style={styles.cambiarPantalla}>
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" replace style={styles.link}>
            Ingresá
          </Link>
        </Text>
      </View>
    </PantallaAuth>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    marginTop: 40,
  },
  espacio: {
    flex: 1,
    minHeight: 32,
  },
  pie: {
    gap: 18,
  },
  cambiarPantalla: {
    fontFamily: fuentes.regular,
    fontSize: 15,
    color: colores.texto2,
    textAlign: 'center',
  },
  link: {
    fontFamily: fuentes.semibold,
    color: colores.acento,
  },
});
