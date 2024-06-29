"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Visualizations", href: "/Visualizations" },
    { label: "Statistics", href: "/Statistics" },
    { label: "Return", href: "https://www.indiawaterportal.org/articles/background-meteorological-datasets" }
  ];

type NavItemProps = {
    label: string;
    href: string;
};
  
const NavItem : React.FC<NavItemProps> = ({ label, href}) => {
    const pathname = usePathname();
  
    return (
        <div
          className={`group relative text-[#9A9A9A] font-[600] px-6 py-2 
          rounded-full transition-all ease-in-out focus-visible:outline-2 ${
            pathname === href ? "" : "hover:bg-[#FFFFFF10]"
          }`}
        >
          <AnimatePresence initial={false} mode="wait">
            {pathname === href && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-[#FFFFFF1A] mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                key={label}
              />
            )}
          </AnimatePresence>
          <Link href={href}>
            <p className="text-lg md:text-base lg:text-lg text-center">{label}</p>
          </Link>
          <div className="mx-2"></div>
        </div>
    );
};