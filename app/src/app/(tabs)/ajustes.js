import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PantallaSeccion from '@/components/PantallaSeccion';
import { useAuth } from '@/context/AuthContext';
import { colores, fuentes, radios } from '@/theme';

export default function AjustesScreen() {
  const { logout } = useAuth();

  return (
    <PantallaSeccion titulo="Ajustes">
      <View style={styles.tarjeta}>
        <Pressable
          onPress={logout}
          accessibilityRole="button"
          style={({ pressed }) => [styles.fila, pressed && styles.filaPresionada]}>
          <View style={styles.icono}>
            <MaterialIcons name="logout" size={21} color={colores.egreso} />
          </View>
          <Text style={styles.texto}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </PantallaSeccion>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    marginTop: 32,
    borderRadius: radios.tarjeta,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    overflow: 'hidden',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  filaPresionada: {
    backgroundColor: colores.presionado,
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: radios.iconoCampo,
    backgroundColor: colores.egresoSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontFamily: fuentes.medio,
    fontSize: 17,
    color: colores.egreso,
  },
});
