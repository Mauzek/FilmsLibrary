import { useState } from 'react'
import styles from './accordion.module.scss'
import type { AccordionProps } from './types'
import { Icon24Chevron } from '@vkontakte/icons'

export const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.accordion}>
      <button 
        className={styles.accordion__header}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls="accordion-content"
        type="button"
      >
        <h3 className={styles.accordion__title}>{title}</h3>
        <Icon24Chevron 
          className={`${styles.accordion__icon} ${isOpen ? styles['accordion__icon--open']: ''}`}
        />
      </button>
      
      <div 
        id="accordion-content"
        className={`${styles.accordion__content} ${isOpen ? styles['accordion__content--open'] : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.accordion__body}>
          {children}
        </div>
      </div>
    </section>
  )
}
