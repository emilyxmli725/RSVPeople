import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const COLORS = [
  "#9BD4CB",
  "#a25afd",
  "#ff5e7e",
  "#88ff5a",
  "#fcff42",
  "#ffa62d",
  "#ff36ff",
];

const SCALAR = 2; 

export function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // One "pls" shape per color
    const shapes = COLORS.map((color) =>
      confetti.shapeFromText({
        text: "pls",
        scalar: SCALAR,
        color,
        fontFamily: "sans-serif",
      })
    );

    const drop = (y: number) => {
      myConfetti({
        particleCount: 1,
        angle: 270,
        spread: 30,
        startVelocity: 4,
        gravity: 0.4,
        ticks: 800,
        scalar: SCALAR,
        shapes: [shapes[Math.floor(Math.random() * shapes.length)]],
        origin: { x: Math.random(), y },
      });
    };

    for (let i = 0; i < 30; i++) {
      drop(Math.random());
    }

    const interval = window.setInterval(() => drop(-0.05), 90);

    return () => {
      window.clearInterval(interval);
      myConfetti.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}