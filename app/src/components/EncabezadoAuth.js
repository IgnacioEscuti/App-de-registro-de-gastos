import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';
import { colores, fuentes, radios, sombras, tipografia } from '@/theme';

export default function EncabezadoAuth({ subtitulo }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.logo}>
        <MaterialIcons name="trending-up" size={30} color={colores.sobreAcento} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo}>Capi</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 22,
    paddingHorizontal: 4,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: radios.logo,
    backgroundColor: colores.acento,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: sombras.logo,
  },
  textos: {
    gap: 10,
  },
  titulo: {
    ...tipografia.tituloGrande,
    color: colores.texto,
  },
  subtitulo: {
    fontFamily: fuentes.regular,
    fontSize: 17,
    lineHeight: 24,
    color: colores.texto2,
  },
});
