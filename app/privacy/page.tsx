import { Main } from '@/components/Main/Main'
import styles from './privacy.module.scss'

export const metadata = {
  title: 'מדיניות פרטיות | Rolan Arshaban Photography',
  description: 'מדיניות פרטיות – איסוף, שימוש ושמירה על המידע שלכם באתר רולן ארשבן צילום.',
}

export default function PrivacyPage() {
  return (
    <Main>
      <article className={styles.page} dir="rtl">
        <h1 className={styles.title}>מדיניות פרטיות</h1>
        <p className={styles.lead}>
          הפרטיות שלך חשובה לנו. מדיניות זו מסבירה איך אנחנו אוספים, משתמשים ומגנים על המידע שלך.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>הקדמה</h2>
          <p>
            רולן ארשבן צילום (להלן: &quot;אנחנו&quot;) מכבדת את פרטיות המשתמשים באתר. מדיניות פרטיות זו מסבירה איזה מידע נאסף באתר, כיצד נעשה בו שימוש, כיצד הוא נשמר, ומהן זכויותיך כמשתמש.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>איסוף מידע</h2>
          <p>בעת שימוש באתר, ייתכן שייאסף מידע מהסוגים הבאים:</p>
          <ul>
            <li>מידע שנמסר מרצונך, כגון שם, כתובת דוא&quot;ל, מספר טלפון ותוכן פנייה דרך טפסי יצירת קשר</li>
            <li>מידע טכני וסטטיסטי הנאסף באופן אוטומטי, כגון כתובת IP, סוג דפדפן, מערכת הפעלה, זמני גלישה ודפי צפייה</li>
            <li>אנחנו אינה אוספת ביודעין מידע רגיש או מידע על קטינים</li>
            <li>האתר אינו מיועד לילדים מתחת לגיל 18, ואין איסוף ביודעין של מידע אישי מקטינים</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>מטרות השימוש במידע</h2>
          <p>המידע שנאסף משמש לצרכים הבאים:</p>
          <ul>
            <li>מענה לפניות ומתן שירותים</li>
            <li>תפעול, תחזוקה ושיפור חוויית השימוש באתר</li>
            <li>ניתוח סטטיסטי ואנליטי של פעילות באתר</li>
            <li>יצירת קשר, שליחת עדכונים ותכנים – בכפוףכמתך</li>
            <li>עמידה בדרישות הדין והגנה על זכויות משפטיות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>שמירת מידע ואחסונו</h2>
          <p>
            המידע נשמר במערכות מאובטחות וננקטים אמצעים סבירים לשמירה על סודיותו. המידע עשוי להישמר או לעבור עיבוד גם מחוץ לישראל, לרבות באמצעות שירותי ענן בינלאומיים.
          </p>
          <p>
            המידע יישמר כל עוד הוא נדרש למטרות המפורטות במדיניות זו, או בהתאם לחובות חוקיות.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>שיתוף מידע עם צדדים שלישיים</h2>
          <p>אנחנו עשויים לשתף מידע עם ספקי שירות חיצוניים הפועלים מטעמנו, כגון:</p>
          <ul>
            <li>שירותי אחסון ושרתים</li>
            <li>כלי אנליטיקה ומדידה</li>
            <li>שירותי דיוור ותשתיות טכנולוגיות</li>
          </ul>
          <p>
            השיתוף ייעשה רק לצורך מתן השירות ובהתאם לדין. ספקים אלה מחויבים לשמור על סודיות ואבטחת המידע. אנחנו לא נמכור ולא נשכיר מידע אישי לצדדים שלישיים.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>עוגיות (Cookies) וכלי מדידה</h2>
          <p>האתר עושה שימוש בעוגיות (Cookies) ובכלי מדידה דיגיטליים, כגון Google Analytics, לצורך:</p>
          <ul>
            <li>ניתוח תנועה ושימוש באתר</li>
            <li>שיפור חוויית המשתמש</li>
            <li>התאמת תכנים</li>
          </ul>
          <p>ניתן לחסום או למחוק עוגיות באמצעות הגדרות הדפדפן. חסימה זו עשויה להשפיע על תפקוד האתר.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>בסיס חוקי לעיבוד מידע</h2>
          <p>עיבוד המידע מתבצע על בסיס אחד או יותר מאלה:</p>
          <ul>
            <li>הסכמת המשתמש</li>
            <li>אינטרס לגיטימי</li>
            <li>חובה חוקית</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>זכויות המשתמש</h2>
          <p>בהתאם לדין, אתה רשאי:</p>
          <ul>
            <li>לעיין במידע שנאסף עליך</li>
            <li>לבקש תיקון או מחיקה של מידע</li>
            <li>להתנגד או להגביל עיבוד מידע</li>
            <li>לבקש הסרה מרשימות תפוצה</li>
          </ul>
          <p>
            פניות בנושא ניתן לשלוח באמצעות עמוד <a href="/contact" className={styles.inlineLink}>צור קשר</a> או לכתובת הדוא&quot;ל המופיעה באתר.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>יצירת קשר ותלונות</h2>
          <p>
            לשאלות או בקשות בנוגע למדיניות זו ניתן לפנות אלינו דרך עמוד צור קשר. כמו כן, עומדת לך הזכות לפנות לרשות להגנת הפרטיות בישראל במקרה של טענה לפגיעה בפרטיות.
          </p>
        </section>

        <section className={styles.section}>
          <p>
            אנחנו רשאים לעדכן מדיניות פרטיות זו מעת לעת. תאריך העדכון האחרון יופיע בראש העמוד.
          </p>
          <p className={styles.muted}>עודכן לאחרונה: פברואר 2026</p>
        </section>
      </article>
    </Main>
  )
}
