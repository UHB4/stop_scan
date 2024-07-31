import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: "2edf1ff29db7c20142a5edc16ba2f7a3",
        libraries: ["clusterer", "drawing", "services"],
    })

}