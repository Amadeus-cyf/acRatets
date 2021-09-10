import React from 'react';
import { createStore, Store } from 'redux';
import reducer from '../../store/reducer/index';
import { setUser } from '../../store/action';
import { RouteComponentProps } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import { style } from './style';
import './index.css';
import AuthApi from '../../api/AuthApi';
import { UserType } from '../../interface/UserType';

type ErrorDisplayType =  'none' | 'inline' | 'block';

interface LoginState {
    email: string,
    password: string,
    errorDisplay: ErrorDisplayType,
}

class Login extends React.Component<RouteComponentProps, LoginState> {
    public constructor(props : RouteComponentProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorDisplay: "none",
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.formloginHandler = this.formloginHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
    }
    
    public componentDidMount() : void {
        
    }
    
    private emailHandler(event : React.ChangeEvent<HTMLInputElement>) : void {
        this.setState({
            email: event.target.value,
        })
    }

    private passwordHandler(event : React.ChangeEvent<HTMLInputElement>) : void {
        this.setState({
            password: event.target.value,
        })
    }

    private formloginHandler() : void {
       AuthApi.login(this.state.email, this.state.password)
       .then(res => {
            if (res.data.message === 'Successfully Login') {
                this.props.history.push('/');
                const store : Store = createStore(reducer);
                const userData : UserType = {
                    _id: res.data.data._id,
                    username: res.data.data.username,
                    email: res.data.data.email,
                    avatar: res.data.data.avatar,
                    background: res.data.data.background,
                    follower: res.data.data.follower.length,
                    following: res.data.data.following.length,
                }
                store.dispatch(setUser(userData));
            } else if (res.data.message === 'Could not find user') {
                this.setState({
                    password: "",
                    errorDisplay: "block",
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() : JSX.Element {
        const isvalid = (this.state.email === "" || this.state.password === "");

        return(
            <div className = 'container'>
                <div className = 'imageStyle'>
                </div>
                <Form onSubmit = { this.formloginHandler } style = { style.formStyle }>
                    <h3 className = 'title'> Log In </h3>
                    <Form.Field>
                        <p className = 'error' style={{display: this.state.errorDisplay}}> 
                            Incorrect email or password 
                        </p>
                        <div className = 'subtitle'> Email </div>
                        <Form.Input size = 'big' name = 'email' value = { this.state.email }
                            onChange = { this.emailHandler } type = 'text' placeholder = 'your email'/>
                        <div className = 'subtitle'> 
                            Password 
                        </div>
                        <Form.Input size = 'big' name = "password" value = { this.state.password }
                            onChange = { this.passwordHandler } type = 'password' placeholder = 'password'/>
                    </Form.Field>
                    <Button style= {style.buttonStyle} disabled={isvalid} color = 'blue'> 
                        Log in 
                    </Button>
                    <Button style = {style.buttonStyle} color = 'blue'> 
                        Sign up 
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;
