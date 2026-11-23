import type { PistaAudio } from './tipos';

/**
 * Pistas de voz con consejos de cuidado. Son archivos locales (assets/audio),
 * así funcionan sin internet. Puedes reemplazarlos por tus propias grabaciones
 * con el mismo nombre de archivo.
 */
export const PISTAS: PistaAudio[] = [
  {
    id: 'perros',
    titulo: 'Cómo cuidar a tu perro',
    especie: 'Perros',
    icono: 'paw',
    archivo: require('../../assets/audio/cuidado-perros.wav'),
    resumen: 'Alimentación, paseos diarios, vacunas e higiene.',
  },
  {
    id: 'gatos',
    titulo: 'Cómo cuidar a tu gato',
    especie: 'Gatos',
    icono: 'heart',
    archivo: require('../../assets/audio/cuidado-gatos.wav'),
    resumen: 'Arenero, rascador, juego y salud felina.',
  },
  {
    id: 'hamsteres',
    titulo: 'Cómo cuidar a tu hámster',
    especie: 'Hámsteres',
    icono: 'leaf',
    archivo: require('../../assets/audio/cuidado-hamsteres.wav'),
    resumen: 'Jaula, rueda, dieta y hábitos nocturnos.',
  },
  {
    id: 'peces',
    titulo: 'Cómo cuidar a tus peces',
    especie: 'Peces',
    icono: 'fish',
    archivo: require('../../assets/audio/cuidado-peces.wav'),
    resumen: 'Ciclo del acuario, cambios de agua y alimentación.',
  },
];
