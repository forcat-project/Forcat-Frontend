import { Outlet } from "react-router-dom";
import { Block } from "./style/ui";

function App() {
    return (
        <>
            <Block.FlexBox width="599px" height="100%" bgColor="white">
                <Outlet />
            </Block.FlexBox>
        </>
    );
}

export default App;
