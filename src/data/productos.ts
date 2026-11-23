import type { Producto } from './tipos';

/** Foto de Pexels por ID (Licencia Pexels: uso libre, sin atribución obligatoria). */
const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

/** URLs base de las imágenes (sin parámetros de tamaño; ver utils/imagenes.ts). */
const IMG = {
  comidaPerro: pexels(8434633),
  comidaGato: pexels(17514361),
  snacks: pexels(34952073),
  pelota: pexels(32635830),
  juguetePerro: pexels(18478445),
  jugueteGato: pexels(26706493),
  collar: pexels(17215310),
  cama: pexels(31493301),
  transportadora: pexels(35651203),
  shampoo: pexels(8343341),
  cepillo: pexels(8498543),
  bano: pexels(6222967),
};

export const PRODUCTOS: Producto[] = [
  {
    id: 'p1',
    nombre: 'Concentrado Premium Perro Adulto 3 kg',
    categoria: 'Comida',
    precio: 89900,
    imagen: IMG.comidaPerro,
    descripcionCorta: 'Alimento balanceado con pollo y arroz.',
    descripcion:
      'Alimento completo y balanceado para perros adultos de razas medianas y grandes. Elaborado con pollo como primer ingrediente, arroz y vegetales. Aporta proteínas de alta calidad para mantener músculos fuertes, omega 3 y 6 para un pelaje brillante y fibra natural que favorece la digestión.',
    caracteristicas: ['Peso: 3 kg', 'Sabor: pollo y arroz', 'Edad: adultos de 1 a 7 años', 'Sin colorantes artificiales'],
    stock: 24,
  },
  {
    id: 'p2',
    nombre: 'Alimento para Gato Salmón 1,5 kg',
    categoria: 'Comida',
    precio: 62500,
    imagen: IMG.comidaGato,
    descripcionCorta: 'Croquetas con salmón para gatos adultos.',
    descripcion:
      'Croquetas crujientes con salmón real, formuladas para gatos adultos de interior. Contienen taurina para la salud del corazón y la visión, y una fórmula que ayuda a controlar las bolas de pelo y mantener el peso ideal.',
    caracteristicas: ['Peso: 1,5 kg', 'Sabor: salmón', 'Con taurina', 'Control de bolas de pelo'],
    stock: 18,
  },
  {
    id: 'p3',
    nombre: 'Snacks Dentales x 12 unidades',
    categoria: 'Comida',
    precio: 24900,
    imagen: IMG.snacks,
    descripcionCorta: 'Premios que ayudan a limpiar los dientes.',
    descripcion:
      'Premios masticables con textura especial que reducen la acumulación de sarro y refrescan el aliento. Ideales para recompensar el buen comportamiento durante el entrenamiento.',
    caracteristicas: ['12 unidades', 'Para perros de 10 a 25 kg', 'Reduce el sarro', 'Sabor a menta'],
    stock: 40,
  },
  {
    id: 'p4',
    nombre: 'Pelota de Caucho Resistente',
    categoria: 'Juguetes',
    precio: 18500,
    imagen: IMG.pelota,
    descripcionCorta: 'Pelota que rebota, flota y resiste mordidas.',
    descripcion:
      'Pelota de caucho natural no tóxico, resistente a mordidas fuertes. Rebota de forma irregular para hacer el juego más divertido y flota en el agua, perfecta para jugar en la piscina o en la playa.',
    caracteristicas: ['Diámetro: 7 cm', 'Caucho natural', 'Flota en el agua', 'Apta para lavavajillas'],
    stock: 35,
  },
  {
    id: 'p5',
    nombre: 'Juguete de Cuerda para Perro',
    categoria: 'Juguetes',
    precio: 21900,
    imagen: IMG.juguetePerro,
    descripcionCorta: 'Cuerda de algodón para jalar y morder.',
    descripcion:
      'Juguete de cuerda trenzada de algodón, ideal para juegos de tira y afloja. Ayuda a limpiar los dientes mientras tu perro muerde y libera energía de forma segura.',
    caracteristicas: ['Largo: 35 cm', '100 % algodón', 'Limpieza dental', 'Para razas medianas'],
    stock: 15,
  },
  {
    id: 'p6',
    nombre: 'Varita con Pelota Colgante para Gato',
    categoria: 'Juguetes',
    precio: 15900,
    imagen: IMG.jugueteGato,
    descripcionCorta: 'Estimula el instinto cazador de tu gato.',
    descripcion:
      'Varita flexible con pelota colgante de cuerda y cascabel. Estimula el instinto de caza, promueve el ejercicio y fortalece el vínculo entre tú y tu gato durante el juego.',
    caracteristicas: ['Largo de la varita: 60 cm', 'Cuerda elástica', 'Incluye cascabel', 'Pelota de repuesto'],
    stock: 22,
  },
  {
    id: 'p7',
    nombre: 'Collar y Correa Ajustables',
    categoria: 'Accesorios',
    precio: 45900,
    imagen: IMG.collar,
    descripcionCorta: 'Juego de collar y correa de nailon reforzado.',
    descripcion:
      'Collar ajustable y correa de 1,5 m en nailon reforzado con costuras dobles y hebilla de liberación rápida. Incluye argolla metálica para la placa de identificación y detalles reflectivos para paseos nocturnos.',
    caracteristicas: ['Talla M (30–45 cm)', 'Correa de 1,5 m', 'Detalles reflectivos', 'Hebilla de liberación rápida'],
    stock: 12,
  },
  {
    id: 'p8',
    nombre: 'Cama Acolchada Lavable',
    categoria: 'Accesorios',
    precio: 129900,
    imagen: IMG.cama,
    descripcionCorta: 'Cama suave con bordes elevados.',
    descripcion:
      'Cama redonda con relleno de fibra siliconada y bordes elevados que dan sensación de seguridad. La funda es removible y lavable a máquina. Base antideslizante.',
    caracteristicas: ['Diámetro: 70 cm', 'Funda lavable', 'Base antideslizante', 'Para perros y gatos'],
    stock: 6,
  },
  {
    id: 'p9',
    nombre: 'Bolso Transportador para Viaje',
    categoria: 'Accesorios',
    precio: 159900,
    imagen: IMG.transportadora,
    descripcionCorta: 'Bolso transportador ventilado y seguro.',
    descripcion:
      'Bolso transportador de tela resistente con paneles de malla para ventilación, base acolchada removible y correa de hombro ajustable. Cumple con los requisitos de la mayoría de aerolíneas para mascotas pequeñas.',
    caracteristicas: ['Para mascotas de hasta 6 kg', 'Malla de ventilación', 'Base acolchada', 'Apto para avión'],
    stock: 0,
  },
  {
    id: 'p10',
    nombre: 'Shampoo Hipoalergénico 500 ml',
    categoria: 'Higiene',
    precio: 32900,
    imagen: IMG.shampoo,
    descripcionCorta: 'Limpieza suave para pieles sensibles.',
    descripcion:
      'Shampoo con avena y aloe vera para perros y gatos con piel sensible. pH balanceado, sin parabenos ni sulfatos. Deja el pelaje suave, brillante y con un aroma fresco y duradero.',
    caracteristicas: ['500 ml', 'Con avena y aloe vera', 'Sin parabenos', 'pH balanceado'],
    stock: 30,
  },
  {
    id: 'p11',
    nombre: 'Cepillo Deslanador',
    categoria: 'Higiene',
    precio: 38500,
    imagen: IMG.cepillo,
    descripcionCorta: 'Retira el pelo muerto sin lastimar.',
    descripcion:
      'Cepillo con cerdas de acero inoxidable de punta redondeada que retira hasta el 90 % del pelo muerto. Botón de autolimpieza para retirar el pelo acumulado con un solo clic.',
    caracteristicas: ['Cerdas de acero inoxidable', 'Botón de autolimpieza', 'Mango antideslizante', 'Para pelo corto y largo'],
    stock: 14,
  },
  {
    id: 'p12',
    nombre: 'Kit de Baño y Toalla de Microfibra',
    categoria: 'Higiene',
    precio: 54900,
    imagen: IMG.bano,
    descripcionCorta: 'Todo lo necesario para el baño en casa.',
    descripcion:
      'Kit que incluye guante de baño masajeador, toalla de microfibra superabsorbente y peine de dientes finos. Hace del baño una experiencia más rápida y cómoda para tu mascota.',
    caracteristicas: ['Guante masajeador', 'Toalla 60 x 90 cm', 'Peine de dientes finos', 'Secado rápido'],
    stock: 9,
  },
];
