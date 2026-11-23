import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEvent, useEventListener } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { colores, espacio, formatearTiempo, radio } from '@/theme';

interface Props {
  uri: string;
  /** Devuelve el segundo desde el que se retoma (si el reproductor se liberó antes). */
  obtenerPosicion: () => number;
  onPosicion: (segundos: number) => void;
  onPantallaCompleta: (activa: boolean) => void;
  ancho: number;
}

/**
 * Reproductor de video integrado (expo-video = ExoPlayer en Android, AVPlayer en iOS).
 *
 * Ciclo de vida: `useVideoPlayer` crea el reproductor nativo al montar el
 * componente y lo LIBERA automáticamente al desmontarlo. La pantalla padre solo
 * monta este componente mientras está enfocada y la app en primer plano.
 */
export function ReproductorVideo({ uri, obtenerPosicion, onPosicion, onPantallaCompleta, ancho }: Props) {
  const posicionRestaurada = useRef(false);
  const [tiempo, setTiempo] = useState(0);

  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
    p.timeUpdateEventInterval = 0.5; // emite 'timeUpdate' cada medio segundo
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { status, error } = useEvent(player, 'statusChange', { status: player.status });

  // Cuando el video está listo, retomamos donde iba (si se había liberado al salir).
  useEventListener(player, 'statusChange', ({ status: nuevo }) => {
    if (nuevo === 'readyToPlay' && !posicionRestaurada.current) {
      posicionRestaurada.current = true;
      const guardada = obtenerPosicion();
      if (guardada > 0) player.seekBy(guardada);
    }
  });

  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    setTiempo(currentTime);
    onPosicion(currentTime);
  });

  const duracion = player.duration || 0;
  const alFinal = duracion > 0 && tiempo >= duracion - 0.5;
  const progreso = duracion > 0 ? Math.min(tiempo / duracion, 1) : 0;

  const alternar = () => {
    if (isPlaying) {
      player.pause();
    } else if (alFinal) {
      player.replay();
    } else {
      player.play();
    }
  };

  return (
    <View style={{ width: ancho }}>
      {/* Marco 16:9 con fondo negro + contentFit="contain": el video conserva su
          proporción original (vertical u horizontal) y nunca se deforma. */}
      <View style={styles.marco}>
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="contain"
          nativeControls
          fullscreenOptions={{ enable: true }}
          allowsPictureInPicture={false}
          onFullscreenEnter={() => onPantallaCompleta(true)}
          onFullscreenExit={() => onPantallaCompleta(false)}
        />
        {status === 'loading' && (
          <View style={styles.capa} pointerEvents="none">
            <ActivityIndicator color="#fff" size="large" />
          </View>
        )}
        {status === 'error' && (
          <View style={styles.capa}>
            <Ionicons name="alert-circle" size={32} color="#fff" />
            <Text style={styles.textoError}>No se pudo cargar el video.{'\n'}Revisa tu conexión.</Text>
            {error?.message ? <Text style={styles.detalleError}>{error.message}</Text> : null}
          </View>
        )}
      </View>

      {/* Barra de progreso */}
      <View style={styles.barra}>
        <View style={[styles.barraRelleno, { width: `${progreso * 100}%` }]} />
      </View>
      <View style={styles.tiempos}>
        <Text style={styles.tiempo}>{formatearTiempo(tiempo)}</Text>
        <Text style={styles.tiempo}>{formatearTiempo(duracion)}</Text>
      </View>

      {/* Controles propios: retroceder, reproducir/pausar, adelantar */}
      <View style={styles.controles}>
        <BotonControl icono="play-back" etiqueta="-10 s" onPress={() => player.seekBy(-10)} />
        <Pressable
          onPress={alternar}
          disabled={status !== 'readyToPlay'}
          style={({ pressed }) => [styles.botonPrincipal, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          <Ionicons
            name={isPlaying ? 'pause' : alFinal ? 'reload' : 'play'}
            size={30}
            color="#fff"
            style={!isPlaying && !alFinal ? { marginLeft: 3 } : undefined}
          />
        </Pressable>
        <BotonControl icono="play-forward" etiqueta="+10 s" onPress={() => player.seekBy(10)} />
      </View>
    </View>
  );
}

function BotonControl({
  icono,
  etiqueta,
  onPress,
}: {
  icono: 'play-back' | 'play-forward';
  etiqueta: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.botonSecundario, pressed && { opacity: 0.7 }]}
      accessibilityRole="button"
      accessibilityLabel={etiqueta}
    >
      <Ionicons name={icono} size={22} color={colores.texto} />
      <Text style={styles.etiqueta}>{etiqueta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  marco: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colores.negro,
    borderRadius: radio.m,
    overflow: 'hidden',
  },
  capa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: espacio.l,
  },
  textoError: { color: '#fff', textAlign: 'center', marginTop: espacio.s, fontWeight: '600' },
  detalleError: { color: '#ddd', textAlign: 'center', fontSize: 11, marginTop: espacio.xs },
  barra: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colores.borde,
    marginTop: espacio.m,
    overflow: 'hidden',
  },
  barraRelleno: { height: '100%', backgroundColor: colores.primario },
  tiempos: { flexDirection: 'row', justifyContent: 'space-between', marginTop: espacio.xs },
  tiempo: { fontSize: 12, color: colores.textoSuave, fontVariant: ['tabular-nums'] },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espacio.xl,
    marginTop: espacio.s,
  },
  botonPrincipal: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonSecundario: { alignItems: 'center', padding: espacio.s },
  etiqueta: { fontSize: 12, color: colores.textoSuave, marginTop: 2 },
});
