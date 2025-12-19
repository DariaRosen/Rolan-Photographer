'use client'

import { useState, useEffect } from 'react'
import { Main } from '@/components/Main/Main'
import styles from './gallery.module.scss'

interface GalleryItem {
  id: string
  title: string
  image: string
  folder: string
}

interface CloudinaryImage {
  src: string
  alt: string
  publicId: string
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'בת מצווה',
    image: '/gallery/photo1.PNG',
    folder: 'BatMitzva',
  },
  {
    id: '2',
    title: 'גיל שנה',
    image: '/gallery/photo2.PNG',
    folder: 'OneYear',
  },
  {
    id: '3',
    title: 'משפחה',
    image: '/gallery/photo3.PNG',
    folder: 'Family',
  },
  {
    id: '4',
    title: 'הריון',
    image: '/gallery/photo4.PNG',
    folder: 'Pregnancy',
  },
  {
    id: '5',
    title: 'בר מצווה',
    image: '/gallery/photo5.PNG',
    folder: 'BarMitzva',
  },
  {
    id: '6',
    title: 'ניו בורן',
    image: '/gallery/photo6.PNG',
    folder: 'NewBorn',
  },
]

// Fetch images from Cloudinary API
const fetchGalleryImages = async (folder: string): Promise<CloudinaryImage[]> => {
  try {
    console.log(`Fetching images for folder: ${folder}`)
    const response = await fetch(`/api/gallery/${folder}`)
    const data = await response.json()
    
    console.log(`API response for ${folder}:`, {
      success: data.success,
      imageCount: data.images?.length || 0,
      error: data.error,
    })
    
    if (data.success && data.images && data.images.length > 0) {
      return data.images
    }
    
    // Fallback to empty array if no images found
    console.warn(`No images found for folder ${folder}`)
    return []
  } catch (error) {
    console.error(`Error fetching images for folder ${folder}:`, error)
    return []
  }
}

export const Gallery = () => {
  const [selectedFolder, setSelectedFolder] = useState<GalleryItem | null>(null)
  const [columnsCount, setColumnsCount] = useState<number>(4)
  const [selectedImages, setSelectedImages] = useState<CloudinaryImage[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false)

  const handleFrameClick = (item: GalleryItem) => {
    setSelectedFolder(item)
  }

  const handleCloseModal = () => {
    setSelectedFolder(null)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  // Fetch images from Cloudinary when a folder is selected
  useEffect(() => {
    if (selectedFolder) {
      setIsLoadingImages(true)
      fetchGalleryImages(selectedFolder.folder)
        .then((images) => {
          setSelectedImages(images)
          setIsLoadingImages(false)
        })
        .catch((error) => {
          console.error('Error loading gallery images:', error)
          setSelectedImages([])
          setIsLoadingImages(false)
        })
    } else {
      setSelectedImages([])
    }
  }, [selectedFolder])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedFolder) {
        handleCloseModal()
      }
    }

    if (selectedFolder) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedFolder])

  // Update number of columns based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width <= 640) {
        setColumnsCount(2)
        return
      }

      if (width <= 1000) {
        setColumnsCount(3)
        return
      }

      setColumnsCount(4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Distribute images into flex columns (masonry-style)
  const collageColumns: CloudinaryImage[][] = Array.from(
    { length: columnsCount },
    () => []
  )

  selectedImages.forEach((image, index) => {
    const columnIndex = index % columnsCount
    collageColumns[columnIndex].push(image)
  })

  return (
    <Main>
      <div className={styles.gallery}>
        <h1 className={styles.title}>גלריה</h1>

        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={styles.galleryItem}
              onClick={() => handleFrameClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleFrameClick(item)
                }
              }}
            >
              <div className={styles.frame}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.itemTitleOverlay}>
                  <h2 className={styles.itemTitle}>{item.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedFolder && (
          <div
            className={styles.modal}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`גלריית ${selectedFolder.title}`}
          >
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                type="button"
                aria-label="סגור"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h2 className={styles.modalTitle}>{selectedFolder.title}</h2>

              {isLoadingImages ? (
                <div className={styles.loadingState}>
                  <p>טוען תמונות...</p>
                </div>
              ) : selectedImages.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>לא נמצאו תמונות</p>
                </div>
              ) : (
                <div className={styles.collageColumns}>
                  {collageColumns.map((columnImages, columnIndex) => (
                    <div
                      key={`column-${columnIndex}`}
                      className={styles.collageColumn}
                    >
                      {columnImages.map((image, index) => (
                        <div
                          key={image.publicId || image.src}
                          className={styles.collageItem}
                        >
                          <img
                            src={image.src}
                            alt={image.alt || `${selectedFolder.title} ${columnIndex + 1}-${index + 1}`}
                            className={styles.collageImage}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

