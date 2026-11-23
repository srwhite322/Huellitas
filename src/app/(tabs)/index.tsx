import { useCallback, useMemo, useState } from 'react';
import { FlatList, PixelRatio, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Chips } from '@/components/Chips';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { PRODUCTOS } from '@/data/productos';
import type { Categoria, Producto } from '@/data/tipos';
import { useColumnas } from '@/hooks/useColumnas';
import { colores, espacio } from '@/theme';
import { urlImagen } from '@/utils/imagenes';

const FILTROS = ['Todos', 'Comida', 'Juguetes', 'Accesorios', 'Higiene'] as const;
type Filtro = (typeof FILTROS)[number];

export default function CatalogoScreen() {
  const [filtro, setFiltro] = useState<Filtro>('Todos');
  const { columnas, anchoTarjeta, margen, width } = useColumnas();

  const productos = useMemo(
    () =>
      filtro === 'Todos' ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === (filtro as Categoria)),
    [filtro],
  );

  const abrirDetalle = useCallback(
    (p: Producto) => {
      // Precargamos la imagen grande mientras se abre la pantalla de detalle.
      Image.prefetch(urlImagen(p.imagen, Math.min(width, 700) * PixelRatio.get()), 'memory-disk');
      router.push({ pathname: '/producto/[id]', params: { id: p.id } });
    },
    [width],
  );

  const renderItem = useCallback(
    ({ item }: { item: Producto }) => (
      <TarjetaProducto producto={item} ancho={anchoTarjeta} onPress={abrirDetalle} />
    ),
    [anchoTarjeta, abrirDetalle],
  );

  return (
    <View style={styles.pantalla}>
      <Chips opciones={FILTROS} seleccion={filtro} onCambiar={setFiltro} />
      <FlatList
        // Cambiar numColumns en caliente no está permitido: el key fuerza un montaje nuevo al girar.
        key={`cols-${columnas}`}
        data={productos}
        numColumns={columnas}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: margen, paddingHorizontal: margen }}
        contentContainerStyle={{ gap: margen, paddingBottom: espacio.xl }}
        // Rendimiento: solo se mantienen montadas las filas cercanas a la pantalla.
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        ListHeaderComponent={
          <Text style={styles.resultado}>
            {productos.length} producto{productos.length === 1 ? '' : 's'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  resultado: { color: colores.textoSuave, paddingHorizontal: espacio.m, paddingTop: espacio.xs },
});
