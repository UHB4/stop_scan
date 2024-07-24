import React from 'react';
import styles from './_Header.module.scss';

const Header = ({ text }) => {
    return (
        <header className={styles.header}>
            <h1>{text}</h1>
        </header>
    );
};

export default Header;