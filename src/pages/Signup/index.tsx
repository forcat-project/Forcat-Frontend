import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputState, userState } from "../../recoil";
import { useEffect, useState } from "react";
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

export default function Signup() {
    const [, setUserInfo] = useRecoilState(userState);
    const inputData = useRecoilValue(inputState);
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const steps = [
        {
            title: "보호자님의",
            subtitle: "이름을 알려주세요",
            components: [<InputUserName key="name" />],
            requiredFields: ["name"],
        },
        {
            title: "보호자님의",
            subtitle: "휴대폰 번호를 알려주세요",
            components: [<InputPhoneNumber key="phone" />, <InputUserName key="name" />],
            requiredFields: ["phoneNumber", "name"],
        },
        {
            title: "맞춤 서비스 제공을 위해",
            subtitle: "추가 정보를 입력해 주세요",
            components: [<InputAddress key="address" />],
            requiredFields: ["address", "address_detail"],
        },
        {
            title: "이제 포캣에서 활동할",
            subtitle: "프로필을 등록해봐요",
            components: [<InputUserNickName key="nickname" />],
            requiredFields: ["nickname"],
        },
        {
            title: "우리 고양이 이름을",
            subtitle: "알려주세요",
            components: [<InputCatName key="catName" />],
            requiredFields: ["catName"],
        },
        {
            title: "우리 고양이 품종을",
            subtitle: "알려주세요",
            components: [<InputCatBreed key="catBreed" />, <InputCatName key="catName" />],
            requiredFields: ["catBreed", "catName"],
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
        },
    ];

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userName = searchParams.get("username") || "";
        const userProfileInfo = searchParams.get("profile_image") || "";
        const userProfileImage = userProfileInfo.startsWith("$") ? userProfileInfo.substring(1) : userProfileInfo;
        setUserInfo(prev => ({ ...prev, username: userName, profile_picture: userProfileImage }));
    }, [location.search, setUserInfo]);

    const handleButtonNext = () => {
        if (isStepValid()) {
            if (step < steps.length) {
                setStep(step + 1);
            } else {
                navigate("/home");
            }
        }
    };

    const isStepValid = () => {
        const requiredFields = steps[step - 1].requiredFields;

        return requiredFields.every(field => {
            return inputData[field] && inputData[field].trim() !== "";
        });
    };

    const { title, subtitle, components } = steps[step - 1];

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
                <Button.Confirm onClick={handleButtonNext} isDisabled={!isStepValid()}>
                    <Text.TitleMenu300 color="White">확인</Text.TitleMenu300>
                </Button.Confirm>
            </Block.AbsoluteBox>
        </>
    );
}
