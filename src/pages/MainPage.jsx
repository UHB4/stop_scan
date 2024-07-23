import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './_MainPage.module.scss';
import cloudBg from '../assets/landing/cloudBg.jpeg'
import goldWheel from '../assets/landing/goldWheel.png'


export default function MainPage(){
    gsap.registerPlugin(ScrollTrigger);
    const imgRef = useRef(null)





    return (
        <div className={styles.mainPage}>
            <div className={styles.section2}>
                <img src={cloudBg} alt="cloudBg" className={styles.cloudBg}/>
                <div className={styles.wheelContainer}>
                    <img src={goldWheel} alt='goldWheel' className={styles.goldWheel}/>
                </div>
            </div>
        </div>

    )
}