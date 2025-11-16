"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./carousel.module.scss";

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

const VISIBLE = 5; // always show 5 cards

export const Carousel = ({
  images,
  autoPlayInterval = 4000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(id);
  }, [isAutoPlaying, goToNext, autoPlayInterval]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Map each of the 5 fixed slots to a position and scale
  const POSITION_MAP = [
    { x: -350, scale: 0.65, opacity: 0.55, z: 1 }, // left edge
    { x: -175, scale: 0.8, opacity: 0.8, z: 2 }, // left side
    { x: 0, scale: 1.0, opacity: 1, z: 3 }, // center
    { x: 175, scale: 0.8, opacity: 0.8, z: 2 }, // right side
    { x: 350, scale: 0.65, opacity: 0.55, z: 1 }, // right edge
  ];

  const getImageIndex = (slot: number) => {
    const offset = slot - 2; // center slot is 2
    let index = currentIndex + offset;

    if (index < 0) index += images.length;
    if (index >= images.length) index %= images.length;

    return index;
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.carouselContainer}>
        {/* KEEP 5 STATIC ELEMENTS WITH FIXED KEYS FOR SMOOTH ANIMATION */}
        {[0, 1, 2, 3, 4].map((slot) => {
          const i = getImageIndex(slot);
          const img = images[i];
          const { x, scale, opacity, z } = POSITION_MAP[slot];

          return (
            <div
              key={`slot-${slot}`} // stays the same forever (important!)
              className={styles.carouselSlide}
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                opacity,
                zIndex: z,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={styles.carouselImage}
              />
            </div>
          );
        })}
      </div>

      {images.length > VISIBLE && (
        <>
          <button
            className={styles.carouselButton}
            onClick={goToPrevious}
            aria-label="previous image"
          >
            ‹
          </button>

          <button
            className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
            onClick={goToNext}
            aria-label="next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};
