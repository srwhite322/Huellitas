import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useIsFocused } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ReproductorAudio } from '@/components/ReproductorAudio';
import { PISTAS } from '@/data/audios';
import { useAppActiva } from '@/hooks/useAppActiva';
import { colores, espacio, radio } from '@/theme';

export default function ConsejosScreen() {
  const [seleccionId, setSeleccionId] = useState<string | null>(null);
  const [autoIniciar, setAutoIniciar] = useState(false);
  const { width, height } = useWindowDimensions();
  const dosColumnas = width > height || width >= 700;

  // --- Ciclo de vida multimedia ---
  // Las pestañas NO se desmontan al cambiar de pestaña, por eso no basta con
  // el desmontaje de la pantalla: el reproductor se monta solo si la pestaña
  // está enfocada y la app en primer plano. Si cualquiera de las dos cambia,
  // el componente se desmonta, el audio se detiene y se libera la memoria.
  const enFoco = useIsFocused();
  const appActiva = useAppActiva();
  const reproductorMontado = enFoco && appActiva;

  const pista = PISTAS.find((p) => p.id === seleccionId) ?? null;

  const elegir = (id: string) => {
    if (id === seleccionId) return;
    setSeleccionId(id);
    setAutoIniciar(true);
  };

  const autoIniciado = useCallback(() => setAutoIniciar(false), []);

  const panel = pista ? (
    reproductorMontado ? (
      <ReproductorAudio key={pista.id} pista={pista} autoIniciar={autoIniciar} onAutoIniciado={autoIniciado} />
    ) : null
  ) : (
    <View style={styles.aviso}>
      <Ionicons name="musical-notes" size={28} color={colores.textoSuave} />
      <Text style={styles.textoAviso}>Elige una pista para escuchar los consejos.</Text>
    </View>
  );

  return (
    <View style={[styles.pantalla, dosColumnas && styles.fila]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.lista}>
        <Text style={styles.intro}>
          Escucha recomendaciones de nuestros veterinarios. El audio se detiene y se libera
          automáticamente si cambias de pestaña o sales de la app.
        </Text>
        {PISTAS.map((p) => {
          const activa = p.id === seleccionId;
          return (
            <Pressable
              key={p.id}
              onPress={() => elegir(p.id)}
              style={({ pressed }) => [styles.tarjeta, activa && styles.tarjetaActiva, pressed && { opacity: 0.85 }]}
              accessibilityRole="button"
              accessibilityState={{ selected: activa }}
            >
              <View style={[styles.icono, activa && { backgroundColor: colores.primario }]}>
                <Ionicons name={p.icono} size={22} color={activa ? '#fff' : colores.primario} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.titulo}>{p.titulo}</Text>
                <Text style={styles.resumen}>{p.resumen}</Text>
              </View>
              <Ionicons
                name={activa ? 'volume-high' : 'play-circle'}
                size={28}
                color={activa ? colores.primario : colores.textoSuave}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.zonaPanel, dosColumnas && styles.zonaPanelLado]}>{panel}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  fila: { flexDirection: 'row' },
  lista: { padding: espacio.l, gap: espacio.m },
  intro: { color: colores.textoSuave, lineHeight: 20, marginBottom: espacio.xs },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    padding: espacio.l,
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  tarjetaActiva: { borderColor: colores.primario, backgroundColor: '#FFF7ED' },
  icono: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colores.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: 16, fontWeight: '700', color: colores.texto },
  resumen: { fontSize: 13, color: colores.textoSuave, marginTop: 2 },
  zonaPanel: { padding: espacio.l, paddingTop: 0 },
  zonaPanelLado: { width: '45%', maxWidth: 460, paddingTop: espacio.l, justifyContent: 'center' },
  aviso: {
    alignItems: 'center',
    gap: espacio.s,
    padding: espacio.l,
    borderRadius: radio.l,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colores.borde,
  },
  textoAviso: { color: colores.textoSuave, textAlign: 'center' },
});
