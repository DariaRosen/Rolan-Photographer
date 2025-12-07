import styles from "./home.module.scss";
import { Main } from "@/components/Main/Main";
import { Carousel } from "@/components/Carousel/carousel";

async function getCarouselImages() {
  console.log('=== Starting getCarouselImages (fetching from API route) ===');
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/carousel`;
    
    console.log('Fetching from API route:', url);
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    console.log('API response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', errorText);
      return [];
    }

    const data = await response.json();
    console.log('API response data:', {
      success: data.success,
      imageCount: data.images?.length || 0,
      error: data.error,
    });

    if (data.success && data.images && data.images.length > 0) {
      console.log(`Successfully fetched ${data.images.length} images from API`);
      console.log('All image URLs being returned:', data.images.map((img: any) => img.src));
      return data.images;
    }

    console.warn('No images returned from API');
    return [];
  } catch (error: any) {
    console.error('=== Error fetching from API route ===');
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return [];
  }
}

export const Home = async () => {
  const carouselImages = await getCarouselImages();
  return (
    <Main>
      <div className={styles.home}>
        <div className={styles.contentSection}>
          <p className={styles.description} dir="rtl">
            «הרגעים הקטנים עם המשפחה היום הם פרקי הנוסטלגיה של העתיד»
          </p>
        </div>
        {carouselImages.length > 0 && (
          <div className={styles.carouselSection}>
            <Carousel images={carouselImages} />
          </div>
        )}
      </div>
    </Main>
  );
};
