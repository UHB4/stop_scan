import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import cloudBg from '../assets/main/cloudBg.jpeg'
import goldWheel from '../assets/main/goldWheel.png'
import cloudBg2 from '../assets/main/cloudBg2.png'
import car115Angle from '../assets/main/car/car115Angle.png'
import carRightSide from '../assets/main/car/carRightSide.png'
import cloud1 from '../assets/main/cloud/cloud1.png'
import cloud2 from '../assets/main/cloud/cloud2.png'
import cloud3 from '../assets/main/cloud/cloud3.png'
import cloud4 from '../assets/main/cloud/cloud3.png'

export default function MainPage(){
    gsap.registerPlugin(ScrollTrigger);
    const wheelRef = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const carSideRef = useRef(null);
    const cloudRef1 = useRef(null);
    const cloudRef2 = useRef(null);
    const cloudRef3 = useRef(null);
    const cloudRef4 = useRef(null);
    const titleRef = useRef(null);
    const [imagesLoaded , setImagesLoaded] = useState(false);

    useEffect(() => {
        const imageUrls = [cloudBg, goldWheel, cloudBg2, carRightSide, cloud1];
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
        const section3Container = document.querySelector(`.${styles.section3Container}`);
        const section2 = section2Ref.current;
        const section3 = section3Ref.current;
        const wheel = wheelRef.current;
        const carSide = carSideRef.current;
        const cloud1 = cloudRef1.current;
        const cloud2 = cloudRef2.current;
        const cloud3 = cloudRef3.current;
        const cloud4 = cloudRef4.current;
        const titleText = titleRef.current;

        // goldWheel 초기 위치상태설정
        gsap.set(wheel, {
            xPercent: -50,
            yPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute"
        });

        // cloud1,2,3 초기위치 설정
        gsap.set(cloud1, {
            xPercent: -50,
            left: "50%",
            bottom: "-20%",
            position: "absolute",
            zindex: 10
        });
        gsap.set(cloud2, {
            xPercent: -50,
            left: "50%",
            bottom: "-20%",
            position: "absolute",
            zindex: 11
        });
        gsap.set(cloud3, {
            xPercent: -50,
            left: "80%",
            bottom: "-10%",
            position: "absolute",
            zindex: 12
        });

        gsap.set(cloud4, {
            xPercent: -50,
            left: "15%",
            bottom: "-10%",
            position: "absolute",
            zindex: 12
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
            { x: '-100%', y: '30%', opacity: 1 },
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

        // // STOP SCAN 텍스트에 흔들리는 효과 추가
        // gsap.to(titleText, {
        //     y: '+=10',
        //     rotation: 0.5,
        //     duration: 1,
        //     repeat: -1,
        //     yoyo: true,
        //     ease: "sine.inOut"
        // });

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
                <div className={styles.cloudContainer}>
                    <img
                        ref={cloudRef1}
                        src={cloud1}
                        alt='cloud1'
                        className={styles.cloud}
                    />
                    <img
                        ref={cloudRef2}
                        src={cloud2}
                        alt='cloud2'
                        className={styles.cloud}
                    />
                    <img
                        ref={cloudRef3}
                        src={cloud3}
                        alt='cloud1'
                        className={styles.cloud}
                    />
                    <img
                        ref={cloudRef4}
                        src={cloud4}
                        alt='cloud4'
                        className={styles.cloud}
                    />
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