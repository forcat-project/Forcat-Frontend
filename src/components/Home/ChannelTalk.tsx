import { useEffect } from "react";

const ChannelTalk = () => {
    useEffect(() => {
        // Check if ChannelIO is already initialized
        if ((window as any).ChannelIO) {
            console.error("ChannelIO script included twice.");
            return;
        }

        // Channel IO initialization
        const ch = function () {
            (ch as any).c(arguments);
        };
        ch.q = [] as any[];
        (ch as any).c = function (args: any) {
            ch.q.push(args);
        };
        (window as any).ChannelIO = ch;

        function loadChannelIO() {
            if ((window as any).ChannelIOInitialized) return;
            (window as any).ChannelIOInitialized = true;
            const s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
            const x = document.getElementsByTagName("script")[0];
            x.parentNode?.insertBefore(s, x);
        }

        if (document.readyState === "complete") {
            loadChannelIO();
        } else {
            window.addEventListener("DOMContentLoaded", loadChannelIO);
            window.addEventListener("load", loadChannelIO);
        }

        // Boot ChannelIO with the plugin key
        (window as any).ChannelIO("boot", {
            pluginKey: "4417db19-c908-47ba-bd71-0dcc372639cd",
        });
    }, []);

    return null;
};

export default ChannelTalk;
