"use client";
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion } from "motion/react";

const AppLoader = () => {
  return (
    <div className="w-full h-screen fixed flex justify-center items-center flex-col gap-3 bg-black z-10">
      <div className="flex gap-3 justify-center items-center">
        <h1 className="text-store text-xl font-bold">SedTech</h1>
        <Image alt="SedTech logo" width={50} height={50} src="/storelogo.png" />
      </div>
      <motion.div
      animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
        
        className="flex gap-3 justify-center items-center"
      >
        <Loader2 className="animate-spin text-blue-700" />
        <h1  className="text-blue-700 font-bold">sedtech is loading..</h1>
      </motion.div>
    </div>
  );
};

export default AppLoader;