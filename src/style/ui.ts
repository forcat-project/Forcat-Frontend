import theme from "./theme";
import styled, { DefaultTheme } from "styled-components";

// 재사용 될 텍스트
type StyleText = {
    color?: keyof DefaultTheme["color"];
    size?: keyof DefaultTheme["size"];
    weight?: keyof DefaultTheme["weight"];
    pointer?: boolean;
    margin?: string;
};

export const Text = {
    Mini: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size100)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Notice100: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Notice200: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Menu: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    TitleMenu100: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size500)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    TitleMenu200: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size500)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    TitleMenu300: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size550)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Warning: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Yellow)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    HugeWarning: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size600)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.White)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    OriginalPrice: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Gray)};
        cursor: ${props => props.pointer && "pointer"};
        text-decoration: line-through;
    `,
    Discount: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Warning)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    FocusedMenu: styled.span<StyleText & { isFocused: boolean }>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
        color: ${({ isFocused }) => (isFocused ? theme.color.Yellow : theme.color.Gray)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    FocusedWarning: styled.span<StyleText & { isFocused: boolean }>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Normal)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
        color: ${({ isFocused }) => (isFocused ? theme.color.Yellow : theme.color.Gray)};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

// 재사용 될 블록
type StyleBlock = {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    display?: string;
    direction?: string;
    justifyContent?: string;
    alignItems?: string;
    border?: string;
    borderRadius?: string;
    color?: keyof DefaultTheme["color"] | string;
    bgColor?: keyof DefaultTheme["color"] | string;
    bgImg?: string;
    bgSize?: string;
    gap?: string;
    position?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    relative?: boolean;
    zIndex?: string;
    pointer?: boolean;
    maxWidth?: string;
    borderBottom?: string;
    flexGrow?: string;
};

export const Block = {
    AbsoluteBox: styled.div<StyleBlock>`
        position: absolute;
        top: ${props => props.top};
        right: ${props => props.right};
        bottom: ${props => props.bottom};
        left: ${props => props.left};
        z-index: ${props => props.zIndex};
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        margin: ${props => props.margin};
        padding: ${props => props.padding};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
        cursor: ${props => props.pointer && "pointer"};
    `,
    FlexBox: styled.div<StyleBlock>`
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        margin: ${props => props.margin};
        padding: ${props => props.padding};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-color: ${props => (props.bgColor ? props.bgColor : "transparent")};
        cursor: ${props => props.pointer && "pointer"};
        gap: ${props => props.gap};
    `,

    SoldoutBox: styled.div<StyleBlock>`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7); // 반투명 검정색 배경
        color: white; // 흰색 텍스트
        font-size: 18px;
        font-weight: bold;
        width: ${props => props.width || "100%"}; // 가로 크기를 props로 받아 적용
        height: ${props => props.height || "100%"}; // 세로 크기를 props로 받아 적용
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    `,
};

type StyleButton = {
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    color?: keyof DefaultTheme["color"] | string;
    bgColor?: keyof DefaultTheme["color"] | string;
    cursor?: string;
    border?: string;
};

export const Button = {
    Confirm: styled.div<StyleButton & { isDisabled: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 560px;
        height: 53px;
        border-radius: 16px;
        color: #ffffff;
        background-color: ${({ isDisabled }) => (isDisabled ? "#e8e8e8 " : "#f4b647")};
        cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    `,
    Select: styled.div<StyleButton>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 273px;
        height: 53px;
        border-radius: 19px;
        color: #f4b647; // disabled이면 "#000000" 로 변경되도록 수정하기
        background-color: #f6ecd7; // disabled이면 "#F8F8F8" 로 변경되도록 수정하기
        cursor: pointer;
    `,
    SelectInput: styled.div<StyleButton & { isActive: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 273px;
        height: 53px;
        border-radius: 19px;
        color: ${({ isActive }) => (isActive ? "#F4B647" : "#C9CBD4")};
        background-color: ${({ isActive }) => (isActive ? "#F6ECD7" : "#F8F8F8")};
        border: ${({ isActive }) => (isActive ? "1px solid #F4B647" : "1px solid #C9CBD4")};
        cursor: pointer;
    `,
    RadiusButton: styled.div<StyleButton>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 33px;
        border-radius: 30px;
        border: 1px solid #f4b647;
        color: #f4b647;
        cursor: pointer;
        background-color: transparent;
    `,
    CartButton: styled.div<StyleButton & { isSoldOut: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 273px;
        height: 53px;
        border-radius: 19px;
        color: ${({ isSoldOut }) => (isSoldOut ? "#939292" : "#f4b647")};
        background-color: ${({ isSoldOut }) => (isSoldOut ? "#F8F8F8" : "#f6ecd7")};
        cursor: ${({ isSoldOut }) => (isSoldOut ? "not-allowed" : "pointer")};
        border: ${props => props.border};
    `,
    BuyButton: styled.div<StyleButton & { isSoldOut: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 273px;
        height: 53px;
        border-radius: 19px;
        color: ${({ isSoldOut }) => (isSoldOut ? "#939292" : "#fff")};
        background-color: ${({ isSoldOut }) => (isSoldOut ? "#F8F8F8" : "#f4b647")};
        cursor: ${({ isSoldOut }) => (isSoldOut ? "not-allowed" : "pointer")};
        border: ${props => props.border};
    `,
    EditButton: styled.div<StyleButton>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px; // 너비를 적당하게 설정
        height: 25px; // 높이 설정
        border-radius: 12.5px; // 둥근 모서리
        color: #939292; // 텍스트 색상
        background-color: #f0f1f5; // 배경색
        cursor: pointer;

        &:hover {
            background-color: #e0e0e0; // hover 시 배경색 변경
        }

        &:active {
            background-color: #d0d0d0; // active 시 배경색
        }
    `,
};

