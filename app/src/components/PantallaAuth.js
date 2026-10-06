import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Resplandor from './Resplandor';
import { colores, espaciado } from '@/theme';

export default function PantallaAuth({ paddingSuperior, children }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.contenedor}>
      <Resplandor />
      <KeyboardAvoidingView style={styles.contenedor} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.contenido,
            { paddingTop: insets.top + paddingSuperior, paddingBottom: insets.bottom + 10 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    flexGrow: 1,
    paddingHorizontal: espaciado.pantallaAuth,
  },
});
