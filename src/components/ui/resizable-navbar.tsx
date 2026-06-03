"use client";
import { cn } from "../../lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-[100] w-full px-4 pt-6 transition-all duration-300", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<{ visible?: boolean }>(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(208, 1, 27, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)"
          : "none",
        width: visible ? "50%" : "100%",
        y: visible ? 0 : 0,
        backgroundColor: visible ? "rgba(10, 10, 10, 0.8)" : "transparent",
        border: visible ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      className={cn(
        "relative mx-auto hidden w-full max-w-7xl flex-row items-center justify-between rounded-full px-6 py-3 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 flex-1 flex-row items-center justify-center space-x-2 hidden lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-5 py-2 text-[13px] font-bold text-white/70 hover:text-white transition-colors duration-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="navHover"
              className="absolute inset-0 h-full w-full rounded-full bg-white/5 border border-white/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(208, 1, 27, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2)"
          : "none",
        width: visible ? "calc(100% - 2rem)" : "100%",
        borderRadius: "2rem",
        backgroundColor: visible ? "rgba(10, 10, 10, 0.8)" : "transparent",
        border: visible ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      className={cn(
        "relative mx-auto flex w-full flex-col items-center justify-between px-6 py-4 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={cn(
            "absolute inset-x-0 top-[70px] z-[110] flex w-full flex-col items-start justify-start gap-6 rounded-[32px] bg-[#0a0a0a]/95 backdrop-blur-2xl px-8 py-10 border border-white/10 shadow-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="text-white hover:text-[#D0011B] transition-colors">
      {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2"
    >
      <img
        src="https://i.postimg.cc/NFkJ8vX6/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
        alt="ShopSpy Logo"
        className="h-8 w-auto object-contain"
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  onClick,
  children,
  className,
  variant = "primary",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) => {
  const baseStyles = "relative z-20 px-6 py-2.5 rounded-full text-[13px] font-black transition-all duration-300";
  const variants = {
    primary: "bg-[#D0011B] text-white hover:brightness-110 active:scale-95 shadow-lg shadow-[#D0011B]/25",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
  };

  if (href) {
    return (
      <a href={href} className={cn(baseStyles, variants[variant], className)}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </button>
  );
};
