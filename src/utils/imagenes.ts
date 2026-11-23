/**
 * Gestión de memoria de imágenes:
 * en lugar de descargar la foto original (a veces de 4000px y varios MB),
 * le pedimos al CDN una versión del ancho que realmente se va a mostrar.
 * Glide (dentro de expo-image) recibe así un bitmap pequeño que ocupa
 * mucha menos RAM y se decodifica más rápido.
 */
export function urlImagen(base: string, anchoPx: number): string {
  // El llamador pasa el ancho en píxeles físicos (dp * PixelRatio). Tope de 1600px.
  const ancho = Math.min(Math.round(anchoPx), 1600);
  const [sinQuery] = base.split('?');

  if (sinQuery.includes('images.unsplash.com')) {
    return `${sinQuery}?w=${ancho}&q=70&auto=format&fit=crop`;
  }
  if (sinQuery.includes('images.pexels.com')) {
    return `${sinQuery}?auto=compress&cs=tinysrgb&w=${ancho}`;
  }
  if (sinQuery.includes('cdn.pixabay.com')) {
    return base; // Pixabay no admite redimensionado por parámetros.
  }
  return base;
}
