import React, { useState, useEffect } from 'react';
import styles from './_GasStation.module.scss';
import { Map, MapMarker, CustomOverlayMap, Circle } from "react-kakao-maps-sdk";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../Config";
import repair from "../assets/icons/repair.svg"
import carWash from "../assets/icons/carWash.png"
import shoppingCart from "../assets/icons/shoppingCart.svg"
import fuelIcon from "../assets/icons/fuel.png"


// 브랜드 로고 이미지 import
import GSCLogo from "../assets/brandLogos/GSC.png";
import HDOLogo from "../assets/brandLogos/HDO.png";
import NHOLogo from "../assets/brandLogos/NHO.png";
import RTELogo from "../assets/brandLogos/RTE.png";
import RTXLogo from "../assets/brandLogos/RTX.png";
import SKELogo from "../assets/brandLogos/SKE.png";
import SKGLogo from "../assets/brandLogos/SKG.png";
import SOLLogo from "../assets/brandLogos/SOL.png";

// 주유 코드를 한글로 변환하는 함수
const getProductName = (productCode) => {
    switch (productCode) {
        case 'B027' : return '휘발유';
        case 'D047' : return '경유';
        case 'B034' : return '고급휘발유';
        case 'C004' : return '실내유';
        case 'K015' : return '자동차부탄';
        default: return '알 수 없음';
    }
};

