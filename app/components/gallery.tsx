'use client'

import { Main } from '@/components/Main/Main'
import styles from './gallery.module.scss'

interface GalleryItem {
  id: string
  title: string
  image: string
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'בת מצווה',
    image: '/gallery/photo1.PNG',
  },
  {
    id: '2',
    title: 'גיל שנה',
    image: '/gallery/photo2.PNG',
  },
  {
    id: '3',
    title: 'משפחה',
    image: '/gallery/photo3.PNG',
  },
  {
    id: '4',
    title: 'הריון',
    image: '/gallery/photo4.PNG',
  },
  {
    id: '5',
    title: 'בר מצווה',
    image: '/gallery/photo5.PNG',
  },
  {
    id: '6',
    title: 'ניו בורן',
    image: '/gallery/photo6.PNG',
  },
]

export const Gallery = () => {
  return (
    <Main>
      <div className={styles.gallery}>
        <h1 className={styles.title}>גלריה</h1>

        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <div className={styles.frame}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  )
}

