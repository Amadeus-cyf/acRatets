import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { Header, Button, Form } from "semantic-ui-react";
import { style } from "./style";
import "./index.css";
import AuthApi from "../../api/auth";
import { UserType } from "../../interface/UserType";
import { AppDispatch } from "../../store";

type ErrorDisplayType = "none" | "inline" | "block";

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorDisplay, setErrorDisplay] = useState<ErrorDisplayType>("none");

    const login = (): void => {
        AuthApi.login(email, password)
            .then((res) => {
                switch (res.data.message) {
                    case "Successfully Login":
                        navigate("/");
                        saveUserToContext(res.data);
                        break;
                    case "Could not find user":
                        setPassword("");
                        setErrorDisplay("block");
                        break;
                    default:
                        console.log("Unknown message type");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveUserToContext = (data: any): void => {
        const userData: UserType = {
            _id: data._id,
            username: data.username,
            email: data.email,
            avatar: data.avatar,
            background: data.background,
            follower: data.follower.length,
            following: data.following.length,
        };
        dispatch(setUser(userData));
    };

    const isvalid = email === "" || password === "";
    return (
        <div className="container">
            <div className="imageStyle"></div>
            <Form onSubmit={login} style={style.formStyle}>
                <Header className="title" content="Log In" />
                <Form.Field>
                    <p className="error" style={{ display: errorDisplay }}>
                        {" "}
                        Incorrect email or password{" "}
                    </p>
                    <div className="subtitle"> Email </div>
                    <Form.Input
                        size="big"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                        placeholder="your email"
                    />
                    <div className="subtitle"> Password </div>
                    <Form.Input
                        size="big"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="password"
                    />
                </Form.Field>
                <Button
                    content="Log in"
                    style={style.buttonStyle}
                    disabled={isvalid}
                    color="blue"
                />
                <Button
                    content="Sign up"
                    style={style.buttonStyle}
                    color="blue"
                />
            </Form>
        </div>
    );
};

export default Login;
