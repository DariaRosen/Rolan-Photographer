import styles from "./home.module.scss";
import { Main } from "@/components/Main/Main";
import { Carousel } from "@/components/Carousel/carousel";
import { cloudinary } from "@/lib/cloudinary";

async function getCarouselImages() {
  try {
    const result = await cloudinary.search
      .expression('folder:carousel')
      .sort_by([{ created_at: 'desc' }])
      .max_results(50)
      .execute();

    const images = result.resources.map((resource: any) => ({
      src: resource.secure_url,
      alt: resource.public_id.split('/').pop() || 'Carousel Image',
    }));

    return images;
  } catch (error) {
    console.error('Error fetching carousel images from Cloudinary:', error);
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
        <div className={styles.carouselSection}>
          <Carousel images={carouselImages} />
        </div>
      </div>
    </Main>
  );
};
