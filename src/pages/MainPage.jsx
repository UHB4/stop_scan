import React, { useEffect, useRef, useState } from 'react';
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
    const car115Ref = useRef(null);

    useEffect(() => {
        console.log('useEffect 시작됨');
        const section1 = section1Ref.current;
        const section2 = section2Ref.current;
        const carRside = carRRef.current;
        const titleText = titleRef.current;
        const car115Angle = car115Ref.current;

        if (section1 && section2 && carRside && titleText && car115Angle) {
            console.log('모든 ref가 사용 가능함');

            // 초기에 car115Angle을 숨깁니다.
            // gsap.set(car115Angle, { autoAlpha: 0, display: 'none' });
            console.log('car115Angle에 초기 gsap.set 적용됨');

            // Section 1 애니메이션
            const section1EndTrigger = ScrollTrigger.create({
                trigger: section1,
                start: "top top",
                end: "+=800",
                scrub: true,
            });

            // 메인 타임라인 (Section 2)
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section2,
                    start: "top top",
                    end: "+=2000",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    onEnter: () => {
                        section1EndTrigger.disable();
                        console.log('메인 타임라인 진입');
                    },
                    onLeave: () => console.log('메인 타임라인 이탈'),
                    toggleActions: "play none none reverse"
                }
            });

            // carRside 애니메이션
            mainTimeline.fromTo(carRside,
                {x: '-300%', y: '15%', autoAlpha: 1},
                {
                    x: '280%',
                    y: '15%',
                    duration: 1,
                    ease: "power1.inOut",
                    onUpdate: function() {
                        console.log('carRside 애니메이션 진행도:', this.progress());
                        if (this.progress() > 0.9) {
                            gsap.set(carRside, {autoAlpha: 0, display: 'none'});
                        } else {
                            gsap.set(carRside, {autoAlpha: 1, display: 'block'});
                        }
                    }
                }
            );

            // titleText 애니메이션
            mainTimeline.fromTo(titleText,
                {x: '-130%', y: '0%', autoAlpha: 0.5, scale: 0.5, filter: 'blur(5px)'},
                {x: '0%', y: '0%', autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: "power2.out"},
                "<0.1"
            )
                .to(titleText, {y: '-20vh', scale: 1.3, duration: 1, ease: "power1.in", color: "#CFEAF2"})
                .to(titleText, {y: '-48vh', scale: 0.1, duration: 1, color: "#ffffff"})
                .to(titleText, {y: '-45vh', autoAlpha: 0});

            // car115Angle 애니메이션
            const car115Timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section2,
                    start: "center ", // 섹션의 중앙이 화면 중앙에 오면 시작
                    end: "+=2000", // 스크롤 2000px 동안 애니메이션 진행
                    scrub: true,
                    // onEnter: () => {
                    //     console.log('car115Angle 애니메이션 진입');
                    //     gsap.set(car115Angle, { autoAlpha: 1, display: 'block' });
                    // },
                    // onLeave: () => console.log('car115Angle 애니메이션 이탈'),
                    // toggleActions: "play none none reverse"
                }
            });

            car115Timeline.fromTo(car115Angle,
                {  x: '60vw', y:'30vh' },
                {
                    x:'-250vw',
                    y:'250vh' ,
                    rotation: 35,
                    duration: 1,
                    ease: "power1.inOut",
                    // onStart: () => {
                    //     console.log('car115Angle 애니메이션 시작');
                    // },
                    // onUpdate: function() {
                    //     console.log('car115Angle 애니메이션 진행도:', this.progress());
                    // },
                    // onComplete: () => {
                    //     console.log('car115Angle 애니메이션 완료');
                    //     // gsap.set(car115Angle, {autoAlpha: 0, display: 'none'});
                    // }
                }
            );

            // Header 표시 설정
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

        return () => {
            console.log('정리 함수 호출됨');
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            {showHeader && <Header text="STOP SCAN"/>}
            <main className={styles.content}>
                <div className="scroll-container">
                    <Section1 ref={section1Ref}/>
                    <section ref={section2Ref} className={`${styles.stopscanItems} ${styles.section2}`}>
                        <div className={styles.cloudContainerTop}>
                            <Cloud position = "top"/>

                        </div>
                        <div ref={carRRef} className={styles.carRSide}></div>
                        <div ref={titleRef} className={styles.titleText}>
                            STOP SCAN
                        </div>
                        <div ref={car115Ref} className={styles.car115Angle}></div>
                        <div className={styles.cloudContainerBottom}>
                            <Cloud position="bottom"/>
                        </div>
                    </section>
                    <section className={`${styles.stopscanItems} ${styles.section3}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section4}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section5}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section6}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section7}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section8}`}></section>
                    <section className={`${styles.stopscanItems} ${styles.section9}`}></section>
                </div>
            </main>
        </>
    );
}