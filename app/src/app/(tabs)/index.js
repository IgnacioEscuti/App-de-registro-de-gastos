import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilaMovimiento, { SeparadorMovimientos } from '@/components/FilaMovimiento';
import Resplandor from '@/components/Resplandor';
import { useAuth } from '@/context/AuthContext';
import { datosInicio } from '@/mocks/inicio';
import { colores, espaciado, fuentes, radios, tipografia } from '@/theme';
import {
  formatearFechaCorta,
  formatearNumero,
  formatearPesos,
  obtenerIniciales,
  obtenerPrimerNombre,
} from '@/utils/formato';

export default function InicioScreen() {
  const { usuario } = useAuth();
  const insets = useSafeAreaInsets();
  const { saldo, variacionMes, esteMes, movimientos } = datosInicio;

  const [saldoEntero, saldoCentavos] = formatearNumero(saldo).split(',');
  const variacionPositiva = variacionMes >= 0;
  const colorVariacion = variacionPositiva ? colores.ingreso : colores.egreso;
  const porcentajeGastado = esteMes.ingresos > 0 ? (esteMes.egresos / esteMes.ingresos) * 100 : 0;

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={[styles.contenido, { paddingTop: insets.top + 12 }]}
      showsVerticalScrollIndicator={false}>
      <Resplandor />

      <View style={styles.encabezado}>
        <View style={styles.saludo}>
          <Text style={styles.hola} numberOfLines={1}>
            Hola, {obtenerPrimerNombre(usuario.nombre)}
          </Text>
          <Text style={styles.fecha}>{formatearFechaCorta(new Date())}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.iniciales}>{obtenerIniciales(usuario.nombre)}</Text>
        </View>
      </View>

      <View style={styles.bloqueSaldo}>
        <Text style={styles.etiquetaSaldo}>Saldo total</Text>
        <Text style={styles.saldo} numberOfLines={1} adjustsFontSizeToFit>
          <Text style={styles.saldoSigno}>{saldo < 0 ? '−$ ' : '$ '}</Text>
          {saldoEntero}
          <Text style={styles.saldoCentavos}>,{saldoCentavos}</Text>
        </Text>
        <View style={styles.variacion}>
          <MaterialIcons name={variacionPositiva ? 'arrow-upward' : 'arrow-downward'} size={18} color={colorVariacion} />
          <Text style={[styles.textoVariacion, { color: colorVariacion }]}>{formatearPesos(Math.abs(variacionMes))}</Text>
          <Text style={[styles.textoVariacion, { color: colores.texto3 }]}>este mes</Text>
        </View>
      </View>

      <View style={[styles.tarjeta, styles.tarjetaMes]}>
        <View style={styles.filaEntre}>
          <Text style={styles.tituloTarjeta}>Este mes</Text>
          <Text style={styles.textoSecundario}>{esteMes.periodo}</Text>
        </View>

        <View style={styles.columnas}>
          <ResumenMes etiqueta="Ingresos" color={colores.ingreso} monto={esteMes.ingresos} />
          <ResumenMes etiqueta="Egresos" color={colores.egreso} monto={esteMes.egresos} />
        </View>

        <View style={styles.bloqueBarra}>
          <View style={styles.pistaBarra}>
            <View style={[styles.barra, { width: `${Math.min(porcentajeGastado, 100)}%` }]} />
          </View>
          <Text style={styles.textoSecundario}>
            Gastaste el {porcentajeGastado.toFixed(1).replace('.', ',')} % de lo que ingresó.
          </Text>
        </View>
      </View>

      <View style={styles.encabezadoSeccion}>
        <Text style={styles.tituloSeccion}>Últimos movimientos</Text>
        <Link href="/movimientos" style={styles.verTodos}>
          Ver todos
        </Link>
      </View>

      <View style={[styles.tarjeta, styles.listaMovimientos]}>
        {movimientos.map((movimiento, indice) => (
          <Fragment key={movimiento.id}>
            {indice > 0 && <SeparadorMovimientos />}
            <FilaMovimiento movimiento={movimiento} />
          </Fragment>
        ))}
      </View>
    </ScrollView>
  );
}

function ResumenMes({ etiqueta, color, monto }) {
  return (
    <View style={styles.columna}>
      <View style={styles.etiquetaResumen}>
        <View style={[styles.punto, { backgroundColor: color }]} />
        <Text style={styles.textoEtiquetaResumen}>{etiqueta}</Text>
      </View>
      <Text style={styles.montoResumen} numberOfLines={1} adjustsFontSizeToFit>
        {formatearPesos(monto, { decimalesOpcionales: true })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    paddingHorizontal: espaciado.pantalla,
    paddingBottom: espaciado.debajoDelNavbar,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
  },
  saludo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  hola: {
    ...tipografia.titulo,
    color: colores.texto,
    flexShrink: 1,
  },
  fecha: {
    fontFamily: fuentes.medio,
    fontSize: 17,
    color: colores.texto3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radios.pildora,
    backgroundColor: colores.elevado,
    borderWidth: 1,
    borderColor: colores.bordeAvatar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iniciales: {
    fontFamily: fuentes.semibold,
    fontSize: 15,
    color: colores.texto,
  },
  bloqueSaldo: {
    gap: 4,
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 8,
  },
  etiquetaSaldo: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    color: colores.texto2,
  },
  saldo: {
    ...tipografia.display,
    color: colores.texto,
    fontVariant: ['tabular-nums'],
  },
  saldoSigno: {
    fontFamily: fuentes.semibold,
    fontSize: 30,
    letterSpacing: 0,
  },
  saldoCentavos: {
    fontFamily: fuentes.semibold,
    fontSize: 26,
    letterSpacing: 0,
    color: colores.textoAtenuado,
  },
  variacion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  textoVariacion: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    fontVariant: ['tabular-nums'],
  },
  tarjeta: {
    borderRadius: radios.tarjeta,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  tarjetaMes: {
    padding: 20,
    gap: 16,
  },
  filaEntre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloTarjeta: {
    fontFamily: fuentes.semibold,
    fontSize: 17,
    color: colores.texto,
  },
  textoSecundario: {
    fontFamily: fuentes.regular,
    fontSize: 14,
    color: colores.texto3,
  },
  columnas: {
    flexDirection: 'row',
    gap: 12,
  },
  columna: {
    flex: 1,
    gap: 4,
  },
  etiquetaResumen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textoEtiquetaResumen: {
    fontFamily: fuentes.regular,
    fontSize: 14,
    color: colores.texto2,
  },
  montoResumen: {
    fontFamily: fuentes.semibold,
    fontSize: 20,
    letterSpacing: -0.2,
    color: colores.texto,
    fontVariant: ['tabular-nums'],
  },
  bloqueBarra: {
    gap: 8,
  },
  pistaBarra: {
    height: 10,
    borderRadius: radios.pildora,
    backgroundColor: colores.pistaBarra,
    overflow: 'hidden',
  },
  barra: {
    height: '100%',
    minWidth: 10,
    borderRadius: radios.pildora,
    backgroundColor: colores.egreso,
  },
  encabezadoSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  tituloSeccion: {
    ...tipografia.seccion,
    color: colores.texto,
  },
  verTodos: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    color: colores.acento,
  },
  listaMovimientos: {
    paddingVertical: 4,
  },
});
