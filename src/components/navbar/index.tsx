import React from "react";
import { Menu, Image } from "@/components/ui";
import avatar from "@/assets/avatar.webp";
import { useAppSelector } from "@/store/hooks";

const Navbar = (): React.ReactElement => {
    const user = useAppSelector((state) => state.user);

    const userAvatar: string = user.avatar === "" ? avatar : user.avatar;

    return (
        <Menu secondary style={{ height: "50px", margin: 0 }}>
            <Menu.Item
                name="主站"
                style={{ color: "white", position: "absolute", top: "10px" }}
            />
            <Menu.Item
                style={{ color: "white", position: "absolute", right: "100px" }}
            >
                <Image
                    avatar
                    src={userAvatar}
                    alt={`${user.username || "Guest"} avatar`}
                />
            </Menu.Item>
            <Menu.Item
                name="登陆"
                style={{
                    color: "white",
                    position: "absolute",
                    right: "50px",
                    top: "10px",
                }}
            />
            <Menu.Item
                name="注册"
                style={{
                    color: "white",
                    position: "absolute",
                    right: "5px",
                    top: "10px",
                }}
            />
        </Menu>
    );
};

export default React.memo(Navbar);
