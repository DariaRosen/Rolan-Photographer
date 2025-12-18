import styles from "./home.module.scss";
import { Main } from "@/components/Main/Main";
import { Carousel } from "@/components/Carousel/carousel";

interface CarouselImage {
  src: string;
  alt: string;
  publicId?: string;
}

async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    // For Server Components, construct the full URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/carousel`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch carousel images:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.success && data.images && Array.isArray(data.images)) {
      return data.images;
    }

    return [];
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
}

export const Home = async () => {
  const carouselImages = await getCarouselImages();

  // Fallback to local images if Cloudinary fails
  const fallbackImages: CarouselImage[] = [
    { src: "/images/photo1.PNG", alt: "Photography Portfolio Image 1" },
    { src: "/images/photo2.PNG", alt: "Photography Portfolio Image 2" },
    { src: "/images/photo3.PNG", alt: "Photography Portfolio Image 3" },
    { src: "/images/photo4.PNG", alt: "Photography Portfolio Image 4" },
    { src: "/images/photo5.PNG", alt: "Photography Portfolio Image 5" },
    { src: "/images/photo6.PNG", alt: "Photography Portfolio Image 6" },
    { src: "/images/photo7.PNG", alt: "Photography Portfolio Image 7" },
  ];

  const images = carouselImages.length > 0 ? carouselImages : fallbackImages;

  return (
    <Main>
      <div className={styles.home}>
        {images.length > 0 && (
          <div className={styles.carouselSection}>
            <Carousel images={images} />
            <div className={styles.heroQuote} dir="rtl">
              «הרגעים הקטנים עם המשפחה היום הם פרקי הנוסטלגיה של העתיד»
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};
