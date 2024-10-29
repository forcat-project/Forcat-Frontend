import { Block } from "../../style/ui";
import { BannerEx } from "../../assets/svg";
import Footer from "../../components/Home/Footer";
import CategoryBox from "../../components/Home/CategoryBox";

export default function Home() {
  console.log("환영합니다");
  return (
    <>
      <Block.FlexBox
        width="100%"
        margin="89px 0 93px 0"
        direction="column"
        justifyContent="space-between"
        gap="40px" // 블록 간의 간격을 늘리기 위해 gap 속성 추가
        style={{ overflow: "scroll", scrollbarWidth: "none" }}
      >
        {/* 배너 컴포넌트 */}
        <Block.FlexBox width="599px" height="277px" bgColor="black">
          <BannerEx />
        </Block.FlexBox>

        {/* 각 카테고리 상품 리스트 */}
        <Block.FlexBox direction="column" gap="40px">
          <CategoryBox
            categoryId={null}
            categoryName="⏰ 지금 놓치면 안 될 최대 할인 상품"
            morePagePath="/home/discount"
            ordering="-discount_rate" // ordering 추가
          />
          <CategoryBox
            categoryId={null} // categoryId를 null로 설정
            categoryName="🔥 가장 많이 팔리는 베스트셀러 상품" // 베스트셀러 상품
            morePagePath="/home/bestseller"
            ordering="-purchase_count" // ordering 추가
          />
          <CategoryBox
            categoryId={68}
            categoryName="✨ MD가 자신 있게 추천하는 특별한 상품"
            morePagePath="/home/mdrecommend"
          />

          <CategoryBox
            categoryId={67}
            categoryName="💛 오직 포캣에서만!"
            morePagePath="/home/onlyforcat"
          />
        </Block.FlexBox>

        {/* 푸터 컴포넌트 */}
        <Footer />
      </Block.FlexBox>
    </>
  );
}
