import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type NombreIcono = ComponentProps<typeof Ionicons>['name'];

export type Categoria = 'Comida' | 'Juguetes' | 'Accesorios' | 'Higiene';

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  imagen: string;
  descripcionCorta: string;
  descripcion: string;
  caracteristicas: string[];
  stock: number;
}

export type Especie = 'Perro' | 'Gato' | 'Hámster' | 'Conejo' | 'Ave' | 'Pez';

export interface Mascota {
  id: string;
  nombre: string;
  especie: Especie;
  edad: string;
  estado: 'Adopción' | 'Venta';
  precio?: number;
  foto: string;
  /** Video opcional: URL MP4 que se reproduce dentro de la app con ExoPlayer. */
  video?: string;
  descripcion: string;
}

export interface PistaAudio {
  id: string;
  titulo: string;
  especie: string;
  icono: NombreIcono;
  /** Recurso local empaquetado con require(). */
  archivo: number;
  resumen: string;
}
