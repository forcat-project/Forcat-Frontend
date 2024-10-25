import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Search } from "../../assets/svg";
import { Block, Input } from "../../style/ui";

type Props = {
    searchTerm: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
    handleSearchBarClick: (event: MouseEvent<SVGElement>) => void;
};

export default function CategoryHeader({ searchTerm, handleInputChange, handleKeyPress, handleSearchBarClick }: Props) {
    return (
        <>
            <Block.AbsoluteBox
                width="100%"
                padding="8px 16px"
                border="1px solid #e0e0e0"
                borderRadius="24px"
                alignItems="center"
            >
                <Input.Search
                    width="100%"
                    placeholder="검색어를 입력해주세요"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    readOnly
                />
                <Search width={24} style={{ marginLeft: "10px", cursor: "pointer" }} onClick={handleSearchBarClick} />
            </Block.AbsoluteBox>
        </>
    );
}
