import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.textoSuave,
        headerStyle: { backgroundColor: colores.tarjeta },
        headerTitleStyle: { fontWeight: '700' },
        sceneStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          headerTitle: 'Huellitas · Tienda',
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront" color={color as string} size={size} />,
        }}
      />
      <Tabs.Screen
        name="galeria"
        options={{
          title: 'Galería',
          headerTitle: 'Mascotas en adopción y venta',
          tabBarIcon: ({ color, size }) => <Ionicons name="images" color={color as string} size={size} />,
        }}
      />
      <Tabs.Screen
        name="consejos"
        options={{
          title: 'Consejos',
          headerTitle: 'Consejos de cuidado (audio)',
          tabBarIcon: ({ color, size }) => <Ionicons name="headset" color={color as string} size={size} />,
        }}
      />
    </Tabs>
  );
}
