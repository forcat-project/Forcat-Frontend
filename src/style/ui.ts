import theme from "./theme";
import styled, { DefaultTheme } from "styled-components";

// 재사용 될 텍스트
type StyleText = {
    color?: keyof DefaultTheme["color"];
    size?: keyof DefaultTheme["size"];
    weight?: keyof DefaultTheme["weight"];
    pointer?: boolean;
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
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Yellow)}; // disabled 이면 "#939292" 이도록
        cursor: ${props => props.pointer && "pointer"};
    `,
    HugeWarning: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Bold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size600)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.White)};
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
};

export const Button = {
    Confirm: styled.div<StyleButton>`
        display: block;
        justify-content: center;
        align-items: center;
        width: 560px;
        height: 53px;
        border-radius: 16px;
        color: #ffffff;
        background-color: #f4b647; // disabled이면"#e8e8e8" 로 변경되도록 수정하기
        cursor: pointer; // disabled이면 "not-allowed" 로 변경되도록 수정하기
    `,
    Select: styled.div<StyleButton>`
        display: block;
        justify-content: center;
        align-items: center;
        width: 273px;
        height: 53px;
        border-radius: 19px;
        color: #f4b647; // disabled이면 "#000000" 로 변경되도록 수정하기
        background-color: #f6ecd7; // disabled이면 "#F8F8F8" 로 변경되도록 수정하기
        cursor: pointer;
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
        border-radius: 10px 10px;
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
