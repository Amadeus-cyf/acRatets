import React, { useState } from "react";
import { setUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { Header, Button, Form } from "@/components/ui";
import { style } from "./style";
import "./index.css";
import AuthApi from "@/api/auth";
import type { LoginResponse } from "@/api/types";
import { UserType } from "@/interface/UserType";
import { useAppDispatch } from "@/store/hooks";

type ErrorDisplayType = "none" | "inline" | "block";

const Login = (): React.ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorDisplay, setErrorDisplay] = useState<ErrorDisplayType>("none");

    const login = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setErrorDisplay("none");

        try {
            const { data } = await AuthApi.login(email, password);
            if (data.message === "Successfully Login") {
                saveUserToContext(data);
                navigate("/");
                return;
            }

            setPassword("");
            setErrorDisplay("block");
        } catch {
            setErrorDisplay("block");
        }
    };

    const saveUserToContext = (data: LoginResponse): void => {
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
                    type="submit"
                    content="Log in"
                    style={style.buttonStyle}
                    disabled={isvalid}
                    color="blue"
                />
                <Button
                    type="button"
                    content="Sign up"
                    style={style.buttonStyle}
                    color="blue"
                />
            </Form>
        </div>
    );
};

export default Login;
