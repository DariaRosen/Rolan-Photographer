"use client";

import Image from "next/image";
import { Main } from "@/components/Main/Main";
import styles from "./contact.module.scss";

export const Contact = () => {
  return (
    <Main>
      <div className={styles.contact}>
        <div className={styles.intro}>
          <p className={styles.mainText}>זמינה לכל שאלה!</p>
          <p className={styles.subText}>בואו נתכנן יחד יום בלתי נשכח!</p>
        </div>

        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images 2/Capture.PNG"
              alt="Child with phone"
              fill
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.content}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a href="tel:0542281004" className={styles.link}>
                  054-228-1004
                </a>
              </div>

              <div className={styles.contactItem}>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a href="mailto:rolan@gmail.com" className={styles.link}>
                  rolan@gmail.com
                </a>
              </div>

              <div className={styles.contactItem}>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.location}>מושב פורת</span>
              </div>

              <div className={styles.socialLinks}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <svg
                    className={styles.socialIcon}
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg
                    className={styles.socialIcon}
                    viewBox="0 0 24 24"
                    fill="url(#instagram-gradient)"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="instagram-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#833AB4" />
                        <stop offset="50%" stopColor="#E1306C" />
                        <stop offset="100%" stopColor="#FCAF45" />
                      </linearGradient>
                    </defs>
                    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.105 2.291 18.929 2.469 19.634 2.74C20.399 3.049 21.028 3.459 21.66 4.091C22.292 4.723 22.702 5.352 23.011 6.117C23.282 6.822 23.46 7.646 23.518 8.901C23.576 10.167 23.588 10.547 23.588 13.751C23.588 16.955 23.576 17.335 23.518 18.6C23.46 19.855 23.282 20.679 23.011 21.384C22.702 22.149 22.292 22.778 21.66 23.41C21.028 24.042 20.399 24.452 19.634 24.761C18.929 25.032 18.105 25.21 16.85 25.268C15.584 25.326 15.204 25.338 12 25.338C8.796 25.338 8.416 25.326 7.15 25.268C5.895 25.21 5.071 25.032 4.366 24.761C3.601 24.452 2.972 24.042 2.34 23.41C1.708 22.778 1.298 22.149 0.989 21.384C0.718 20.679 0.54 19.855 0.482 18.6C0.424 17.335 0.412 16.955 0.412 13.751C0.412 10.547 0.424 10.167 0.482 8.901C0.54 7.646 0.718 6.822 0.989 6.117C1.298 5.352 1.708 4.723 2.34 4.091C2.972 3.459 3.601 3.049 4.366 2.74C5.071 2.469 5.895 2.291 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.132 4.905 0.333 4.14 0.63C3.304 0.964 2.603 1.382 1.896 2.09C1.188 2.796 0.771 3.497 0.436 4.333C0.139 5.098 -0.062 5.968 -0.001 7.246C0.059 8.525 0.073 8.934 0.073 12.192C0.073 15.45 0.059 15.859 0.001 17.137C-0.062 18.415 0.139 19.285 0.436 20.05C0.771 20.886 1.188 21.587 1.896 22.293C2.603 23 3.304 23.417 4.14 23.752C4.905 24.05 5.775 24.251 7.053 24.31C8.333 24.37 8.741 24.384 12 24.384C15.259 24.384 15.668 24.37 16.946 24.31C18.224 24.251 19.094 24.05 19.859 23.752C20.695 23.417 21.396 23 22.103 22.293C22.809 21.587 23.226 20.886 23.561 20.05C23.858 19.285 24.059 18.415 24.118 17.137C24.178 15.859 24.192 15.45 24.192 12.192C24.192 8.934 24.178 8.525 24.118 7.246C24.059 5.968 23.858 5.098 23.561 4.333C23.226 3.497 22.809 2.796 22.103 2.09C21.396 1.382 20.695 0.964 19.859 0.63C19.094 0.333 18.224 0.132 16.946 0.072C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM17.846 6.392C18.539 6.392 19.096 5.834 19.096 5.141C19.096 4.448 18.539 3.89 17.846 3.89C17.153 3.89 16.594 4.448 16.594 5.141C16.594 5.834 17.153 6.392 17.846 6.392Z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="TikTok"
                >
                  <svg
                    className={styles.socialIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.3215 5.2815C18.6751 4.91089 18.1328 4.37504 17.747 3.72682C17.3613 3.0786 17.1456 2.33978 17.1215 1.5815H13.6815V16.9015C13.6677 17.4928 13.4239 18.0561 13.0038 18.471C12.5837 18.8859 12.0221 19.119 11.4415 19.1215C10.2615 19.1215 9.2415 18.4015 8.8215 17.3815C8.6015 16.8615 8.5015 16.2915 8.5415 15.7215C8.5815 15.1515 8.7615 14.6015 9.0615 14.1215C9.4815 13.4215 10.2015 12.9515 11.0015 12.9015V9.3315C8.6115 9.3815 6.5615 11.0915 6.1015 13.4015C5.6415 15.7115 6.8715 18.0215 8.9615 19.0215C11.0515 20.0215 13.5915 19.5215 15.1415 17.7815V21.5815H19.3215V5.2815Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
