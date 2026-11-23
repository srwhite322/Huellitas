import { useEffect, useRef } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import type { NombreIcono, PistaAudio } from '@/data/tipos';
import { colores, espacio, formatearTiempo, radio } from '@/theme';

interface Props {
  pista: PistaAudio;
  /** Si es true, empieza a sonar en cuanto la pista termine de cargar. */
  autoIniciar: boolean;
  onAutoIniciado: () => void;
}

/**
 * Reproductor de audio sencillo: Iniciar, Pausar y Detener.
 *
 * Ciclo de vida: `useAudioPlayer` crea el reproductor nativo al montar y lo
 * libera solo al desmontar. La pantalla padre lo monta únicamente mientras la
 * pestaña está visible y la app en primer plano, y usa `key={pista.id}` para
 * que al cambiar de pista se libere el reproductor anterior.
 */
export function ReproductorAudio({ pista, autoIniciar, onAutoIniciado }: Props) {
  const player = useAudioPlayer(pista.archivo, { updateInterval: 250 });
  const estado = useAudioPlayerStatus(player);
  const autoIniciado = useRef(false);

  // Inicio automático al elegir una pista (solo una vez).
  useEffect(() => {
    if (autoIniciar && estado.isLoaded && !autoIniciado.current) {
      autoIniciado.current = true;
      player.play();
      onAutoIniciado();
    }
  }, [autoIniciar, estado.isLoaded, player, onAutoIniciado]);

  // Al terminar la pista, volvemos al inicio para poder reproducirla de nuevo.
  useEffect(() => {
    if (estado.didJustFinish) {
      player.pause();
      player.seekTo(0);
    }
  }, [estado.didJustFinish, player]);

  const iniciar = () => {
    if (estado.duration > 0 && estado.currentTime >= estado.duration - 0.25) {
      player.seekTo(0);
    }
    player.play();
  };
  const pausar = () => player.pause();
  const detener = () => {
    player.pause();
    player.seekTo(0);
  };

  const progreso = estado.duration > 0 ? Math.min(estado.currentTime / estado.duration, 1) : 0;

  return (
    <View style={styles.panel}>
      <View style={styles.cabecera}>
        <View style={styles.icono}>
          <Ionicons name={pista.icono} size={22} color={colores.primario} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo} numberOfLines={1}>
            {pista.titulo}
          </Text>
          <Text style={styles.subtitulo}>
            {!estado.isLoaded ? 'Cargando…' : estado.playing ? 'Reproduciendo' : 'En pausa'}
          </Text>
        </View>
        {!estado.isLoaded && <ActivityIndicator color={colores.primario} />}
      </View>

      <View style={styles.barra}>
        <View style={[styles.relleno, { width: `${progreso * 100}%` }]} />
      </View>
      <View style={styles.tiempos}>
        <Text style={styles.tiempo}>{formatearTiempo(estado.currentTime)}</Text>
        <Text style={styles.tiempo}>{formatearTiempo(estado.duration)}</Text>
      </View>

      <View style={styles.controles}>
        <Boton icono="play" texto="Iniciar" onPress={iniciar} activo={!estado.playing} deshabilitado={!estado.isLoaded} />
        <Boton icono="pause" texto="Pausar" onPress={pausar} activo={estado.playing} deshabilitado={!estado.playing} />
        <Boton
          icono="stop"
          texto="Detener"
          onPress={detener}
          activo={false}
          deshabilitado={!estado.isLoaded || (!estado.playing && estado.currentTime === 0)}
        />
      </View>
    </View>
  );
}

function Boton({
  icono,
  texto,
  onPress,
  activo,
  deshabilitado,
}: {
  icono: NombreIcono;
  texto: string;
  onPress: () => void;
  activo: boolean;
  deshabilitado: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        styles.boton,
        activo && styles.botonActivo,
        deshabilitado && styles.botonDeshabilitado,
        pressed && { opacity: 0.8 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={texto}
      accessibilityState={{ disabled: deshabilitado }}
    >
      <Ionicons name={icono} size={22} color={activo ? '#fff' : colores.texto} />
      <Text style={[styles.textoBoton, activo && { color: '#fff' }]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    padding: espacio.l,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  cabecera: { flexDirection: 'row', alignItems: 'center', gap: espacio.m },
  icono: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colores.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: 16, fontWeight: '700', color: colores.texto },
  subtitulo: { fontSize: 13, color: colores.textoSuave },
  barra: { height: 6, borderRadius: 3, backgroundColor: colores.borde, marginTop: espacio.l, overflow: 'hidden' },
  relleno: { height: '100%', backgroundColor: colores.primario },
  tiempos: { flexDirection: 'row', justifyContent: 'space-between', marginTop: espacio.xs },
  tiempo: { fontSize: 12, color: colores.textoSuave, fontVariant: ['tabular-nums'] },
  controles: { flexDirection: 'row', gap: espacio.s, marginTop: espacio.m },
  boton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: espacio.m,
    borderRadius: radio.m,
    backgroundColor: colores.fondo,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  botonActivo: { backgroundColor: colores.primario, borderColor: colores.primario },
  botonDeshabilitado: { opacity: 0.45 },
  textoBoton: { fontWeight: '700', color: colores.texto },
});
