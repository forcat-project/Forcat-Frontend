import { useEffect } from "react";
import "../../App.css";
import { PointParams, pointAPI } from "../../api/resourses/points";
import { useUserId } from "../../hooks/useUserId";

const RandomPoint = () => {
  const userId = useUserId(); // useUserId hook

  useEffect(() => {
    let responseData: { [key: string]: any } = {}; // To store `res.data`

    const initializeImage = async () => {
      const res = await pointAPI.getRandomPoint();
      if (Object.keys(res.data).length !== 0) {
        responseData = res.data; // Store `res.data`
        const img = document.createElement("img");
        img.src =
          "https://image.kmib.co.kr/online_image/2023/0103/2023010219180554560_1672654685_0924280903.jpg";
        img.className = "hidden-image";

        // Set random position
        img.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        img.style.top = `${Math.random() * (window.innerHeight - 50)}px`;

        // Add click event, pass `responseData` to `handleImageClick`
        img.addEventListener("click", (event) =>
          handleImageClick(event, responseData)
        );

        document.body.appendChild(img);
      }
    };

    const handleImageClick = async (
      event: MouseEvent,
      data: { [key: string]: any }
    ) => {
      // Use `data` to get `key` and `value`
      const message = document.getElementById("message");

      const key: string = Object.keys(data)[0];
      const value: number = Object.values(data)[0];

      const pointParams: PointParams = {
        user_id: userId.toString(),
        point_id: key, // Use `data.key` for `point_id`
        point: value, // Use `data.value` for `point`
      };

      // Call the API to create a point
      await pointAPI.createPoint(pointParams);

      if (message) {
        message.textContent = `${value}포인트가 적립되었습니다!`;
        message.style.display = "block";

        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      }

      // Hide the message after 3 seconds

      // Remove the image
      (event.target as HTMLElement).remove();
    };

    // Initialize image on load
    if (userId) {
      initializeImage();
    }

    // Clean up image on component unmount
    return () => {
      const existingImage = document.querySelector(".hidden-image");
      if (existingImage) {
        existingImage.remove();
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
