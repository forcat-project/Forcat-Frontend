import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Button, Input, Text } from "../../style/ui";
import { catState } from "../../recoil";
import { useNavigate } from "react-router-dom";

export default function InputCatName() {
    const [catInfo, setCatInfo] = useRecoilState(catState);
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleUserCatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCatInfo(prev => ({ ...prev, name: e.target.value }));
    };

    return (
        <>
            <Block.FlexBox direction="column" gap="20px">
                <Block.FlexBox alignItems="center" justifyContent="space-bwt">
                    <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                </Block.FlexBox>

                <Input.InfoBox
                    value={catInfo.name}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleUserCatNameChange}
                    placeholder="고양이 이름을 입력해주세요"
                />
            </Block.FlexBox>
        </>
    );
}
