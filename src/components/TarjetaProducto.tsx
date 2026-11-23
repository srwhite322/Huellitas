import { memo } from 'react';
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { Producto } from '@/data/tipos';
import { colores, espacio, formatearPrecio, radio } from '@/theme';
import { urlImagen } from '@/utils/imagenes';

interface Props {
  producto: Producto;
  ancho: number;
  onPress: (producto: Producto) => void;
}

/**
 * Tarjeta del catálogo. Está envuelta en `memo` para que la lista no
 * vuelva a renderizar tarjetas que no cambiaron al hacer scroll o filtrar.
 */
function TarjetaProductoBase({ producto, ancho, onPress }: Props) {
  // Pedimos la miniatura al tamaño exacto de la tarjeta en píxeles físicos.
  const fuente = urlImagen(producto.imagen, ancho * PixelRatio.get());

  return (
    <Pressable
      onPress={() => onPress(producto)}
      style={({ pressed }) => [styles.tarjeta, { width: ancho }, pressed && styles.presionada]}
      accessibilityRole="button"
      accessibilityLabel={`${producto.nombre}, ${formatearPrecio(producto.precio)}`}
    >
      {/* Contenedor cuadrado + contentFit="cover": la foto se recorta, nunca se deforma. */}
      <View style={styles.marcoImagen}>
        <Image
          source={fuente}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          recyclingKey={producto.id}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.categoria}>{producto.categoria}</Text>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={styles.precio}>{formatearPrecio(producto.precio)}</Text>
      </View>
    </Pressable>
  );
}

export const TarjetaProducto = memo(TarjetaProductoBase);

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colores.borde,
  },
  presionada: { opacity: 0.85 },
  marcoImagen: { aspectRatio: 1, backgroundColor: colores.placeholder },
  info: { padding: espacio.m, gap: 2 },
  categoria: { fontSize: 12, color: colores.primario, fontWeight: '700', textTransform: 'uppercase' },
  nombre: { fontSize: 15, color: colores.texto, fontWeight: '600', minHeight: 38 },
  precio: { fontSize: 16, color: colores.texto, fontWeight: '800', marginTop: 4 },
});
