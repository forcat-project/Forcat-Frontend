import { useState } from "react";
import { Checked, MinusGray, PlusGray, RemoveGray, Unchecked, X } from "../../assets/svg";
import { Block, Button, Img, Text } from "../../style/ui";

type Product = {
    product_id: number;
    name: string;
    company: string;
    price: string;
    discount_rate: string;
    discounted_price: number;
    thumbnail_url: string;
    remain_count: number;
};

type Props = {
    onPayment: () => void;
    dummyProducts: Product[];
};

export function CartList({ onPayment, dummyProducts }: Props) {
    const [isAllCheckButtonClick, setIsAllCheckButtonClick] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const groupedProducts = dummyProducts.reduce((acc, product) => {
        (acc[product.company] = acc[product.company] || []).push(product);
        return acc;
    }, {} as { [company: string]: Product[] });

    const handleProductCheckToggle = (productId: number) => {
        setSelectedProducts(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const handleAllCheckToggle = () => {
        if (isAllCheckButtonClick) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(dummyProducts.map(product => product.product_id));
        }
        setIsAllCheckButtonClick(prev => !prev);
    };

    const handleProductRemove = () => {
        console.log("지우기");
    };

    const totalPrice = selectedProducts.reduce((total, productId) => {
        const product = dummyProducts.find(p => p.product_id === productId);
        return total + (product ? product.discounted_price : 0);
    }, 0);

    return (
        <Block.FlexBox margin="110px 0 0 0" direction="column">
            <Block.FlexBox justifyContent="center">
                <Block.FlexBox
                    width="90%"
                    height="50px"
                    alignItems="center"
                    gap="10px"
                    style={{ borderBottom: "2px solid #D9D9D9" }}
                    onClick={handleAllCheckToggle}
                >
                    {isAllCheckButtonClick ? (
                        <Checked width={21} height={21} cursor="pointer" />
                    ) : (
                        <Unchecked width={21} height={21} cursor="pointer" />
                    )}
                    <Text.TitleMenu100 pointer>전체 선택</Text.TitleMenu100>
                </Block.FlexBox>
            </Block.FlexBox>

            <Block.FlexBox
                width="100%"
                height="87%"
                padding="0 0 30px 0"
                direction="column"
                style={{
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                }}
            >
                {Object.entries(groupedProducts).map(([company, products]) => (
                    <Block.FlexBox padding="30px 40px" gap="30px" direction="column" key={company}>
                        <Text.TitleMenu300>{company}</Text.TitleMenu300>
                        {products.map(product => (
                            <Block.FlexBox key={product.product_id}>
                                <Block.FlexBox
                                    width="23px"
                                    height="23px"
                                    onClick={() => handleProductCheckToggle(product.product_id)}
                                >
                                    {selectedProducts.includes(product.product_id) ? (
                                        <Checked width={21} height={21} cursor="pointer" />
                                    ) : (
                                        <Unchecked width={21} height={21} cursor="pointer" />
                                    )}
                                </Block.FlexBox>

                                <Block.FlexBox margin="0 0 0 20px" alignItems="flex-start">
                                    <Img.AngledIcon
                                        width="90px"
                                        height="90px"
                                        src={product.thumbnail_url}
                                        alt={product.name}
                                        style={{
                                            borderRadius: "16px",
                                        }}
                                    />
                                    <Block.FlexBox width="300px" margin="0 0 0 20px" direction="column" gap="10px">
                                        <Text.TitleMenu100>{product.name}</Text.TitleMenu100>
                                        <Block.FlexBox alignItems="flex-end">
                                            <Block.FlexBox width="100px" direction="column" gap="3px">
                                                {Number(product?.discount_rate) > 0 ? (
                                                    <>
                                                        <Text.OriginalPrice>
                                                            {product && Math.floor(product?.price).toLocaleString()}원{" "}
                                                        </Text.OriginalPrice>
                                                        <Text.TitleMenu200>
                                                            {Math.floor(
                                                                Number(product?.discounted_price)
                                                            ).toLocaleString()}{" "}
                                                            원
                                                        </Text.TitleMenu200>
                                                    </>
                                                ) : (
                                                    <Text.TitleMenu200>
                                                        {Math.floor(Number(product?.discounted_price)).toLocaleString()}{" "}
                                                        원
                                                    </Text.TitleMenu200>
                                                )}
                                            </Block.FlexBox>
                                        </Block.FlexBox>
                                        <Block.FlexBox
                                            width="75px"
                                            height="20px"
                                            border="1px solid #E8E8E8"
                                            borderRadius="30px"
                                            justifyContent="space-around"
                                            alignItems="center"
                                        >
                                            <MinusGray cursor="pointer" width={10} height={21} />
                                            <Text.Notice100>1</Text.Notice100>
                                            <PlusGray cursor="pointer" width={10} height={21} />
                                        </Block.FlexBox>
                                    </Block.FlexBox>
                                </Block.FlexBox>

                                <Block.FlexBox
                                    width="30px"
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                >
                                    <RemoveGray width={10} cursor="pointer" onClick={handleProductRemove} />
                                </Block.FlexBox>
                            </Block.FlexBox>
                        ))}
                    </Block.FlexBox>
                ))}
            </Block.FlexBox>

            <Block.AbsoluteBox
                width="599px"
                height="90px"
                bgColor="white"
                bottom="0"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Button.Confirm isDisabled={selectedProducts.length === 0} onClick={onPayment}>
                    <Text.TitleMenu200 color="White">
                        {totalPrice.toLocaleString()}원 결제하기 ({selectedProducts.length}개)
                    </Text.TitleMenu200>
                </Button.Confirm>
            </Block.AbsoluteBox>
        </Block.FlexBox>
    );
}
