import * as React from "react";
import type { SVGProps } from "react";
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <path
      fill="#000"
      d="M20.495 17.717a1.887 1.887 0 0 1-.052 2.622 1.907 1.907 0 0 1-2.636.053l-7.254-7.218L3.3 20.392a1.9 1.9 0 0 1-1.36.608 1.9 1.9 0 0 1-1.382-.555 1.89 1.89 0 0 1-.39-2.114c.106-.233.257-.442.445-.614l7.254-7.219L.612 3.284A1.9 1.9 0 0 1 0 1.93 1.89 1.89 0 0 1 .557.555 1.9 1.9 0 0 1 1.939 0 1.9 1.9 0 0 1 3.3.608l7.254 7.216L17.808.606a1.91 1.91 0 0 1 2.635.053 1.89 1.89 0 0 1 .052 2.623l-7.255 7.216z"
    />
  </svg>
);
export default SvgX;