'use client'

import { useState } from 'react'
import { Main } from '@/components/Main/Main'
import styles from './about.module.scss'

interface Tab {
  id: string
  label: string
  icon: string
  content: string[]
}

  const tabs: Tab[] = [
    {
      id: 'intro',
      label: 'מאחורי העדשה',
      icon: '/svgs/camera.svg',
      content: [
      'נעים להכיר, אני רולן ארשבן,',
      'לפעמים זה נראה כמו עוד חיוך אחד מתוק,',
      'או צחוק קטן שמתגלגל לכל הכיוונים.',
      'שמחה שנוצצת מרחוק, רגע קט שנעלם מהר מדי.',
      'ואני?',
      'אני כאן כדי לעצור את הרגע הזה - לפני שהוא עף.',
      '',
      'זו האהבה הכי גדולה שלי.',
      'לתעד את הגיל המתוק, את הקשר החם, את המשפחה המאושרת,',
      'את התינוקת הקטנטונת שהופ… ועוד רגע היא כבר גדולה.',
      '',
      'המצלמה בשבילי היא הרבה מעבר לכלי מקצועי -',
      'היא דרך להביא אור, שמחה ורגש אמיתי לתוך החיים שלי ושל המשפחות שאני מצלמת.',
      'כל תמונה היא עולם קטן, סיפור של נשמה,',
      'היסטוריה שתהפוך יום אחד לאגדה משפחתית שתעברו הלאה.',
    ],
  },
    {
      id: 'planning',
      label: 'תכנון וחוויה',
      icon: '/svgs/planning.svg',
      content: [
      'החזון שלי הוא ליצור עבורכם סיפור מלא, לא רק צילום.',
      'לכן כל סשן מתחיל עוד הרבה לפני שדרכתם בסטודיו:',
      '',
      '✓ יחד אנחנו בונים קונספט מותאם לכם',
      '✓ מתכננים בגדים, צבעים ורקעים',
      '✓ בוחרים לוקיישנים בטבע או סטים מיוחדים בסטודיו בפורת',
      '✓ משלבים אביזרים בטוב טעם שמחמיאים לסגנון המשפחתי שלכם',
      '',
      'המטרה?',
      'להעניק לכם חוויה נינוחה, זורמת ומדויקת — ובעיקר תמונות שמגרמות לכם לעצור ולהרגיש.',
    ],
  },
    {
      id: 'professional',
      label: 'מקצועיות מהלב',
      icon: '/svgs/heart.svg',
      content: [
      'עם שנים של ניסיון ואלפי רגעים יפים שתועדו,',
      'השקעתי בסטודיו מתקדם, בציוד איכותי ובאור שמלטף בדיוק נכון.',
      'כל פרט קטן חשוב לי: חדות, צבעים טבעיים, תאורה מחמיאה, ועיבוד עדין שמדגיש את היופי שקיים בכם כבר עכשיו.',
      '',
      'כל אלבום שיוצא ממני הוא תוצר אישי, מושקע ואוהב — ממש כמו משפחה שאני מלווה.',
    ],
  },
    {
      id: 'approach',
      label: 'רגישות וחיבור',
      icon: '/svgs/connection.svg',
      content: [
      'הסוד לצילום מוצלח הוא לא מצלמה טובה — זה האנשים.',
      'אני מאמינה ברגישות, בהקשבה ובסבלנות אינסופית לילדים ולמבוגרים כאחד.',
      'יש לי יכולת להתחבר לכל ילד דרך משחק, צחוק ופשטות — וככה נולדים הרגעים האותנטיים באמת.',
      '',
      'ואיך אני יודעת שהצלחתי?',
      'כשאני שומעת בסוף הסשן:',
      '"אמא, מתי חוזרים לשחק אצל הצלמת?"',
      'זה הרגע שבו הלב שלי מתפוצץ מאושר.',
    ],
  },
    {
      id: 'goal',
      label: 'המטרה שלי',
      icon: '/svgs/goal.svg',
      content: [
      'המשאלה הכי גדולה שלי היא שלכל משפחה יהיה אלבום אחד קטן —',
      'כזה שפותחים בשבת בצהריים על הספה,',
      'מעל צחקוקים, "תזוזי אני לא רואה", ו"רגע, הוא יושב לי על הרגל"...',
      '',
      'אלבום שמחזיר אתכם לרגעים היפים באמת.',
    ],
  },
    {
      id: 'aspiration',
      label: 'השאיפה שלי',
      icon: '/svgs/smiling.svg',
      content: [
      'שכל אמא, בכל שלב — משפחה, ילדים, הריון או ניו בורן —',
      'תאפשר לעצמה להנציח את הרגעים האלה.',
      '',
      'לא לוותר על תמונה שמספרת אהבה אמיתית,',
      'תמונה שתישאר, תרגש ותספר את הסיפור שלכם.',
    ],
  },
]

export const About = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id)
  const [isAnimating, setIsAnimating] = useState(false)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveTab(tabId)
        setIsAnimating(false)
      }, 150)
    }
  }

  return (
    <Main>
      <div className={styles.about}>
        <h1 className={styles.title}>הסיפור שלי</h1>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => handleTabChange(tab.id)}
                type="button"
                aria-label={tab.label}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <img 
                  src={tab.icon} 
                  alt="" 
                  className={styles.tabIcon}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTabContent && !isAnimating && (
              <div className={styles.content} key={activeTab}>
                {activeTabContent.content.map((paragraph, index) => (
                  paragraph ? (
                    <p key={index} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ) : (
                    <br key={index} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  )
}

