import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_LandingPage.module.scss';
import keyHole from '../assets/carKeyHole.jpg';

export default function LandingPage() {
    gsap.registerPlugin(ScrollTrigger);
    const imgRef = useRef(null);
    const animationRef = useRef(null); // 애니메이션 객체를 저장할 변수
    const [isRotating, setIsRotating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        animationRef.current = gsap.to(imgRef.current, {
            opacity: 1.3,
            y: -20, // y축으로 20이동
            repeat: -1, // 무한반복
            yoyo: true, // 다시 원래위치로 돌아옴
            duration: 1,
            ease: 'power1.inOut',
        });


        // 마우스 오버 시 애니메이션 멈추기
        const handleMouseOver = () => {
            animationRef.current.pause();
            gsap.to(imgRef.current, {
                opacity: 1.3,
                duration: 0.3,
                ease: 'power1.inOut',
            });
        };

        // 마우스 아웃 시 애니메이션 재시작
        const handleMouseOut = () => {
            animationRef.current.resume();
        };

        const handleClick = () => {
            if (!isRotating) {
                setIsRotating(true);
                animationRef.current.pause();
                gsap.to(imgRef.current, {
                    rotation: 120,
                    duration: 2,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        navigate('/mainpage')
                    }
                })
            }
        }


        const imgElement = imgRef.current;
        imgElement.addEventListener('mouseover', handleMouseOver);
        imgElement.addEventListener('mouseout', handleMouseOut);
        imgElement.addEventListener('click', handleClick);

        return () => {
            imgElement.removeEventListener('mouseover', handleMouseOver);
            imgElement.removeEventListener('mouseout', handleMouseOut);
            imgElement.removeEventListener('click', handleClick);
            animationRef.current.kill(); // 애니메이션 완전히 제거
        };
    }, [isRotating, navigate]);
    return (
        <div className={styles.landingPage}>
            <section className={styles.section}>
                <div className={styles.holeBox}>
                    <img ref={imgRef}
                         src={keyHole}
                         alt="keyHole"
                         style={{ cursor: 'pointer' }}
                    />
                </div>
            </section>
        </div>
    );
}
