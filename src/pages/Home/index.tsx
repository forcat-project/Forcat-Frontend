import { BannerEx } from "../../assets/svg";
import Footer from "../../components/Footer";
import { Block, Text } from "../../style/ui";

export default function Home() {
    return (
        <>
            <Block.FlexBox
                width="100%"
                margin="89px 0 103px 0"
                direction="column"
                justifyContent="space-between"
                style={{ overflow: "scroll", scrollbarWidth: "none" }} // Footer와 margin을 고려한 높이 설정
            >
                <Block.FlexBox width="599px" height="277px" bgColor="black">
                    <BannerEx />
                </Block.FlexBox>

                <Block.FlexBox width="599px" direction="column" padding="33px 18px" style={{ height: "1000px" }}>
                    <Block.FlexBox width="100%" height="800px">
                        <Text.Menu>
                            imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s
                        </Text.Menu>
                    </Block.FlexBox>
                    <Block.FlexBox width="100%" height="800px">
                        <Text.Menu>
                            imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s
                        </Text.Menu>
                    </Block.FlexBox>

                    <Block.FlexBox width="100%" height="800px">
                        <Text.Menu>
                            imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s
                        </Text.Menu>
                    </Block.FlexBox>
                </Block.FlexBox>

                <Footer />
            </Block.FlexBox>
        </>
    );
}
