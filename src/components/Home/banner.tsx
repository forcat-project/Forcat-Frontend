import Slider from "react-slick"; // react-slick 라이브러리 import
import { Banner1, Banner2, Banner3 } from "../../assets/svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 슬라이더 설정
const settings = {
  dots: true, // 하단에 점(dot) 표시
  infinite: true, // 무한 반복
  speed: 300, // 슬라이드 전환 속도 (ms)
  slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
  slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
  autoplay: true, // 자동 재생
  autoplaySpeed: 3000, // 자동 재생 간격 (ms)
  arrows: false, // 좌우 화살표 숨김
};

// 배너 이미지를 배열로 정의
const banners = [<Banner1 />, <Banner2 />, <Banner3 />];

// 슬라이더 컴포넌트 정의
export default function BannerSlider() {
  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px", // 높이 조정
            }}
          >
            {banner}
          </div>
        ))}
      </Slider>
    </div>
  );
}
