'use client'

import { Main } from '@/components/Main/Main'
import styles from './pricing.module.scss'

interface PricingPackage {
  id: string
  title: string
  price: string
  features: string[]
  colorScheme: 'blue' | 'orange' | 'yellow' | 'premium'
  isOnSale?: boolean
}

const pricingPackages: PricingPackage[] = [
  {
    id: '1',
    title: 'צילומי גיל שנה',
    price: '₪1500',
    colorScheme: 'blue',
    isOnSale: true,
    features: [
      'עד שעה וחצי צילומים',
      'סט צילום עם עוגה / אמבט לבחירה',
      'סט נוסף לצילום חופשי',
      '15 תמונות מלוטשות בפוטושופ',
      'לפחות 150 תמונות נוספות',
      'צילום עם המשפחה כלול בחבילה',
    ],
  },
  {
    id: '2',
    title: 'צילומי ניו בורן',
    price: '₪1500',
    colorScheme: 'orange',
    features: [
      'עד שעתיים צילומים',
      '12 תמונות מלוטשות בפוטושופ',
      'לפחות 100 תמונות נוספות',
      'צילום עם הורים כלול בחבילה',
    ],
  },
  {
    id: '3',
    title: 'משפחה בסגנון לייף סטייל',
    price: '₪1500',
    colorScheme: 'yellow',
    features: [
      'עד 4 שעות צילום',
      '15 תמונות מלוטשות בפוטושופ',
      'לפחות 150 תמונות נוספות',
    ],
  },
  {
    id: '4',
    title: 'חבילת פרימיום',
    price: '₪2500',
    colorScheme: 'premium',
    features: [
      'ללא הגבלת זמן',
      '35 תמונות מלוטשות',
      'לפחות 300 תמונות נוספות',
      'צילומי משפחה כלולים בחבילה',
    ],
  },
]

export const Pricing = () => {
  return (
    <Main>
      <div className={styles.pricing}>
        <h1 className={styles.title}>מחירון</h1>

        <div className={styles.packagesGrid}>
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`${styles.package} ${styles[`package${pkg.colorScheme
                .charAt(0)
                .toUpperCase()}${pkg.colorScheme.slice(1)}`]}`}
            >
              {pkg.isOnSale && (
                <img
                  src="/sale-tag-icon.svg"
                  alt="מבצע"
                  className={styles.saleIcon}
                />
              )}
              <h2 className={styles.packageTitle}>{pkg.title}</h2>
              <div className={styles.price}>{pkg.price}</div>
              <ul className={styles.featuresList}>
                {pkg.features.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <svg
                      className={styles.checkmark}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Main>
  )
}

