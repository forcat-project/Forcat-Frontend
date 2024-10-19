import { DefaultTheme } from "styled-components";

const fontColor = {
    black: "#191919",
    white: "#fff",
    gray100: "#262626", // Dark Charcoal
    gray200: "#3D3D3D", // Charcoal Gray
    gray300: "#9A9A9A", // Medium Gray
    gray400: "#ACABA9", // Soft Gray
    gray500: "#D4D4D4", // Light Gray
    gray600: "#E3E2E0", // Very Light Gray
    red: "#F65F5F",
};

const fontSize = {
    size50: "10px",
    size100: "12px",
    size200: "14px",
    size250: "15px",
    size300: "18px",
    size400: "24px",
    size500: "32px",
};

const fontWeight = {
    Light: "300",
    Normal: "400",
    Medium: "500",
    SemiBold: "600",
    Bold: "700",
};

const theme: DefaultTheme = {
    color: fontColor,
    size: fontSize,
    weight: fontWeight,
};

export default theme;
