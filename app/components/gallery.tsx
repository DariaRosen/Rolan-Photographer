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
    title: 'בת/בר מצווה',
    image: '/gallery/photo1.PNG',
    folder: 'BatMitzva',
  },
  {
    id: '2',
    title: 'גיל שנה',
    image: 'https://res.cloudinary.com/dool6mmp1/image/upload/v1766077487/00002316_a6zekh.jpg',
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
    title: 'גיל 3 (חלקה)',
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

interface PaginationResponse {
  images: CloudinaryImage[]
  hasMore: boolean
  total: number
}

// Fetch images from Cloudinary API with pagination
const fetchGalleryImages = async (
  folder: string, 
  page: number = 1, 
  limit: number = 8
): Promise<PaginationResponse> => {
  try {
    console.log(`Fetching images for folder: ${folder}, page: ${page}`)
    const response = await fetch(`/api/gallery/${folder}?page=${page}&limit=${limit}`)
    const data = await response.json()
    
    console.log(`API response for ${folder}:`, {
      success: data.success,
      imageCount: data.images?.length || 0,
      hasMore: data.pagination?.hasMore || false,
      error: data.error,
    })
    
    if (data.success && data.images && data.images.length > 0) {
      return {
        images: data.images,
        hasMore: data.pagination?.hasMore || false,
        total: data.pagination?.total || data.images.length,
      }
    }
    
    // Log the error if present
    if (data.error) {
      console.error(`API error for folder ${folder}:`, data.error)
    } else {
      console.warn(`No images found for folder ${folder}`)
    }
    
    return { images: [], hasMore: false, total: 0 }
  } catch (error) {
    console.error(`Error fetching images for folder ${folder}:`, error)
    return { images: [], hasMore: false, total: 0 }
  }
}

export const Gallery = () => {
  const [selectedFolder, setSelectedFolder] = useState<GalleryItem | null>(null)
  const [columnsCount, setColumnsCount] = useState<number>(4)
  const [selectedImages, setSelectedImages] = useState<CloudinaryImage[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadMoreRef, setLoadMoreRef] = useState<HTMLDivElement | null>(null)

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

  // Reset and load initial images when a folder is selected
  useEffect(() => {
    if (selectedFolder) {
      setIsLoadingImages(true)
      setCurrentPage(1)
      setSelectedImages([])
      setHasMore(false)
      
      fetchGalleryImages(selectedFolder.folder, 1, 8)
        .then((response) => {
          setSelectedImages(response.images)
          setHasMore(response.hasMore)
          setIsLoadingImages(false)
        })
        .catch((error) => {
          console.error('Error loading gallery images:', error)
          setSelectedImages([])
          setHasMore(false)
          setIsLoadingImages(false)
        })
    } else {
      setSelectedImages([])
      setHasMore(false)
      setCurrentPage(1)
    }
  }, [selectedFolder])

  // Load more images when scrolling near the bottom
  useEffect(() => {
    if (!loadMoreRef || !hasMore || isLoadingMore || isLoadingImages) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          const nextPage = currentPage + 1
          setIsLoadingMore(true)
          
          fetchGalleryImages(selectedFolder!.folder, nextPage, 8)
            .then((response) => {
              setSelectedImages((prev) => [...prev, ...response.images])
              setHasMore(response.hasMore)
              setCurrentPage(nextPage)
              setIsLoadingMore(false)
            })
            .catch((error) => {
              console.error('Error loading more images:', error)
              setIsLoadingMore(false)
            })
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(loadMoreRef)

    return () => {
      observer.disconnect()
    }
  }, [loadMoreRef, hasMore, isLoadingMore, isLoadingImages, currentPage, selectedFolder])

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
                <>
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
                            <div className={styles.imageActions}>
                              <button
                                type="button"
                                className={styles.actionIcon}
                                aria-label="אהבתי"
                                onClick={(e) => { e.stopPropagation() }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                              </button>
                              <a
                                href={image.src}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionIcon}
                                aria-label="הורדה"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="7 10 12 15 17 10" />
                                  <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                              </a>
                              <button
                                type="button"
                                className={styles.actionIcon}
                                aria-label="שתף"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (navigator.share) {
                                    navigator.share({
                                      title: selectedFolder?.title,
                                      url: image.src,
                                      text: selectedFolder?.title,
                                    }).catch(() => {})
                                  } else {
                                    navigator.clipboard?.writeText(image.src).then(() => {})
                                  }
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="18" cy="5" r="3" />
                                  <circle cx="6" cy="12" r="3" />
                                  <circle cx="18" cy="19" r="3" />
                                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Infinite scroll trigger */}
                  {hasMore && (
                    <div 
                      ref={setLoadMoreRef}
                      className={styles.loadMoreTrigger}
                    >
                      {isLoadingMore && (
                        <div className={styles.loadingMore}>
                          <p>טוען תמונות נוספות...</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

