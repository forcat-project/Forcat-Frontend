import * as React from "react";
import type { SVGProps } from "react";
const SvgMinusGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 9 2"
    {...props}
  >
    <path
      stroke="#C2C2C2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M1 1h7"
    />
  </svg>
);
export default SvgMinusGray;
