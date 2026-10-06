import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Resplandor from './Resplandor';
import { colores, espaciado, tipografia } from '@/theme';

// Estructura base de las secciones simples (Movimientos, Reportes, Ajustes).
export default function PantallaSeccion({ titulo, children }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.contenedor, { paddingTop: insets.top + 12 }]}>
      <Resplandor />
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.contenido}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    paddingHorizontal: espaciado.pantalla,
    paddingBottom: espaciado.debajoDelNavbar,
  },
  titulo: {
    ...tipografia.titulo,
    color: colores.texto,
    paddingHorizontal: 8,
  },
  contenido: {
    flex: 1,
  },
});