// 재사용 될 이미지
type StyleImg = {
    width?: string;
    height?: string;
    border?: string;
    borderRadius?: string;
    pointer?: boolean;
};

export const Img = {
    RoundIcon: styled.img<StyleImg>`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: ${props => props.border};
        border-radius: 100%;
        cursor: ${props => props.pointer && "pointer"};
    `,
    AngledIcon: styled.img<StyleImg>`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: ${props => props.border};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

// 재사용 될 이미지
type StyleInput = {
    width?: string;
    height?: string;
    pointer?: boolean;
    border?: string;
};

export const Input = {
    Search: styled.input<StyleInput>`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: 0;
        outline: none;
        padding-left: 10px;
        ::placeholder {
            color: #939292;
            font-size: 17px;
        }
        cursor: ${props => props.pointer && "pointer"};
    `, // 검색 아이콘은 따로 달아주어야 함
    InfoBox: styled.input<StyleInput>`
        display: block;
        width: 560px;
        height: 53px;
        outline: #e3e2e0;
        padding-left: 15px;
        background-color: #ffffff;
        border: 1px solid #c9cbd4;
        border-radius: 19px;
        ::placeholder {
            color: #939292;
            font-size: 17px;
        }
        &:focus {
            border: 1px solid #000;
        }
        cursor: ${props => props.pointer && "pointer"};
    `,
    WeightBox: styled.input<StyleInput>`
        display: block;
        width: 273px;
        height: 53px;
        outline: #e3e2e0;
        padding-left: 15px;
        background-color: #ffffff;
        border: 1px solid #c9cbd4;
        border-radius: 19px;
        ::placeholder {
            color: #939292;
            font-size: 17px;
        }
        &:focus {
            border: 1px solid #000;
        }
        cursor: ${props => props.pointer && "pointer"};
    `,
    BirthBox: styled.input<StyleInput>`
        display: block;
        width: 179px;
        height: 53px;
        outline: #e3e2e0;
        padding-left: 15px;
        background-color: #ffffff;
        border: 1px solid #c9cbd4;
        border-radius: 19px;
        ::placeholder {
            color: #939292;
            font-size: 17px;
        }
        &:focus {
            border: 1px solid #000;
        }
        cursor: ${props => props.pointer && "pointer"};
    `,
    AddressBox: styled.input<StyleInput>`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: 1px solid #c9cbd4;
        outline: #e3e2e0;
        padding-left: 15px;
        background-color: #ffffff;
        border-radius: 19px;
        ::placeholder {
            color: #939292;
            font-size: 17px;
        }
        &:focus {
            border: 1px solid #000;
        }
        cursor: ${props => props.pointer && "pointer"};
    `,
};

type StyleMargin = {
    size: number;
    direction: "column" | "row";
};

export const Margin = styled.div<StyleMargin>`
    width: ${({ size, direction }) => (direction === "row" ? size : 0)}px;
    height: ${({ size, direction }) => (direction === "column" ? size : 0)}px;
`;

export const PageWrapper = styled.div`
    width: 100%;
    height: 100vh; // 화면 전체 높이
    overflow-y: scroll; // 세로 스크롤 활성화
    overflow-x: hidden; // 가로 스크롤 숨김
    scrollbar-width: none; // Firefox용 스크롤바 숨김
    -ms-overflow-style: none; // IE, Edge용 스크롤바 숨김

    &::-webkit-scrollbar {
        display: none; //스크롤바 숨김
    }
`;
