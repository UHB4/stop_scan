import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import cloudBg from '../assets/landing/cloudBg.jpeg'
import goldWheel from '../assets/landing/goldWheel.png'
import cloudBg2 from '../assets/landing/cloudBg2.png'
import car115Angle from '../assets/landing/car/car115Angle.png'


export default function MainPage(){
    gsap.registerPlugin(ScrollTrigger);
    const wheelRef = useRef(null);
    const animationRef = useRef(null);
    const carRef = useRef(null);

    useEffect(() => {
        // goldWheel 이 위아래로 움직이게하는 애니매이션
        animationRef.current = gsap.to(wheelRef.current, {
            y: -20,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'power2.inOut',

        });

        // 스크롤시 회전 애니메이션
        gsap.to(wheelRef.current,{
            rotation: -120,
            scrollTrigger: {
                trigger: wheelRef.current,
                start: 'top 20%', //
                end: 'bottom top',
                scrub: 1,
            }

        })

        gsap.to(carRef.current, {
            y: '50vh',
            scrollTrigger: {
                trigger: carRef.current,
                start: 'top 20%',
                end: () => "+=" + window.innerHeight,
                scrub: 1,
            }
        })


    }, []);


    return (
        <div className={styles.mainPage}>

            <div className={styles.section2}>

                <img src={cloudBg} alt="cloudBg" className={styles.cloudBg}/>
                    <img
                        ref={carRef}
                        src={car115Angle}
                        alt-="car1"
                        className={styles.car115}/>
                <div className={styles.wheelContainer}>
                    <img
                        ref={wheelRef}
                        src={goldWheel}
                        alt='goldWheel'
                        className={styles.goldWheel}/>
                </div>

            </div>
            <div className={styles.section3}>
                <img src={cloudBg2} alt-='cloudBg2' className={styles.cloudBg2}/>
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