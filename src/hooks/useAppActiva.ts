import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

/**
 * Devuelve `true` solo mientras la app está en primer plano.
 *
 * Los reproductores de audio y video se montan únicamente cuando
 * `useAppActiva() && useIsFocused()` es verdadero. Si el usuario sale
 * de la app (botón Home, llamada entrante, cambio de app), el componente
 * del reproductor se desmonta y expo-audio / expo-video liberan el
 * reproductor nativo (MediaPlayer/ExoPlayer) y su memoria.
 */
export function useAppActiva(): boolean {
  const [estado, setEstado] = useState<AppStateStatus>(
    (AppState.currentState as AppStateStatus | null) ?? 'active',
  );

  useEffect(() => {
    const sub = AppState.addEventListener('change', setEstado);
    return () => sub.remove();
  }, []);

  return estado === 'active';
}
