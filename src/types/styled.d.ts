import "styled-components";

declare module "styled-components" {
  export type DefaultThemeColorKey =
    | "Black" // #000000
    | "Gray" // #939292
    | "Yellow" // #F4B647
    | "Light" // #F6ECD7
    | "White" // #ffffff
    | "Warning" // #D4564B
    | "Gray100" // #F3F3F6  -- [ Light Gray ]
    | "Gray200" // #E8E8E8
    | "Gray300" // #C9CBD4
    | "Gray400" // #A7A9B7
    | "Gray500" // #80818C
    | "Gray600" // #383840 -- [ Dark Gray ]
    | "Green"; // #00A000

  export type DefaultThemeSizeKey =
    | "size100" // 10px
    | "size200" // 12px
    | "size300" // 13px
    | "size400" // 14px
    | "size500" // 17px
    | "size550" // 20px
    | "size600"; // 64px

  export type DefaultThemeWeightKey =
    | "Normal" // 400
    | "SemiBold" // 600
    | "Bold"; // 700

  export interface DefaultTheme {
    color: {
      [key in DefaultThemeColorKey]: string;
    };
    size: {
      [key in DefaultThemeSizeKey]: string;
    };
    weight: {
      [key in DefaultThemeWeightKey]: string;
    };
  }
}
