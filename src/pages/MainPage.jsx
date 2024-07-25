import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';


export default function MainPage() {
    const section1Ref = useRef(null);
    const wheelRef = useRef(null);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const wheel = wheelRef.current;
        const section1 = section1Ref.current;

        const wheelRotate = gsap.timeline();
        wheelRotate.to(wheel, {
            rotation: 120,
            duration: 1,
            ease: 'none',
        })
        ScrollTrigger.create({
            animation: wheelRotate,
            trigger: section1,
            start: " top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            // pinSpacing: false,
            anticipatePin: 1,
            markers: true,
        });

        return () => {

            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        };


    }, []);

    return (

        <main className={styles.content}>
            <section ref={section1Ref} className={`${styles.stopscanItems} ${styles.section1}`}>
                <div ref={wheelRef} className={styles.wheel}></div>
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