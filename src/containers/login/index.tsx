import React from 'react';
import { createStore, Store } from 'redux';
import reducer from '../../store/reducer/index';
import { setUser } from '../../store/action';
import { RouteComponentProps } from 'react-router';
import { Header, Button, Form } from 'semantic-ui-react';
import { style } from './style';
import './index.css';
import AuthApi from '../../api/auth';
import { UserType } from '../../interface/UserType';

type ErrorDisplayType =  'none' | 'inline' | 'block';

interface LoginState {
    email: string,
    password: string,
    errorDisplay: ErrorDisplayType,
}

class Login extends React.PureComponent<RouteComponentProps, LoginState> {
    public constructor(props : RouteComponentProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorDisplay: "none",
        }
        this.onEmaiChange= this.onEmaiChange.bind(this);
        this.login = this.login.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    
    private onEmaiChange(event : React.ChangeEvent<HTMLInputElement>) : void {
        this.setState({
            email: event.target.value,
        })
    }

    private onPasswordChange(event : React.ChangeEvent<HTMLInputElement>) : void {
        this.setState({
            password: event.target.value,
        })
    }

    private login() : void {
        AuthApi.login(this.state.email, this.state.password)
        .then(res => {
            switch(res.data.message) {
            case "Successfully Login": 
                this.props.history.push('/');
                this.saveUserToContext(res.data)
                break
            case "Could not find user":
                this.setState({
                    password: "",
                    errorDisplay: "block",
                })
                break
            default:
                console.log("Unknown message type")
            }
        }).catch(err => {
            console.log(err);
        })
    }

    private saveUserToContext(data : any) : void {
        const store : Store = createStore(reducer);
        const userData : UserType = {
            _id: data._id,
            username: data.username,
            email: data.email,
            avatar: data.avatar,
            background: data.background,
            follower: data.follower.length,
            following: data.following.length,
        }
        store.dispatch(setUser(userData));
    }

    public render() : JSX.Element {
        const isvalid = (this.state.email === "" || this.state.password === "");

        return (
            <div className = 'container'>
            <div className = 'imageStyle'>
            </div>
            <Form onSubmit = { this.login } style = { style.formStyle }>
                <Header className = 'title'> Log In </Header>
                <Form.Field>
                    <p className = 'error' style={{display: this.state.errorDisplay}}> Incorrect email or password </p>
                    <div className = 'subtitle'> Email </div>
                    <Form.Input size = 'big' name = 'email' value = { this.state.email } onChange = { this.onEmaiChange } 
                        type = 'text' placeholder = 'your email'/>
                    <div className = 'subtitle'> Password </div>
                    <Form.Input size = 'big' name = "password" value = { this.state.password } onChange = { this.onPasswordChange } 
                        type = 'password' placeholder = 'password'/>
                </Form.Field>
                <Button content="Log in" style= {style.buttonStyle} disabled={isvalid} color = 'blue'/>
                <Button content="Sign up" style = {style.buttonStyle} color = 'blue'/>
            </Form>
            </div>
        )
    }
}

export default Login;
