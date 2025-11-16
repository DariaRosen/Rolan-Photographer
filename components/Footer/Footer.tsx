import Link from "next/link";
import styles from "./footer.module.scss";
import { NavigationItem, SocialLink } from "@/types";

interface FooterProps {
  navigation?: NavigationItem[];
  socialLinks?: SocialLink[];
}

const defaultNavigation: NavigationItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const defaultSocialLinks: SocialLink[] = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

export const Footer = ({
  navigation = defaultNavigation,
  socialLinks = defaultSocialLinks,
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Photography</h3>
            <p>"הרגעים הקטנים עם המשפחה היום הם פרקי הנוסטלגיה של העתיד "</p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  {social.icon || social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h4>Quick Links</h4>
            <nav className={styles.links}>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <div className={styles.links}>
              <a href="mailto:hello@photography.com" className={styles.link}>
                hello@photography.com
              </a>
              <a href="tel:+1234567890" className={styles.link}>
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} Photography. All rights reserved.
          </div>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
