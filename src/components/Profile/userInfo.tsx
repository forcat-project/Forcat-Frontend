import UserProfile from "../../assets/svg/UserProfile";
import { Block, Text, Button } from "../../style/ui";

export default function UserInfo() {
    return (
        <Block.FlexBox direction="column" padding="20px" bgColor="white">
            <Block.FlexBox direction="row" justifyContent="space-between" alignItems="center">
                {/* 프로필 이미지와 이름 */}
                <Block.FlexBox direction="row" alignItems="center">
                    <Block.FlexBox width="70px" height="70px">
                        <UserProfile />
                    </Block.FlexBox>
                    <Block.FlexBox margin="0 0 0 20px">
                        <Text.TitleMenu300>dkfjierk</Text.TitleMenu300>
                    </Block.FlexBox>
                </Block.FlexBox>

                {/* 편집 버튼 */}
                <Button.EditButton onClick={() => alert("편집 버튼 클릭됨")}>
                    <Text.Mini>편집</Text.Mini>
                </Button.EditButton>
            </Block.FlexBox>

            {/* 생선 포인트 */}
            <Block.FlexBox direction="row" alignItems="center" style={{ marginLeft: "10px" }}>
                <img
                    src="https://e7.pngegg.com/pngimages/53/63/png-clipart-fish-bone-computer-icons-fish-blue-marine-mammal.png"
                    alt="Fish Icon"
                    width="24"
                    height="24"
                />
                <Text.Mini color="Gray">모은 생선 포인트</Text.Mini>
                <Text.TitleMenu300 style={{ marginLeft: "10px" }}>0 P</Text.TitleMenu300> {/* 간격 추가 */}
            </Block.FlexBox>
        </Block.FlexBox>
    );
}
