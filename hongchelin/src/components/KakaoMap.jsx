import { useEffect } from "react";
import Marker from "../assets/Marker.png"

const KakaoMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.548250, 126.918523),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const positions = [
          {
            title: "멘타카무쇼",
            latlng: new window.kakao.maps.LatLng(37.5482553251, 126.918523175),
          },
        ];

        const imageSrc = Marker;

        
        for (let i = 0; i < positions.length; i++) {
          const imageSize = new window.kakao.maps.Size(24, 35);
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          new window.kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            image: markerImage,
          });
        }
      });
    };

    if (!document.getElementById("kakao-map-script")) {
      script.id = "kakao-map-script";
      document.head.appendChild(script);
    } else {
      window.kakao?.maps?.load?.();
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗺 Kakao 지도</h2>
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default KakaoMap;
