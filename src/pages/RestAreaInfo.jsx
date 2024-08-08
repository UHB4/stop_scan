import React, {useEffect, useRef, useState} from 'react';
import styles from './_RestAreaInfo.module.scss';
import { Map, MapMarker,CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import shopping from '../assets/icons/shoppingCart.svg';
import breastFeeding from '../assets/icons/breastFeeding.svg';
import rest from '../assets/icons/rest.svg';
import shower from '../assets/icons/shower.svg';
import laundry from '../assets/icons/laundry.svg';
import wheat from '../assets/icons/wheat.svg';
import bed from '../assets/icons/bed.svg'
import barber from '../assets/icons/barber.svg'
import locationDot from '../assets/icons/locationDot.svg';
import config from '../Config';

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
    const [combinedData, setCombinedData] = useState(null);    // 통합된 API 응답 데이터를 저장할 상태
    const [selectedDirection, setSelectedDirection] = useState('상행');    // 현재 선택된 방향
    const [selectedRestAreaImage, setSelectedRestAreaImage] = useState([]);
    const [selectedRestAreaFacilities, setSelectedRestAreaFacilities ] = useState([]);
    const [selectedRestAreaFuelPrices, setSelectedRestAreaFuelPrices] = useState([]);
    const [selectedRestAreaBestFoods, setSelectedRestAreaBestFoods] = useState([]);
    const [selectedRestAreaRestBrands, setSelectedRestAreaRestBrands] = useState([]);
    const [currentDate, setCurrentDate] = useState('');


    const handleStopScan = () => {
        navigate('/mainpage')
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    // 여러 API 요청을 동시에 수행하는 함수
    const fetchAllData = async (routeNm) => {
        try {
            const urls = [
                `${config.API_BASE_URL}/restareas?route=${encodeURIComponent(routeNm)}`,// 휴게소 데이터를 받아오는 엔드포인트
                `${config.API_BASE_URL}/restbrands?routeNm=${encodeURIComponent(routeNm)}`,     // 휴게소 입점브랜드를 받아오는 엔드포인트
                `${config.API_BASE_URL}/fuelprices?routeNm=${encodeURIComponent(routeNm)}`,// 휴게소 주유소 유류정보를 받아오는 엔드포인트
                `${config.API_BASE_URL}/facilities?routeNm=${encodeURIComponent(routeNm)}`, // 휴게소 편의시설 정보를 받아오는 엔드포인트
                `${config.API_BASE_URL}/bestfoods?routeNm=${encodeURIComponent(routeNm)}`   // 휴게소 음식메뉴 정보를 받아오는 엔드포인트

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
        console.log('선택된 휴게소:', restArea);
        setSelectedRestArea(restArea);
        const imageUrl = getSelectedRestAreaImage(restArea);
        console.log('가져온 이미지 URL:', imageUrl);
        const facilities = getSelectedRestAreaFacilities(restArea);
        setSelectedRestAreaFacilities(facilities);
        const fuelPrices = getSelectedRestAreaFuelPrices(restArea);
        setSelectedRestAreaFuelPrices(fuelPrices);
        const bestFoods = getSelectedRestAreaBestFoods(restArea);
        setSelectedRestAreaBestFoods(bestFoods);
        const restBrands = getSelectedRestAreaRestBrands(restArea);
        setSelectedRestAreaRestBrands(restBrands);
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

    // RestAreaInfo.jsx

    const getFilteredRestAreas = () => {
        if (!combinedData || !combinedData.restAreas) return [];

        // restAreas가 배열인지 확인
        const restAreasArray = Array.isArray(combinedData.restAreas)
            ? combinedData.restAreas
            : combinedData.restAreas.list || [];

        // 중복 제거 및 필터링을 위한 Set 객체 생성
        const uniqueRestAreas = new Set();

        const filteredAreas = restAreasArray
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

// 컴포넌트 내의 다른 부분에서도 restAreas에 접근할 때 비슷한 방식으로 안전하게 처리
    // =============================================디테일 페이지 이미지박스 ===========================================================
    const getSelectedRestAreaImage = (restAreaName) => {
        if (!combinedData || !combinedData.restAreas) {
            console.log('combinedData 또는 restAreas가 없습니다.');
            return null;
        }

        // 먼저 원래 이름으로 매칭 시도
        let restArea = combinedData.restAreas.find(area => area.휴게소명 === restAreaName);

        // 찾지 못했다면 '휴게소'를 제거하고 다시 매칭 시도
        if (!restArea) {
            const cleanRestAreaName = restAreaName.replace('휴게소', '').trim();
            restArea = combinedData.restAreas.find(area => area.휴게소명 === cleanRestAreaName);
        }

        if (!restArea) {
            console.log(`'${restAreaName}' 휴게소를 찾을 수 없습니다.`);
            return null;
        }

        console.log('선택된 휴게소 정보:', restArea);
        console.log('이미지 URL:', restArea.이미지);
        return restArea.이미지;
    };

    // =============================================디테일 페이지 이미지박스 끝 ===========================================================


    // ================================================================디테일 페이지에 아이콘 동적업데이트 로직 =====================================================================
    // 시설정보와 임포트한 아이콘을 매칭
    const facilityIcons = {
        수유실: { icon:breastFeeding, label:"수유실"},
        쉼터: {icon:rest, label:"쉼터"},
        샤워실: {icon:shower, label:"샤워실"},
        세탁실: {icon:laundry, label:"세탁실"},
        농산물판매장: {icon:wheat, label:"농산물 판매장"},
        수면실: {icon:bed, label:"수면실"},
        이발소: {icon:barber, label:"이발소"},
    }

    const getSelectedRestAreaFacilities = (restAreaName) => { // 선택된 휴게소의 이름을 매개변수로 받음.
        if (!combinedData || !combinedData.facilities || !combinedData.facilities.list) return [];
        // 안전성 검사 combinedData,combinedData.facilities,
        // combinedData.facilities.list 중 하나라도없으면 빈배열 반환 데이터가 아직 로드되지않았을때 오류 방지

        const facility = combinedData.facilities.list.find(
            item => item.serviceAreaName === restAreaName // 넘어오는데이터에 facilities에 list에 item에서 serviceAreaName 이 선택한 휴게소의 이름과 일치하는 항목을 찾아서 facility 변수에 저장
        );

        if (!facility || !facility.convenience) return []; // 만약 해당 휴게소를 찾지못하거나 찾은 휴게소에 convenience 속성이 없으면 빈 배열 반환

        return facility.convenience.split('|'); // 모든 기준을 통과하면 문자열을 | 기준으로 반환
        // 예를들어 facility.convenience 가 "수유실"|"샤워실"|"세탁실"  이라면     ["수유실","샤워실","세탁실"]이라는 배열로 반환
    }
    // ================================================================디테일 페이지에 아이콘 동적업데이트 로직 끝=====================================================================


    // ================================================================디테일 페이지에 시설정보(주유정보) 로직 ========================================================================
    const matchServiceAreaName = (restAreaName, fuelAreaName) => {
        //fuelPrice 엔드포인트에서 넘어오는 데이터에 serviceAreaName 은"영산(창원)주유소" 이렇게 끝에 주유소가 붙어서
        // 주유소를 자르고 "영산"만써서 휴게소 이름과 매칭 시키는 함수 :

        const restAreaBaseName = restAreaName.split('(')[0].trim();  // 문자열을 '(' 기준으로 나누고 배열을 만든다음에, 만든 배열의 첫번째 요소 [0]인덱스를 선택하고 trim은 선택된 문자열의 앞뒤공백을 제거 "영산"만 사용
        const fuelAreaBaseName = fuelAreaName.split('(')[0].trim();  // 상동

        return restAreaBaseName === fuelAreaBaseName;
    };

    const getSelectedRestAreaFuelPrices = (restAreaName) => {
        if (!combinedData || !combinedData.fuelPrices || !combinedData.fuelPrices.list) return null;

        const fuelInfo = combinedData.fuelPrices.list.find(
            item => matchServiceAreaName(restAreaName, item.serviceAreaName)
        );
        if (!fuelInfo) return null;

        return {
            gasoline: fuelInfo.gasolinePrice,
            disel: fuelInfo.diselPrice,
            lpg: fuelInfo.lpgPrice
        };
    }

    useEffect(() => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${('0' + date.getDate()).slice(-2)}`;
        setCurrentDate(formattedDate);
    }, []);
    // ================================================================디테일 페이지에 시설정보(주유정보) 로직 끝========================================================================

    // =============================================================== 디테일 페이지에 메뉴정보 로직 ==================================================================================

    const getSelectedRestAreaBestFoods = (restAreaName) => {
        if (!combinedData || !combinedData.bestFoods || !combinedData.bestFoods.list) return null;

        const foodInfoList = combinedData.bestFoods.list.filter(item => item.stdRestNm === restAreaName);

        if (foodInfoList && foodInfoList.length > 0) {
            return foodInfoList.map(foodInfo => ({
                foodName: foodInfo.foodNm,
                price: foodInfo.foodCost,
            }));
        }

        console.log("해당 휴게소의 음식 정보를 찾지 못했습니다.");
        return null;
    };

    // =============================================================== 디테일 페이지에 메뉴정보 로직 끝 ================================================================================


    // =============================================================== 디테일 페이지에 브랜드정보 로직  ================================================================================

    const getSelectedRestAreaRestBrands = (restAreaName) => {
        if (!combinedData || !combinedData.restBrands || !combinedData.restBrands.list) return null;

        const brandList = combinedData.restBrands.list.filter(item => item.stdRestNm === restAreaName);

        if (brandList) {
            return brandList.map(brandList => ({
                brandName : brandList.brdName,
                stime : brandList.stime,
                etime : brandList.etime,
            }))
        }
        return null;
    };





    // =============================================================== 디테일 페이지에 브랜드정보 로직 끝 ================================================================================

    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.mapContWrap}>
                    <div className={styles.mapMenu}>
                        <h1 style={{color: "white", fontWeight: "900", cursor: "pointer"}} onClick={handleStopScan}>STOP
                            SCAN</h1>
                        <div className={styles.buttonContainers}>
                            <button
                                className={`${styles.toSeoul} ${selectedDirection === '상행' ? styles.active : ''}`}
                                onClick={() => handleDirectionClick('상행')}
                                style={{
                                    backgroundColor: selectedDirection === '상행' ? 'white' : 'white',
                                    border: selectedDirection === '상행' ? '1px solid #548DEE' : '',
                                    color: selectedDirection === '상행' ? 'white' : 'black'
                                }}
                            >
                                <div className={`${styles.arrowUp} ${selectedDirection ==='상행' ? styles.active : ''}`}
                                onClick={()=> handleDirectionClick('상행')}
                                style={{
                                    backgroundColor: selectedDirection === '상행' ? '#548DEE' : '',
                                }}
                                >
                        </div>
                                <span className={styles.arrowText}>서울방향</span>
                            </button>
                            <button
                                className={`${styles.toBusan} ${selectedDirection === '하행' ? styles.active : ''}`}
                                onClick={() => handleDirectionClick('하행')}
                                style={{
                                    backgroundColor: selectedDirection === '하행' ? 'white' : '',
                                    border: selectedDirection === '하행' ? '1px solid #548DEE' : '',
                                    color: selectedDirection === '하행' ? 'white' : 'black'
                                }}
                            >
                                <div className={`${styles.arrowDown} ${selectedDirection === '하행' ? styles.active : ''}`}
                                     onClick={() => handleDirectionClick('하행')}
                                     style={{
                                         backgroundColor: selectedDirection === '하행' ? '#548DEE' : '',
                                     }}
                                >
                                </div>
                                <span className={styles.arrowText}> 부산방향</span>
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
                    </div>
                    {/* mapMenu 끝 */}

                    <div className={styles.menuCont}>
                        <div className={styles.listCount}>
                            <h2>총 <span>{getFilteredRestAreas().length}</span>개</h2>
                        </div>
                        <div className={styles.restList}>
                            <ul id={styles.conListUl}>
                                {getFilteredRestAreas().map((restArea, index) => (
                                    <li key={index} className={styles.on}
                                        onClick={() => handleRestAreaClick(restArea.휴게소명)}>
                                        <div className={styles.tit}>
                                            <a>{restArea.휴게소명}</a>
                                            <div className={styles.iconBox}>
                                                {/*<span>아이콘</span>*/}
                                                {/*<span>아이콘</span>*/}
                                                {/*<span>아이콘</span>*/}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/*===================================맵 부분============================================*/}

                <div className={styles.mapContainer}>
                    <Map
                        center={position}
                        level={zoomLevel}
                        style={{width: "100%", height: "100vh"}}
                    >
                        {combinedData && combinedData.restAreas &&
                            combinedData.restAreas.filter(restArea =>
                                (selectedDirection === '상행' && restArea.도로노선방향 === '상행') ||
                                (selectedDirection === '하행' && restArea.도로노선방향 === '하행')
                            ).map((restArea, index) => (
                                <div key={index}>
                                    <MapMarker
                                        position={{
                                            lat: parseFloat(restArea.위도),
                                            lng: parseFloat(restArea.경도)
                                        }}
                                        onClick={() => handleRestAreaClick(restArea.휴게소명)}
                                        image={{
                                            src: locationDot,
                                            size: {
                                                width: 34,
                                                height: 34
                                            },
                                        }
                                    }
                                    />
                                    <CustomOverlayMap
                                        position={{
                                            lat: parseFloat(restArea.위도),
                                            lng: parseFloat(restArea.경도)
                                        }}
                                        yAnchor={-0.3}
                                    >
                                        <div style={{
                                            padding: '5px',
                                            color: 'black',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}>

                                            {restArea.휴게소명}
                                        </div>
                                    </CustomOverlayMap>
                                </div>
                            ))
                        }
                    </Map>
                </div>


                {/*=========================상세페이지 부분===============================================*/}
                {selectedRestArea && (
                    <div className={styles.detailPage}>
                        <div className={styles.imgBox}>
                            {getSelectedRestAreaImage(selectedRestArea) ? (
                                <img
                                    src={getSelectedRestAreaImage(selectedRestArea)}
                                    alt={selectedRestArea}
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    onError={(e) => {
                                        console.error('이미지 로딩 실패:', e);
                                        e.target.src = '대체 이미지 URL'; // 대체 이미지 URL을 지정하세요
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f0f0f0',
                                    color: '#666'
                                }}>
                                    이미지 없음
                                </div>
                            )}
                        </div>
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
                            {selectedRestAreaFacilities.map((facility, index) => (
                                facilityIcons[facility] && (
                                    <span key={index} className={styles.icons}>
                                        <img
                                            src={facilityIcons[facility].icon}
                                            alt={facilityIcons[facility].label}
                                        />
                                        <span>{facilityIcons[facility].label}</span>
                                    </span>
                                )
                            ))}
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.infoTit}>
                                <h2>시설정보</h2>
                                <span className={styles.upDate}>{currentDate} 업데이트</span>
                            </div>
                            <div className={styles.fuelDetail}>
                                <h3>주유소, 충전소</h3>
                                <div className={styles.fuelBox}>
                                    <table className={styles.fuelTable}>
                                        <thead>
                                        <tr>
                                            <th>유종</th>
                                            <th>가격</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {selectedRestAreaFuelPrices ? (
                                            <>
                                                <tr>
                                                    <td>휘발유</td>
                                                    <td>{selectedRestAreaFuelPrices.gasoline}</td>
                                                </tr>
                                                <tr>
                                                    <td>경유</td>
                                                    <td>{selectedRestAreaFuelPrices.disel}</td>
                                                </tr>
                                                {selectedRestAreaFuelPrices.lpg && (
                                                    <tr>
                                                        <td>LPG</td>
                                                        <td>{selectedRestAreaFuelPrices.lpg}</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="2">가격 정보가 없습니다.</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menuBox}>
                            <h2>메뉴 {selectedRestAreaBestFoods ? selectedRestAreaBestFoods.length : 0}개</h2>
                            <div className={styles.bestMenuCont}>
                                <ul>
                                    {selectedRestAreaBestFoods && selectedRestAreaBestFoods.length > 0 ? (
                                        selectedRestAreaBestFoods.map((food, index) => (
                                            <li key={index}>
                                                <div className={styles.menu}>
                                                    <div className={styles.menuName}>
                                                        {food.foodName}
                                                    </div>
                                                    <div className={styles.menuPrice}>
                                                        <span>{food.price}</span>원
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li><span>메뉴 정보가 없습니다.</span></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.brandList}>
                            <h2>브랜드매장</h2>
                            {selectedRestAreaRestBrands && selectedRestAreaRestBrands.length > 0 ? (
                                selectedRestAreaRestBrands.map((brand, index) => (
                                    <div key={index} className={styles.brandCont}>
                                        <div className={styles.brandName}>{brand.brandName}</div>
                                        <div className={styles.brandTime}>
                                            <span>{brand.stime}</span>
                                            <span>-{brand.etime}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>브랜드 매장 정보가 없습니다.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}