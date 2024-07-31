import React, { useEffect, useRef, useState } from 'react';
import styles from './_RestAreaInfo.module.scss';





export default function RestAreaInfo() {
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.mapContWrap}></div>
                <div className={styles.mapContainer}></div>


            </div>


        </>


    )


}