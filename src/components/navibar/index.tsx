import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Image } from "semantic-ui-react";
import avatar from "../../assets/avatar_optimized.jpg";
import { UserType } from "../../interface/UserType";
import { StateType } from "../../interface/StateType";
import { setUser } from "../../store/action";
import { AppDispatch } from "../../store";

const Navibar = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: StateType) => state.user);

    useEffect(() => {
        if (user._id !== "") return;

        const storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            dispatch(setUser(JSON.parse(storedUser) as UserType));
        }
    }, [dispatch, user._id]);

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
                <Image avatar src={userAvatar} />
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

export default React.memo(Navibar);
