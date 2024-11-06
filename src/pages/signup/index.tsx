import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { catState, inputState, userState } from "../../store/atoms";
import { useCallback, useEffect, useState } from "react";
import InputUserName from "../../components/Signup/InputUserName";
import { Block, Button, Text } from "../../styles/ui";
import InputAddress from "../../components/Signup/InputAddress";
import InputUserNickName from "../../components/Signup/InputUserNickName";
import InputCatName from "../../components/Signup/InputCatName";
import InputCatBreed from "../../components/Signup/InputCatBreed";
import InputBirthDate from "../../components/Signup/InputBirthDate";
import InputCatGender from "../../components/Signup/InputCatGender";
import InputCatIsNeutered from "../../components/Signup/InputCatIsNeutered";
import InputCatWeight from "../../components/Signup/InputCatWeight";
import InputPhoneNumber from "../../components/Signup/InputPhoneNumber";
import { userAPI } from "../../api/resourses/users";
import { ICat, IInputData, IUser } from "../../interfaces/product";
import { catAPI } from "../../api/resourses/cats";
import { useUserId } from "../../hooks/useUserId";
import styled from "styled-components";

export default function Signup() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const catInfo = useRecoilValue(catState);
    const inputData = useRecoilValue(inputState);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSkipClick = () => {
        navigate("/home");
    };

    const [step, setStep] = useState(1);
    const userId = useUserId();
    console.log("??", userId);

    const handleSubmitUserInfo = async () => {
        try {
            const userData: IUser = {
                username: userInfo.username,
                nickname: userInfo.nickname,
                profile_picture: userInfo.profile_picture,
                address: userInfo.address,
                address_detail: userInfo.address_detail,
                phone_number: userInfo.phone_number,
                kakao_id: userInfo.kakao_id,
                google_id: userInfo.google_id,
                naver_id: userInfo.naver_id,
            };

            const res = await userAPI.signup(userData);
            alert("사용자 정보 등록에 성공했습니다.");
            sessionStorage.setItem("access_token", res.data["access_token"]);
            sessionStorage.setItem("refresh_token", res.data["refresh_token"])
            setStep(step + 1);
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (errorData.nickname) {
                    alert("이미 사용 중인 닉네임입니다.");
                } else {
                    alert("사용자 정보 등록에 실패했습니다. 다시 시도해 주세요.");
                }
            } else {
                console.log(error);
                alert("오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };

    const handleSubmitCatInfo = async () => {
        try {
            const catData: ICat = {
                name: catInfo.name,
                cat_breed: catInfo.cat_breed,
                // cat_breed_name: catInfo.cat_breed_name,
                birth_date: catInfo.birth_date,
                gender: catInfo.gender,
                is_neutered: catInfo.is_neutered,
                weight: catInfo.weight,
            };

            const res = await catAPI.createCat(userId!, catData);
            console.log(res);
            alert("고양이 정보 등록에 성공했습니다.");
            navigate("/home");
        } catch (error) {
            console.log(error);
            console.log(catInfo.cat_breed);

            alert("고양이 정보 등록에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const handleStepButtonClick = () => {
        if (isStepValid()) {
            steps[step - 1].onButtonClick();
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
            onButtonClick: handleSubmitCatInfo,
        },
    ];

    const navigateToHome = useCallback(() => navigate("/home"), [navigate]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userName = searchParams.get("username") || "";
        const userProfileInfo = searchParams.get("profile_image") || "";
        const kakaoId = searchParams.get("kakao_id") || "";
        const googleId = searchParams.get("google_id") || "";
        const naverId = searchParams.get("naver_id") || "";
        const userProfileImage = userProfileInfo.startsWith("$") ? userProfileInfo.substring(1) : userProfileInfo;
        setUserInfo(prev => ({
            ...prev,
            kakao_id: kakaoId,
            google_id: googleId,
            naver_id: naverId,
            username: userName,
            profile_picture: userProfileImage,
        }));
    }, [location.search, setUserInfo, navigateToHome]);

    const isStepValid = () => {
        const requiredFields = steps[step - 1].requiredFields;

        return requiredFields.every(field => {
            const fieldKey = field as keyof IInputData;
            const value = inputData[fieldKey];

            return typeof value === "string" ? value.trim() !== "" : value !== null;
        });
    };

    const { title, subtitle, components, buttonLabel } = steps[step - 1];

    return (
        <>
            <Block.AbsoluteBox
                top="0px"
                width="100%"
                height="150px"
                padding="20px"
                bgColor="white"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: "10px",
                }}
            >
                {step >= 5 && (
                    <Block.AbsoluteBox
                        width="100px"
                        pointer
                        onClick={handleSkipClick}
                        style={{ right: "20px", display: "flex", justifyContent: "flex-end", minWidth: "200px" }}
                    >
                        <HoverFillButton
                            width="200px"
                            height="35px"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="50px"
                            border="1px solid #F6ECD7"
                        >
                            <Text.Warning color="Yellow">고양이 정보는 나중에 등록할게요</Text.Warning>
                        </HoverFillButton>
                    </Block.AbsoluteBox>
                )}
                <Text.TitleMenu300>{title}</Text.TitleMenu300>
                <Text.TitleMenu300>{subtitle}</Text.TitleMenu300>
            </Block.AbsoluteBox>
            <Block.FlexBox
                width="100%"
                height="100vh"
                direction="column"
                justifyContent="space-between"
                padding="97px 20px 23px 20px"
                margin="60px 0 0 0"
                gap="60px"
                style={{ overflowY: "scroll", scrollbarWidth: "none" }}
            >
                <section>
                    <Block.FlexBox direction="column" gap="54px" padding="40px 0 0 0">
                        {components.map(component => component)}
                    </Block.FlexBox>
                </section>
            </Block.FlexBox>
            <Block.AbsoluteBox
                width="100%"
                height="93px"
                padding="0 20px"
                bottom="0"
                bgColor="white"
                zIndex="12"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 50px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button.Confirm onClick={handleStepButtonClick} isDisabled={!isStepValid()}>
                    <Text.TitleMenu300 color="White">{buttonLabel}</Text.TitleMenu300>
                </Button.Confirm>
            </Block.AbsoluteBox>
        </>
    );
}

const HoverFillButton = styled(Block.FlexBox)`
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f4b647;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover::before {
        opacity: 0.3;
    }
`;
