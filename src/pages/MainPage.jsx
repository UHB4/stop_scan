import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import Section1 from '../components/section1';
import Cloud from '../components/Cloud';
import Header from '../components/Header';

// 이미지 임포트
import cloudBg2 from '../assets/main/cloudBg2.png'
import carRightSide from '../assets/main/car/carRightSide.png'

export default function MainPage() {
    gsap.registerPlugin(ScrollTrigger);
    const section2Ref = useRef(null);
    const carSideRef = useRef(null);
    const titleRef = useRef(null);
    const headerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const imageUrls = [cloudBg2, carRightSide];
        let loadedImages = 0;

        imageUrls.forEach((url) => {
            const img = new Image();
            img.onload = () => {
                loadedImages++;
                if (loadedImages === imageUrls.length) {
                    setImagesLoaded(true);
                }
            };
            img.src = url;
        });
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        const section2Container = document.querySelector(`.${styles.section2Container}`);
        const section2 = section2Ref.current;
        const carSide = carSideRef.current;
        const titleText = titleRef.current;
        const header = headerRef.current;

        ScrollTrigger.create({
            trigger: section2Container,
            start: "top top",
            end: "bottom top",
            pin: section2,
            pinSpacing: false,
        });

        gsap.fromTo(carSide,
            { x: '-200%', y: '50%' },
            {
                x: '230%',
                scrollTrigger: {
                    trigger: section2,
                    start: "top top",
                    end: "bottom top",
                    pin: section2,
                    pinSpacing: false,
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(titleText,
            { x: '-150%', y: '30%', opacity: 1, scale: 1 },
            {
                x: '0%',
                opacity: 1,
                scrollTrigger: {
                    trigger: section2Container,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                ease: "power1.inOut"
            }
        );

        // New animation for the title text and header
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section2Container,
                start: "bottom top",
                end: "bottom -100%",
                scrub: 1,
                onEnter: () => setShowHeader(true),
                onLeaveBack: () => setShowHeader(false),
            }
        });

        tl.to(titleText, {
            scale: 1.2,
            y: '-30%',
            duration: 1
        })
            .to(titleText, {
                scale: 0.5,
                y: '-100%',
                opacity: 0,
                duration: 1
            })
            .fromTo(header,
                { y: '-100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 0.5 },
                "-=1"
            );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [imagesLoaded]);

    if (!imagesLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.mainPage}>
            {showHeader && <Header ref={headerRef} text="STOP SCAN"/>}
            <div className={styles.section1Container}>
                <Section1 gsap={gsap} ScrollTrigger={ScrollTrigger}/>
                <div className={styles.cloudContainer}>
                    <Cloud gsap={gsap}/>
                </div>
            </div>

            <div className={styles.section2Container}>
                <section ref={section2Ref} className={`${styles.section2} ${styles.stopscanItems}`}>
                    <img src={cloudBg2} alt='cloudBg2' className={styles.cloudBg2}/>
                    <div className={styles.carContainer}>
                        <img
                            ref={carSideRef}
                            src={carRightSide}
                            alt='carSide'
                            className={styles.carSide}
                        />
                        <div ref={titleRef} className={styles.titleText}>
                            STOP SCAN
                        </div>
                    </div>
                </section>
            </div>
            <section className={`${styles.section3} ${styles.stopscanItems}`}></section>
            <section className={`${styles.section4} ${styles.stopscanItems}`}></section>
            <section className={`${styles.section5} ${styles.stopscanItems}`}></section>
            <section className={`${styles.section6} ${styles.stopscanItems}`}></section>
            <section className={`${styles.section3} ${styles.stopscanItems}`}></section>
        </main>
    )
}