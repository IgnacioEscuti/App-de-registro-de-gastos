import { StyleSheet, Text, View } from 'react-native';
import { colores, fuentes } from '@/theme';

export default function Proximamente() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Próximamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontFamily: fuentes.medio,
    fontSize: 17,
    color: colores.texto3,
  },
});
