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
    MainTitle: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.white)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Title: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size400)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray400)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MenuTitle: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size300)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.white)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MainViewTitle: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size500)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.white)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body1: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Medium)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray600)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body2: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Medium)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size100)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray600)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body3: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size250)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray300)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body4: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Medium)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray300)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body5: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Medium)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size200)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray500)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body6: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.SemiBold)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size100)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.gray600)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Warning: styled.span<StyleText>`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.weight[weight] : theme.weight.Medium)};
        font-size: ${({ size }) => (size ? theme.size[size] : theme.size.size50)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.red)};
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
        background-color: ${props =>
            props.bgColor ? props.theme.color[props.bgColor] || props.bgColor : "transparent"};
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
        background-color: ${props =>
            props.bgColor ? props.theme.color[props.bgColor] || props.bgColor : "transparent"};
        cursor: ${props => props.pointer && "pointer"};
        gap: ${props => props.gap};
    `,
    ButtonBox: styled.div<StyleBlock & { isEnabled: boolean }>`
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 35px;
        margin: ${props => props.margin};
        border-radius: 5px;
        border: 1px solid ${props => (props.isEnabled ? "#E3E2E0" : "#3D3D3D")};
        background-color: ${props => (props.isEnabled ? "#555555" : "#191919")};
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
    SearchInput: styled.input<StyleInput>`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: 0;
        cursor: ${props => props.pointer && "pointer"};
        outline: none;
        padding-left: 10px;
        background-color: #f0f0f0;
        border-radius: 10px 10px;
    `,
    InfoInput: styled.input<StyleInput>`
        display: block;
        width: 305px;
        height: 35px;
        border: 1px solid #3d3d3d;
        cursor: ${props => props.pointer && "pointer"};
        outline: #e3e2e0;
        padding-left: 15px;
        background-color: #191919;
        border-radius: 10px 10px;
        ::placeholder {
            font-size: smaller;
        }
        color: white;

        &:focus {
            border: 1px solid #e3e2e0;
        }
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
