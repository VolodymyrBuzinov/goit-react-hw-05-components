import PropTypes from 'prop-types';
import styles from './Section.module.css'
import { CSSTransition } from 'react-transition-group';

export default function Section({title, children }) {
  return (
  <section className={styles.whoo}>
        <CSSTransition in={true} appear={true} timeout={5000} classNames={styles} unmountOnExit>
        <h1>{title}</h1>
      </CSSTransition>
      {children}
  </section> 
);
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};