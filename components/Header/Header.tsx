"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import { NavigationItem } from "@/types";

interface HeaderProps {
  navigation?: NavigationItem[];
}

const defaultNavigation: NavigationItem[] = [
  { label: "בית", href: "/#home" },
  { label: "הסיפור שלי", href: "/#about" },
  { label: "גלריה", href: "/#gallery" },
  { label: "הדפסות", href: "/#prints" },
  { label: "מחירון", href: "/#pricing" },
  { label: "לקוחות ממליצים", href: "/#testimonials" },
  { label: "צור קשר", href: "/#contact" },
];

export const Header = ({ navigation = defaultNavigation }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically set header height CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--header-height", `${height}px`);
      }
    };

    // Update on mount and resize
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    
    // Also update after a short delay to catch any layout changes
    const timeoutId = setTimeout(updateHeaderHeight, 100);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        {/* Left - Contacts */}
        <div className={styles.contacts}>
          <a
            href="https://wa.me/972542281004"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <img
              src="/512px-WhatsApp.svg.webp"
              alt="WhatsApp"
              className={styles.whatsappIcon}
            />
          </a>
          <span className={styles.phoneNumber}>054-228-1004</span>
        </div>

        {/* Center - Navigation */}
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.active : ""
              }`}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right - Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </Link>

        {/* Mobile Button */}
        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          onClick={handleMobileMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavItem}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
