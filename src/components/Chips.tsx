import { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colores, espacio, radio } from '@/theme';

interface Props<T extends string> {
  opciones: readonly T[];
  seleccion: T;
  onCambiar: (valor: T) => void;
}

function ChipsBase<T extends string>({ opciones, seleccion, onCambiar }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.fila}
      style={styles.scroll}
    >
      {opciones.map((op) => {
        const activo = op === seleccion;
        return (
          <Pressable
            key={op}
            onPress={() => onCambiar(op)}
            style={[styles.chip, activo && styles.chipActivo]}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
          >
            <Text style={[styles.texto, activo && styles.textoActivo]}>{op}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export const Chips = memo(ChipsBase) as typeof ChipsBase;

const styles = StyleSheet.create({
  // flexShrink: 0 evita que la lista de abajo comprima la barra y recorte el texto.
  scroll: { flexGrow: 0, flexShrink: 0 },
  fila: { paddingHorizontal: espacio.m, paddingVertical: espacio.s, gap: espacio.s },
  chip: {
    paddingHorizontal: espacio.l,
    paddingVertical: espacio.s,
    borderRadius: radio.pill,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  chipActivo: { backgroundColor: colores.primario, borderColor: colores.primario },
  texto: { color: colores.texto, fontWeight: '600' },
  textoActivo: { color: '#fff' },
});
