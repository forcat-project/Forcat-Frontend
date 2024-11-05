import { Block, Text, Img } from "../../style/ui";

export default function Purchase() {
  return (
    <Block.FlexBox direction="column" padding="20px">
      {/* 구매/취소내역 타이틀과 주문상세 */}
      <Block.FlexBox
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="0 0 10px 0"
      >
        <Text.TitleMenu200>구매/취소내역</Text.TitleMenu200>
        <Text.Notice200 pointer color="Gray">
          주문상세 {`>`}
        </Text.Notice200>
      </Block.FlexBox>

      {/* 구매 상태 */}
      <div
        style={{
          width: "calc(100% - 40px)", // 양옆에 20px씩 여백 추가
          // border: "3px solid #D3D3D3", // 더 밝은 회색으로 두껍게 설정
          borderRadius: "8px",
          padding: "16px",
          margin: "20px auto", // 상단 여백과 아래쪽 여백 조정
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // 부드러운 그림자 추가
          backgroundColor: "#f8f8f8", // 배경을 흰색으로 설정
          marginBottom: "5px",
        }}
      >
        <Text.TitleMenu100 color="Green" style={{ marginTop: "10px" }}>
          구매확정
        </Text.TitleMenu100>
        {/* 구매 내역 아이템 */}
        <Block.FlexBox direction="row" alignItems="center" padding="10px 0">
          {/* 상품 이미지 */}
          <Img.AngledIcon
            src="https://contents.lotteon.com/itemimage/_v181926/LO/16/55/87/41/95/_1/65/58/74/19/6/LO1655874195_1655874196_1.jpg/dims/optimize/dims/resizemc/400x400"
            width="60px"
            height="60px"
          />

          {/* 상품 정보 */}
          <Block.FlexBox direction="column" margin="0 0 0 20px" flexGrow="1">
            <Text.Menu>아곤 레더 아일렛 벨트 호보 크로스 숄더백</Text.Menu>
            <Text.Mini color="Gray" margin="5px 0">
              블랙 1개
            </Text.Mini>
            <Text.TitleMenu300>13,900원</Text.TitleMenu300>
          </Block.FlexBox>
        </Block.FlexBox>
      </div>
    </Block.FlexBox>
  );
}
