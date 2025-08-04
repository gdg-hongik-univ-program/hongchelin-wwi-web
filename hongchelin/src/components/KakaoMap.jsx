// src/components/KakaoMap.jsx
import { useEffect } from "react";
import Marker from "../assets/Marker2.png";
import Header_writing from "./Header_writing";
import Footer from "./Footer";

const KakaoMap = () => {
  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.553, 126.923),
        level: 5,
      };

      const map = new window.kakao.maps.Map(container, options);

      const imageSrc = Marker;
      const imageSize = new window.kakao.maps.Size(40, 60);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const geocoder = new window.kakao.maps.services.Geocoder();

      const positions = [
        { title: "멘타카무쇼", address: "서울특별시 마포구 와우산로13길 49-10" },
        { title: "금복식당", address: "서울특별시 마포구 상수동 325-2" },
        { title: "칸다소바", address: "서울특별시 마포구 와우산로 51-6" },
        { title: "하카타분코", address: "서울특별시 마포구 독막로19길 43" },
        { title: "카미야", address: "서울특별시 마포구 와우산로21길 28-6" },
        { title: "식스티즈 60's", address: "서울특별시 마포구 와우산로23길 9" },
        { title: "타오마라탕 홍대점", address: "서울특별시 마포구 와우산로21길 28" },
        { title: "오레노라멘 본점", address: "서울특별시 마포구 독막로6길 14" },
      ];

      positions.forEach((pos) => {
        geocoder.addressSearch(pos.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            new window.kakao.maps.Marker({
              map,
              position: coords,
              title: pos.title,
              image: markerImage,
            });
          } else {
            console.error(`주소 변환 실패: ${pos.title}`);
          }
        });
      });
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false&libraries=services";
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          loadKakaoMap();
        });
      };
      document.head.appendChild(script);
    };

    if (window.kakao && window.kakao.maps) {
      // 이미 스크립트가 로드된 경우
      window.kakao.maps.load(() => {
        loadKakaoMap();
      });
    } else {
      // 처음 로드
      loadScript();
    }
  }, []);

  return (
    <div>
      <Header_writing text="📍 홍슐랭 맛지도" />
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ccc",
        }}
      ></div>
      <Footer />
    </div>
  );
};

export default KakaoMap;
