import { Outlet } from "react-router-dom";
import { Block } from "./style/ui";
import Navigator from "./components/Layout/Navigator";
import Header from "./components/Layout/Header";

function App() {
    return (
        <>
            <Block.FlexBox width="599px" height="100%" bgColor="white">
                <Outlet />
                <Header />
                <Navigator />
            </Block.FlexBox>
        </>
    );
}

export default App;
