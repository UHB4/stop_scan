import React, { useRef, useEffect } from 'react';
import styles from './_Cloud.module.scss';
import cloud1 from '../assets/main/cloud/cloud1.png';
import cloud2 from '../assets/main/cloud/cloud2.png';
import cloud3 from '../assets/main/cloud/cloud3.png';
import cloud4 from '../assets/main/cloud/cloud4.png';

export default function Cloud({ gsap }) {
    const cloudRef1 = useRef(null);
    const cloudRef2 = useRef(null);
    const cloudRef3 = useRef(null);
    const cloudRef4 = useRef(null);

    useEffect(() => {
        const cloud1 = cloudRef1.current;
        const cloud2 = cloudRef2.current;
        const cloud3 = cloudRef3.current;
        const cloud4 = cloudRef4.current;

        gsap.set(cloud1, {
            xPercent: -50,
            left: "50%",
            bottom: "-20%",
            position: "absolute",
            zIndex: 10
        });
        gsap.set(cloud2, {
            xPercent: -50,
            left: "50%",
            bottom: "-20%",
            position: "absolute",
            zIndex: 11
        });
        gsap.set(cloud3, {
            xPercent: -50,
            left: "80%",
            bottom: "-10%",
            position: "absolute",
            zIndex: 12
        });
        gsap.set(cloud4, {
            xPercent: -50,
            left: "15%",
            bottom: "-10%",
            position: "absolute",
            zIndex: 12
        });

    }, [gsap]);

    return (
        <div className={styles.cloudContainer}>
            <img ref={cloudRef1} src={cloud1} alt='cloud1' className={styles.cloud} />
            <img ref={cloudRef2} src={cloud2} alt='cloud2' className={styles.cloud} />
            <img ref={cloudRef3} src={cloud3} alt='cloud3' className={styles.cloud} />
            <img ref={cloudRef4} src={cloud4} alt='cloud4' className={styles.cloud} />
        </div>
    );
}