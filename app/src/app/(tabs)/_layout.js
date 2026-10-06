import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import NavbarGlass from '@/components/NavbarGlass';
import { colores } from '@/theme';

const iconoTab = (nombre) =>
  function IconoTab({ color, size }) {
    return <MaterialIcons name={nombre} size={size} color={color} />;
  };

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <NavbarGlass {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colores.fondo } }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: iconoTab('home') }} />
      <Tabs.Screen name="movimientos" options={{ title: 'Movimientos', tabBarIcon: iconoTab('receipt-long') }} />
      <Tabs.Screen name="reportes" options={{ title: 'Reportes', tabBarIcon: iconoTab('bar-chart') }} />
      <Tabs.Screen name="ajustes" options={{ title: 'Ajustes', tabBarIcon: iconoTab('settings') }} />
    </Tabs>
  );
}
