import * as React from "react";
import type { SVGProps } from "react";
const SvgCartYellow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 31 31"
    {...props}
  >
    <g clipPath="url(#cart-yellow_svg__a)">
      <path
        fill="#F4B647"
        d="m28.423 17.939 2.544-11.194a1.292 1.292 0 0 0-1.26-1.578H8.569l-.493-2.412A1.29 1.29 0 0 0 6.81 1.722H1.292C.578 1.722 0 2.3 0 3.014v.861c0 .713.578 1.292 1.292 1.292h3.76L8.834 23.65a3.014 3.014 0 1 0 3.608.461h11.284a3.014 3.014 0 1 0 3.423-.56l.297-1.306a1.292 1.292 0 0 0-1.26-1.578H11.739l-.352-1.723h15.777c.603 0 1.125-.417 1.26-1.005"
      />
    </g>
    <defs>
      <clipPath id="cart-yellow_svg__a">
        <path fill="#fff" d="M0 0h31v31H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCartYellow;
