'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './carousel.module.scss'

interface CarouselImage {
  src: string
  alt: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

const VISIBLE = 5 // Show 5 cards at a time

export const Carousel = ({ images, autoPlayInterval = 4000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [step, setStep] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const measureStep = useCallback(() => {
    const el = carouselRef.current
    const track = trackRef.current
    if (!el || !track) return

    // Calculate based on center card width (largest card)
    // Center card: 450px on desktop, 320px on mobile
    const centerCardWidth = el.clientWidth > 1024 ? 450 : 320
    const gap = 0 // No gap in our design
    const calculatedStep = Math.round(centerCardWidth + gap)
    
    setCardWidth(centerCardWidth)
    setStep(calculatedStep)
    
    const maxStart = Math.max(0, images.length - VISIBLE)
    setCurrentIndex((prev) => Math.min(prev, maxStart))
  }, [images.length])

  useEffect(() => {
    measureStep()
    window.addEventListener('resize', measureStep)
    return () => window.removeEventListener('resize', measureStep)
  }, [measureStep])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index % images.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, images.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (images.length === 0) {
    return null
  }

  // Map images to fixed positions (0-4)
  // Position 0: leftmost (smallest)
  // Position 1: left side (medium)
  // Position 2: center (largest)
  // Position 3: right side (medium)
  // Position 4: rightmost (smallest)
  const getImageForPosition = (position: number) => {
    // Calculate which image should be at this position
    // Position 2 (center) shows image at currentIndex
    // Position 1 shows image at currentIndex - 1
    // Position 0 shows image at currentIndex - 2
    // Position 3 shows image at currentIndex + 1
    // Position 4 shows image at currentIndex + 2
    
    const imageOffset = position - 2 // -2, -1, 0, 1, 2
    let imageIndex = currentIndex + imageOffset
    
    // Handle wrapping for circular carousel
    if (imageIndex < 0) {
      imageIndex = images.length + imageIndex
    } else if (imageIndex >= images.length) {
      imageIndex = imageIndex % images.length
    }
    
    return imageIndex
  }
  
  const showArrows = images.length > VISIBLE

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.carouselContainer} ref={carouselRef}>
        <div
          ref={trackRef}
          className={styles.carouselTrack}
        >
          {/* Render 5 fixed position cards */}
          {[0, 1, 2, 3, 4].map((position) => {
            const imageIndex = getImageForPosition(position)
            const image = images[imageIndex]
            
            // Determine card type based on fixed position
            // Position 0: leftmost edge (smallest)
            // Position 1: left side (medium)
            // Position 2: center (largest)
            // Position 3: right side (medium)
            // Position 4: rightmost edge (smallest)
            const isCenter = position === 2
            const isEdge = position === 0 || position === 4
            const isSide = position === 1 || position === 3
            
            return (
              <div
                key={`position-${position}-image-${imageIndex}`}
                className={`${styles.carouselSlide} ${
                  isCenter ? styles.slideCenter : ''
                } ${isEdge ? styles.slideEdge : ''} ${isSide ? styles.slideSide : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.carouselImage}
                  loading={isCenter ? 'eager' : 'lazy'}
                  key={`img-${imageIndex}-${currentIndex}`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {showArrows && (
        <button
          className={styles.carouselButton}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous image"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {showArrows && (
        <button
          className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
          onClick={goToNext}
          disabled={currentIndex >= images.length - VISIBLE}
          aria-label="Next image"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className={styles.carouselIndicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.indicatorActive : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}

