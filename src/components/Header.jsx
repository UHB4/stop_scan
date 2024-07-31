import React, { useState, useEffect } from 'react';
import styles from './_Header.module.scss';

const Header = ({ text }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        console.log("토글 후 메뉴 상태: ", isMenuOpen);
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.leftPlaceholder}></div>
                <h1 className>{text}</h1>
                <div
                    className={`${styles.rightBtn} ${isMenuOpen ? styles.on : ''}`}
                    onClick={toggleMenu}
                >
                </div>
            </div>
            {isMenuOpen && (
                <div className={styles.menuPage} onClick={toggleMenu}>
                    <ul onClick={(e) => e.stopPropagation()}>
                        <h1>STOP SCAN</h1>
                        <li>휴게소 안내</li>
                        <li>충전소 안내</li>
                        <li>주유소 안내</li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;