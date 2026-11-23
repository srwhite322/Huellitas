export const colores = {
  primario: '#F97316',
  primarioSuave: '#FFEDD5',
  secundario: '#0EA5E9',
  fondo: '#F8FAFC',
  tarjeta: '#FFFFFF',
  texto: '#0F172A',
  textoSuave: '#64748B',
  borde: '#E2E8F0',
  exito: '#16A34A',
  placeholder: '#E2E8F0',
  negro: '#000000',
};

export const espacio = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };

export const radio = { s: 8, m: 12, l: 16, pill: 999 };

/** Formatea un precio en pesos colombianos: 45900 -> "$ 45.900" */
export function formatearPrecio(valor: number): string {
  const entero = Math.round(valor).toString();
  return '$ ' + entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Formatea segundos como m:ss */
export function formatearTiempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return '0:00';
  const total = Math.floor(segundos);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
