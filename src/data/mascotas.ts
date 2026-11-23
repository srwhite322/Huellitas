import type { Mascota } from './tipos';

/**
 * Fotos y videos de Pexels (Licencia Pexels: uso libre, sin atribución obligatoria).
 * Los videos son MP4 H.264 de 720p (4–7 MB) que se reproducen en streaming
 * dentro de la app: no se descargan completos antes de empezar.
 */
const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

const FOTO = {
  perro1: pexels(35445396),
  perro2: pexels(16234669),
  gato1: pexels(39368808),
  gatos: pexels(33417510),
  hamster: pexels(4520481),
  conejo: pexels(6845996),
  periquitos: 'https://images.pexels.com/videos/854870/free-video-854870.jpg',
  pez: pexels(37431486),
};

const VIDEO = {
  perros: 'https://videos.pexels.com/video-files/854179/854179-hd_1280_720_25fps.mp4',
  gato: 'https://videos.pexels.com/video-files/16276559/16276559-hd_1280_720_24fps.mp4',
  hamster: 'https://videos.pexels.com/video-files/991770/991770-hd_1280_720_25fps.mp4',
  conejos: 'https://videos.pexels.com/video-files/7345168/7345168-hd_1280_720_30fps.mp4',
  periquitos: 'https://videos.pexels.com/video-files/854870/854870-hd_1280_720_25fps.mp4',
};

export const MASCOTAS: Mascota[] = [
  {
    id: 'm1',
    nombre: 'Toby',
    especie: 'Perro',
    edad: '6 meses',
    estado: 'Adopción',
    foto: FOTO.perro1,
    video: VIDEO.perros,
    descripcion:
      'Toby es un cachorro alegre y juguetón al que le encanta correr y jugar con otros perros (¡míralo en el video!). Está vacunado y desparasitado. Se lleva muy bien con niños.',
  },
  {
    id: 'm2',
    nombre: 'Luna',
    especie: 'Gato',
    edad: '4 meses',
    estado: 'Adopción',
    foto: FOTO.gato1,
    video: VIDEO.gato,
    descripcion:
      'Luna es una gatita curiosa y cariñosa. Le encanta perseguir ovillos de lana y dormir al sol. Ya usa el arenero sin problema y tiene sus primeras vacunas.',
  },
  {
    id: 'm3',
    nombre: 'Canela',
    especie: 'Hámster',
    edad: '4 meses',
    estado: 'Venta',
    precio: 35000,
    foto: FOTO.hamster,
    video: VIDEO.hamster,
    descripcion:
      'Canela es un hámster muy activo, sobre todo por las noches. Ideal para quienes buscan una mascota pequeña y fácil de cuidar. Se entrega con guía de cuidados.',
  },
  {
    id: 'm4',
    nombre: 'Copito y Nube',
    especie: 'Conejo',
    edad: '8 meses',
    estado: 'Venta',
    precio: 220000,
    foto: FOTO.conejo,
    video: VIDEO.conejos,
    descripcion:
      'Copito y Nube son dos conejos hermanos, dóciles y de pelaje suave. Se venden juntos para que sigan haciéndose compañía. Se alimentan de heno, verduras frescas y pellets.',
  },
  {
    id: 'm5',
    nombre: 'Kiwi y Lima',
    especie: 'Ave',
    edad: '1 año',
    estado: 'Venta',
    precio: 90000,
    foto: FOTO.periquitos,
    video: VIDEO.periquitos,
    descripcion:
      'Pareja de periquitos australianos muy sociables que cantan todas las mañanas. Se entregan con su jaula y comedero. Les encanta la compañía y aprender sonidos nuevos.',
  },
  {
    id: 'm6',
    nombre: 'Max',
    especie: 'Perro',
    edad: '3 meses',
    estado: 'Venta',
    precio: 650000,
    foto: FOTO.perro2,
    descripcion:
      'Max es un cachorro labrador tierno y lleno de energía. Tiene sus primeras vacunas y desparasitación al día. Necesita una familia con tiempo para jugar y entrenarlo.',
  },
  {
    id: 'm7',
    nombre: 'Michi y Mía',
    especie: 'Gato',
    edad: '3 meses',
    estado: 'Adopción',
    foto: FOTO.gatos,
    descripcion:
      'Michi (atigrado) y Mía (siamesa) son inseparables. Buscamos un hogar que pueda adoptarlas juntas. Son tranquilas, juguetonas y perfectas para apartamento.',
  },
  {
    id: 'm8',
    nombre: 'Nemo',
    especie: 'Pez',
    edad: '6 meses',
    estado: 'Venta',
    precio: 25000,
    foto: FOTO.pez,
    descripcion:
      'Nemo es un pez dorado de colores vivos, resistente e ideal para principiantes. Vive en agua fría o templada (18–24 °C). Te asesoramos para montar tu primer acuario.',
  },
];
