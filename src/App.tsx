import { Outlet } from "react-router-dom";
import { Block } from "./style/ui";
// import Footer from "./components/Footer";
import Navigator from "./components/Navigator";

function App() {
    return (
        <>
            <Block.FlexBox width="599px" height="100%" bgColor="white">
                <Outlet />
                <Navigator />
            </Block.FlexBox>
        </>
    );
}

export default App;
