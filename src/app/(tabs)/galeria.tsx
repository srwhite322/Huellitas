import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Chips } from '@/components/Chips';
import { TarjetaMascota } from '@/components/TarjetaMascota';
import { MASCOTAS } from '@/data/mascotas';
import type { Mascota } from '@/data/tipos';
import { useColumnas } from '@/hooks/useColumnas';
import { colores, espacio } from '@/theme';

const FILTROS = ['Todas', 'Con video', 'Perros', 'Gatos', 'Otras'] as const;
type Filtro = (typeof FILTROS)[number];

function coincide(m: Mascota, filtro: Filtro): boolean {
  switch (filtro) {
    case 'Con video':
      return Boolean(m.video);
    case 'Perros':
      return m.especie === 'Perro';
    case 'Gatos':
      return m.especie === 'Gato';
    case 'Otras':
      return m.especie !== 'Perro' && m.especie !== 'Gato';
    default:
      return true;
  }
}

export default function GaleriaScreen() {
  const [filtro, setFiltro] = useState<Filtro>('Todas');
  const { columnas, anchoTarjeta, margen } = useColumnas(160);

  const mascotas = useMemo(() => MASCOTAS.filter((m) => coincide(m, filtro)), [filtro]);

  const abrir = useCallback((m: Mascota) => {
    router.push({ pathname: '/mascota/[id]', params: { id: m.id } });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Mascota }) => <TarjetaMascota mascota={item} ancho={anchoTarjeta} onPress={abrir} />,
    [anchoTarjeta, abrir],
  );

  return (
    <View style={styles.pantalla}>
      <Chips opciones={FILTROS} seleccion={filtro} onCambiar={setFiltro} />
      <FlatList
        key={`cols-${columnas}`}
        data={mascotas}
        numColumns={columnas}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: margen, paddingHorizontal: margen }}
        contentContainerStyle={{ gap: margen, paddingBottom: espacio.xl }}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
});
