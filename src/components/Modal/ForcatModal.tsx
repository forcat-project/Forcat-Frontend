import ReactModal from "react-modal";
import { Block, Text } from "../../style/ui";
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
                        width,
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
                    },
                }}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="MODAL"
            >
                <Block.FlexBox width="599px" margin="40px 0" direction="column" justifyContent="center">
                    <Block.FlexBox justifyContent="center">
                        <Text.TitleMenu300>{title}</Text.TitleMenu300>
                        <Block.AbsoluteBox
                            width="21px"
                            top="20px"
                            onClick={() => setIsOpen(false)}
                            style={{ right: "20px" }}
                            pointer
                        >
                            <GrayClose width={21} height={21} />
                        </Block.AbsoluteBox>
                    </Block.FlexBox>
                    <Block.FlexBox justifyContent="center">{children}</Block.FlexBox>
                </Block.FlexBox>
            </ReactModal>
        </>
    );
}
