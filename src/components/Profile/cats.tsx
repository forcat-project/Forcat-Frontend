import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";

interface Cat {
  name: string;
  cat_breed: string; // 고양이 품종
  days_since_birth: number;
  gender: number; // 0: 여아, 1: 남아
  is_neutered: number; // 0: 미완료, 1: 완료
  weight: string; // 몸무게를 문자열로 받기
  profile_image: string;
}

export default function Cats() {
  const [cats, setCats] = useState<Cat[]>([]); // 여러 고양이 정보를 저장하기 위한 배열로 변경
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    // 고양이 정보 API 호출
    axios
      .get("http://125.189.109.17/api/users/1/cats")
      .then((response) => {
        const catData = Array.isArray(response.data)
          ? response.data
          : [response.data]; // 배열 형태로 저장
        setCats(catData); // 응답 데이터로 상태 업데이트
        console.log(catData); // 응답 데이터가 잘 나오는지 확인
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("고양이 정보를 가져오는데 실패했습니다:", error);
        setLoading(false); // 로딩 완료
      });
  }, []);

  // days_since_birth 값을 개월 수로 변환하는 함수
  const getMonthsFromDays = (days: number) => {
    if (days === undefined || days < 0) {
      return "정보 없음";
    }
    return `${Math.max(1, Math.floor(days / 30))}개월`;
  };

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return <Text.Notice200>로딩 중...</Text.Notice200>;
  }

  return (
    <Block.FlexBox padding="20px" direction="column">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>우리집 냐옹이들</Text.TitleMenu200>
        <Text.Notice200 color="Gray" pointer>
          추가
        </Text.Notice200>
      </Block.FlexBox>

      {/* 고양이 정보 반복 렌더링 */}
      {cats.map((cat, index) => (
        <Block.FlexBox
          key={index}
          direction="row"
          justifyContent="space-between"
          padding="20px 20px"
          alignItems="center"
        >
          {/* 고양이 정보 텍스트 */}
          <Block.FlexBox direction="column">
            <Text.TitleMenu300 style={{ marginBottom: "10px" }}>
              {cat.name || "이름 없음"}
            </Text.TitleMenu300>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                견종
              </Text.Notice200>
              <Text.Notice200>
                {String(cat.cat_breed) || "정보 없음"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                나이
              </Text.Notice200>
              <Text.Notice200>
                {getMonthsFromDays(cat.days_since_birth)}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                성별
              </Text.Notice200>
              <Text.Notice200>
                {cat.gender === 0 ? "여아" : "남아"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                중성화
              </Text.Notice200>
              <Text.Notice200>
                {cat.is_neutered === 1 ? "수술 완료" : "수술 미완료"}
              </Text.Notice200>
            </Block.FlexBox>
            <Block.FlexBox margin="5px 0">
              <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
                몸무게
              </Text.Notice200>
              <Text.Notice200>{cat.weight}kg</Text.Notice200>
            </Block.FlexBox>
          </Block.FlexBox>

          <Block.FlexBox
            alignItems="center"
            width="150px"
            height="150px"
            direction="column"
          >
            {cat.profile_image ? (
              <img
                src={cat.profile_image}
                alt="Cat Profile"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }} // 이미지 둥글게 만들기
              />
            ) : (
              <UserProfile />
            )}
            <Button.EditButton
              style={{ marginTop: "15px" }}
              onClick={() => alert("편집 버튼 클릭됨")}
            >
              <Text.Mini>편집</Text.Mini>
            </Button.EditButton>
          </Block.FlexBox>
        </Block.FlexBox>
      ))}
    </Block.FlexBox>
  );
}
