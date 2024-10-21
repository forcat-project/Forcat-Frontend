import * as React from "react";
import type { SVGProps } from "react";
const SvgMarket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <g clipPath="url(#market_svg__a)">
      <path
        fill="#000"
        d="M50.512 21.603a2.323 2.323 0 0 0-2.84-1.65c-.204.06-1.474.398-2.848 1.568a7.7 7.7 0 0 0-1.899 2.456c-.52 1.06-.84 2.36-.837 3.831.001 1.788.452 3.817 1.47 6.154.687 1.575 1 3.248 1 4.904.007 2.803-.923 5.552-2.31 7.469-.689.96-1.482 1.707-2.277 2.19-.326.198-.65.342-.972.457l.108-.64c-.006-1.863-.443-3.81-1.424-5.527-3.102-5.43-7.243-14.737-7.243-14.737l-.167-.534c3.223-.852 6.407-2.56 8-6.014 4.258-9.225-4.493-15.61-4.493-15.61S30.941-.23 29.523.006c-1.42.236-4.495 4.258-4.495 4.258h-5.203S16.75.243 15.332.007c-1.42-.237-4.258 5.912-4.258 5.912S2.322 12.305 6.58 21.53c1.512 3.277 4.456 4.985 7.507 5.88l-.323 1.056s-3.49 8.92-6.593 14.35C4.07 48.243 6.397 56 10.662 56h23.532c1.384 0 2.557-.825 3.413-2.114 1.73-.001 3.37-.533 4.78-1.395 2.128-1.303 3.796-3.316 4.97-5.676a18.05 18.05 0 0 0 1.846-7.949c0-2.24-.425-4.552-1.388-6.76-.827-1.897-1.084-3.305-1.083-4.298.003-.823.164-1.372.367-1.795.156-.316.342-.566.546-.776a3.4 3.4 0 0 1 1.205-.789l.05-.017-.002-.003a2.32 2.32 0 0 0 1.613-2.825"
      />
    </g>
    <defs>
      <clipPath id="market_svg__a">
        <path fill="#fff" d="M0 0h56v56H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMarket;
