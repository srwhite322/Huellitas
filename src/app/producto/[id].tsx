import { Alert, PixelRatio, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTOS } from '@/data/productos';
import { colores, espacio, formatearPrecio, radio } from '@/theme';
import { urlImagen } from '@/utils/imagenes';

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = PRODUCTOS.find((p) => p.id === id);
  const { width, height } = useWindowDimensions();

  // En horizontal o en tableta: imagen a la izquierda, información a la derecha.
  const dosColumnas = width >= 700 || width > height;
  const anchoImagen = dosColumnas ? Math.min(width * 0.45, 560) : width;

  if (!producto) {
    return (
      <View style={styles.vacio}>
        <Text>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.contenedor, dosColumnas && styles.contenedorFila]}
    >
      <Stack.Screen options={{ title: producto.nombre }} />

      {/* aspectRatio fijo + contentFit="contain": la foto completa, sin estirarse. */}
      <View style={[styles.marcoImagen, { width: dosColumnas ? anchoImagen : '100%' }]}>
        <Image
          source={urlImagen(producto.imagen, anchoImagen * PixelRatio.get())}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
          transition={250}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={[styles.info, dosColumnas && styles.infoLado]}>
        <Text style={styles.categoria}>{producto.categoria}</Text>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>{formatearPrecio(producto.precio)}</Text>
        <Text style={[styles.stock, producto.stock === 0 && styles.agotado]}>
          {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Agotado'}
        </Text>

        <Text style={styles.subtitulo}>Descripción</Text>
        <Text style={styles.descripcion}>{producto.descripcion}</Text>

        <Text style={styles.subtitulo}>Características</Text>
        {producto.caracteristicas.map((c) => (
          <View key={c} style={styles.caracteristica}>
            <Ionicons name="checkmark-circle" size={18} color={colores.exito} />
            <Text style={styles.textoCaracteristica}>{c}</Text>
          </View>
        ))}

        <Pressable
          style={({ pressed }) => [styles.boton, pressed && { opacity: 0.85 }]}
          disabled={producto.stock === 0}
          onPress={() => Alert.alert('Carrito', `${producto.nombre} se agregó al carrito.`)}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.textoBoton}>Agregar al carrito</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  contenedor: { paddingBottom: espacio.xl },
  contenedorFila: { flexDirection: 'row', alignItems: 'flex-start', padding: espacio.l, gap: espacio.xl },
  marcoImagen: {
    aspectRatio: 1,
    maxHeight: 520,
    alignSelf: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    overflow: 'hidden',
  },
  info: { padding: espacio.l, gap: espacio.xs },
  infoLado: { flex: 1, padding: 0 },
  categoria: { color: colores.primario, fontWeight: '700', textTransform: 'uppercase' },
  nombre: { fontSize: 24, fontWeight: '800', color: colores.texto },
  precio: { fontSize: 22, fontWeight: '800', color: colores.texto, marginTop: espacio.xs },
  stock: { color: colores.exito, fontWeight: '600' },
  agotado: { color: '#DC2626' },
  subtitulo: { fontSize: 17, fontWeight: '700', color: colores.texto, marginTop: espacio.l },
  descripcion: { fontSize: 15, lineHeight: 22, color: colores.texto },
  caracteristica: { flexDirection: 'row', alignItems: 'center', gap: espacio.s, marginTop: 2 },
  textoCaracteristica: { fontSize: 15, color: colores.texto, flexShrink: 1 },
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
