import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputState, userState } from "../../recoil";
import { useCallback, useEffect, useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../style/ui";
import InputAddress from "../../components/Signup/InputAddress";
import InputUserNickName from "../../components/Signup/InputUserNickName";
import InputCatName from "../../components/Signup/InputCatName";
import InputCatBreed from "../../components/Signup/InputCatBreed";
import InputBirthDate from "../../components/Signup/InputBirthDate";
import InputCatGender from "../../components/Signup/InputCatGender";
import InputCatIsNeutered from "../../components/Signup/InputCatIsNeutered";
import InputCatWeight from "../../components/Signup/InputCatWeight";
import InputPhoneNumber from "../../components/Signup/InputPhoneNumber";
import axiosInstance from "../../api/axiosInstance";
import { getCookie } from "../../api/cookie";

export default function Signup() {
    const [, setUserInfo] = useRecoilState(userState);
    const inputData = useRecoilValue(inputState);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSkipClick = () => {
        navigate("/home");
    };

    const [step, setStep] = useState(1);

    const userInfo = useRecoilValue(userState);

    const handleSubmitUserInfo = async () => {
        try {
            const res = await axiosInstance.post(`/users/sign-up`, {
                kakao_id: userInfo.kakao_id,
                username: userInfo.username,
                nickname: userInfo.nickname,
            });
            console.log(res);
            alert("사용자 정보 등록에 성공했습니다.");

            console.log(userInfo);
            setStep(step + 1);
        } catch (error) {
            alert("사용자 정보 등록에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const steps = [
        {
            title: "보호자님의",
            subtitle: "이름을 알려주세요",
            components: [<InputUserName key="name" />],
            requiredFields: ["name"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "보호자님의",
            subtitle: "휴대폰 번호를 알려주세요",
            components: [<InputPhoneNumber key="phone" />, <InputUserName key="name" />],
            requiredFields: ["phoneNumber", "name"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "맞춤 서비스 제공을 위해",
            subtitle: "추가 정보를 입력해 주세요",
            components: [<InputAddress key="address" />],
            requiredFields: ["address", "address_detail"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "이제 포캣에서 활동할",
            subtitle: "프로필을 등록해봐요",
            components: [<InputUserNickName key="nickname" />],
            requiredFields: ["nickname"],
            buttonLabel: "등록하기",
            onButtonClick: handleSubmitUserInfo,
        },
        {
            title: "우리 고양이 이름을",
            subtitle: "알려주세요",
            components: [<InputCatName key="catName" />],
            requiredFields: ["catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "우리 고양이 품종을",
            subtitle: "알려주세요",
            components: [<InputCatBreed key="catBreed" />, <InputCatName key="catName" />],
            requiredFields: ["catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "우리 고양이 생년월일을",
            subtitle: "알려주세요",
            components: [
                <InputBirthDate key="birthDate" />,
                <InputCatBreed key="catBreed" />,
                <InputCatName key="catName" />,
            ],
            requiredFields: ["birthDate", "catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "우리 고양이 성별을",
            subtitle: "알려주세요",
            components: [
                <InputCatGender key="catGender" />,
                <InputBirthDate key="birthDate" />,
                <InputCatBreed key="catBreed" />,
                <InputCatName key="catName" />,
            ],
            requiredFields: ["catGender", "birthDate", "catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "우리 고양이 중성화 수술 여부를",
            subtitle: "알려주세요",
            components: [
                <InputCatIsNeutered key="isNeutered" />,
                <InputCatGender key="catGender" />,
                <InputBirthDate key="birthDate" />,
                <InputCatBreed key="catBreed" />,
                <InputCatName key="catName" />,
            ],
            requiredFields: ["isNeutered", "catGender", "birthDate", "catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            title: "우리 고양이 몸무게를",
            subtitle: "알려주세요",
            components: [
                <InputCatWeight key="catWeight" />,
                <InputCatIsNeutered key="isNeutered" />,
                <InputCatGender key="catGender" />,
                <InputBirthDate key="birthDate" />,
                <InputCatBreed key="catBreed" />,
                <InputCatName key="catName" />,
            ],
            requiredFields: ["catWeight", "isNeutered", "catGender", "birthDate", "catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
    ];

    const navigateToHome = useCallback(() => navigate("/home"), [navigate]);

    useEffect(() => {
        const isExistedCookie = getCookie("access_token");

        if (!isExistedCookie) {
            const searchParams = new URLSearchParams(location.search);
            const userName = searchParams.get("username") || "";
            const userProfileInfo = searchParams.get("profile_image") || "";
            const kakaoId = searchParams.get("kakao_id") || "";
            const userProfileImage = userProfileInfo.startsWith("$") ? userProfileInfo.substring(1) : userProfileInfo;
            setUserInfo(prev => ({
                ...prev,
                kakao_id: kakaoId,
                username: userName,
                profile_picture: userProfileImage,
            }));
        } else {
            navigateToHome();
        }
    }, [location.search, setUserInfo, navigateToHome]);

    const isStepValid = () => {
        const requiredFields = steps[step - 1].requiredFields;

        return requiredFields.every(field => {
            return inputData[field] && inputData[field].trim() !== "";
        });
    };

    const { title, subtitle, components, buttonLabel } = steps[step - 1];

    return (
        <>
            <Block.FlexBox
                width="100%"
                direction="column"
                justifyContent="space-between"
                padding="97px 20px 23px 20px"
                margin="60px 0 0 0"
                gap="60px"
                style={{ overflowY: "scroll", scrollbarWidth: "none" }}
            >
                <section>
                    <Block.FlexBox direction="column" gap="64px">
                        <Block.AbsoluteBox top="64px" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {step >= 5 && (
                                <Block.AbsoluteBox
                                    width="560px"
                                    pointer
                                    style={{ display: "flex", justifyContent: "flex-end" }}
                                    onClick={handleSkipClick}
                                >
                                    <Block.FlexBox
                                        width="200px"
                                        height="35px"
                                        justifyContent="center"
                                        alignItems="center"
                                        borderRadius="50px"
                                        border="1px solid #F6ECD7"
                                    >
                                        <Text.Warning color="Yellow">고양이 정보는 나중에 등록할게요</Text.Warning>
                                    </Block.FlexBox>
                                </Block.AbsoluteBox>
                            )}
                            <Text.TitleMenu300>{title}</Text.TitleMenu300>
                            <Text.TitleMenu300>{subtitle}</Text.TitleMenu300>
                        </Block.AbsoluteBox>

                        {components.map(component => component)}
                    </Block.FlexBox>
                </section>
            </Block.FlexBox>
            <Block.AbsoluteBox
                width="599px"
                height="93px"
                bottom="0"
                bgColor="white"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 50px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button.Confirm onClick={steps[step - 1].onButtonClick} isDisabled={!isStepValid()}>
                    <Text.TitleMenu300 color="White">{buttonLabel}</Text.TitleMenu300>
                </Button.Confirm>
            </Block.AbsoluteBox>
        </>
    );
}
