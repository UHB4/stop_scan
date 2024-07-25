import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';


export default function MainPage() {
    const section1Ref = useRef(null)

    return (
        <main className={styles.content}>
            <section ref={section1Ref} className={`${styles.stopscanItems} ${styles.section1}`}>
                <div className={styles.wheel}></div>
            </section>
            <section className={`${styles.stopscanItems} ${styles.section2}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section3}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section4}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section5}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section6}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section7}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section8}`}>

            </section>
            <section className={`${styles.stopscanItems} ${styles.section9}`}>

            </section>


        </main>
    )
}