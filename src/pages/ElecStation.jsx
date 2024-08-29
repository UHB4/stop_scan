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
import bolt from "../assets/icons/bolt.svg";
import config from "../Config.jsx";
export default function ElecStation() {
    const [center, setCenter] = useState({ lat: 37.566826, lng: 126.9786567 }); // 초기값은 서울시청
    const [level, setLevel] = useState(3);
    const navigate = useNavigate();
    const [showTypeBox, setShowTypeBox] = useState(false);
    const [showPastBox, setShowPastBox] = useState(false);
    const [radius, setRadius] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserLocation()
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newCenter = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('내 위도 경도 ', newCenter)
                    setCenter(newCenter);
                    setIsLoading(false);
                    fetchStations(newCenter);
                },
                (error) => {
                    console.error("위치 정보를 가져오는데 실패:", error);
                    setError("위치 정보를 가져오는데 실패. 기본 위치(서울시청)을 사용.");
                    setIsLoading(false);
                    fetchStations(center); // 기본 위치로 API 호출
                }
            );
        } else {
            setError("이 브라우저에서는 geolocation지원안됨.");
            setIsLoading(false);
            fetchStations(center); // 기본 위치로 API 호출
        }
    };

    const fetchStations = async (location) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/find-stations`, {
                latitude: location.lat,
                longitude: location.lng,
                radius: radius * 1000 // km를 m로 변환
            });
            console.log('서버에서 받은 데이터:', response.data);
        } catch (error) {
            console.log('에러 났네:', error);
            setError("충전소 정보를 가져오는데 실패했습니다.");
        }
    };


    const handleStopScan = () => {
        navigate('/')
    };
    const toggleTypeBox = () => {
        setShowTypeBox(!showTypeBox);
        setShowPastBox(false);
    }

    const togglePastBox = () => {
        setShowPastBox(!showPastBox);
        setShowTypeBox(false);
    }

    const chargerTypes = [
        {name: '완속', icon: slowChargingIcon},
        {name: 'AC3상', icon: ac3Icon},
        {name: '차데모', icon: dcChademoIcon},
        {name: 'DC콤보', icon: dcComboIcon},
    ];

    const pastTypes = [
        {name: '3kW'},
        {name: '7kW'},
        {name: '50kW'},
        {name: '100kW'},
        {name: '200kW'},
    ]

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
                            <button onClick={togglePastBox}>
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
                )}
                {/*충전기타입 선택 박스 끝*/}

                {/*충전속도 선택 박스 */}
                {showPastBox && (
                    <div className={styles.choosePast}>
                        <div className={styles.titleBox2}>
                            <span>충전속도</span>
                            <img
                                src={closeMark}
                                alt="close"
                                className={styles.closeIcon}
                                onClick={togglePastBox}
                            />
                        </div>
                        <div className={styles.pastGrid}>
                            {pastTypes.map((type, index) => (
                                <button key={index} className={styles.pastButton}>
                                    <span>{type.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className={styles.applyBox}>
                            <button className={styles.reset}>초기화</button>
                            <button className={styles.apply}>적용하기</button>
                        </div>
                    </div>


                )}
                {/*충전속도 선택 박스 끝*/}


                <div className={styles.mapContainer}>
                    {isLoading ? (
                        <div>위치 정보를 가져오는 중입니다...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <Map
                            center={center}
                            level={level}
                            style={{width: "100%", height: "100vh"}}
                        >
                            <MapMarker position={center}/>
                            {/* 여기에 충전소 마커들을 추가할 수 있습니다 */}
                        </Map>
                    )}
                </div>
                <div className={styles.mapContWrap}>
                    <div className={styles.chargerCount}>
                        내 주변 충전소 <span>51</span>개
                    </div>
                    <div className={styles.distContWrap}>
                        <input
                            type="range"
                            id="radiusSlider"
                            name="radius"
                            min="1"
                            max="5"
                            step="2"
                            value={radius}
                            onChange={e => setRadius(parseInt(e.target.value))}
                            className={styles.slider}
                            list="tickmarks"
                        />
                        <div className={styles.distCont}>
                            <span className={styles.mark}>1km</span>
                            <span className={styles.mark}>3km</span>
                            <span className={styles.mark}>5km</span>
                        </div>
                    </div>
                    <div className={styles.elecList}>
                        <div className={styles.elecTitle}>서울시 성동구 환경보전협회</div>
                        <div className={styles.elecInfo}>
                            <span>비개방</span>
                            <span>무료주차</span>
                        </div>
                        <div className={styles.elecState}>
                            <img
                                src={bolt}
                                alt="bolt"
                                className={styles.boltIcons}
                            />
                            <span className={styles.volume}>7 kW 완속</span>
                            <span className={styles.stat}>충전원할 3 / 11</span>
                        </div>
                    </div>
                    <div className={styles.elecList}>
                        <div className={styles.elecTitle}>서울시 성동구 환경보전협회</div>
                        <div className={styles.elecInfo}>
                            <span>비개방</span>
                            <span>무료주차</span>
                        </div>
                        <div className={styles.elecState}>
                            <img
                                src={bolt}
                                alt="bolt"
                                className={styles.boltIcons}
                            />
                            <span className={styles.volume}>7 kW 완속</span>
                            <span className={styles.stat}>충전원할 3 / 11</span>
                        </div>
                    </div>
                    <div className={styles.elecList}>
                        <div className={styles.elecTitle}>서울시 성동구 환경보전협회</div>
                        <div className={styles.elecInfo}>
                            <span>비개방</span>
                            <span>무료주차</span>
                        </div>
                        <div className={styles.elecState}>
                            <img
                                src={bolt}
                                alt="bolt"
                                className={styles.boltIcons}
                            />
                            <span className={styles.volume}>7 kW 완속</span>
                            <span className={styles.stat}>충전원할 3 / 11</span>
                        </div>
                    </div>
                </div>
                {/*    충전소 정보 모달 끝 */}
            </div>
        </>
    )
}