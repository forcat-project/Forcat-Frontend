import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { catState, inputState } from "../../store/atoms";
import { useState } from "react";
import { Block, Button, Text } from "../../styles/ui";
import InputCatName from "../../components/Signup/InputCatName";
import InputCatBreed from "../../components/Signup/InputCatBreed";
import InputCatGender from "../../components/Signup/InputCatGender";
import InputCatIsNeutered from "../../components/Signup/InputCatIsNeutered";
import InputCatWeight from "../../components/Signup/InputCatWeight";
import InputBirthDate from "../../components/Signup/InputBirthDate";

import { ICat, IInputData } from "../../interfaces/product";
import { catAPI } from "../../api/resourses/cats";
import { useUserId } from "../../hooks/useUserId";

export default function CatAdd() {
    const catInfo = useRecoilValue(catState);
    const inputData = useRecoilValue(inputState);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const userId = useUserId();
    console.log("??", userId);

    const handleSubmitCatInfo = async () => {
        try {
            const catData: ICat = {
                name: catInfo.name,
                cat_breed: catInfo.cat_breed,
                cat_breed_name: catInfo.cat_breed_name,
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
            components: [<InputCatName key="catName" />],
            requiredFields: ["catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
            components: [<InputCatBreed key="catBreed" />, <InputCatName key="catName" />],
            requiredFields: ["catBreed", "catName"],
            buttonLabel: "확인",
            onButtonClick: () => {
                setStep(step + 1);
            },
        },
        {
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

    const isStepValid = () => {
        const requiredFields = steps[step - 1].requiredFields;

        return requiredFields.every(field => {
            const fieldKey = field as keyof IInputData;
            const value = inputData[fieldKey];

            return typeof value === "string" ? value.trim() !== "" : value !== null;
        });
    };

    const { components, buttonLabel } = steps[step - 1];

    return (
        <>
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
                    <Block.FlexBox direction="column" gap="64px">
                        <Block.AbsoluteBox top="64px" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {step >= 5 && (
                                <Block.AbsoluteBox
                                    width="560px"
                                    pointer
                                    style={{ display: "flex", justifyContent: "flex-end" }}
                                ></Block.AbsoluteBox>
                            )}
                        </Block.AbsoluteBox>

                        {components.map(component => component)}
                    </Block.FlexBox>
                </section>
            </Block.FlexBox>
            <Block.AbsoluteBox
                width="100%"
                height="93px"
                bottom="0"
                bgColor="white"
                padding="20px"
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
