import React, { useEffect, useRef } from 'react';
import styles from './_MainPage.module.scss';
import Section1 from '../components/Section1';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const carRRef = useRef(null);

    useEffect(() => {
        const section1 = section1Ref.current;
        const section2 = section2Ref.current;
        const carRside = carRRef.current;

        if (section1 && section2 && carRside) {
            // Section1의 애니메이션 끝나는 지점을 트리거로 사용
            const section1EndTrigger = ScrollTrigger.create({
                trigger: section1,
                start: "top top",
                end: "+=800",  // Section1의 end 값과 일치시킴
                scrub: true,
            });

            // Section2의 carMove 애니메이션
            const carMove1 = gsap.timeline({
                scrollTrigger: {
                    trigger: section2,
                    start: "top top",
                    end: "+=1800",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    markers: true,
                    // Section1의 애니메이션이 끝난 후에 시작
                    onEnter: () => section1EndTrigger.disable(),
                }
            });

            carMove1.fromTo(carRside,
                { x: '-300%', y: '50%' },
                { x: '280%', duration: 1 }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <main className={styles.content}>
            <Section1 ref={section1Ref} />
            <section ref={section2Ref} className={`${styles.stopscanItems} ${styles.section2}`}>
                <div ref={carRRef} className={styles.carRSide}></div>
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