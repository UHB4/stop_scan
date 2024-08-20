import React, { useState, useEffect } from 'react';
import styles from './_ElecStation.module.scss';
import { Map, MapMarker, CustomOverlayMap, Circle } from "react-kakao-maps-sdk";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import slowChargingIcon from "../assets/icons/slowCharging.svg";
import ac3Icon from "../assets/icons/AC3.svg";
import dcChademoIcon from "../assets/icons/DCchademo.svg";
import dcComboIcon from "../assets/icons/DCcombo.svg";
import closeMark from "../assets/icons/closeMark.svg";
export default function ElecStation() {
    const [center, setCenter] = useState({ lat: 37.566826, lng: 126.9786567 }); // 서울시청 좌표
    const [level, setLevel] = useState(3);
    const navigate = useNavigate();
    const [showTypeBox, setShowTypeBox] = useState(false);



    const handleStopScan = () => {
        navigate('/')
    };
    const toggleTypeBox = () => {
        setShowTypeBox(!showTypeBox)
    }

    const chargerTypes = [
        {name: '완속', icon: slowChargingIcon},
        {name: 'AC3상', icon: ac3Icon},
        {name: '차데모', icon: dcChademoIcon},
        {name: 'DC콤보', icon: dcComboIcon},
    ];

    return (
        <>
            <div className={styles.wrap}>
                {/*header 시작*/}
                <header className={styles.header}>
                    <div className={styles.inner}>
                        <h1 onClick={handleStopScan}>STOP SCAN</h1>
                    </div>
                </header>
                {/*header 끝*/}

                <div className={styles.flexItems}>
                    <div className={styles.selectItems}>
                        <div className={styles.selectButtons}>
                            <button onClick={toggleTypeBox}>
                                <div className={styles.chargerType}>
                                    충전기타입
                                    <span className={styles.caret}></span>
                                </div>
                            </button>
                            <button>
                                <div className={styles.chargerPace}>
                                    충전속도
                                    <span className={styles.caret}></span>
                                </div>
                            </button>


                            <button>충전가능</button>
                            <button>외부인개방</button>
                            <button>무료주차</button>
                        </div>
                    </div>
                </div>
                {/*충전기타입 선택 박스*/}
                {showTypeBox && (
                <div className={styles.chooseType}>
                    <div className={styles.typeWrap}>
                        <div className={styles.titleBox}>
                            <span>타입</span>
                            <img
                                src={closeMark}
                                alt="close"
                                className={styles.closeIcon}
                                onClick={toggleTypeBox}
                                />
                        </div>
                        <div className={styles.typeGrid}>
                            {chargerTypes.map((type, index) => (
                                <button key={index} className={styles.typeButton}>
                                    <img src={type.icon} alt={type.name} className={styles.typeIcon}/>
                                    <span>{type.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className={styles.applyBox}>
                            <button className={styles.reset}>초기화</button>
                            <button className={styles.apply}>적용하기</button>
                        </div>
                    </div>
                </div>
                )}
                {/*충전기타입 선택 박스 끝*/}


                <div className={styles.mapContainer}>
                    <Map
                        center={center}
                        level={level}
                        style={{width: "100%", height: "100vh"}}
                    >

                    </Map>
                </div>
            </div>
        </>
    )
}