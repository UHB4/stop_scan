import React,{ useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import styles from './_LandingPage.module.scss';
import keyHole from '../assets/landing/carKeyHole.jpg'

export default function LandingPage() {
    gsap.registerPlugin(ScrollTrigger);
    const imgRef = useRef(null);

    useEffect(() => {
        gsap.to(imgRef.current, {
            opacity:1,
            y: -20, // y축으로 20이동
            repeat: -1, // 무한반복
            yoyo: true, // 다시 원래위치로 돌아옴
            duration: 1,
            ease: 'power1.inOut',

        })
    }, []);


    return (
        <div className={styles.landingPage}>
            <div className={styles.section1}>
                <div className={styles.holeBox}>
                <img ref={imgRef}src={keyHole} alt="keyHole" />
                </div>
            </div>
        </div>
    );
}
