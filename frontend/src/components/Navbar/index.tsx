"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import IWPlogo from "@/../public/IWPlogo.svg";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Visualizations", href: "/visualizations" },
  { label: "Statistics", href: "/statistics" },
  {
    label: "Return",
    href: "https://www.indiawaterportal.org/articles/background-meteorological-datasets",
  },
];

type NavItemProps = {
  label: string;
  href: string;
};

const NavItem: React.FC<NavItemProps> = ({ label, href }) => {
  const pathname = usePathname();

  return (
    <div
      className={`transition-all ease-in-out focus-visible:outline-2 ${
        pathname === href ? "" : "hover:bg-grey-100"
      }`}
    >
      <Link href={href}>
        <p className="text-lg md:text-base lg:text-lg text-center">{label}</p>
      </Link>
      <div className="mx-8"></div>
    </div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 sm:z-[2] w-full flex items-center xl:justify-center px-4 py-4">
        {!isScrolled && (
          <Image
            src={IWPlogo}
            alt="India-Water-Portal-Logo"
            className="absolute w-[12rem] h-[4rem] pl-[2rem] left-0"
            priority
          />
        )}
        <div className="hidden h-10 w-3/5 xl:flex xl:justify-between xl:items-center px-3 py-8 rounded-full border-1 border-solid border-emrald-800 bg-slate-200 bg-opacity-60 backdrop-blur-xl space-x-2">
          {navigationItems.map((item) => (
            <div
              key={item.href}
              className="w-32 font-[600] py-2 flex justify-center rounded-full transition-all ease-in-out focus-visible:outline-2"
            >
              <div className="text-[#159AB2] hover:text-[#036876] hover:bg-gray-300 rounded-full py-2 px-4">
                <NavItem label={item.label} href={item.href} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end w-full xl:hidden">
          <button
            id="menu-btn"
            aria-label="Toggle Menu"
            type="button"
            className={`z-50 hamburger focus:outline-none ${
              isMenuOpen ? classes.open : ""
            } ${classes.hamburger}`}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span className={classes.hamburgerTop}></span>
            <span className={classes.hamburgerMiddle}></span>
            <span className={classes.hamburgerBottom}></span>
          </button>
        </div>
      </nav>
      <div
        id="menu"
        className={`absolute z-[1] top-0 bottom-0 left-0 ${
          isMenuOpen ? "block" : "hidden"
        } w-full min-h-screen py-1 pt-40 px-8 backdrop-blur-lg`}
      >
        <div className="flex items-center justify-end w-full xl:hidden">
          <button
            id="menu-btn"
            aria-label="Toggle Menu"
            type="button"
            className={`z-50 hamburger focus:outline-none ${
              isMenuOpen ? classes.open : ""
            } ${classes.hamburger}`}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span className={classes.hamburgerTop}></span>
            <span className={classes.hamburgerMiddle}></span>
            <span className={classes.hamburgerBottom}></span>
          </button>
        </div>
        <div className="flex flex-col self-end space-y-8 text-lg text-[#159AB2] hover:text-[#036876] font-medium uppercase p-8 border-1 border-[#222] rounded-[2rem] bg-sky-200 bg-opacity-80">
          {navigationItems.map(({ label, href }) => (
            <Link
              href={href}
              key={label}
              className="hover:text-[#036876]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
