import ReactModal from "react-modal";
import { Block, Button, Text } from "../../styles/ui";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    width: string;
    height: string;
    title: string;
    bodyText: string;
    onPrimaryAction: () => void;
    onSecondaryAction: () => void;
    primaryButtonText: string;
    secondaryButtonText: string;
};

export default function AlertModal({
    isOpen,
    setIsOpen,
    title,
    bodyText,
    width,
    height,
    onPrimaryAction,
    onSecondaryAction,
    primaryButtonText,
    secondaryButtonText,
}: Props) {
    return (
        <>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        zIndex: "9999999",
                    },
                    content: {
                        margin: "0 auto",
                        padding: "20px 0 0 0",
                        width,
                        height,
                        maxHeight: "600px",
                        border: "solid 1px #d3d3d3",
                        borderRadius: "18px",
                        boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        backgroundColor: "white",
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        right: "50%",
                        bottom: "50%",
                        transform: "translateX(-50%)",
                        outline: "none",
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="MODAL"
            >
                <Block.FlexBox
                    width="100%"
                    height="100%"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="30px"
                >
                    <Block.FlexBox direction="column" justifyContent="center" alignItems="center" gap="7px">
                        <Text.TitleMenu300>{title}</Text.TitleMenu300>
                        <Text.Menu color="Gray">{bodyText}</Text.Menu>
                    </Block.FlexBox>
                    <Block.FlexBox justifyContent="center" gap="10px">
                        <Button.AlertModalSelect variant="secondary" onClick={onSecondaryAction}>
                            {secondaryButtonText}
                        </Button.AlertModalSelect>
                        <Button.AlertModalSelect variant="primary" onClick={onPrimaryAction}>
                            {primaryButtonText}
                        </Button.AlertModalSelect>
                    </Block.FlexBox>
                </Block.FlexBox>
            </ReactModal>
        </>
    );
}
