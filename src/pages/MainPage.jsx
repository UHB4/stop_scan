import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import Section2 from '../components/Section2';
import Cloud from '../components/Cloud';



// 이미지 임포트
import cloudBg2 from '../assets/main/cloudBg2.png'
import carRightSide from '../assets/main/car/carRightSide.png'


export default function MainPage(){
    gsap.registerPlugin(ScrollTrigger);
    const section3Ref = useRef(null);
    const carSideRef = useRef(null);
    const titleRef = useRef(null);
    const [imagesLoaded , setImagesLoaded] = useState(false);

    useEffect(() => {
        const imageUrls = [ cloudBg2, carRightSide];
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

        ScrollTrigger.create({
            trigger: section3Container,
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

        gsap.fromTo(titleText,
            { x: '-150%', y: '30%', opacity: 1 },
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



        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [imagesLoaded]);

    if (!imagesLoaded) {
        return <div>Loading...</div>;
    }
    //

    return (
        <div className={styles.mainPage}>
            <div className={styles.section2Container}>
                <Section2
                    gsap={gsap}
                    ScrollTrigger={ScrollTrigger}
                    />
                <div className={styles.cloudContainer}>
                  <Cloud gsap={gsap}/>
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
                        <div
                            ref={titleRef}
                            className={styles.titleText}
                            >
                            STOP SCAN

                        </div>
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