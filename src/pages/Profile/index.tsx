import { Block } from "../../style/ui";
import UserInfo from "../../components/Profile/accountManage";
import Cats from "../../components/Profile/cats";
import Purchase from "../../components/Profile/purchase";
import AccountManage from "../../components/Profile/userInfo";

export default function Profile() {
  return (
    <Block.FlexBox
      direction="column"
      padding="20px 0" // 위 아래 여백을 위한 padding 추가
      maxWidth="600px" // 중앙 정렬을 위한 maxWidth 추가
      margin="80px auto 100px" // 헤더와 내비게이션 바 간격을 위한 margin 추가
    >
      <UserInfo />
      <Cats />
      <Purchase />
      <AccountManage /> {/* 계정 관리 섹션 추가 */}
    </Block.FlexBox>
  );
}
