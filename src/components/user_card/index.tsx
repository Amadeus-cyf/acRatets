import React, { memo } from "react";
import { Image, Header, Card, Icon } from "@/components/ui";
import avatar from "@/assets/avatar_optimized.jpg";
import background from "@/assets/background_optimized.jpg";
import { UserType } from "@/interface/UserType";
import { deepEqual } from "@/utils/deepEqual";
import "./index.css";
import { cardStyle } from "./style";

interface PropsType {
    user: UserType;
}

const UserCard = (props: PropsType) => {
    const userAvatar: string =
        props.user.avatar === "" ? avatar : props.user.avatar;
    const userName: string =
        props.user.username === "" ? "未登陆" : props.user.username;
    const followerNum: number = props.user.follower;
    const followingNum: number = props.user.following;

    return (
        <Card style={cardStyle.cardStyle}>
            <Image className="backgroundStyle" src={background} alt="" />
            <Image
                avatar
                src={userAvatar}
                alt={`${userName} avatar`}
                style={cardStyle.avatarStyle}
            />
            <Header
                size="medium"
                style={cardStyle.userHeaderStyle}
                content={userName}
            />
            <Card.Content extra>
                <Icon name="heart" />
                {`${followerNum}粉丝`}
                <Icon name="user outline" style={cardStyle.iconStyle} />
                {`${followingNum}关注`}
            </Card.Content>
        </Card>
    );
};

export default memo(UserCard, (prevProps: PropsType, props: PropsType) => {
    return deepEqual(prevProps.user, props.user);
});
