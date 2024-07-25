import React, { useEffect, useRef,useState } from 'react';
import styles from './_Section1.module.scss';
import cloudBg from '../assets/main/cloudBg.jpeg';
import goldWheel from '../assets/main/goldWheel.png';

export default function Section1({ gsap, ScrollTrigger }) {
    const wheelRef = useRef(null);
    const section2Ref = useRef(null);


    useEffect(() => {
        const wheel = wheelRef.current;
        const section2 = section2Ref.current;
        const section2Container = document.querySelector(`.${styles.section2Container}`);

        // goldWheel 초기 위치상태설정
        gsap.set(wheel, {
            xPercent: -50,
            yPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute"
        });

        ScrollTrigger.create({
            trigger: section2Container,
            start: "top top",
            end: "bottom bottom",
            pin: section2,
            pinSpacing: false,
        });

        gsap.to(wheel, {
            rotation: 120,
            scrollTrigger: {
                trigger: section2Container,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to(wheel, {
            y: -20,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'power2.inOut',
        });



    }, [gsap, ScrollTrigger]);
    return (
        <div className={styles.section1Container}>
            <div className={styles.section1}>
                <img src={cloudBg} alt="cloudBg" className={styles.cloudBg}/>
                <div className={styles.wheelContainer}>
                    <img
                        ref={wheelRef}
                        src={goldWheel}
                        alt='goldWheel'
                        className={styles.goldWheel}
                    />
                </div>
            </div>
        </div>
    );


}