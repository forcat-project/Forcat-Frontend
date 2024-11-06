import { Block } from "../../styles/ui";
import Footer from "../../components/Home/Footer";
import CategoryBox from "../../components/Home/CategoryBox";
import BannerSlider from "../../components/Home/Banner"; // BannerSlider import
import ChannelTalk from "../../components/Home/ChannelTalk"; // ChannelTalk import

export default function Home() {
    return (
        <>
            <ChannelTalk /> {/* ChannelTalk 컴포넌트 추가 */}
            <Block.FlexBox
                width="100%"
                margin="280px 0 78px 0"
                direction="column"
                justifyContent="space-between"
                gap="40px"
                style={{ overflowY: "auto", scrollbarWidth: "none", maxHeight: "100vh" }}
            >
                {/* 배너 슬라이더 컴포넌트 */}
                <Block.FlexBox width="100%">
                    <BannerSlider />
                </Block.FlexBox>

                {/* 각 카테고리 상품 리스트 */}
                <Block.FlexBox direction="column" gap="40px">
                    <CategoryBox
                        categoryId={null}
                        categoryName="⏰ 지금 놓치면 안 될 최대 할인 상품"
                        morePagePath="/home/discount"
                        ordering="-discount_rate"
                    />
                    <CategoryBox
                        categoryId={null}
                        categoryName="🔥 가장 많이 팔리는 베스트셀러 상품"
                        morePagePath="/home/bestseller"
                        ordering="-purchase_count"
                    />
                    <CategoryBox
                        categoryId={68}
                        categoryName="✨ MD가 자신 있게 추천하는 특별한 상품"
                        morePagePath="/home/mdrecommend"
                    />
                    <CategoryBox categoryId={67} categoryName="💛 오직 포캣에서만!" morePagePath="/home/onlyforcat" />
                </Block.FlexBox>

                {/* 푸터 컴포넌트 */}
                <Footer />
            </Block.FlexBox>
        </>
    );
}