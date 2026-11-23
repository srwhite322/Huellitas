# Huellitas: app móvil para una tienda de mascotas

App hecha con **React Native + Expo (SDK 58)** y **Expo Router**. Tiene tres secciones:

| Pestaña | Qué hace |
|---|---|
| **Catálogo** | Lista de productos (comida, juguetes, accesorios, higiene) con imagen, nombre, categoría y precio. Se puede filtrar por categoría. Al tocar un producto se abre su detalle. |
| **Galería** | Fotos y videos de las mascotas en adopción o venta. Los videos se reproducen **dentro de la app** y tienen controles para pausar, adelantar y retroceder. |
| **Consejos** | Pistas de voz con consejos de cuidado y un reproductor propio con botones **Iniciar, Pausar y Detener**. |

## Cómo ejecutarla

```bash
npm install
npx expo start
```

- **En el celular:** instala **Expo Go** (versión compatible con la SDK 58) y escanea el código QR.
- **En el emulador:** abre un emulador de Android Studio y presiona `a` en la terminal.
- **Para generar un APK o una *development build*:** usa `npx expo run:android` (necesita Android Studio) o `npx eas-cli@latest build -p android --profile preview`.

> Las opciones nativas de `app.json` solo se aplican en una build nativa, no en Expo Go. Por ejemplo, `enableBackgroundPlayback: false`.

## Cómo se cumple cada requisito técnico

### 1. Gestión de memoria y rendimiento
- **Glide para las imágenes.** Todas usan `expo-image`, que en Android funciona con **Glide** y en iOS con SDWebImage. Tienen caché en memoria y en disco (`cachePolicy="memory-disk"`) y `recyclingKey` para reutilizar las vistas en las listas.
- **Imágenes al tamaño justo.** [src/utils/imagenes.ts](src/utils/imagenes.ts) le pide al CDN cada foto al ancho en que se va a mostrar (en píxeles físicos), en lugar de descargar el original de varios MB. Así cada bitmap ocupa mucha menos RAM.
- **Listas virtualizadas.** Se usa `FlatList` con `initialNumToRender`, `windowSize`, `maxToRenderPerBatch` y `removeClippedSubviews`, para que solo estén montadas las tarjetas cercanas a la pantalla. Además, las tarjetas usan `memo` y los callbacks usan `useCallback`.
- **Sin reproductores en la galería.** La galería solo muestra miniaturas. El reproductor de video se crea al abrir el detalle de la mascota, y nunca hay más de uno activo.
- **Precarga.** Al tocar un producto se precarga la imagen grande (`Image.prefetch`) mientras se abre el detalle.
- **Memoria baja.** Si el sistema avisa de poca memoria (`AppState 'memoryWarning'`), se vacía la caché de imágenes en RAM ([src/app/_layout.tsx](src/app/_layout.tsx)).
- **Video en streaming.** Los videos son MP4 de 720p que **ExoPlayer** reproduce sin descargarlos completos.

### 2. Ciclo de vida multimedia
- `useVideoPlayer` (expo-video) y `useAudioPlayer` (expo-audio) **liberan el reproductor nativo automáticamente al desmontar** el componente.
- Los reproductores **solo se montan mientras la pantalla está visible y la app está en primer plano**:
  ```ts
  const enFoco = useIsFocused();     // ¿la pantalla o pestaña está visible?
  const appActiva = useAppActiva();  // ¿la app está en primer plano? (AppState)
  {enFoco && appActiva && <ReproductorAudio ... />}
  ```
  Si el usuario cambia de pestaña, abre otra pantalla, presiona Home o recibe una llamada, el componente se desmonta. El audio o el video se detiene y se libera la memoria. Ver [src/hooks/useAppActiva.ts](src/hooks/useAppActiva.ts).
- **Esto es importante en las pestañas:** las pestañas **no se desmontan** al cambiar de una a otra. Sin esta lógica, el audio seguiría sonando ([src/app/(tabs)/consejos.tsx](src/app/(tabs)/consejos.tsx)).
- En el video se guarda el segundo en que iba. Si el reproductor se libera (por ejemplo, al salir de la app), al volver se recrea y sigue desde ahí ([src/app/mascota/[id].tsx](src/app/mascota/[id].tsx)).
- La reproducción en segundo plano está desactivada en `app.json` (`enableBackgroundPlayback: false` y `supportsBackgroundPlayback: false`) y en `setAudioModeAsync({ shouldPlayInBackground: false })`.

### 3. APIs y librerías multimedia
| Uso | Librería | Motor nativo en Android |
|---|---|---|
| Imágenes | `expo-image` | **Glide** |
| Video | `expo-video` | **ExoPlayer (Media3)** |
| Audio | `expo-audio` | Reproductor nativo de Android |

### 4. Diseño responsivo
- [src/hooks/useColumnas.ts](src/hooks/useColumnas.ts) calcula el número de columnas según el ancho real. Son 2 en un teléfono en vertical, 3 o 4 en horizontal y más en tableta. Se recalcula al girar la pantalla.
- Las imágenes van en contenedores con `aspectRatio` fijo. Las de las listas usan `contentFit="cover"`, que recorta sin deformar, y las del detalle usan `contentFit="contain"`, que muestran la foto completa.
- El video va en un marco 16:9 con `contentFit="contain"`, así que nunca se estira. En horizontal, su tamaño se limita por la altura disponible y la información pasa al lado.
- `app.json` tiene `"orientation": "default"`, para que la app se pueda girar, y `supportsTablet: true`.

## Estructura

```
src/
  app/                      # Pantallas (Expo Router)
    _layout.tsx             # Stack raíz, modo de audio, aviso de memoria baja
    (tabs)/_layout.tsx      # Pestañas
    (tabs)/index.tsx        # Catálogo
    (tabs)/galeria.tsx      # Galería de mascotas
    (tabs)/consejos.tsx     # Consejos en audio
    producto/[id].tsx       # Detalle del producto
    mascota/[id].tsx        # Detalle de la mascota + video
  components/               # Tarjetas, chips, ReproductorVideo, ReproductorAudio
  hooks/                    # useAppActiva, useColumnas
  data/                     # Productos, mascotas y pistas de audio
  utils/imagenes.ts         # URLs de imágenes al tamaño justo
assets/audio/               # Pistas de voz (WAV)
```

## Créditos de los medios
- Fotos y videos: [Pexels](https://www.pexels.com), con la Licencia Pexels (uso libre, sin atribución obligatoria).
- Audios: generados con síntesis de voz en español. Puedes reemplazarlos por tus propias grabaciones con el mismo nombre de archivo en `assets/audio/`.
