import React from 'react';
import styles from './_LandingPage.module.scss';

export default function LandingPage() {
    return (
        <div className={styles.landingPage}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome to the Landing Page</h1>
                <p className={styles.description}>This is a simple description for the landing page.</p>
            </div>
        </div>
    );
}
