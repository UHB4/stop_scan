import React from 'react';
import styles from './_LandingPage.module.scss';
import keyHole from '../assets/landing/carKeyHole.jpg'

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <div className={styles.holeBox}>
                <img src={keyHole} alt="keyHole" />
            </div>
        </div>
    );
}
