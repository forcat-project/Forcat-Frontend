import React, { useEffect, useState } from "react";
import { Block } from "../../style/ui";
import Footer from "../../components/Footer";
import CategoryBlock from "../../components/Home/categoryBlock";
import { BannerEx } from "../../assets/svg";

// window 객체를 확장하여 ChannelIO 속성 추가
declare global {
  interface Window {
    ChannelIO: any;
    ChannelIOInitialized?: boolean;
  }
}

export default function Home() {
  useEffect(() => {
    // ChannelIO 스크립트를 동적으로 삽입
    (function () {
      if (window.ChannelIO) {
        return console.error("ChannelIO script included twice.");
      }

      let ch: any = function () {
        ch.c(arguments);
      };
      ch.q = []; // ch에 q 속성 추가
      ch.c = function (args: any) {
        ch.q.push(args);
      }; // ch에 c 속성 추가

      window.ChannelIO = ch;
      function l() {
        if (window.ChannelIOInitialized) {
          return;
        }
        window.ChannelIOInitialized = true;

        let s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        let x = document.getElementsByTagName("script")[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === "complete") {
        l();
      } else {
        window.addEventListener("DOMContentLoaded", l);
        window.addEventListener("load", l);
      }
    })();

    // ChannelIO 플러그인 부트
    window.ChannelIO("boot", {
      pluginKey: "4417db19-c908-47ba-bd71-0dcc372639cd",
    });
  }, []);

  return (
    <>
      <Block.FlexBox
        width="100%"
        margin="89px 0 93px 0"
        direction="column"
        justifyContent="space-between"
        gap="40px" // 블록 간의 간격을 늘리기 위해 gap 속성 추가
        style={{ overflow: "scroll", scrollbarWidth: "none" }}
      >
        {/* 배너 컴포넌트 */}
        <Block.FlexBox width="599px" height="277px" bgColor="black">
          <BannerEx />
        </Block.FlexBox>

        {/* 각 카테고리 상품 리스트 */}
        <Block.FlexBox direction="column" gap="40px">
          <CategoryBlock
            categoryId={1}
            categoryName="⏰ 지금 놓치면 안 될 최대 할인 상품"
            morePagePath="/home/discount"
          />
          <CategoryBlock
            categoryId={null} // categoryId를 null로 설정
            categoryName="🔥 가장 많이 팔리는 베스트셀러 상품" // 베스트셀러 상품
            morePagePath="/home/bestseller"
            ordering="-purchase_count" // ordering 추가
          />
          <CategoryBlock
            categoryId={68}
            categoryName="✨ MD가 자신 있게 추천하는 특별한 상품"
            morePagePath="/home/mdrecommend"
          />

          <CategoryBlock
            categoryId={67}
            categoryName="💛 오직 포켓에서만!"
            morePagePath="/home/onlypocket"
          />
        </Block.FlexBox>

        {/* 푸터 컴포넌트 */}
        <Footer />
      </Block.FlexBox>
    </>
  );
}
