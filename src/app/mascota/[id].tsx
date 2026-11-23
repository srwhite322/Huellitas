import { useCallback, useRef, useState } from 'react';
import { Alert, PixelRatio, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Stack, useIsFocused, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ReproductorVideo } from '@/components/ReproductorVideo';
import { MASCOTAS } from '@/data/mascotas';
import { useAppActiva } from '@/hooks/useAppActiva';
import { colores, espacio, formatearPrecio, radio } from '@/theme';
import { urlImagen } from '@/utils/imagenes';

export default function DetalleMascota() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mascota = MASCOTAS.find((m) => m.id === id);
  const { width, height } = useWindowDimensions();

  // --- Ciclo de vida multimedia ---
  const enFoco = useIsFocused();
  const appActiva = useAppActiva();
  const [pantallaCompleta, setPantallaCompleta] = useState(false);
  const posicion = useRef(0);
  // En Android la pantalla completa nativa abre otra Activity y AppState
  // reporta "background"; no liberamos el video en ese caso.
  const reproductorMontado = enFoco && (appActiva || pantallaCompleta);

  const guardarPosicion = useCallback((s: number) => {
    posicion.current = s;
  }, []);
  const obtenerPosicion = useCallback(() => posicion.current, []);

  if (!mascota) {
    return (
      <View style={styles.vacio}>
        <Text>Mascota no encontrada.</Text>
      </View>
    );
  }

  // Responsivo: en horizontal el video se limita por la altura disponible
  // y la información se coloca al lado.
  const esHorizontal = width > height;
  const anchoMedia = esHorizontal
    ? Math.min(width * 0.58, ((height - 170) * 16) / 9)
    : width - espacio.l * 2;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.contenedor, esHorizontal && styles.fila]}
    >
      <Stack.Screen options={{ title: mascota.nombre }} />

      <View style={{ width: anchoMedia }}>
        {mascota.video ? (
          reproductorMontado ? (
            <ReproductorVideo
              uri={mascota.video}
              obtenerPosicion={obtenerPosicion}
              onPosicion={guardarPosicion}
              onPantallaCompleta={setPantallaCompleta}
              ancho={anchoMedia}
            />
          ) : (
            // Mientras no está visible mostramos solo la miniatura: el reproductor ya fue liberado.
            <View style={styles.marcoVideo}>
              <Image
                source={urlImagen(mascota.foto, anchoMedia * PixelRatio.get())}
                style={StyleSheet.absoluteFill}
                contentFit="contain"
              />
            </View>
          )
        ) : (
          <View style={styles.marcoFoto}>
            <Image
              source={urlImagen(mascota.foto, anchoMedia * PixelRatio.get())}
              style={StyleSheet.absoluteFill}
              contentFit="contain"
              transition={250}
              cachePolicy="memory-disk"
            />
          </View>
        )}
      </View>

      <View style={[styles.info, esHorizontal && { flex: 1 }]}>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.especie}>
          {mascota.especie} · {mascota.edad}
        </Text>
        <View style={[styles.estado, mascota.estado === 'Venta' && styles.estadoVenta]}>
          <Text style={styles.textoEstado}>
            {mascota.estado === 'Venta' && mascota.precio
              ? `En venta · ${formatearPrecio(mascota.precio)}`
              : 'Disponible para adopción'}
          </Text>
        </View>
        <Text style={styles.descripcion}>{mascota.descripcion}</Text>

        {mascota.video && mascota.foto ? (
          <>
            <Text style={styles.subtitulo}>Foto</Text>
            <View style={styles.miniFoto}>
              <Image
                source={urlImagen(mascota.foto, 320 * PixelRatio.get())}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            </View>
          </>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.boton, pressed && { opacity: 0.85 }]}
          onPress={() =>
            Alert.alert(
              mascota.estado === 'Venta' ? 'Solicitud de compra' : 'Solicitud de adopción',
              `Pronto te contactaremos para conocer a ${mascota.nombre}.`,
            )
          }
        >
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.textoBoton}>
            {mascota.estado === 'Venta' ? 'Quiero comprarlo' : 'Quiero adoptarlo'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  contenedor: { padding: espacio.l, gap: espacio.l, paddingBottom: espacio.xl },
  fila: { flexDirection: 'row', alignItems: 'flex-start' },
  marcoVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colores.negro,
    borderRadius: radio.m,
    overflow: 'hidden',
  },
  marcoFoto: {
    width: '100%',
    aspectRatio: 4 / 5,
    maxHeight: 560,
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    overflow: 'hidden',
  },
  info: { gap: espacio.xs },
  nombre: { fontSize: 26, fontWeight: '800', color: colores.texto },
  especie: { fontSize: 16, color: colores.textoSuave },
  estado: {
    alignSelf: 'flex-start',
    marginTop: espacio.xs,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: espacio.m,
    paddingVertical: 4,
    borderRadius: radio.pill,
  },
  estadoVenta: { backgroundColor: colores.primarioSuave },
  textoEstado: { fontWeight: '600', color: colores.texto },
  descripcion: { fontSize: 15, lineHeight: 22, color: colores.texto, marginTop: espacio.m },
  subtitulo: { fontSize: 17, fontWeight: '700', color: colores.texto, marginTop: espacio.l },
  miniFoto: {
    width: 160,
    aspectRatio: 1,
    borderRadius: radio.m,
    overflow: 'hidden',
    backgroundColor: colores.placeholder,
  },
  boton: {
    marginTop: espacio.xl,
    backgroundColor: colores.primario,
    borderRadius: radio.m,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: espacio.s,
  },
  textoBoton: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
