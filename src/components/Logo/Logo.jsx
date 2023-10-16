import styles from './Logo.module.css';

function Logo({ image }) {
    console.log('Logo');

    return <img className={styles.logo} src='/logo.svg' alt="Логотип журнала" />;
}

export default Logo;
