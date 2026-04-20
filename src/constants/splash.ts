import { type Transition, type Variants } from "framer-motion";

export const planeVariants: Variants = {
  idle: {},
  fly: {
    x: [0, -15, 400],
    y: [0, 10, -350],
    rotate: [0, -10, 25],
    opacity: [1, 1, 1],
  },
};

export const planeTransition: Transition = {
  duration: 0.55,
  times: [0, 0.15, 1],
  ease: "easeIn",
};
