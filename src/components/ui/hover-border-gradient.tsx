"use client";
import React from "react";
import { cn } from "../../lib/utils";

/**
 * Componente de botão com efeito de borda gradiente animada (Hover Border Gradient).
 * Cor base: #ec1e54 (Pink-Red)
 * Efeito: Brilho rotativo infinito na borda usando CSS Keyframes.
 */
export function HoverBorderGradient({
  children,
  containerClassName = "",
  className = "",
  as: Tag = "button",
  ...props
}: {
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Tag
      className={cn(
        "relative flex h-min w-fit flex-col items-center justify-center overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 active:scale-95 group",
        containerClassName
      )}
      style={{ 
        backgroundColor: '#ec1e54',
        ...props.style 
      }}
      {...props}
    >
      {/* Estilos do efeito de rotação via CSS injection */}
      <style>
        {`
          @keyframes rotate-border {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-rotate-gradient {
            animation: rotate-border 3s linear infinite;
          }
        `}
      </style>

      {/* Camada do Gradiente que roda (O Efeito) */}
      <div
        className="animate-rotate-gradient absolute inset-[-200%] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.6) 85%, transparent 100%)`,
        }}
      />

      {/* Fundo interno que tapa o centro do gradiente, criando a "borda" */}
      <div
        className={cn(
          "z-10 flex items-center space-x-2 rounded-full px-6 py-2 text-white font-bold transition-colors group-hover:bg-[#d01b4c]",
          className
        )}
        style={{ backgroundColor: '#ec1e54' }}
      >
        {children}
      </div>
    </Tag>
  );
}

