import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import cloudBg from '../assets/landing/cloudBg.jpeg'
import goldWheel from '../assets/landing/goldWheel.png'
import cloudBg2 from '../assets/landing/cloudBg2.png'
import car115Angle from '../assets/landing/car/car115Angle.png'
import carRightSide from '../assets/landing/car/carRightSide.png'

export default function MainPage(){
    gsap.registerPlugin(ScrollTrigger);
    const wheelRef = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const carSideRef = useRef(null);

    useEffect(() => {
        const section2Container = document.querySelector(`.${styles.section2Container}`);
        const section3Container = document.querySelector(`.${styles.section3Container}`);
        const section2 = section2Ref.current;
        const section3 = section3Ref.current;
        const wheel = wheelRef.current;
        const carSide = carSideRef.current



        ScrollTrigger.create({
            trigger:section2Container,
            start: "top top",
            end: "bottom bottom",
            pin: section2,
            pinSpacing: false,
        })

        gsap.to(wheel,{
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


        ScrollTrigger.create({
            trigger:section3Container,
            start: "top top",
            end: "bottom top",
            pin: section3,
            pinSpacing: false,
        });

        gsap.fromTo(carSide,
            { x: '-200%', y: '50%'},
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
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);
    //

    return (
        <div className={styles.mainPage}>
            <div className={styles.section2Container}>

                <div ref={section2Ref} className={styles.section2}>
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

            <div className={styles.section3Container}>
                <div ref={section3Ref} className={styles.section3}>
                    <img src={cloudBg2} alt-='cloudBg2' className={styles.cloudBg2}/>
                    <div className={styles.carContainer}>
                        <img
                            ref={carSideRef}
                            src={carRightSide}
                            alt='carSide'
                            className={styles.carSide}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.section4}>

            </div>
            <div className={styles.section5}>

            </div>
            <div className={styles.section6}>

            </div>
            <div className={styles.section7}>

            </div>
            <div className={styles.section8}>

            </div>
        </div>

    )
}