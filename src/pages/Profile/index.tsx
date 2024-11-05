import { useEffect, useState } from "react";
import { Block, Divider } from "../../style/ui";
import UserInfo from "../../components/Profile/userInfo";
import Cats from "../../components/Profile/cats";
import Purchase from "../../components/Profile/purchase";
import AccountManage from "../../components/Profile/accountManage";
import { PageWrapper } from "../../style/ui";

import ChannelTalk from "../../components/Home/channelTalk"; // ChannelTalk import
// import HiddenImage from "../../components/Home/randomPoint";

export default function Profile() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {}, []);

  return (
    <PageWrapper>
      <ChannelTalk />
      {/* <HiddenImage /> */}
      <Block.FlexBox
        direction="column"
        padding="20px 0"
        maxWidth="600px"
        margin="80px auto 100px"
        key={reload.toString()} // `key`에 문자열로 변경
      >
        <UserInfo onReload={handleReload} />
        <Divider />
        <Cats />
        <Divider />
        <Purchase />
        <Divider />
        <AccountManage />
      </Block.FlexBox>
    </PageWrapper>
  );
}
