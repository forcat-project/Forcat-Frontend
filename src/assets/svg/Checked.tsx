import type { SVGProps } from "react";
const SvgChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <path
      fill="#F4B647"
      fillRule="evenodd"
      d="M10.5 21C16.299 21 21 16.299 21 10.5S16.299 0 10.5 0 0 4.701 0 10.5 4.701 21 10.5 21m-.27-6.253 5.833-7-1.793-1.494-5.015 6.019-2.597-2.597-1.65 1.65 3.5 3.5.904.903z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChecked;
