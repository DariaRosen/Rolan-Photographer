'use client'

import { Main } from '@/components/Main/Main'
import styles from './prints.module.scss'

interface PrintOption {
  id: string
  title: string
}

const printOptions: PrintOption[] = [
  {
    id: '1',
    title: 'הדפסה על עץ',
  },
  {
    id: '2',
    title: 'הדפסה על קנבס',
  },
  {
    id: '3',
    title: 'הדפסה על זכוכית',
  },
  {
    id: '4',
    title: 'מגנטים',
  },
  {
    id: '5',
    title: 'אלבומים',
  },
]

export const Prints = () => {
  return (
    <Main>
      <div className={styles.prints}>
        <h1 className={styles.title}>הדפסות</h1>

        <div className={styles.description} dir="rtl">
          <p>הניתם? צילמתם? השקעתם?</p>
          <p>יש לכם סט תמונות מדהימות מלאות בקסם חוויה ואוירה ?</p>
          <p>תמונות כאלה לא משאירים באלבום בארון…</p>
          <p>מדפיסים אותן בהגדלה!</p>
        </div>

        <div className={styles.printsContainer}>
          <div className={styles.printsGrid}>
            {printOptions.map((option) => (
              <div key={option.id} className={styles.printBox}>
                <h2 className={styles.printTitle}>{option.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  )
}

