import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';
import { colores, fuentes, radios } from '@/theme';

export default function MensajeError({ mensaje }) {
  if (!mensaje) return null;

  return (
    <View style={styles.contenedor} accessibilityRole="alert">
      <MaterialIcons name="error-outline" size={20} color={colores.egreso} />
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radios.mensaje,
    backgroundColor: colores.egresoFondo,
    borderWidth: 1,
    borderColor: colores.egresoBorde,
  },
  texto: {
    flex: 1,
    fontFamily: fuentes.medio,
    fontSize: 14,
    lineHeight: 19,
    color: colores.egreso,
  },
});
