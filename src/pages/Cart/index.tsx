import { useNavigate } from "react-router-dom";
import { Block, Button, Img, Text } from "../../style/ui";

export default function Cart() {
    const navigate = useNavigate();

    const handleContinueShoppingButtonClick = () => {
        navigate("/market");
    };

    const handlePaymentButtonClick = () => {
        console.log("결제하러 이동");
    };

    const dummyProducts = [
        {
            product_id: 1,
            name: "VIF 비프 풍미 가득한 고양이 습식 간식 파우치 75g",
            company: "닥터할리",
            price: "1500.00",
            discount_rate: "0.00",
            discounted_price: 1500,
            thumbnail_url: "https://neko.co.kr/web/product/big/202307/0398cc536673eec84d5abfdf593fb0ed.jpg",
            remain_count: 120,
        },
        {
            product_id: 2,
            name: "냥냥이 롤링 캣닢볼 고양이 마약캔디 15g",
            company: "닥터할리",
            price: "2500.00",
            discount_rate: "0.00",
            discounted_price: 2500,
            thumbnail_url: "https://neko.co.kr/web/product/big/202307/e4a196969b5c537e9eb95a1bd92e7049.png",
            remain_count: 250,
        },
        {
            product_id: 3,
            name: "[2+1] 브릿 케어 파우치 그레이비 고양이 습식사료 주식캔 85g",
            company: "펫모닝",
            price: "13500.00",
            discount_rate: "20.00",
            discounted_price: 10800,
            thumbnail_url: "https://neko.co.kr/web/product/big/202307/8711a51ccbb9c8c7e045e4dcd2043e25.jpg",
            remain_count: 876,
        },
        {
            product_id: 4,
            name: "습식사료BB",
            company: "펫점심",
            price: "3300.00",
            discount_rate: "10.00",
            discounted_price: 2970,
            thumbnail_url: "https://neko.co.kr/web/product/big/202306/4dccec464155f594f63878d90ee95b2f.jpg",
            remain_count: 60,
        },
        {
            product_id: 5,
            name: "건식사료",
            company: "닥터할리",
            price: "123300.00",
            discount_rate: "50.00",
            discounted_price: 61650,
            thumbnail_url: "https://neko.co.kr/web/product/big/202306/48051ad08a6f6614add426c73c7adb57.jpg",
            remain_count: 180,
        },
    ];

    return (
        <>
            {dummyProducts.length === 0 ? (
                <Block.FlexBox bgColor="#F9F9F9" alignItems="center">
                    <Block.FlexBox
                        width="100%"
                        height="93px"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="12px"
                    >
                        <Text.TitleMenu200> 장바구니에 담은 상품이 없어요</Text.TitleMenu200>

                        <Text.Notice100>상품을 추가해보세요!</Text.Notice100>
                    </Block.FlexBox>
                    <Block.AbsoluteBox
                        width="599px"
                        height="90px"
                        bgColor="white"
                        bottom="0"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Button.Confirm onClick={handleContinueShoppingButtonClick}>쇼핑 계속하기</Button.Confirm>
                    </Block.AbsoluteBox>
                </Block.FlexBox>
            ) : (
                <Block.FlexBox margin="100px 0 0 0">
                    전체 선택
                    <Block.AbsoluteBox
                        width="599px"
                        height="90px"
                        bgColor="white"
                        bottom="0"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Button.Confirm onClick={handlePaymentButtonClick}>결제하기 ( 원)</Button.Confirm>
                    </Block.AbsoluteBox>
                </Block.FlexBox>
            )}
        </>
    );
}
