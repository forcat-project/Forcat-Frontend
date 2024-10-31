import { useEffect, useState } from "react";
import { Block } from "../../style/ui";
import UserInfo from "../../components/Profile/userInfo";
import Cats from "../../components/Profile/cats";
import Purchase from "../../components/Profile/purchase";
import AccountManage from "../../components/Profile/accountManage";
import { PageWrapper } from "../../style/ui";
import { getCookie } from "../../api/cookie";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [reload, setReload] = useState(false);

    const handleReload = () => {
        setReload(!reload);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie("access_token")) {
            navigate("/login");
        }
    }, []);

    return (
        <PageWrapper>
            <Block.FlexBox
                direction="column"
                padding="20px 0"
                maxWidth="600px"
                margin="80px auto 100px"
                key={reload.toString()} // `key`에 문자열로 변경
            >
                <UserInfo onReload={handleReload} />
                <Cats />
                <Purchase />
                <AccountManage />
            </Block.FlexBox>
        </PageWrapper>
    );
}
