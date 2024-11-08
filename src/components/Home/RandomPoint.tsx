import { useEffect } from "react";
import { PointParams, pointAPI } from "../../api/resourses/points";
import { useUserId } from "../../hooks/useUserId";
import "../../styles/random.css";

const RandomPoint = () => {
    const userId = useUserId();

    useEffect(() => {
        let responseData: { [key: string]: any } = {};

        const initializeImage = async () => {
            const res = await pointAPI.getRandomPoint();
            if (Object.keys(res.data).length !== 0) {
                responseData = res.data;

                // 이미지와 배경을 감쌀 div 생성
                const container = document.createElement("div");
                container.className = "hidden-image-container";

                // Click Me 텍스트
                const clickText = document.createElement("span");
                clickText.className = "click-text";
                clickText.textContent = "Click Me!";

                // 이미지 요소 생성
                const img = document.createElement("img");
                img.src = "fish_point.PNG";
                img.className = "hidden-image";

                // 이미지 및 텍스트를 컨테이너에 추가
                container.appendChild(img);
                container.appendChild(clickText);

                // 랜덤 위치 설정
                container.style.left = `${20 + Math.random() * 60}%`; // 가로 위치: 20% ~ 80%
                container.style.top = `${20 + Math.random() * 60}%`; // 세로 위치: 20% ~ 80%

                // 클릭 이벤트 추가
                container.addEventListener("click", event => handleImageClick(event, responseData));

                document.body.appendChild(container);
            }
        };

        const handleImageClick = async (event: MouseEvent, data: { [key: string]: any }) => {
            const message = document.getElementById("message");

            if (!message) {
                console.error("message 요소를 찾을 수 없습니다.");
                return;
            }

            const key: string = Object.keys(data)[0];
            const value: number = Object.values(data)[0];

            const pointParams: PointParams = {
                user_id: userId.toString(),
                point_id: key,
                point: value,
            };

            await pointAPI.createPoint(pointParams);

            message.textContent = `${value}포인트가 적립되었습니다!`;
            message.style.display = "block";

            setTimeout(() => {
                message.style.display = "none";
            }, 3000);

            (event.target as HTMLElement).closest(".hidden-image-container")?.remove();
        };

        if (userId) {
            initializeImage();
        }

        return () => {
            const existingContainer = document.querySelector(".hidden-image-container");
            if (existingContainer) {
                existingContainer.remove();
            }
        };
    }, [userId]);

    return (
        <>
            <div id="message" className="message"></div>
        </>
    );
};

export default RandomPoint;
