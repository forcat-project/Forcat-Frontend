import { Block, Text, Img } from "../../style/ui";

export default function Purchase() {
  return (
    <Block.FlexBox padding="20px">
      <Text.TitleMenu200>구매/취소내역</Text.TitleMenu200>
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        padding="10px 0"
      >
        <Img.AngledIcon
          src="/path/to/purchase_image.png"
          width="60px"
          height="60px"
        />
        <Block.FlexBox margin="0 0 0 20px">
          <Text.Menu>아곤 레더 아일렛 벨트 호보 크로스 숄더백</Text.Menu>
          <Text.Mini color="Gray">블랙 1개</Text.Mini>
          <Text.TitleMenu300>13,900원</Text.TitleMenu300>
        </Block.FlexBox>
        <Text.Mini pointer color="Gray">
          주문상세
        </Text.Mini>
      </Block.FlexBox>
    </Block.FlexBox>
  );
}
