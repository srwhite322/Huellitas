import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { setAudioModeAsync } from 'expo-audio';
import { Image } from 'expo-image';
import { colores } from '@/theme';

export default function RootLayout() {
  useEffect(() => {
    // El audio NO debe seguir sonando en segundo plano.
    // (Además está desactivado en app.json: enableBackgroundPlayback: false)
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    }).catch(() => {});

    // Si el sistema avisa de poca memoria, vaciamos la caché RAM de Glide/SDWebImage.
    // Las imágenes siguen en caché de disco, así que se recargan rápido.
    const sub = AppState.addEventListener('memoryWarning', () => {
      Image.clearMemoryCache();
    });
    return () => sub.remove();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: colores.texto,
          headerStyle: { backgroundColor: colores.tarjeta },
          headerTransparent: false,
          contentStyle: { backgroundColor: colores.fondo },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="producto/[id]" options={{ title: 'Detalle del producto' }} />
        <Stack.Screen name="mascota/[id]" options={{ title: 'Mascota' }} />
      </Stack>
    </>
  );
}
