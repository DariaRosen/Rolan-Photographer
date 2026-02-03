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

const imageKey = (img: CloudinaryImage) => img.publicId || img.src

export const Gallery = () => {
  const [selectedFolder, setSelectedFolder] = useState<GalleryItem | null>(null)
  const [columnsCount, setColumnsCount] = useState<number>(4)
  const [selectedImages, setSelectedImages] = useState<CloudinaryImage[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadMoreRef, setLoadMoreRef] = useState<HTMLDivElement | null>(null)

  const toggleLike = (key: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const openSharePopup = (url: string) => {
    setShareUrl(url)
  }

  const closeSharePopup = () => {
    setShareUrl(null)
  }

  const copyShareUrl = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {}
  }

  const shareLinks = (url: string) => {
    const encoded = encodeURIComponent(url)
    return {
      whatsapp: `https://wa.me/?text=${encoded}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encoded}&redirect_uri=${encodeURIComponent(window.location.origin)}`,
      email: `mailto:?body=${encoded}&subject=${encodeURIComponent(selectedFolder?.title || 'תמונה')}`,
    }
  }

  const handleDownload = async (e: React.MouseEvent, image: CloudinaryImage) => {
    e.stopPropagation()
    try {
      const res = await fetch(image.src, { mode: 'cors' })
      const blob = await res.blob()
      const ext = blob.type.split('/')[1] || 'jpg'
      const name = image.publicId?.split('/').pop()?.replace(/\.[^.]+$/, '') || 'gallery-image'
      const filename = `${name}.${ext}`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(image.src, '_blank')
    }
  }

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
                                className={`${styles.actionIcon} ${likedIds.has(imageKey(image)) ? styles.actionIconLiked : ''}`}
                                aria-label={likedIds.has(imageKey(image)) ? 'הסר מאהבים' : 'אהבתי'}
                                onClick={(e) => { e.stopPropagation(); toggleLike(imageKey(image)) }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className={styles.actionIcon}
                                aria-label="הורדה"
                                onClick={(e) => handleDownload(e, image)}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="7 10 12 15 17 10" />
                                  <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className={styles.actionIcon}
                                aria-label="שתף"
                                onClick={(e) => { e.stopPropagation(); openSharePopup(image.src) }}
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

        {/* Share pop-up */}
        {shareUrl && (
          <div
            className={styles.shareOverlay}
            onClick={closeSharePopup}
            role="dialog"
            aria-modal="true"
            aria-label="שתף"
          >
            <div
              className={styles.sharePopup}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={styles.sharePopupTitle}>שתף</h3>
              <div className={styles.shareUrlRow}>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className={styles.shareUrlInput}
                  aria-label="קישור לשיתוף"
                />
                <button
                  type="button"
                  className={styles.shareCopyButton}
                  onClick={copyShareUrl}
                >
                  העתק
                </button>
              </div>
              <div className={styles.shareIconsRow}>
                <a
                  href={typeof window !== 'undefined' ? shareLinks(shareUrl).messenger : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareIconLink}
                  aria-label="Messenger"
                >
                  <span className={styles.shareIconCircle}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2C6.36 2 2 6.13 2 11c0 3.23 1.6 6.1 4.1 7.93-.22.82-.88 3.01-.99 3.44-.14.54.2.53.41.39.2-.14 3.17-2.17 4.35-2.94 1.17.16 2.4.24 3.64.24 5.64 0 10-4.13 10-9.2S17.64 2 12 2z" />
                    </svg>
                  </span>
                  <span className={styles.shareIconLabel}>Messenger</span>
                </a>
                <a
                  href={typeof window !== 'undefined' ? shareLinks(shareUrl).whatsapp : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareIconLink}
                  aria-label="WhatsApp"
                >
                  <span className={styles.shareIconCircle}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <span className={styles.shareIconLabel}>WhatsApp</span>
                </a>
                <a
                  href={typeof window !== 'undefined' ? shareLinks(shareUrl).facebook : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareIconLink}
                  aria-label="Facebook"
                >
                  <span className={styles.shareIconCircle}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </span>
                  <span className={styles.shareIconLabel}>Facebook</span>
                </a>
                <a
                  href={typeof window !== 'undefined' ? shareLinks(shareUrl).email : '#'}
                  className={styles.shareIconLink}
                  aria-label="אימייל"
                >
                  <span className={styles.shareIconCircle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className={styles.shareIconLabel}>אימייל</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

