import { Main } from '@/components/Main/Main'
import styles from './terms.module.scss'

export const metadata = {
  title: 'תנאי שימוש | Rolan Arshaban Photography',
  description: 'תנאי שימוש באתר רולן ארשבן צילום – שימוש, קניין רוחני ואחריות.',
}

export default function TermsPage() {
  return (
    <Main>
      <article className={styles.page} dir="rtl">
        <h1 className={styles.title}>תנאי שימוש</h1>
        <p className={styles.lead}>
          אנא קראו את התנאים בעיון לפני השימוש באתר.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ברוכים הבאים</h2>
          <p>
            אתר זה מופעל על ידי רולן ארשבן צילום (להלן: &quot;אנו&quot; או &quot;הנהלת האתר&quot;) ומשמש כאתר תדמית ומידע בתחום צילום מקצועי – צילומי משפחה, אירועים, פורטרטים ושירותים קשורים. השימוש באתר, בתכניו ובשירותים המוצגים בו, כפוף לתנאי השימוש המפורטים להלן.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>הסכמה לתנאים</h2>
          <p>
            בעצם השימוש באתר, אתם מצהירים כי קראתם, הבנתם והסכמתם לתנאי שימוש אלה. אם אינכם מסכימים לאחד או יותר מהתנאים – הנכם מתבקשים שלא לעשות שימוש באתר.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>שינויים ועדכונים</h2>
          <p>
            הנהלת האתר שומרת לעצמה את הזכות לעדכן, לשנות או להפסיק את תנאי השימוש, כולם או חלקם, בכל עת וללא הודעה מוקדמת. המשך השימוש באתר לאחר עדכון התנאים מהווה הסכמה לתנאים המעודכנים.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>זכויות יוצרים וקניין רוחני</h2>
          <p>
            כל התכנים המופיעים באתר, לרבות טקסטים, עיצובים, גרפיקות, לוגואים, תמונות, קוד, סרטונים וכל חומר אחר, הינם בבעלות רולן ארשבן צילום או בשימוש ברישיון, ומוגנים על פי דיני זכויות יוצרים. אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות כל שימוש מסחרי בתכנים ללא אישור מראש ובכתב.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>אחריות והגבלת אחריות</h2>
          <p>
            המידע באתר מוצג לצרכי מידע כללי בלבד ואינו מהווה התחייבות למתן שירות. הנהלת האתר אינה אחראית לכל נזק ישיר או עקיף שייגרם כתוצאה משימוש באתר או מהסתמכות על המידע המופיע בו.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>פרטיות ואבטחת מידע</h2>
          <p>
            הנהלת האתר מכבדת את פרטיות המשתמשים ופועלת לשמירה על אבטחת המידע הנמסר לה. מידע אישי שיימסר באמצעות טפסי יצירת קשר ישמש אך ורק לצורך יצירת קשר ומתן מענה לפנייה, ולא יועבר לצדדים שלישיים ללא הסכמה מפורשת, למעט אם נדרש על פי דין.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>שימוש בעוגיות (Cookies)</h2>
          <p>
            האתר עשוי להשתמש בעוגיות (Cookies) לצורך תפעול תקין, שיפור חוויית המשתמש וניתוח סטטיסטי. המשך השימוש באתר מהווה הסכמה לשימוש בעוגיות אלו.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>כשירות לשימוש באתר</h2>
          <p>
            השימוש באתר מיועד למשתמשים מעל גיל 18 בלבד. המשתמשים מתחייבים שלא לעשות שימוש באתר למטרות בלתי חוקיות או הפוגעות בזכויות צד שלישי.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>יצירת קשר</h2>
          <p>
            לשאלות, בירורים או פניות בנוגע לתנאי שימוש אלה, ניתן ליצור קשר באמצעות <a href="/contact" className={styles.inlineLink}>עמוד צור קשר</a> באתר.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>דין וסמכות שיפוט</h2>
          <p>
            תנאי שימוש אלו כפופים לדיני מדינת ישראל, וסמכות השיפוט הבלעדית בכל מחלוקת נתונה לבתי המשפט המוסמכים בישראל.
          </p>
        </section>
      </article>
    </Main>
  )
}
