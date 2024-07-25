import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './_Cloud.module.scss';
import cloud1 from '../assets/main/cloud/cloud1.png';
import cloud2 from '../assets/main/cloud/cloud2.png';
import cloud3 from '../assets/main/cloud/cloud3.png';
import cloud4 from '../assets/main/cloud/cloud4.png';
import cloud5 from '../assets/main/cloud/cloud5.png';
import cloud6 from '../assets/main/cloud/cloud6.png';
import cloud7 from '../assets/main/cloud/cloud7.png';
import cloud8 from '../assets/main/cloud/cloud8.png';
import cloud9 from '../assets/main/cloud/cloud9.png';

gsap.registerPlugin(ScrollTrigger);

export default function Cloud() {
    const cloudRefs = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const clouds = cloudRefs.current;
        const container = containerRef.current;

        // 초기 위치 설정
        clouds.forEach((cloud, index) => {
            gsap.set(cloud, {
                xPercent: -50,
                left: `${(index + 1) * 10}%`,
                bottom: "-20%",
                position: "absolute",
                zIndex: 10 + index,
                scale: 1 + (index % 3) * 0.1,
                rotation: (index % 2 === 0) ? 5 : -5,
                opacity: 1  // 초기에 투명하게 설정
            });
        });

        // 메인 타임라인 생성
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "+=9000",
                scrub: 1,
                markers: true,
            }
        });

        // 각 구름에 대한 애니메이션 추가
        clouds.forEach((cloud, index) => {
            tl.to(cloud, {
                y: `-${100 + index * 20}%`,
                opacity: 1,
                scale: 0.8,
                duration: 1,
                ease: "power1.inOut"
            }, index * 0.01);  // 각 구름의 애니메이션 시작을 0.2초씩 지연
        });

    }, []);

    return (
        <div ref={containerRef} className={styles.cloudContainer}>
            {[cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7, cloud8, cloud9].map((cloud, index) => (
                <img
                    key={index}
                    ref={el => cloudRefs.current[index] = el}
                    src={cloud}
                    alt={`cloud${index + 1}`}
                    className={styles.cloud}
                />
            ))}
        </div>
    );
}