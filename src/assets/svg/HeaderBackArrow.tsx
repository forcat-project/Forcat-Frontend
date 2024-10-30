import type { SVGProps } from "react";
const SvgHeaderBackArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 26"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13 5-9 8.5 9 8.5"
    />
  </svg>
);
export default SvgHeaderBackArrow;
