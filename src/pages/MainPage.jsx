import React, { useEffect, useRef } from 'react';
import styles from './_MainPage.module.scss';
import Section1 from '../components/Section1';
import Cloud from '../components/Cloud';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const carRRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const section1 = section1Ref.current;
        const section2 = section2Ref.current;
        const carRside = carRRef.current;
        const titleText = titleRef.current;

        if (section1 && section2 && carRside && titleText) {
            // Section1의 애니메이션 끝나는 지점을 트리거로 사용
            const section1EndTrigger = ScrollTrigger.create({
                trigger: section1,
                start: "top top",
                end: "+=800",
                scrub: true,
            });

            // Section2의 carMove와 텍스트 애니메이션
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section2,
                    start: "top top",
                    end: "+=1800",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    markers: true,
                    onEnter: () => section1EndTrigger.disable(),
                }
            });

            // 차 애니메이션
            mainTimeline.fromTo(carRside,
                { x: '-300%', y: '15%' },
                { x: '280%', duration: 1 }
            );

            // 텍스트 애니메이션
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
                "<0.1" // 차 애니메이션 시작 0.1초 후에 시작
            );

            // 텍스트 흔들림 효과
            gsap.to(titleText, {
                y: '+=10',
                yoyo: true,
                repeat: -1,
                duration: 0.5,
                ease: "sine.inOut"
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
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
    );
}