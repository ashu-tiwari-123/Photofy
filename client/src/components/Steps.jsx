import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div
    initial={{ y: 100, opacity: 0.2 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it Works</h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform words into stunning images
      </p>
      <div className="space-y-4 w-full max-w-3xl texm-sm">
        {stepsData.map((step, index) => (
          <div
            className="flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
            key={index}
          >
            <img width={40} src={step.icon} alt="" />
            <div>
              <h2 className="text-xl font-medium">{step.title}</h2>
              <p className="text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
