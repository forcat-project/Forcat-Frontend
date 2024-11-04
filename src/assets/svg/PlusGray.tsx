import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 9 9"
    {...props}
  >
    <path
      stroke="#C2C2C2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M1 4.5h7M4.5 1v7"
    />
  </svg>
);
export default SvgPlusGray;
