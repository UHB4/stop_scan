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

    useEffect(() => {
        const clouds = cloudRefs.current;

        // 초기 위치 설정
        clouds.forEach((cloud, index) => {
            gsap.set(cloud, {
                xPercent: -50,
                left: `${(index + 1) * 10}%`,
                bottom: "-20%",
                position: "absolute",
                zIndex: 10 + index,
                scale: 1 + (index % 3) * 0.1,
                rotation: (index % 2 === 0) ? 5 : -5  // 짝수 인덱스는 5도, 홀수 인덱스는 -5도 회전
            });
        });

        // 스크롤 애니메이션 설정
        clouds.forEach((cloud, index) => {
            gsap.to(cloud, {
                y: `-${100 + index * 20}%`,  // 인덱스에 따라 조금씩 다른 높이로 이동
                opacity: 0,
                scale: 0.8,
                scrollTrigger: {
                    trigger: cloud,
                    start: `top ${-30 - index * 5}%`,  // 인덱스에 따라 시작 지점을 조금씩 다르게 설정
                    end: `top ${20 - index * 5}%`,
                    scrub: 1,
                    markers: true, // 디버깅을 위해 마커를 표시합니다.
                }
            });
        });

    }, []);

    return (
        <div className={styles.cloudContainer}>
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