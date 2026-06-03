"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl max-w-xs w-full group hover:border-[#D0011B]/50 transition-colors duration-500" 
                  key={i}
                >
                  <div className="text-white/70 leading-relaxed font-medium">"{text}"</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border-2 border-[#D0011B]/30"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold text-white tracking-tight leading-5 group-hover:text-[#D0011B] transition-colors">{name}</div>
                      <div className="text-[12px] text-white/40 font-medium leading-5 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
