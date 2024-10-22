import React, { useEffect } from "react";
import { Block, Text } from "../../style/ui";
import Footer from "../../components/Footer";
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
                style={{ overflow: "scroll", scrollbarWidth: "none" }}
            >
                <Block.FlexBox width="599px" height="277px" bgColor="black">
                    <BannerEx />
                </Block.FlexBox>
                <Block.FlexBox width="599px" direction="column" padding="33px 18px" style={{ height: "1000px" }}>
                    <Block.FlexBox width="100%" height="800px">
                        <Text.Menu>Some dummy text for the example.</Text.Menu>
                    </Block.FlexBox>
                </Block.FlexBox>
                <Footer />
            </Block.FlexBox>
        </>
    );
}
