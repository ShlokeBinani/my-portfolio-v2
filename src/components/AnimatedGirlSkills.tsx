import React from "react";
import { useSpring, animated } from "@react-spring/web";

// Example: Animate the right arm to wave
const AnimatedGirlSVG: React.FC<{ wave?: boolean }> = ({ wave = false }) => {
  // Animate arm rotation for "waving"
  const { armRotate } = useSpring({
    armRotate: wave ? 25 : 0,
    config: { mass: 1, tension: 120, friction: 14 },
    loop: wave ? { reverse: true } : false,
  });

  return (
    <svg
      width="180"
      height="240"
      viewBox="0 0 34.842 34.842"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Head */}
      <ellipse cx="17" cy="7" rx="5" ry="5.5" stroke="#6366f1" strokeWidth="2" />
      {/* Body */}
      <rect x="13" y="12" width="8" height="10" rx="4" stroke="#06b6d4" strokeWidth="2" fill="none" />
      {/* Left Arm */}
      <path d="M13 15 Q7 18 9 23" stroke="#06b6d4" strokeWidth="2" fill="none" />
      {/* Right Arm (animated group) */}
      <animated.g style={{ transformOrigin: "21px 15px", transformBox: "fill-box", rotate: armRotate }}>
        <path d="M21 15 Q27 10 28 5" stroke="#06b6d4" strokeWidth="2" fill="none" />
      </animated.g>
      {/* Legs */}
      <path d="M17 22 Q15 30 13 36" stroke="#6366f1" strokeWidth="2" fill="none" />
      <path d="M17 22 Q19 30 21 36" stroke="#6366f1" strokeWidth="2" fill="none" />
      {/* Eyes and smile */}
      <ellipse cx="15.5" cy="6.5" rx="0.5" ry="1" fill="#6366f1" />
      <ellipse cx="18.5" cy="6.5" rx="0.5" ry="1" fill="#6366f1" />
      <path d="M15 9 Q17 11 19 9" stroke="#6366f1" strokeWidth="1" fill="none" />
    </svg>
  );
};

export default AnimatedGirlSVG;
