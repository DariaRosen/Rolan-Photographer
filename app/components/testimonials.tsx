'use client'

import { useState, useCallback, useEffect } from 'react'
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
    clientName: 'אמא של אורי וגיל',
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
    clientName: 'דבורה קורן',
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
    clientName: 'רחל כהן',
    text: [
      'את צלמת נהדרת!',
      'התוצאה מעבר למצופה',
      'נמליץ עלייך בחום',
    ],
  },
]

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width >= 1180) {
        // Desktop and large screens: show 3 cards
        setVisibleCount(3)
      } else if (width >= 768) {
        // Tablet / medium screens: show 2 cards
        setVisibleCount(2)
      } else {
        // Mobile: show 1 card
        setVisibleCount(1)
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Map testimonials to fixed positions according to visibleCount
  const getTestimonialForPosition = (position: number) => {
    if (visibleCount === 1) {
      // Single card: always show the current testimonial
      return testimonials[currentIndex]
    }

    if (visibleCount === 2) {
      // Two cards: currentIndex and the next one
      let testimonialIndex = currentIndex + position // position: 0, 1

      if (testimonialIndex >= testimonials.length) {
        testimonialIndex = testimonialIndex - testimonials.length
      }

      return testimonials[testimonialIndex]
    }

    // Three cards: currentIndex - 1, currentIndex, currentIndex + 1
    const offset = position - 1 // -1, 0, 1
    let testimonialIndex = currentIndex + offset

    if (testimonialIndex < 0) {
      testimonialIndex = testimonials.length + testimonialIndex
    } else if (testimonialIndex >= testimonials.length) {
      testimonialIndex = testimonialIndex - testimonials.length
    }

    return testimonials[testimonialIndex]
  }

  const positions = visibleCount === 3 ? [0, 1, 2] : visibleCount === 2 ? [0, 1] : [0]

  return (
    <Main>
      <div className={styles.testimonials}>
        <h1 className={styles.title}>לקוחות ממליצים</h1>

        <div className={styles.testimonialsContainer}>
          <div className={styles.carouselContainer}>
          <div className={styles.cardsContainer}>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              type="button"
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {positions.map((position) => {
              const testimonial = getTestimonialForPosition(position)
              const isCenter = visibleCount === 3 ? position === 1 : true
              
              return (
                <div key={`${testimonial.id}-${position}-${currentIndex}`} className={styles.cardWrapper}>
                  <div className={styles.testimonialCard}>
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

            <button
              className={styles.navButton}
              onClick={goToNext}
              type="button"
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>
    </Main>
  )
}

