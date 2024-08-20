import React, { useState, useEffect } from 'react';
import styles from './_Header.module.scss';
import {Link} from "react-router-dom";

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
                <h1>{text}</h1>
                <div
                    className={`${styles.rightBtn} ${isMenuOpen ? styles.on : ''}`}
                    onClick={toggleMenu}
                >
                </div>
            </div>
            <div className={`${styles.menuPage} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                <ul onClick={(e) => e.stopPropagation()}>
                    <h1>STOP SCAN</h1>
                    <li><Link to="/RestAreaInfo">휴게소 안내</Link></li>
                    <li><Link to="/GasStation">주유소 안내</Link></li>
                    <li><Link to="/ElecStation">충전소 안내</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;