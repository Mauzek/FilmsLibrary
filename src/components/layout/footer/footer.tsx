import { Icon24LogoVk } from "@vkontakte/icons";
import { images } from "@/assets";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__brand}>
            <Link to="/" className={styles.footer__brandLogo}>
              <img
                src={images.logo}
                alt="Logo KINORA"
                className={styles.footer__logo}
              />
            </Link>

            <p className={styles.footer__brandDescription}>
              Современная библиотека фильмов с удобным поиском, детальной
              информацией и возможностью онлайн просмотра. Откройте для себя мир
              кинематографа.
            </p>
          </div>

          <div className={styles.footer__contacts}>
            <h3 className={styles.footer__contactsTitle}>Контакты</h3>
            <div className={styles.footer__social}>
              <a
                href="https://vk.com/tralebys"
                target="_blank"
                className={styles.footer__socialLink}
                aria-label="ВКонтакте"
              >
                <Icon24LogoVk className={styles.footer__socialIcon} />
              </a>
              <a
                href="https://t.me/tralebys"
                target="_blank"
                className={styles.footer__socialLink}
                aria-label="Telegram"
              >
                <img
                  src={images.telegram}
                  alt="Telegram"
                  className={styles.footer__socialIcon}
                />
              </a>
              <a
                href="https://github.com/Mauzek"
                target="_blank"
                className={styles.footer__socialLink}
                aria-label="GitHub"
              >
                <img
                  src={images.gitHub}
                  alt="GitHub"
                  className={styles.footer__socialIcon}
                />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            © 2025 KINORA. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};
