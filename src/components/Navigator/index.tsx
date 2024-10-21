import { Block } from "../../style/ui";

export default function Navigator() {
    return (
        <>
            <Block.AbsoluteBox
                width="599px"
                height="103px"
                bottom="0"
                style={{ boxShadow: " rgba(0, 0, 0, 0.15) 0px 0px 50px 0px" }}
            >
                <Block.FlexBox>
                    <Block.FlexBox
                        width="100%"
                        height="100px"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid red"
                    >
                        마켓
                    </Block.FlexBox>
                    <Block.FlexBox
                        width="100%"
                        height="100px"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid red"
                    >
                        검색
                    </Block.FlexBox>
                    <Block.FlexBox
                        width="100%"
                        height="100px"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid red"
                    >
                        홈
                    </Block.FlexBox>
                    <Block.FlexBox
                        width="100%"
                        height="100px"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid red"
                    >
                        장바구니
                    </Block.FlexBox>
                    <Block.FlexBox
                        width="100%"
                        height="100px"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid red"
                    >
                        프로필
                    </Block.FlexBox>
                </Block.FlexBox>
            </Block.AbsoluteBox>
        </>
    );
}
