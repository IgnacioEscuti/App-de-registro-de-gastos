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
import { tieneErrores, validarLogin } from '@/utils/validaciones';

export default function LoginScreen() {
  const { login } = useAuth();
  const [datos, setDatos] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function actualizarCampo(campo, valor) {
    setDatos((anteriores) => ({ ...anteriores, [campo]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
    setErrorGeneral('');
  }

  async function ingresar() {
    if (enviando) return;

    const erroresValidacion = validarLogin(datos);
    setErrores(erroresValidacion);
    setErrorGeneral('');
    if (tieneErrores(erroresValidacion)) return;

    setEnviando(true);
    try {
      // Si sale bien, Stack.Protected lleva solo al Inicio y esta pantalla se desmonta.
      await login(datos.email.trim(), datos.password);
    } catch (error) {
      setErrorGeneral(obtenerMensajeDeError(error));
      setEnviando(false);
    }
  }

  return (
    <PantallaAuth paddingSuperior={72}>
      <EncabezadoAuth subtitulo="Tu plata, en orden. Ingresá para ver tus movimientos." />

      <TarjetaCampos style={styles.tarjeta}>
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
          esPassword
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={ingresar}
        />
      </TarjetaCampos>

      <View style={styles.espacio} />

      <View style={styles.pie}>
        <MensajeError mensaje={errorGeneral} />
        <BotonPrimario titulo="Ingresar" tituloCargando="Ingresando…" cargando={enviando} onPress={ingresar} />
        <Text style={styles.cambiarPantalla}>
          ¿No tenés cuenta?{' '}
          <Link href="/registro" replace style={styles.link}>
            Registrate
          </Link>
        </Text>
        <Text style={styles.aviso}>Tus datos se guardan solo en tu cuenta.</Text>
      </View>
    </PantallaAuth>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    marginTop: 52,
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
  aviso: {
    fontFamily: fuentes.regular,
    fontSize: 13,
    color: colores.texto3,
    textAlign: 'center',
  },
});
