import type { SVGProps } from "react";
const SvgCartDisabled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <g clipPath="url(#cart_disabled_svg__a)">
      <path
        fill="#C9CBD4"
        d="m51.345 32.406 4.596-20.222a2.333 2.333 0 0 0-2.275-2.85H15.479l-.892-4.357a2.33 2.33 0 0 0-2.286-1.866H2.333A2.333 2.333 0 0 0 0 5.444V7a2.333 2.333 0 0 0 2.333 2.333h6.795l6.83 33.39a5.445 5.445 0 1 0 6.518.833h20.382a5.445 5.445 0 1 0 6.183-1.012l.536-2.36a2.333 2.333 0 0 0-2.275-2.85H21.206l-.636-3.112h28.5c1.09 0 2.034-.754 2.275-1.816"
      />
    </g>
    <defs>
      <clipPath id="cart_disabled_svg__a">
        <path fill="#fff" d="M0 0h56v56H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCartDisabled;
