import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <path fill="#000" d="M3.5 21v31.5H21v-14a7 7 0 1 1 14 0v14h17.5V21L28 0z" />
  </svg>
);
export default SvgHome;
