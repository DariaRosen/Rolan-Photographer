'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.scss'
import { NavigationItem } from '@/types'

interface HeaderProps {
  navigation?: NavigationItem[]
}

const defaultNavigation: NavigationItem[] = [
  { label: 'צור קשר', href: '/contact' },
  { label: 'לקוחות ממליצים', href: '/testimonials' },
  { label: 'מחירון', href: '/pricing' },
  { label: 'הדפסות', href: '/prints' },
  { label: 'גלריה', href: '/gallery' },
  { label: 'הסיפור שלי', href: '/about' },
  { label: 'בית', href: '/' },
]

export const Header = ({ navigation = defaultNavigation }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Left Section - Contacts */}
        <div className={styles.contacts}>
          <a href="https://wa.me/972586645622" target="_blank" rel="noopener noreferrer" className={styles.contactLink} aria-label="WhatsApp">
            <img src="/512px-WhatsApp.svg.webp" alt="WhatsApp" className={styles.whatsappIcon} width="20" height="20" />
          </a>
          <a href="tel:0586645622" className={styles.phoneNumber}>058-664-5622</a>
        </div>

        {/* Middle Section - Navigation Links */}
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.active : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Logo */}
        <Link href="/" className={styles.logo}>
          <img 
            src="/logo.jpg" 
            alt="" 
            className={styles.logoImage}
            onError={(e) => {
              console.error('Logo failed to load from /logo.jpg');
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.src = '/logo.jpg';
            }}
            onLoad={() => console.log('Logo loaded successfully from /logo.jpg')}
          />
        </Link>

        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.open : ''
          }`}
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ''
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
  )
}
