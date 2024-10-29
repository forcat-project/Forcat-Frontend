import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";
import { useEffect, useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../style/ui";
import InputPhoneNumber from "../../components/Signup/InputPhoneNumber";
import InputAddress from "../../components/Signup/InputAddress";
import InputUserNickName from "../../components/Signup/InputUserNickName";
import InputCatName from "../../components/Signup/InputCatName";
import InputCatBreed from "../../components/Signup/InputCatBreed";
import InputBirthDate from "../../components/Signup/InputBirthDate";
import InputCatGender from "../../components/Signup/InputCatGender";
import InputCatIsNeutered from "../../components/Signup/InputCatIsNeutered";

export default function Signup() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("username") || "";
    const userProfileInfo = searchParams.get("profile_image") || "";
    const userProfileImage = userProfileInfo.startsWith("$") ? userProfileInfo.substring(1) : userProfileInfo;

    useEffect(() => {
        setUserInfo(prev => ({
            ...prev,
            username: userName,
            profile_picture: userProfileImage,
        }));
    }, [userName, userProfileImage, setUserInfo]);

    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleButtonNext = () => {
        console.log(userInfo);
        setStep(step + 1);
        // if (step === 5) {
        //     navigate("/home");
        // }
    };

    const handleRegistrationComplete = () => {
        navigate("/home");
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
                                <InputUserName />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>보호자님의</Text.TitleMenu300>
                                    <Text.TitleMenu300>휴대폰 번호를 알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputPhoneNumber setUserInfo={setUserInfo} />
                                <InputUserName />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>맞춤 서비스 제공을 위해</Text.TitleMenu300>
                                    <Text.TitleMenu300>추가 정보를 입력해 주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputAddress />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>이제 포캣에서 활동할</Text.TitleMenu300>
                                    <Text.TitleMenu300>프로필을 등록해봐요</Text.TitleMenu300>
                                    <Text.Warning color="Gray">프로필 사진은 나중에도 등록 가능해요!</Text.Warning>
                                </Block.FlexBox>
                                <InputUserNickName />
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>우리 고양이 이름을</Text.TitleMenu300>
                                    <Text.TitleMenu300>알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputCatName />
                                <Block.FlexBox justifyContent="center">
                                    <Button.RadiusButton onClick={handleRegistrationComplete}>
                                        <Text.TitleMenu100 color="Yellow">
                                            고양이 정보는 나중에 등록할게요
                                        </Text.TitleMenu100>
                                    </Button.RadiusButton>
                                </Block.FlexBox>
                            </>
                        )}

                        {step === 6 && (
                            <>
                                {/* react-modal 연결하기 */}
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>우리 고양이 품종을</Text.TitleMenu300>
                                    <Text.TitleMenu300>알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputCatBreed />
                                <InputCatName />
                            </>
                        )}
                        {step === 7 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>우리 고양이 생년월일을</Text.TitleMenu300>
                                    <Text.TitleMenu300>알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputBirthDate />
                                <InputCatBreed />
                                <InputCatName />
                            </>
                        )}

                        {step === 8 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>우리 고양이 성별을</Text.TitleMenu300>
                                    <Text.TitleMenu300>알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputCatGender />
                                <InputBirthDate />
                                <InputCatBreed />
                                <InputCatName />
                            </>
                        )}

                        {step === 9 && (
                            <>
                                <Block.FlexBox direction="column" gap="10px">
                                    <Text.TitleMenu300>우리 고양이 중성화 수술 여부를</Text.TitleMenu300>
                                    <Text.TitleMenu300>알려주세요</Text.TitleMenu300>
                                </Block.FlexBox>
                                <InputCatIsNeutered />
                                <InputCatGender />
                                <InputBirthDate />
                                <InputCatBreed />
                                <InputCatName />
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
