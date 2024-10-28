import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { useEffect, useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../style/ui";
import InputPhoneNumber from "../../components/Signup/InputPhoneNumber";

export default function Signup() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("nickname") || "";
    const userProfileInfo = searchParams.get("profile_image") || "";
    const userProfileImage = userProfileInfo.startsWith("$") ? userProfileInfo.substring(1) : userProfileInfo;

    useEffect(() => {
        setUserInfo(prev => ({
            ...prev,
            nickname: userName,
            profile_picture: userProfileImage,
        }));
    }, [userName, userProfileImage, setUserInfo]);

    const [step, setStep] = useState(1);

    const handleButtonNext = () => {
        setStep(step + 1);
    };

    const handleUserNameChange = (newName: string) => {
        setUserInfo(prev => ({ ...prev, nickname: newName }));
    };

    return (
        <>
            <Block.FlexBox
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                padding="97px 20px 23px 20px"
                gap="60px"
            >
                <section>
                    <Block.FlexBox direction="column" gap="64px">
                        {step === 1 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>보호자님의</Text.TitleMenu300>
                                    <Text.TitleMenu300>이름을 알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputUserName userName={userInfo.nickname} onChange={handleUserNameChange} />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>보호자님의 </Text.TitleMenu300>
                                    <Text.TitleMenu300>전화번호를 알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputPhoneNumber setUserInfo={setUserInfo} />
                                <InputUserName userName={userInfo.nickname} onChange={handleUserNameChange} />
                            </>
                        )}
                    </Block.FlexBox>
                </section>

                <Button.Confirm onClick={handleButtonNext}>
                    <Text.TitleMenu300 color="White">확인</Text.TitleMenu300>
                </Button.Confirm>
            </Block.FlexBox>
        </>
    );
}
