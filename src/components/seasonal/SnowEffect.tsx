"use client";

import { useEffect, useState } from "react";

// ⚠️ CONFIGURAÇÃO FÁCIL: Altere para false para desativar a animação de neve
const SNOW_ENABLED = true;

interface Snowflake {
  id: number;
  x: number;
  size: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
}

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    if (!SNOW_ENABLED) return;

    // Gera flocos de neve com propriedades aleatórias
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // posição horizontal em %
      size: Math.random() * 4 + 2, // tamanho entre 2px e 6px
      animationDuration: Math.random() * 10 + 10, // duração entre 10s e 20s
      animationDelay: Math.random() * 10, // delay até 10s
      opacity: Math.random() * 0.6 + 0.4, // opacidade entre 0.4 e 1
    }));

    setSnowflakes(flakes);
  }, []);

  // Se desabilitado, não renderiza nada
  if (!SNOW_ENABLED || snowflakes.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
