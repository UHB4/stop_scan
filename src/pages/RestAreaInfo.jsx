import React, {useEffect, useRef, useState} from 'react';
import styles from './_RestAreaInfo.module.scss';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import shoppingCartIcon from '../assets/icons/ShoppingCart.png';
import baby from '../assets/icons/baby.png';
import atm from '../assets/icons/atm.png';
import bath from '../assets/icons/bath.png';
import laundry from '../assets/icons/laundry.png';
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

    const handleStopScan = () => {
        navigate('/mainpage')
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
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

    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.mapContWrap}>
                    <div className={styles.mapMenu}>
                        <h1 style={{color :"white", fontWeight: "900", cursor: "pointer"}} onClick={handleStopScan}>STOP SCAN</h1>
                        <div className={styles.buttonContainers}>
                            <button className={styles.toSeoul}>
                                <div className={styles.arrowUp}></div>
                                서울방향</button>
                            <button className={styles.toBusan}>
                                <div className={styles.arrowDown}></div>
                                부산방향</button>
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
                            <h2>15개</h2>
                        </div>
                        <div className={styles.restList}>
                            <ul id={styles.conListUl}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                                    <li className={styles.on} onClick={() => handleRestAreaClick(`양산(서울방향)휴게소 `)}>
                                        <div className={styles.tit}>
                                            <a>양산(서울방향)휴게소 </a>
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
                        <button className={styles.closeButton} onClick={closeDetailPage}>닫기</button>
                        <div className={styles.titDetail}>
                        <h2>{selectedRestArea}</h2>
                        </div>
                        <div className={styles.iconBox2}>
                          <span className={styles.icons}>
                                <img
                                    src={shoppingCartIcon}
                                    alt=""/>
                                    <span>편의점</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={atm}
                                    alt=""/>
                                    <span>ATM</span>
                          </span>
                            <span className={styles.icons}>
                                <img
                                    src={baby}
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
                                    src={bath}
                                    alt=""/>
                                    <span>샤워실</span>
                          </span>
                        </div>
                        <div className={styles.infoBox}></div>
                        <div className={styles.menuBox}></div>
                        <div className={styles.brandList}></div>
                        <p>..</p>
                    </div>
                )}
            </div>
        </>
    )
}