import { useState } from "react";
import { Block } from "../../style/ui";
import UserInfo from "../../components/Profile/userInfo";
import Cats from "../../components/Profile/cats";
import Purchase from "../../components/Profile/purchase";
import AccountManage from "../../components/Profile/accountManage";
import { PageWrapper } from "../../style/ui";

export default function Profile() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <PageWrapper>
      <Block.FlexBox
        direction="column"
        padding="20px 0"
        maxWidth="600px"
        margin="80px auto 100px"
        key={reload.toString()} // `key`에 문자열로 변경
      >
        <UserInfo onReload={handleReload} />

        <div
          style={{
            width: "calc(100% - 40px)", // 양옆에 20px씩 여백 추가
            border: "3px solid #D3D3D3", // 더 밝은 회색으로 두껍게 설정
            borderRadius: "8px",
            padding: "16px",
            margin: "20px auto 10px", // 상단 여백과 아래쪽 여백 조정
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 부드러운 그림자 추가
            backgroundColor: "white", // 배경을 흰색으로 설정
          }}
        >
          <Cats />
        </div>
        <div
          style={{
            width: "calc(100% - 40px)", // 양옆에 20px씩 여백 추가
            border: "3px solid #D3D3D3", // 더 밝은 회색으로 두껍게 설정
            borderRadius: "8px",
            padding: "16px",
            margin: "20px auto 10px", // 상단 여백과 아래쪽 여백 조정
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 부드러운 그림자 추가
            backgroundColor: "white", // 배경을 흰색으로 설정
          }}
        >
          <Purchase />
        </div>
        <AccountManage />
      </Block.FlexBox>
    </PageWrapper>
  );
}
