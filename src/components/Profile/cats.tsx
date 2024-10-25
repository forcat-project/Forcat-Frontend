import { Block, Text, Button } from "../../style/ui";
import { UserProfile } from "../../assets/svg";

export default function Cats() {
  return (
    <Block.FlexBox padding="20px" direction="column">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>우리집 냐옹이들</Text.TitleMenu200>
        <Text.TitleMenu100 pointer color="Gray">
          추가
        </Text.TitleMenu100>
      </Block.FlexBox>

      {/* 두번째 고양이 정보 */}
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        padding="20px 20px"
        alignItems="center"
      >
        {/* 고양이 정보 텍스트 */}
        <Block.FlexBox direction="column">
          <Text.TitleMenu300 style={{ marginBottom: "10px" }}>
            냥이
          </Text.TitleMenu300>
          <Block.FlexBox margin="5px 0">
            <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
              견종
            </Text.Notice200>
            <Text.Notice200>제패니즈 스피츠</Text.Notice200>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
              나이
            </Text.Notice200>
            <Text.Notice200>10개월</Text.Notice200>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
              성별
            </Text.Notice200>
            <Text.Notice200>여아</Text.Notice200>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
              중성화
            </Text.Notice200>
            <Text.Notice200>수술 완료</Text.Notice200>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Notice200 color="Gray" style={{ marginRight: "10px" }}>
              몸무게
            </Text.Notice200>
            <Text.Notice200>11.1kg</Text.Notice200>
          </Block.FlexBox>
        </Block.FlexBox>

        <Block.FlexBox
          alignItems="center"
          width="150px"
          height="150px"
          direction="column"
        >
          <UserProfile />
          <Button.EditButton onClick={() => alert("편집 버튼 클릭됨")}>
            <Text.Mini>편집</Text.Mini>
          </Button.EditButton>
        </Block.FlexBox>
      </Block.FlexBox>
    </Block.FlexBox>
  );
}
