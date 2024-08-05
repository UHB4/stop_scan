import React, { useState, useEffect } from 'react';
import styles from './_GasStation.module.scss';
import { Map, MapMarker, CustomOverlayMap, Circle } from "react-kakao-maps-sdk";
import {useNavigate} from "react-router-dom";

export default function GasStation({ radius, stations }) {
    const [center, setCenter] = useState({ lat: 37.566826, lng: 126.9786567 }); // 서울시청 좌표
    const [level, setLevel] = useState(3);
    const navigate = useNavigate();

    const handleStopScan = () => {
        navigate('/mainpage')
    };
        // 사용자의 현재 위치를 가져오는 로직을 여기에 추가할 수 있습니다.
        // 예: navigator.geolocation.getCurrentPosition()


    return (
        <>
            <div className={styles.wrap}>
                    {/*=======================================맵 부분 ==========================================*/}
                <div className={styles.mapContainer}>
                    <Map

                        center={center}
                        level={level}
                        style={{width: "100%", height: "100vh"}}
                    >
                    </Map>
                    <div className={styles.mapContWrap}>
                        <div className={styles.mapMenu}>
                            <h1 style={{color: "white", fontWeight: "900", cursor: "pointer"}}
                                onClick={handleStopScan}>STOP SCAN</h1>
                            <div className={styles.distCont}>
                                <span className={styles.mark}>1km</span>
                                <span className={styles.mark}>3km</span>
                                <span className={styles.mark}>5km</span>
                            </div>
                            <input
                                type="range"
                                id="radiusSlider"
                                name="radius"
                                min="1"
                                max="5"
                                step="2" // 1, 3, 5만 선택 가능
                                value={radius}
                                // onChange={e => setRadius(e.target.value)}
                                className={styles.slider}
                                list="tickmarks"
                                />
                        </div>
                        <div className={styles.listCount}>
                            <h2>총 <span>15</span>개</h2>
                            <select className={styles.sortOptions}>
                                <option>거리순</option>
                                <option>가격순</option>
                            </select>
                        </div>
                        <div className={styles.gasList}>
                            <ul id={styles.conList}>
                                <li className={styles.on}>
                                    <a>말죽거리 주유소</a>
                                    <div className={styles.infoWrapper}>
                                        <span className={styles.price}>1736 </span> <span> 원</span>
                                        <span className={styles.distance}> 1.41km</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}