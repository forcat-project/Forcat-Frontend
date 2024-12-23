import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Pretendard-Regular';
      overflow: hidden;
      /* overflow-y: scroll; */
      scroll-behavior: smooth;
      background-color: #e8e8e8;
      max-width: 100vw;
      height: 100vh;
  }

  #root {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 600px;
      min-width: 375px;
      height: 100%;
  }
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
  font-family: "Pretendard";
}
a{
  text-decoration:none;
  color:inherit;
}
*::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
}
*::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: gray; /* 스크롤바의 색상 */
    border-radius: 10px;
}
*::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
}
*::-webkit-scrollbar-corner{
	background: transparent;
}
.ql-align-right{
	display: flex;
	justify-content: flex-end;
}
.ql-align-center{
	display: flex;
	justify-content: center;
}

`;
export default GlobalStyle;
