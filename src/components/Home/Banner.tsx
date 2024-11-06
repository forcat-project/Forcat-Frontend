import Slider from "react-slick"; // react-slick
// import { Banner1, Banner2, Banner3 } from "../../assets/svg";

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
    centerMode: false, // 다른 슬라이드가 보이지 않도록 설정
};

// 배너 이미지를 배열로 정의
// const banners = [<Banner1 />, <Banner2 />, <Banner3 />];
const banners = ["/banners/banner3.jpg", "/banners/banner2.jpg", "/banners/banner1.jpg"];

// 슬라이더 컴포넌트 정의
export default function BannerSlider() {
    return (
        <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <Slider {...settings}>
                {banners.map((src, index) => (
                    <div
                        key={index}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "400px", // 높이 조정
                        }}
                    >
                        <img
                            src={src}
                            alt={`Banner ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
