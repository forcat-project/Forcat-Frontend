import { Block, Text, Img, Button } from "../../style/ui";
import { UserProfile } from "../../assets/svg";

export default function Cats() {
  return (
    <Block.FlexBox padding="20px" direction="column">
      <Block.FlexBox justifyContent="space-between" alignItems="center">
        <Text.TitleMenu200>우리집 냐옹이들</Text.TitleMenu200>
        <Text.Mini pointer color="Gray">
          추가
        </Text.Mini>
      </Block.FlexBox>

      {/* 두번째 고양이 정보 */}
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        padding="20px 0"
        alignItems="center"
      >
        {/* 고양이 정보 텍스트 */}
        <Block.FlexBox direction="column">
          <Text.Menu>냥이</Text.Menu>
          <Block.FlexBox margin="5px 0">
            <Text.Mini color="Gray" margin="0 8px 0 0">
              견종:
            </Text.Mini>
            <Text.Mini>제패니즈 스피츠</Text.Mini>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Mini color="Gray" margin="0 8px 0 0">
              나이:
            </Text.Mini>
            <Text.Mini>10개월</Text.Mini>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Mini color="Gray" margin="0 8px 0 0">
              성별:
            </Text.Mini>
            <Text.Mini>여아</Text.Mini>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Mini color="Gray" margin="0 8px 0 0">
              중성화:
            </Text.Mini>
            <Text.Mini>수술 완료</Text.Mini>
          </Block.FlexBox>
          <Block.FlexBox margin="5px 0">
            <Text.Mini color="Gray" margin="0 8px 0 0">
              몸무게:
            </Text.Mini>
            <Text.Mini>11.1kg</Text.Mini>
          </Block.FlexBox>
        </Block.FlexBox>
        <Block.FlexBox alignItems="center" width="100px" height="100px">
          <UserProfile />
          <Button.EditButton onClick={() => alert("편집 버튼 클릭됨")}>
            <Text.Mini>편집</Text.Mini>
          </Button.EditButton>
        </Block.FlexBox>
      </Block.FlexBox>
    </Block.FlexBox>
  );
}
