import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AirplaneIcon from "@/assets/icons/icon_airplane_fill.svg?react";
import { planeTransition, planeVariants } from "@/constants/splash";

const SplashPage = () => {
  const navigate = useNavigate();
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlying(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="bg-splash relative flex h-203 w-93.75 flex-col items-center justify-center overflow-hidden shadow-md">
        <motion.div
          variants={planeVariants}
          animate={flying ? "fly" : "idle"}
          transition={planeTransition}
          onUpdate={({ x }) => {
            if (typeof x === "number" && x > 150) navigate("/chat");
          }}
        >
          <AirplaneIcon className="h-40 w-30" />
        </motion.div>
        <p className="text-5xl font-bold text-white">Telegram</p>
      </main>
    </div>
  );
};

export default SplashPage;
