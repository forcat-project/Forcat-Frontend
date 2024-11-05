import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import theme from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./styles/GlobalStyle";
import { CookiesProvider } from "react-cookie";

// QueryClient 생성
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <CookiesProvider>
        <RecoilRoot>
            {/* QueryClientProvider로 애플리케이션을 감싸기  */}
            <QueryClientProvider client={queryClient}>
                <GlobalStyle theme={theme} />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </RecoilRoot>
    </CookiesProvider>
);
