import { memo } from 'react';
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import type { Mascota } from '@/data/tipos';
import { colores, espacio, formatearPrecio, radio } from '@/theme';
import { urlImagen } from '@/utils/imagenes';

interface Props {
  mascota: Mascota;
  ancho: number;
  onPress: (mascota: Mascota) => void;
}

/**
 * En la cuadrícula NUNCA se crean reproductores de video: solo se muestra
 * una miniatura (foto) con un ícono de "play". El reproductor se crea al
 * abrir el detalle. Así la galería no consume decodificadores ni RAM de video.
 */
function TarjetaMascotaBase({ mascota, ancho, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(mascota)}
      style={({ pressed }) => [styles.tarjeta, { width: ancho }, pressed && { opacity: 0.85 }]}
      accessibilityRole="button"
      accessibilityLabel={`${mascota.nombre}, ${mascota.especie}${mascota.video ? ', tiene video' : ''}`}
    >
      <View style={styles.marco}>
        <Image
          source={urlImagen(mascota.foto, ancho * PixelRatio.get())}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          recyclingKey={mascota.id}
        />
        {mascota.video && (
          <View style={styles.capaVideo}>
            <View style={styles.botonPlay}>
              <Ionicons name="play" size={26} color="#fff" style={{ marginLeft: 3 }} />
            </View>
            <View style={styles.etiquetaVideo}>
              <Ionicons name="videocam" size={12} color="#fff" />
              <Text style={styles.textoEtiqueta}>VIDEO</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={1}>
          {mascota.nombre}
        </Text>
        <Text style={styles.detalle} numberOfLines={1}>
          {mascota.especie} · {mascota.edad}
        </Text>
        <View style={[styles.estado, mascota.estado === 'Venta' && styles.estadoVenta]}>
          <Text style={styles.textoEstado}>
            {mascota.estado === 'Venta' && mascota.precio
              ? `Venta · ${formatearPrecio(mascota.precio)}`
              : 'En adopción'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const TarjetaMascota = memo(TarjetaMascotaBase);

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colores.borde,
  },
  marco: { aspectRatio: 4 / 5, backgroundColor: colores.placeholder },
  capaVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPlay: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etiquetaVideo: {
    position: 'absolute',
    top: espacio.s,
    left: espacio.s,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radio.s,
  },
  textoEtiqueta: { color: '#fff', fontSize: 11, fontWeight: '700' },
  info: { padding: espacio.m, gap: 2 },
  nombre: { fontSize: 16, fontWeight: '700', color: colores.texto },
  detalle: { fontSize: 13, color: colores.textoSuave },
  estado: {
    alignSelf: 'flex-start',
    marginTop: espacio.xs,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: espacio.s,
    paddingVertical: 2,
    borderRadius: radio.pill,
  },
  estadoVenta: { backgroundColor: colores.primarioSuave },
  textoEstado: { fontSize: 12, fontWeight: '600', color: colores.texto },
});
