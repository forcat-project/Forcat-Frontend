import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { useEffect, useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../style/ui";
import InputPhoneNumber from "../../components/Signup/InputPhoneNumber";
import InputAddress from "../../components/Signup/InputAddress";

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
    const navigate = useNavigate();

    const handleButtonNext = () => {
        console.log(userInfo);
        setStep(step + 1);
        if (step === 4) {
            navigate("/home");
        }
    };

    const handleUserNameChange = (newName: string) => {
        setUserInfo(prev => ({ ...prev, nickname: newName }));
    };

    return (
        <>
            <Block.FlexBox direction="column" justifyContent="space-between" padding="97px 20px 23px 20px" gap="60px">
                <section>
                    <Block.FlexBox direction="column" gap="64px">
                        {step === 1 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>보호자님의</Text.TitleMenu300>
                                    <Text.TitleMenu300>이름을 알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputUserName onChange={handleUserNameChange} />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>보호자님의</Text.TitleMenu300>
                                    <Text.TitleMenu300>휴대폰 번호를 알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputPhoneNumber setUserInfo={setUserInfo} />
                                <InputUserName onChange={handleUserNameChange} />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>맞춤 서비스 제공을 위해</Text.TitleMenu300>
                                    <Text.TitleMenu300>추가 정보를 입력해 주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputAddress address={userInfo.address} />
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
