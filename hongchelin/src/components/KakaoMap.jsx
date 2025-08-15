import { useEffect, useState } from "react";
import Marker from "../assets/Marker2.png";
import Header_writing from "./Header_writing";
import Footer from "./Footer";

const KakaoMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.553, 126.923),
        level: 5,
      };

      const map = new window.kakao.maps.Map(container, options);
      map.setDraggable(false);

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      
      const infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});

      const imageSrc = Marker;
      const imageSize = new window.kakao.maps.Size(40, 60);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const geocoder = new window.kakao.maps.services.Geocoder();

      const positions = [
        { title: "멘타카무쇼", address: "서울특별시 마포구 와우산로13길 49-10", desc:"츠케멘 전문점", ranking: "25년 7월 1위" },
        { title: "금복식당", address: "서울특별시 마포구 상수동 325-2",  desc: "고등어구이 맛집", ranking: "25년 7월 2위" },
        { title: "칸다소바", address: "서울특별시 마포구 와우산로 51-6", desc: "마제소바 맛집", ranking: "25년 8월 1위"},
        { title: "하카타분코", address: "서울특별시 마포구 독막로19길 43", desc: "배교수님 원픽 라멘집", ranking:"25년 6월 3위" },
        { title: "카미야", address: "서울특별시 마포구 와우산로21길 28-6", desc : "홍대 또간집 1위 돈가츠 맛집", ranking: "25년 8월 2위" },
        { title: "식스티즈 60's", address: "서울특별시 마포구 와우산로23길 9", desc : "홍문관 앞 수제버거 맛집", ranking : "25년 6월 1위" },
        { title: "타오마라탕 홍대점", address: "서울특별시 마포구 와우산로21길 28", desc : "마라샹궈 맛집" , ranking : "25년 6월 2위"},
        { title: "오레노라멘 본점", address: "서울특별시 마포구 독막로6길 14", desc :"미슐랭 선정 라멘집", ranking: "25년 7월 3위" },
      ];

      positions.forEach((pos) => {
        geocoder.addressSearch(pos.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
              title: pos.title,
              image: markerImage,
            });

          window.kakao.maps.event.addListener(marker, "click", () => {

            const content = `<div style="padding:5px;font-size:14px;">${pos.title}</div>`;
            infowindow.setContent(content);
            infowindow.open(map, marker);

            setSelectedPlace(pos);
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
      window.kakao.maps.load(() => {
        loadKakaoMap();
      });
    } else {
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
        <div
          style={{
            width: "60%",
            padding: "10px",
            margin: "10px 0",
            borderLeft: "3px solid #BD2333",
            backgroundColor: "#fdf2f2",
          }}
        >
          {selectedPlace ? (
            <div>
              <h3>{selectedPlace.title}</h3>
              <p>{selectedPlace.desc}</p>
              <p>홍슐랭 {selectedPlace.ranking}</p>
            </div>
          ) : (
            <p>마커를 클릭하면 상세 정보가 여기에 표시됩니다.</p>
          )}
        </div>
      <div>
        <p>* 현재 이 지도는 홍익대학교 주변으로 고정되어 있습니다.</p>
      </div>
      <Footer />
    </div>
  );
};

export default KakaoMap;
