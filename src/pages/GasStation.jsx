import React, { useState, useEffect } from 'react';
import styles from './_GasStation.module.scss';
import { Map, MapMarker, CustomOverlayMap, Circle } from "react-kakao-maps-sdk";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../Config";



export default function GasStation() {
    const [center, setCenter] = useState({ lat: 37.566826, lng: 126.9786567 }); // 서울시청 좌표
    const [level, setLevel] = useState(3);
    const navigate = useNavigate();
    const [isMapContVisible, setIsMapContVisible] = useState(true);
    const [radius, setRadius] = useState(1); // 검색반경 초기 값을 1km로 설정
    const [gasStations, setGasStations] = useState([]); // 주유소 데이터를 저장할 상태
    const [gasStationCount, setGasStationCount] = useState(0); // 주유소 개수를 저장하는 상태
    const [selectedSort, setSelectedSort] = useState(''); // 선택된 정렬 방식을 저장하는 상태
    const [fuelType, setFuelType] = useState('B027') // 초기 연류유형 설정(휘발유)
    const [userLocation, setUserLocation] = useState(null); // 사용자 위치를 지정할 상태


    function convertMetersTokilometers(meters) {
        return (meters / 1000).toFixed(2); // 미터를 킬로미터로 변환 후, 소수점 둘째자리까지
    }


    const handleStopScan = () => {
        navigate('/mainpage')
    };
        // 사용자의 현재 위치를 가져오는 로직을 여기에 추가할 수 있습니다.
        // 예: navigator.geolocation.getCurrentPosition()
    const toggleMapContVisibility = () => {   // isMapContVisible 상태를 반전시켜 mapContWrap 을 보이거나 숨기는 함수
                                                    // isMapContVisible이 true일 때 호출되면 false로 변경하여 컨테이너숨김
                                                    // isMapContVisible이 false일 때 호출되면 true로 변경하여 컨테이너숨김
        setIsMapContVisible(!isMapContVisible);
    }

    //주유소 정보를 반경에 따라 가져오는 함수
    const fetchStationsWithRadius = (radiusValue) => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setUserLocation({lat: latitude, lng: longitude}); // 사용자 위치 업데이트
            setCenter({ lat: latitude, lng: longitude }); // 지도 중심 업데이트
            setLevel(getZoomLevel(radiusValue));
            axios.post(`${config.API_BASE_URL}/get-stations`,{
                latitude,
                longitude,
                radius: radiusValue * 1000,
                prodcd: fuelType
            })
                .then(response => {
                    console.log('API 응답 데이터:', response.data);
                    setGasStations(response.data);
                    setGasStationCount(response.data.length);
                })
                .catch(error => {
                    console.error("가져온 데이터 에러:", error)
                })
        })
    }

    const getZoomLevel = (radiusValue) => {
        switch (parseInt(radiusValue)) {
            case 1: return 5;
            case 3: return 6;
            case 5: return 7;
            default: return 6;
        }
    }


    useEffect(() => {
        fetchStationsWithRadius(radius, fuelType);
    }, [radius, fuelType]);



    const sortGasStaion = (stations, sortType) => {
        return [...stations].sort((a, b) => {
            if (sortType === 'distance') {
                return parseFloat(a.distance) - parseFloat(b.distance);
            } else if (sortType === 'price') {
                return parseFloat(a.price) - parseFloat(b.price);
            }
            return 0;
        });
    }

    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
    }
    const handleFuelTypeChange = (newFuelType) => {
        setFuelType(newFuelType);
    }

    const sortedGasStations = sortGasStaion(gasStations, selectedSort);

    const filteredStations = sortedGasStations.filter(station =>
        parseFloat(station.distance) <= radius * 1000
    );

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.mapContainer}>
                    <Map
                        center={center}
                        level={level}
                        style={{width: "100%", height: "100vh"}}
                    >
                        {userLocation && (
                            <>
                                <MapMarker
                                    position={userLocation}
                                    image={{
                                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                        size: {width: 24, height: 35}
                                    }}
                                />
                                <Circle
                                    center={userLocation}
                                    radius={radius * 1000}
                                    strokeWeight={1}
                                    strokeColor={"#75B8FA"}
                                    strokeOpacity={0.1}
                                    strokeStyle={"dash"}
                                    fillColor={"#CFE7FF"}
                                    fillOpacity={0.2}
                                />
                            </>
                        )}
                        {filteredStations.map((station, index) => (
                            <MapMarker
                                key={index}
                                position={{lat: station.latitude, lng: station.longitude}}
                                title={station.name}
                            />
                        ))}
                    </Map>
                    <div className={`${styles.mapContWrap} ${isMapContVisible ? '' : styles.hidden}`}>
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
                                step="2"
                                value={radius}
                                onChange={e => setRadius(parseInt(e.target.value))}
                                className={styles.slider}
                                list="tickmarks"
                            />
                        </div>
                        <div className={styles.listCount}>
                            <h2>총 <span>{filteredStations.length}</span>개</h2>
                            <select className={styles.sortOptions} value={selectedSort} onChange={handleSortChange}>
                                <option value="price">가격순</option>
                                <option value="distance">거리순</option>
                            </select>
                        </div>
                        <div className={styles.gasList}>
                            <ul id={styles.conList}>
                                {filteredStations.map((station, index) => (
                                    <li key={index} className={styles.on}>
                                        <a>{station.name}</a>
                                        <div className={styles.infoWrapper}>
                                            <span className={styles.price}>{station.price} </span> <span> 원</span>
                                            <span className={styles.distance}> {convertMetersTokilometers(station.distance)}km</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.fuelOptions}>
                                {[
                                    {value: 'B027', label: '휘발유'},
                                    {value: 'D047', label: '경유'},
                                    {value: 'B034', label: '고급 휘발유'},
                                    {value: 'C004', label: '실내 등유'},
                                    {value: 'K015', label: '자동차 부탄'}
                                ].map((fuel) => (
                                    <label key={fuel.value}>
                                        <input
                                            type="radio"
                                            name="fuelType"
                                            value={fuel.value}
                                            checked={fuelType === fuel.value}
                                            onChange={() => handleFuelTypeChange(fuel.value)}
                                        />
                                        <span className={styles.checkMark}>
                                            {fuel.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isMapContVisible ? (
                        <button className={styles.closeButton} onClick={toggleMapContVisibility}></button>
                    ) : (
                        <button className={styles.openButton} onClick={toggleMapContVisibility}></button>
                    )}
                </div>
            </div>
        </>
    );
}