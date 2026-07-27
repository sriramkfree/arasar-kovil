'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxDecorations() {
  const { scrollYProgress } = useScroll();

  // Create different translate transformations for various scroll speeds (3D depth layers)
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -500]);
  
  const ySlowReverse = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yMediumReverse = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Rotations for extra dynamic look
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotateFast = useTransform(scrollYProgress, [0, 1], [-30, 90]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none">
      {/* --- Section 1: About Area --- */}
      {/* Floating Bell Left */}
      <motion.div
        className="absolute top-[900px] left-[2%] md:left-[5%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: ySlow, rotate: rotateSlow }}
      >
        <Image src="/images/temple-bells.png" alt="Bell decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* Floating Oil Lamp Right */}
      <motion.div
        className="absolute top-[1600px] right-[2%] md:right-[5%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yMedium }}
      >
        <Image src="/images/oil-lamps.png" alt="Lamp decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* --- Section 2: Timeline Area --- */}
      {/* Floating Flower Left */}
      <motion.div
        className="absolute top-[2500px] left-[1%] md:left-[4%] w-16 h-16 md:w-24 md:h-24 opacity-20 md:opacity-35 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yFast, rotate: rotateFast }}
      >
        <Image src="/images/flowers-offering.png" alt="Flower decoration" width={96} height={96} className="object-contain" />
      </motion.div>

      {/* Floating Bell Right */}
      <motion.div
        className="absolute top-[3200px] right-[3%] md:right-[6%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: ySlowReverse }}
      >
        <Image src="/images/temple-bells.png" alt="Bell decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* --- Section 3: Gallery/Video Area --- */}
      {/* Floating Oil Lamp Left */}
      <motion.div
        className="absolute top-[4300px] left-[2%] md:left-[5%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-45 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yMediumReverse }}
      >
        <Image src="/images/oil-lamps.png" alt="Lamp decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* Floating Flower Right */}
      <motion.div
        className="absolute top-[5200px] right-[2%] md:right-[5%] w-16 h-16 md:w-24 md:h-24 opacity-20 md:opacity-35 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yFast, rotate: rotateSlow }}
      >
        <Image src="/images/flowers-offering.png" alt="Flower decoration" width={96} height={96} className="object-contain" />
      </motion.div>

      {/* --- Section 4: Festivals/FAQ Area --- */}
      {/* Floating Bell Left */}
      <motion.div
        className="absolute top-[6500px] left-[3%] md:left-[6%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: ySlow, rotate: rotateFast }}
      >
        <Image src="/images/temple-bells.png" alt="Bell decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* Floating Oil Lamp Right */}
      <motion.div
        className="absolute top-[7500px] right-[2%] md:right-[5%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yMedium }}
      >
        <Image src="/images/oil-lamps.png" alt="Lamp decoration" width={112} height={112} className="object-contain" />
      </motion.div>

      {/* --- Section 5: Contact/Reviews Area --- */}
      {/* Floating Flower Left */}
      <motion.div
        className="absolute top-[8600px] left-[2%] md:left-[5%] w-16 h-16 md:w-24 md:h-24 opacity-20 md:opacity-35 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: yFast }}
      >
        <Image src="/images/flowers-offering.png" alt="Flower decoration" width={96} height={96} className="object-contain" />
      </motion.div>

      {/* Floating Bell Right */}
      <motion.div
        className="absolute top-[9600px] right-[3%] md:right-[6%] w-20 h-20 md:w-28 md:h-28 opacity-25 md:opacity-40 hidden sm:block filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        style={{ y: ySlowReverse, rotate: rotateSlow }}
      >
        <Image src="/images/temple-bells.png" alt="Bell decoration" width={112} height={112} className="object-contain" />
      </motion.div>
    </div>
  );
}
