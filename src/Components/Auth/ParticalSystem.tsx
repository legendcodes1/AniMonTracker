import { useState, useEffect } from "react";

const Particle = ({ delay = 0, color = "#ff6b6b", duration = 6 }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: 100 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition({ x: Math.random() * 100, y: -10 });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute w-0.5 h-0.5 opacity-60 rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}vh`,
        backgroundColor: color,
        animation: `float ${duration}s ${delay}s infinite ease-in-out`,
      }}
    />
  );
};



export default function ParticleSystem() {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.5}
          color={colors[i % colors.length]}
          duration={Math.random() * 3 + 4}
        />
      ))}
    </div>
  );
};
