import ReactModal from "react-modal";
import { Block, Text } from "../../styles/ui";
import { GrayClose } from "../../assets/svg";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    width: string;
    height: string;
    children: React.ReactNode;
};

export default function ForcatModal({ isOpen, title, width, height, children, setIsOpen }: Props) {
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
                        padding: 0,
                        width: "100%",
                        maxWidth: "599px",
                        minWidth: "375px",
                        height,
                        maxHeight: "600px",
                        border: "solid 1px #d3d3d3",
                        borderRadius: "18px 18px 0 0",
                        boxShadow: "3px 3px 20px 0 rgba(0, 0, 0, 0.25)",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        backgroundColor: "white",
                        position: "fixed",
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        outline: "none",
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="MODAL"
            >
                <Block.FlexBox margin="40px 0 0 0" direction="column" justifyContent="center">
                    <Block.FlexBox width="100%" justifyContent="center">
                        <Text.TitleMenu300>{title}</Text.TitleMenu300>
                        <Block.FlexBox
                            width="21px"
                            height="21px"
                            top="20px"
                            onClick={() => setIsOpen(false)}
                            style={{ position: "absolute", right: "15px", top: "20px" }}
                            pointer
                        >
                            <GrayClose width={21} height={21} />
                        </Block.FlexBox>
                    </Block.FlexBox>
                    <Block.FlexBox justifyContent="center">{children}</Block.FlexBox>
                </Block.FlexBox>
            </ReactModal>
        </>
    );
}
