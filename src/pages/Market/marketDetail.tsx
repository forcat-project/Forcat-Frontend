import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IProduct } from "../../interfaces/product";
import { Block, Img, Text } from "../../style/ui";

export default function MarketDetail() {
    const { productId } = useParams();

    const [productDetail, setProductDetail] = useState<IProduct | null>();
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        axios
            .get(`http://125.189.109.17/api/products/${productId}`)
            .then(response => {
                setProductDetail(response.data);
                console.log("받은 데이터:", response.data);
            })
            .catch((error: AxiosError) => {
                setError(error);
                console.error("통신 실패:", error.message);
            });
    }, [productId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header pageType="marketDetail" />

            <Block.FlexBox margin="89px 0" justifyContent="center" style={{ overflow: "auto", scrollbarWidth: "none" }}>
                {productDetail ? (
                    <Block.FlexBox direction="column" alignItems="center" padding="30px 21px" gap="20px">
                        <Img.AngledIcon
                            width="599px"
                            height="100vh"
                            src={productDetail.thumbnail_url}
                            alt={productDetail.name}
                        />

                        <Block.FlexBox direction="column" gap="9px">
                            <Text.Notice200 color="Gray"> {productDetail.company}</Text.Notice200>

                            <Text.TitleMenu100>{productDetail.name}</Text.TitleMenu100>

                            <Block.FlexBox direction="column">
                                <Text.OriginalPrice>{productDetail.price}원</Text.OriginalPrice>
                                <Block.FlexBox width="100%" gap="7px">
                                    <Text.Discount color="Warning"> {productDetail.discount_rate}% </Text.Discount>
                                    <Text.Discount color="Black">{productDetail.price}원</Text.Discount>
                                </Block.FlexBox>
                            </Block.FlexBox>
                        </Block.FlexBox>

                        <Block.FlexBox
                            direction="column"
                            gap="20px"
                            padding="43px 0"
                            style={{ borderTop: "1px solid #E8E8E8" }}
                        >
                            <Text.TitleMenu200> 상품 상세 정보 </Text.TitleMenu200>
                            <Img.AngledIcon
                                width="100%"
                                height="100%"
                                src={productDetail.description_image_url}
                                alt={productDetail.name}
                            />
                        </Block.FlexBox>
                    </Block.FlexBox>
                ) : (
                    "로딩중"
                )}
            </Block.FlexBox>
        </>
    );
}
