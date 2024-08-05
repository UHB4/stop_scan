import React, {useEffect, useRef, useState} from 'react';
import styles from './_GasStation.scss';
import { Map, MapMarker,CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";


export default function GasStaion() {



    
    function GasStation({ radius, stations }) {
        const [state, setState] = useState({
            center: { lat: 33.450701, lng: 126.570667 },
            zoomLevel: getZoomLevel(radius),
            errMsg: null,
            isLoading: true,
            selectedStation: null,
            isVisible: true  // isVisible 상태 추가
        });
    const updateLocation = () => {
        setState(prev => ({ ...prev, isLoading: true })); // 로딩 상태 활성화
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setState(prev => ({
                ...prev,
                center: { lat: latitude, lng: longitude },
                isLoading: false
            }));
        }, err => {
            setState(prev => ({ ...prev, errMsg: err.message, isLoading: false }));
        }, {
            enableHighAccuracy: true
        });
    };

    return (
        <>
        <div className={styles.wrap}>
            <div className={styles.mapContWrap}>
                <div className={styles.mapMenu}>
                </div>
                <div className={styles.mapContainer}>
                    <map
                        center={position}
                        level={zoomLevel}
                        style={{width: "100%", height: "100vh"}}
                    >

                    </map>
                </div>
            </div>

        </div>

        </>
    )
}