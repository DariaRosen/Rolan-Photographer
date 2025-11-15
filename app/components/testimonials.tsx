'use client'

import { useState, useCallback } from 'react'
import { Main } from '@/components/Main/Main'
import styles from './testimonials.module.scss'

interface Testimonial {
  id: string
  image: string
  text: string[]
  clientName: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    image: '/testimonies/1.PNG',
    clientName: 'של אורי, גיל',
    text: [
      'תודה רולן את נדירה',
      'המקצועית שלך זה אמאלהה',
      'הצלחת להוציא איתו תמונות נדירות',
      'הצלחת להוציא אותי הכי מרוצה בעולם.',
      'תמונות עוצרות נשימה ❤️',
      'והשירות שלך נדיר ❤️',
      'מאושרת שבחרתי בך 🥰',
      'תודה אהובה',
    ],
  },
  {
    id: '2',
    image: '/testimonies/2.PNG',
    clientName: 'פייגי, אמא ל-3',
    text: [
      'וואו רולן!!!!!',
      'את לא מבינה מה עשית לי',
      'האלבום יותר מושלם משולם!!!!!!!',
      'לא יכול להיות יותר מדהים ויפה מזה!!!',
      'קיבלנו היום את האלבום והשמחה בשחקים!!!',
      'אימא שלי טוענת שאסור להסתכל על כאלה תמונות',
      'יפות בתשעת הימים 😜',
      'האלבום הזה פשוט נדיר!',
      'להסתכל שוב ושוב ולא להפסיק',
    ],
  },
  {
    id: '3',
    image: '/testimonies/3.PNG',
    clientName: 'דבורה, קורן',
    text: [
      'ואיי תקשיבי התגובות מטורפותתתת על התמונות',
      'תודה על הכל לא מובן מאליו',
      'זאת הסיבה שאנחנו חוזרים פעם אחר פעם',
      'תמיד רוצה ומחכה שנצא מרוצים עד הסוף',
      '😜😜😜',
    ],
  },
  {
    id: '4',
    image: '/testimonies/4.PNG',
    clientName: 'שרה, אמא ל-2',
    text: [
      'תודה רבה על התמונות המדהימות!',
      'הן פשוט מושלמות',
      'כל משפחה צריכה תמונות כאלה',
    ],
  },
  {
    id: '5',
    image: '/testimonies/5.PNG',
    clientName: 'רחל, משפחה',
    text: [
      'את צלמת נהדרת!',
      'התוצאה מעבר למצופה',
      'נמליץ עלייך בחום',
    ],
  },
]

const VISIBLE = 3 // Show 3 cards at a time

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Map testimonials to fixed positions (0-2)
  // Position 0: left (smallest)
  // Position 1: center (largest)
  // Position 2: right (smallest)
  const getTestimonialForPosition = (position: number) => {
    // Position 1 (center) shows testimonial at currentIndex
    // Position 0 shows testimonial at currentIndex - 1
    // Position 2 shows testimonial at currentIndex + 1
    
    const offset = position - 1 // -1, 0, 1
    let testimonialIndex = currentIndex + offset
    
    // Handle wrapping for circular carousel
    if (testimonialIndex < 0) {
      testimonialIndex = testimonials.length + testimonialIndex
    } else if (testimonialIndex >= testimonials.length) {
      testimonialIndex = testimonialIndex - testimonials.length
    }
    
    return testimonials[testimonialIndex]
  }

  return (
    <Main>
      <div className={styles.testimonials}>
        <h1 className={styles.title}>לקוחות ממליצים</h1>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              type="button"
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.cardsContainer}>
              {[0, 1, 2].map((position) => {
                const testimonial = getTestimonialForPosition(position)
                const isCenter = position === 1
                
                return (
                  <div key={`${testimonial.id}-${position}-${currentIndex}`} className={styles.cardWrapper}>
                    <div
                      className={`${styles.testimonialCard} ${
                        isCenter ? styles.cardCenter : position === 0 ? styles.cardLeft : styles.cardRight
                      }`}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={testimonial.image}
                          alt="Testimonial"
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.content}>
                        {testimonial.text.map((paragraph, index) => (
                          <p key={index} className={styles.text}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className={styles.heartContainer}>
                      <div className={styles.heartCircle}>
                        <img
                          src="/pink-calligraphy-heart/bb10b0aa-4032-4feb-9f3b-1c48e55eb96f.jpg"
                          alt="Heart"
                          className={styles.heartIcon}
                        />
                      </div>
                      <p className={styles.clientName}>{testimonial.clientName}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              className={styles.navButton}
              onClick={goToNext}
              type="button"
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Main>
  )
}

