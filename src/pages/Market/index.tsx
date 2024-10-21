import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export default function Market() {
  const [error, setError] = useState<AxiosError | null>(null); // error 타입 명시

  useEffect(() => {
    // GET 요청 보내기
    axios
      .get("http://125.189.109.17/api/products", {
        params: {
          name: null,
          categories: null,
          cursor: null,
        },
      })
      .then((response) => {
        // 통신 성공 시 콘솔에 출력
        console.log("통신 성공:", response.data); // 성공 시 데이터 출력
      })
      .catch((error: AxiosError) => {
        // 에러 처리
        setError(error);
        console.error("통신 실패:", error.message); // 실패 시 에러 메시지 출력
      });
  }, []);

  if (error) {
    // 오류가 발생했을 때 에러 메시지 표시
    return <div>Error: {error.message}</div>;
  }

  // 화면에 아무 내용도 표시하지 않음
  return null;
}
