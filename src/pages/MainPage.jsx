import React, {useEffect, useRef, useState} from 'react';
import styles from './_MainPage.module.scss';
import Section1 from '../components/Section1';
import Cloud from '../components/Cloud';
import Header from '../components/Header';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const carRRef = useRef(null);
    const titleRef = useRef(null);
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const section1 = section1Ref.current;
        const section2 = section2Ref.current;
        const carRside = carRRef.current;
        const titleText = titleRef.current;

        if (section1 && section2 && carRside && titleText) {
            const section1EndTrigger = ScrollTrigger.create({
                trigger: section1,
                start: "top top",
                end: "+=800",
                scrub: true,
            });

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section2,
                    start: "top top",
                    end: "+=2800",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    markers: true,
                    onEnter: () => section1EndTrigger.disable(),
                }
            });

            mainTimeline.fromTo(carRside,
                { x: '-300%', y: '15%' },
                { x: '280%', duration: 1 }
            );

            mainTimeline.fromTo(titleText,
                {
                    x: '-130%',
                    y: '0%',
                    opacity: 0.5,
                    scale: 0.5,
                    filter: 'blur(5px)'
                },
                {
                    x: '0%',
                    y: '0%',
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: "power2.out"
                },
                "<0.1"
            );

            mainTimeline.to(titleText, {
                y: '-20vh',
                scale: 1.3,
                duration: 1,
                ease: "power1.in",
                color: "#CFEAF2",
            });


            mainTimeline.to(titleText, {
                y: '-48vh',
                scale: 0.1,
                duration: 1,
                color: "#ffffff",
                onComplete: () => {
                    ScrollTrigger.create({
                        trigger: section2,
                        start: "top top",
                        end: "bottom bottom",
                        onUpdate: (self) => {
                            if (self.progress > 0.7 && self.direction > 0) {
                                setShowHeader(true);
                            } else if (self.progress <= 0.7 || self.direction < 0) {
                                setShowHeader(false);
                            }
                        }
                    });
                }
            });
            mainTimeline.to(titleText, {
                y: '-45vh',
                opacity: 0
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            {showHeader && <Header text="STOP SCAN" />}
            <main className={styles.content}>
                <Section1 ref={section1Ref} />
                <section ref={section2Ref} className={`${styles.stopscanItems} ${styles.section2}`}>
                    <div className={styles.cloudContainer}>
                        <Cloud gsap={gsap}/>
                    </div>
                    <div ref={carRRef} className={styles.carRSide}></div>
                    <div ref={titleRef} className={styles.titleText}>
                        STOP SCAN
                    </div>
                </section>
                <section className={`${styles.stopscanItems} ${styles.section3}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section4}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section5}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section6}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section7}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section8}`}></section>
                <section className={`${styles.stopscanItems} ${styles.section9}`}></section>
            </main>
        </>
    );
}