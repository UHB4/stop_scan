import React, { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from '../pages/_MainPage.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Section1 = forwardRef((props, ref) => {
    const wheelRef = useRef(null);

    useEffect(() => {
        const wheel = wheelRef.current;
        const section1 = ref.current;

        const wheelRotate = gsap.timeline();
        wheelRotate.to(wheel, {
            rotation: 120,
            duration: 2,
            ease: 'none',
        });

        gsap.to(wheel, {
            y: -20,
            yoyo: true,
            repeat: -1,
            duration: 1,
            ease: 'power2.inOut',
        });

        ScrollTrigger.create({
            animation: wheelRotate,
            trigger: section1,
            start: "top top",
            end: "+=800",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            // markers: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [ref]);

    return (
        <section ref={ref} className={`${styles.stopscanItems} ${styles.section1}`}>
            <div ref={wheelRef} className={styles.wheel}></div>
        </section>
    );
});

export default Section1;