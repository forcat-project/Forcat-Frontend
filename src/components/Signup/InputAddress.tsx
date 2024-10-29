import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import { Block, Button, Input } from "../../style/ui";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";

ReactModal.setAppElement("#root");

type Props = { address?: string };

export default function InputAddress() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Props) => {
    setUserInfo((prev) => ({
      ...prev,
      address: data.address,
    }));

    onToggleModal();
  };

  const handleAddressDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const detail = event.target.value;

    setUserInfo((prev) => ({
      ...prev,
      address_detail: detail,
    }));
  };

  useEffect(() => {
    console.log("유저정보", userInfo);
  }, [userInfo]);

  return (
    <>
      <Block.FlexBox direction="column" gap="20px">
        <Block.FlexBox gap="20px">
          <Input.AddressBox
            width="100%"
            placeholder="예) 서울특별시 강서구 마곡중앙8로 71"
            value={userInfo.address}
          />
          <Button.Select onClick={onToggleModal}>주소 찾기</Button.Select>
          <ReactModal
            isOpen={isOpen}
            onRequestClose={onToggleModal}
            contentLabel="주소 검색"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                width: "500px",
                padding: "20px",
              },
            }}
          >
            <DaumPostcode onComplete={handleComplete} />
          </ReactModal>
        </Block.FlexBox>
        <Input.AddressBox
          width="100%"
          height="50px"
          placeholder="상세 주소를 입력해주세요"
          value={userInfo.address_detail || ""}
          onChange={handleAddressDetailChange}
        />
      </Block.FlexBox>
    </>
  );
}
