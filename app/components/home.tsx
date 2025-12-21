import styles from "./home.module.scss";
import { Main } from "@/components/Main/Main";
import { Carousel } from "@/components/Carousel/carousel";
import { cloudinary } from "@/lib/cloudinary";

interface CarouselImage {
  src: string;
  alt: string;
  publicId?: string;
}

async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    // Check if Cloudinary credentials are configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    
    if (!cloudName || !apiKey || !apiSecret) {
      console.warn('Cloudinary credentials not configured, using fallback images');
      return [];
    }

    // Call Cloudinary directly instead of using fetch to avoid build-time issues
    const searchResult = await cloudinary.search
      .expression('folder:Photographer/Carousel AND resource_type:image')
      .max_results(500)
      .execute();

    if (searchResult.resources && searchResult.resources.length > 0) {
      return searchResult.resources
        .filter((resource: any) => resource.resource_type === 'image')
        .map((resource: any) => ({
          src: resource.secure_url,
          alt: resource.public_id.split('/').pop() || 'Carousel Image',
          publicId: resource.public_id,
        }));
    }

    // Fallback: Try Admin API with prefix
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: 'Photographer/Carousel',
      max_results: 500,
    });

    if (result.resources && result.resources.length > 0) {
      return result.resources.map((resource: any) => ({
        src: resource.secure_url,
        alt: resource.public_id.split('/').pop() || 'Carousel Image',
        publicId: resource.public_id,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching carousel images from Cloudinary:', error);
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
