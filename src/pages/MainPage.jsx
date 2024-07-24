import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import Section2 from '../components/Section2';
import Cloud from '../components/Cloud';
import Header from '../components/Header';

// 이미지 임포트
import cloudBg2 from '../assets/main/cloudBg2.png'
import carRightSide from '../assets/main/car/carRightSide.png'

export default function MainPage() {
    gsap.registerPlugin(ScrollTrigger);
    const section3Ref = useRef(null);
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

        const section3Container = document.querySelector(`.${styles.section3Container}`);
        const section3 = section3Ref.current;
        const carSide = carSideRef.current;
        const titleText = titleRef.current;
        const header = headerRef.current;

        ScrollTrigger.create({
            trigger: section3Container,
            start: "top top",
            end: "bottom top",
            pin: section3,
            pinSpacing: false,
        });

        gsap.fromTo(carSide,
            { x: '-200%', y: '50%' },
            {
                x: '230%',
                scrollTrigger: {
                    trigger: section3Container,
                    start: "top top",
                    end: "bottom top",
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
                    trigger: section3Container,
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
                trigger: section3Container,
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
        <div className={styles.mainPage}>
            {showHeader && <Header ref={headerRef} text="STOP SCAN" />}
            <div className={styles.section2Container}>
                <Section2 gsap={gsap} ScrollTrigger={ScrollTrigger} />
                <div className={styles.cloudContainer}>
                    <Cloud gsap={gsap} />
                </div>
            </div>

            <div className={styles.section3Container}>
                <div ref={section3Ref} className={styles.section3}>
                    <img src={cloudBg2} alt='cloudBg2' className={styles.cloudBg2} />
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
                </div>
            </div>
            <div className={styles.section4}></div>
            <div className={styles.section5}></div>
            <div className={styles.section6}></div>
            <div className={styles.section7}></div>
            <div className={styles.section8}></div>
        </div>
    )
}