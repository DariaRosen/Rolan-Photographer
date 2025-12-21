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
    
    console.log('Home - Cloudinary config check:', {
      cloudName: cloudName ? `Set (${cloudName.substring(0, 4)}...)` : 'Missing',
      apiKey: apiKey ? 'Set' : 'Missing',
      apiSecret: apiSecret ? 'Set' : 'Missing',
    });
    
    if (!cloudName || !apiKey || !apiSecret) {
      console.warn('Home - Cloudinary credentials not configured, using fallback images');
      return [];
    }

    console.log('Home - Attempting to fetch images from Photographer/Carousel folder');
    
    // Call Cloudinary directly instead of using fetch to avoid build-time issues
    const searchResult = await cloudinary.search
      .expression('folder:Photographer/Carousel AND resource_type:image')
      .max_results(500)
      .execute();

    console.log('Home - Search API result:', {
      total_count: searchResult.total_count,
      resourceCount: searchResult.resources?.length || 0,
    });

    if (searchResult.resources && searchResult.resources.length > 0) {
      const images = searchResult.resources
        .filter((resource: any) => resource.resource_type === 'image')
        .map((resource: any) => ({
          src: resource.secure_url,
          alt: resource.public_id.split('/').pop() || 'Carousel Image',
          publicId: resource.public_id,
        }));
      console.log(`Home - Found ${images.length} images via Search API`);
      return images;
    }

    console.log('Home - Search API returned 0 results, trying Admin API');
    
    // Fallback: Try Admin API with prefix
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: 'Photographer/Carousel',
      max_results: 500,
    });

    console.log('Home - Admin API result:', {
      resourceCount: result.resources?.length || 0,
    });

    if (result.resources && result.resources.length > 0) {
      const images = result.resources.map((resource: any) => ({
        src: resource.secure_url,
        alt: resource.public_id.split('/').pop() || 'Carousel Image',
        publicId: resource.public_id,
      }));
      console.log(`Home - Found ${images.length} images via Admin API`);
      return images;
    }

    console.warn('Home - No images found in Photographer/Carousel folder');
    return [];
  } catch (error: any) {
    console.error('Home - Error fetching carousel images from Cloudinary:', {
      message: error?.message,
      http_code: error?.http_code,
      error: error?.error,
    });
    
    // Check for IP restriction error
    if (error?.error?.message?.includes('Source IP address') && error?.error?.message?.includes('not allowed')) {
      console.error('Home - IP Access Control Error: Vercel server IP is not allowed in Cloudinary. Please add Vercel IP ranges to Cloudinary IP Access Control settings.');
    }
    
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