// 날짜와 시간 포맷팅 함수
const formatDateTime = (date, time) => {
    const formattedDate = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
    const formattedTime = `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;
    return { formattedDate, formattedTime };
};


// 브랜드 로고 매핑 객체
const brandbrandLogos = {
    GSC: GSCLogo,
    HDO: HDOLogo,
    NHO: NHOLogo,
    RTE: RTELogo,
    RTX: RTXLogo,
    SKE: SKELogo,
    SKG: SKGLogo,
    SOL: SOLLogo,
};

export default function GasStation() {
    const [center, setCenter] = useState({ lat: 37.566826, lng: 126.9786567 }); // 서울시청 좌표
    const [level, setLevel] = useState(3);
    const navigate = useNavigate();
    const [isMapContVisible, setIsMapContVisible] = useState(true);
    const [isDetailVisible, setIsDetailVisible] = useState(true);
    const [radius, setRadius] = useState(1); // 검색반경 초기 값을 1km로 설정
    const [gasStations, setGasStations] = useState([]); // 주유소 데이터를 저장할 상태
    const [gasDetail, setGasDetail] = useState([]);
    const [gasStationCount, setGasStationCount] = useState(0); // 주유소 개수를 저장하는 상태
    const [selectedSort, setSelectedSort] = useState(''); // 선택된 정렬 방식을 저장하는 상태
    const [fuelType, setFuelType] = useState('B027') // 초기 연류유형 설정(휘발유)
    const [userLocation, setUserLocation] = useState(null); // 사용자 위치를 지정할 상태
    const [isVisble, setIsVisible] = useState(true);
    const [selectedStation, setSelectedStation] = useState(null);
    const [selectedStationId, setSelectedStationId] = useState(null);


    function convertMetersTokilometers(meters) {
        return (meters / 1000).toFixed(2); // 미터를 킬로미터로 변환 후, 소수점 둘째자리까지
    }


    const handleStopScan = () => {
        navigate('/')
    };
    const toggleMapContVisibility = () => {   // isMapContVisible 상태를 반전시켜 mapContWrap 을 보이거나 숨기는 함수
                                                    // isMapContVisible이 true일 때 호출되면 false로 변경하여 컨테이너숨김
                                                    // isMapContVisible이 false일 때 호출되면 true로 변경하여 컨테이너숨김
        setIsMapContVisible(!isMapContVisible);
    }
    const toggleDetailVisibility = () => {
        setIsDetailVisible(!isDetailVisible);
    }

    //주유소 정보를 반경에 따라 가져오는 함수
    const fetchStationsWithRadius = (radiusValue) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                console.log('사용자위치:', latitude, longitude);
                setUserLocation({lat: latitude, lng: longitude});
                setCenter({ lat: latitude, lng: longitude });
                setLevel(getZoomLevel(radiusValue));

                axios.post(`${config.API_BASE_URL}/get-stations`, {
                    latitude,
                    longitude,
                    radius: radiusValue * 1000,
                    prodcd: fuelType
                })
                    .then(response => {
                        console.log('주유소 데이터:', response.data);
                        setGasStations(response.data);
                        setGasStationCount(response.data.length);
                    })
                    .catch(error => {
                        console.error("가져온 데이터 에러:", error)
                    })
            },
            error => {
                console.error("위치를 가져오는데 실패했습니다:", error);
            },
            options
        );
    }

    const fetchStationDetail = (stationId)=> {
        axios.post(`${config.API_BASE_URL}/stations-detail`, {
            id: stationId,
        })

            .then(response => {
                setSelectedStation(response.data[0])
                console.log('주유소 디테일 데이터:', response.data);
            })
            .catch(error => {
                console.error("주유소 디테일 가져오기 실패:", error);
            })
    }



    // 반경 선택에 따라 맵에 줌 레벨 설정
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



    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 1000);

        return () => clearInterval(intervalId);
    })



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


    const handleStationClick = (stationId) => {
        fetchStationDetail(stationId);
        setIsDetailVisible(true);
        setSelectedStationId(stationId);
    };


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
                                    strokeWeight={2}
                                    strokeColor={"#78CFE0"}
                                    strokeOpacity={isVisble ? 0.7 : 0}
                                    fillColor={"#e5effc"}
                                    fillOpacity={isVisble ? 0.5 : 0}
                                />
                            </>
                        )}
                        {filteredStations.map((station, index) => (
                            <React.Fragment key={index}>
                                <MapMarker
                                    position={{lat: station.latitude, lng: station.longitude}}
                                    image={{
                                        src: fuelIcon,
                                        size: {
                                            width: 24,
                                            height: 35
                                        },
                                    }}
                                    title={station.name}
                                    onClick={() => handleStationClick(station.station_id)}
                                />
                                {selectedStationId === station.station_id && (
                                    <Circle
                                        center={{lat: station.latitude, lng: station.longitude}}
                                        radius={40}
                                        strokeColor={"#548DEE"}
                                        strokeOpacity={0.7}
                                        strokeStyle={"solid"}
                                        fillColor={"#78CFE0"}
                                        fillOpacity={1}
                                    />
                                )}
                            </React.Fragment>
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
                                    <li
                                        key={index}
                                        className={`${styles.on} ${selectedStationId === station.station_id ? styles.selected : ''}`}
                                        onClick={() => handleStationClick(station.station_id)}
                                    >
                                        <a>{station.name}</a>
                                        <div className={styles.infoWrapper}>
                                            <span className={styles.price}>{station.price} </span> <span> 원</span>
                                            <span
                                                className={styles.distance}> {convertMetersTokilometers(station.distance)}km</span>
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

                    {/*====================================상세페이지 부분========================================================*/}



                    {selectedStation && selectedStation.oil_prices && selectedStation.oil_prices.length > 0 && (
                        <div className={`${styles.detailPage} ${isDetailVisible ? '' : styles.hidden}`}>
                            <div className={styles.LogoBox}>
                                <div className={styles.LogoBox}>
                                    {selectedStation.brand && brandbrandLogos[selectedStation.brand] ? (
                                        <img
                                            src={brandbrandLogos[selectedStation.brand]}
                                            alt={`${selectedStation.brand} 로고`}
                                            className={styles.Logo}
                                        />
                                    ) : (
                                        <div className={styles.Logo}>로고 없음</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.titDetail}>
                                <h2>{selectedStation.name}</h2>
                                <p>{selectedStation.tel}</p>
                                <p>{selectedStation.address}</p>
                            </div>
                            <h3>편의시설</h3>
                            <div className={styles.iconBox}>
            <span className={styles.icons}>
              {selectedStation.repair === 'Y' && (
                  <div className={styles.iconTxt}>
                      <img src={repair} alt="경정비 시설"/>
                      <span>경정비 시설</span>
                  </div>
              )}
                {selectedStation.car_wash === 'Y' && (
                    <div className={styles.iconTxt}>
                        <img src={carWash} alt="세차장"/>
                        <span>세차장</span>
                    </div>
                )}
                {selectedStation.store === 'Y' && (
                    <div className={styles.iconTxt}>
                        <img src={shoppingCart} alt="편의점"/>
                        <span>편의점</span>
                    </div>
                )}
            </span>
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.infoTit}>
                                    <h3>유류정보</h3>
                                    <div className={styles.upDate}>
                                        <span>마지막 업데이트</span>
                                        {(() => {
                                            const {date, time} = selectedStation.oil_prices[0];
                                            const {formattedDate, formattedTime} = formatDateTime(date, time);
                                            return (
                                                <>
                                                    <span className={styles.updateDate}>{formattedDate}</span>
                                                    <span className={styles.updateTime}>{formattedTime}</span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <div className={styles.fuelBox}>
                                    <table className={styles.fuelTable}>
                                        <thead>
                                        <tr>
                                            <th>유종</th>
                                            <th>가격</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {selectedStation.oil_prices.map((oil, index) => (
                                            <tr key={index}>
                                                <td>{getProductName(oil.product_code)}</td>
                                                <td>{oil.price}원</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <button className={styles.closeButton2} onClick={toggleDetailVisibility}></button>


                        </div>
                    )}
                </div>
            </div>
        </>
    );
}