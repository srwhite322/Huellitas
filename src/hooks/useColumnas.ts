import { useWindowDimensions } from 'react-native';

/**
 * Diseño responsivo: calcula cuántas columnas caben según el ancho real
 * de la pantalla. Se recalcula al girar el teléfono o en tabletas.
 *  - Teléfono vertical  -> 2 columnas
 *  - Teléfono horizontal -> 3-4 columnas
 *  - Tableta            -> 4-6 columnas
 */
export function useColumnas(anchoMinimoTarjeta = 170, margen = 12) {
  const { width, height } = useWindowDimensions();
  const columnas = Math.max(2, Math.floor((width - margen) / (anchoMinimoTarjeta + margen)));
  const anchoTarjeta = (width - margen * (columnas + 1)) / columnas;
  return { columnas, anchoTarjeta, margen, esHorizontal: width > height, width, height };
}
