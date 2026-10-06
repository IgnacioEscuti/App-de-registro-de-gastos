import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';
import { formatearPesosConSigno } from '@/utils/formato';
import { colores, fuentes, radios, tipografia } from '@/theme';

export default function FilaMovimiento({ movimiento }) {
  const { icono, titulo, categoria, fecha, monto } = movimiento;

  return (
    <View style={styles.fila}>
      <View style={styles.icono}>
        <MaterialIcons name={icono} size={22} color={colores.iconoMovimiento} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        <Text style={styles.meta}>
          {categoria} · {fecha}
        </Text>
      </View>
      <Text style={[styles.monto, { color: monto > 0 ? colores.ingreso : colores.egreso }]}>
        {formatearPesosConSigno(monto)}
      </Text>
    </View>
  );
}

export function SeparadorMovimientos() {
  return <View style={styles.separador} />;
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icono: {
    width: 42,
    height: 42,
    borderRadius: radios.icono,
    backgroundColor: colores.elevado,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  titulo: {
    ...tipografia.cuerpo,
    lineHeight: 20,
    color: colores.texto,
  },
  meta: {
    ...tipografia.meta,
    color: colores.texto3,
  },
  monto: {
    fontFamily: fuentes.semibold,
    fontSize: 15,
    fontVariant: ['tabular-nums'],
  },
  separador: {
    height: 1,
    backgroundColor: colores.borde,
    marginLeft: 72,
    marginRight: 16,
  },
});
