import styles from "./home.module.scss";
import { Main } from "@/components/Main/Main";
import { Carousel } from "@/components/Carousel/carousel";

// Hardcoded images
const carouselImages = [
  { src: "/images/photo1.PNG", alt: "Photography Portfolio Image 1" },
  { src: "/images/photo2.PNG", alt: "Photography Portfolio Image 2" },
  { src: "/images/photo3.PNG", alt: "Photography Portfolio Image 3" },
  { src: "/images/photo4.PNG", alt: "Photography Portfolio Image 4" },
  { src: "/images/photo5.PNG", alt: "Photography Portfolio Image 5" },
  { src: "/images/photo6.PNG", alt: "Photography Portfolio Image 6" },
  { src: "/images/photo7.PNG", alt: "Photography Portfolio Image 7" },
];

export const Home = () => {
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
