import { Block, Button, Input, Text } from "../style/ui";

export default function Home() {
    return (
        <Block.FlexBox>
            <Text.Menu>example</Text.Menu>
            <Input.InfoBox placeholder="선택해 주세요" />
            <Button.Confirm />
            <Button.Select />
        </Block.FlexBox>
    );
}
