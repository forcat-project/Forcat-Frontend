import { useRecoilState } from "recoil";
import useFocus from "../../hooks/useFocus";
import { Block, Input, Text } from "../../style/ui";
import { catState } from "../../recoil";

export default function InputCatName() {
    const [catInfo, setCatInfo] = useRecoilState(catState);
    const { isFocused, handleFocus, handleBlur } = useFocus();

    const handleUserCatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCatInfo(prev => ({ ...prev, name: e.target.value }));
    };

    return (
        <>
            <Block.FlexBox direction="column" gap="20px">
                <Text.FocusedMenu isFocused={isFocused}>이름</Text.FocusedMenu>
                <Input.InfoBox
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleUserCatNameChange}
                    placeholder="고양이 이름을 입력해주세요"
                />
            </Block.FlexBox>
        </>
    );
}
