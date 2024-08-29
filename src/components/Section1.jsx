import React, { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from '../pages/_MainPage.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Section1 = forwardRef((props, ref) => {
    const wheelRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const wheel = wheelRef.current;
        const section1 = ref.current;
        const scrollIndicator = scrollIndicatorRef.current;

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

        gsap.to(scrollIndicator, {
            y: 20,
            opacity: 0.5,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
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
            onEnter: () => {
                gsap.to(scrollIndicator, { opacity: 0, duration: 0.5 });
            },
            onLeaveBack: () => {
                gsap.to(scrollIndicator, { opacity: 1, duration: 0.5 });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [ref]);

    return (
        <section ref={ref} className={`${styles.stopscanItems} ${styles.section1}`}>
            <div ref={wheelRef} className={styles.wheel}></div>
            <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                </svg>
                <span>Scroll</span>
            </div>
        </section>
    );
});

export default Section1;