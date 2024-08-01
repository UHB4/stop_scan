import React, {useEffect, useRef, useState} from 'react';
import styles from './_RestAreaInfo.module.scss';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import shopping from '../assets/icons/shoppingCart.svg';
import breastFeeding from '../assets/icons/breastFeeding.svg';
import rest from '../assets/icons/rest.svg';
import shower from '../assets/icons/shower.svg';
import laundry from '../assets/icons/laundry.svg';
import wheat from '../assets/icons/wheat.svg';
import bed from '../assets/icons/bed.svg'

export default function RestAreaInfo() {
    const [position, setPosition] = useState({lat:36.5, lng: 127.5});
    const [zoomLevel, setZoomLevel] = useState(12);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const selectedItemRef = useRef(null);
    const [selectedRestArea, setSelectedRestArea] = useState(null);
    // 통합된 API 응답 데이터를 저장할 상태
    const [combinedData, setCombinedData] = useState(null);
    // 현재 선택된 방향
    const [selectedDirection, setSelectedDirection] = useState('상행');

    const handleStopScan = () => {
        navigate('/mainpage')
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    // 새로운 함수: 여러 API 요청을 동시에 수행하는 함수
    const fetchAllData = async (routeNm) => {
        try {
            const urls = [
                `http://localhost:5000/restareas?route=${encodeURIComponent(routeNm)}`,
                `http://localhost:5000/restbrands?routeNm=${encodeURIComponent(routeNm)}`,
                `http://localhost:5000/fuelprices?routeNm=${encodeURIComponent(routeNm)}`,
                `http://localhost:5000/facilities?routeNm=${encodeURIComponent(routeNm)}`,
                `http://localhost:5000/bestfoods?routeNm=${encodeURIComponent(routeNm)}`
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => response.json()));

            const [restAreas, restBrands, fuelPrices, facilities, bestFoods] = data;

            const combined = {
                restAreas,
                restBrands,
                fuelPrices,
                facilities,
                bestFoods
            };

            setCombinedData(combined);
            console.log('통합된 휴게소 데이터:', combined);  // 콘솔에 통합된 데이터 출력
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // handleOptionClick 함수 수정
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        // 선택된 옵션으로 통합 API 요청 트리거
        fetchAllData(option);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    const handleRestAreaClick = (restArea) => {
        setSelectedRestArea(restArea);
    };

    const closeDetailPage = () => {
        setSelectedRestArea(null);
    }

    //방향 버튼 클릭 핸들러
    const handleDirectionClick = (direction) => {
        setSelectedDirection(direction);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        if (isOpen && selectedItemRef.current && listRef.current) {
            const listRect = listRef.current.getBoundingClientRect();
            const selectedItemRect = selectedItemRef.current.getBoundingClientRect();

            listRef.current.scrollTop = selectedItemRect.top - listRect.top - listRect.height / 2 + selectedItemRect.height / 2;
        }
    }, [isOpen]);

    // useEffect 수정
    useEffect(() => {
        if (selectedOption) {
            fetchAllData(selectedOption);
        }
    }, [selectedOption]);

    const options = [
        "동해선", "중부내륙선", "호남선", "수도권제1순환선", "울산포항선", "상주영덕선",
        "서울양양선", "광주대구선", "주용로", "군도7호", "평택제천선", "상주영천선",
        "지방도", "수도권제2순환선(봉담-동탄)", "진무로", "일반국도7호선", "익산장수선",
        "중앙선", "밀양울산선", "중앙선(대구-부산)", "인천국제공항선", "진용로",
        "부산외곽선", "호남지선", "부산울산선", "호남선(천안-논산)", "국도3호선",
        "호남고속도로", "대전통영선", "중부선", "남해선", "중부내륙", "중부내륙지선",
        "대구포항선", "평택시흥선", "무안광주선", "경부선", "당진영덕선", "서천공주선",
        "세종포천선(구리-포천)", "서해안선", "영동선", "순천완주선", "광주원주선",
        "서울양양선(서울-춘천)", "서울외곽순환선"
    ];

    const getFilteredRestAreas = () => {
        if (!combinedData || !combinedData.restAreas) return [];

        // 중복 제거 및 필터링을 위한 Set 객체 생성
        const uniqueRestAreas = new Set();

        const filteredAreas = combinedData.restAreas
            .map(restArea => {
                // 각 항목의 이름을 수정
                let modifiedName = typeof restArea.휴게소명 === 'string' ? restArea.휴게소명 : String(restArea.휴게소명);
                if (!modifiedName.includes('휴게소')) {
                    modifiedName += '휴게소';
                }
                return {...restArea, 휴게소명: modifiedName};
            })
            .filter(restArea => {
                // 선택된 방향에 맞는 휴게소만 필터링
                if (
                    (selectedDirection === '상행' && restArea.도로노선방향 === '상행') ||
                    (selectedDirection === '하행' && restArea.도로노선방향 === '하행')
                ) {
                    // 중복 체크 (수정된 이름으로)
                    if (!uniqueRestAreas.has(restArea.휴게소명)) {
                        uniqueRestAreas.add(restArea.휴게소명);
                        return true;  // 필터링된 결과에 포함
                    }
                }
                return false;
            });

        return filteredAreas;
    }
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.mapContWrap}>
                    <div className={styles.mapMenu}>
                        <h1 style={{color :"white", fontWeight: "900", cursor: "pointer"}} onClick={handleStopScan}>STOP SCAN</h1>
                        <div className={styles.buttonContainers}>
                            <button
                                className={`${styles.toSeoul} ${selectedDirection === '상행' ? styles.active : ''}`}
                                onClick={() => handleDirectionClick('상행')}
                                style={{
                                    backgroundColor: selectedDirection === '상행' ? '#548DEE' : 'white',
                                    color: selectedDirection === '상행' ? 'white' : 'black'
                                }}
                            >
                                <div className={styles.arrowUp}></div>
                                서울방향
                            </button>
                            <button
                                className={`${styles.toBusan} ${selectedDirection === '하행' ? styles.active : ''}`}
                                onClick={() => handleDirectionClick('하행')}
                                style={{
                                    backgroundColor: selectedDirection === '하행' ? '#548DEE' : 'white',
                                    color: selectedDirection === '하행' ? 'white' : 'black'
                                }}
                            >
                                <div className={styles.arrowDown}></div>
                                부산방향
                            </button>
                        </div>

                        <div className={styles.customDropdown}
                             ref={dropdownRef}
                             onMouseLeave={() => setIsOpen(false)}
                        >
                            <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                                {selectedOption || "고속도로를 선택하세요.."}
                                <div className={styles.downIcon}></div>
                            </div>
                            {isOpen && (
                                <ul className={styles.dropdownList} ref={listRef}>
                                    {options.map((option, index) => (
                                        <li key={index}
                                            onClick={() => handleOptionClick(option)}
                                            ref={option === selectedOption ? selectedItemRef : null}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div> {/* mapMenu 끝 */}

                    <div className={styles.menuCont}>
                        <div className={styles.listCount}>
                            <h2>{getFilteredRestAreas().length}개</h2>
                        </div>
                        <div className={styles.restList}>
                            <ul id={styles.conListUl}>
                                {getFilteredRestAreas().map((restArea, index) => (
                                    <li key={index} className={styles.on}
                                        onClick={() => handleRestAreaClick(restArea.휴게소명)}>
                                        <div className={styles.tit}>
                                            <a>{restArea.휴게소명}</a>
                                            <div className={styles.iconBox}>
                                                <span>아이콘</span>
                                                <span>아이콘</span>
                                                <span>아이콘</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/*맵 부분*/}
                <div className={styles.mapContainer}>
                    <Map center={position} level={zoomLevel} style={{width: "100%", height: "100vh"}}></Map>
                </div>

                {/*상세페이지*/}
                {selectedRestArea && (
                    <div className={styles.detailPage}>
                        <div className={styles.imgBox}></div>
                        <button className={styles.closeButton} onClick={closeDetailPage}></button>
                        <div className={styles.titDetail}>
                            <h2>{selectedRestArea}</h2>
                        </div>
                        <div className={styles.iconBox2}>
                          <span className={styles.icons}>
                                <img
                                    src={shopping}
                                    alt=""/>
                                    <span>편의점</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={rest}
                                    alt=""/>
                                    <span>쉼터</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={breastFeeding}
                                    alt=""/>
                                    <span>수유실</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={laundry}
                                    alt=""/>
                                    <span>세탁실</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={shower}
                                    alt=""/>
                                    <span>샤워실</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={wheat}
                                    alt=""/>
                                    <span>농산물 판매장</span>
                          </span>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.infoTit}>
                                <h2>시설정보</h2>
                                <span className={styles.upDate}>2024.08.01 업데이트</span>
                            </div>
                            <div className={styles.fuelDetail}>
                                <h3>주유소, 충전소</h3>
                                <div className={styles.fuelBox}></div>
                            </div>
                        </div>
                        <div className={styles.menuBox}>
                            <h2>메뉴 16</h2>
                        </div>
                        <div className={styles.brandList}>
                            <h2>브랜드매장</h2>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}