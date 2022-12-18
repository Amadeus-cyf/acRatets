import React from "react";
import { connect } from "react-redux";
import { Menu, Image } from "semantic-ui-react";
import store from "../../store";
import mapStateToProps from "../../utils/mapStateToProps";
import { mapUserDispatchToProps } from "../../utils/mapDispatchToProps";
import avatar from "../../assets/avatar.jpeg";
import { UserType } from "../../interface/UserType";
import { UserActionType } from "../../interface/ActionType";
import { ACTION } from "../../const/actions";
import { Dispatch } from "redux";
import { deepEqual } from "../../utils/deepEqual";

interface StateType {
    user: UserType;
}

interface PropsType {
    user: UserType;
    setUser: (user: UserType) => UserActionType;
}

class Navibar extends React.Component<PropsType, StateType> {
    public constructor(props: PropsType) {
        super(props);
        this.state = {
            user: this.props.user,
        };
    }

    public componentDidMount(): void {
        if (this.state.user._id === "") {
            // handle page refreshing
            if (localStorage.getItem("user") !== null) {
                const userData: UserType = JSON.parse(
                    localStorage.getItem("user")!
                );
                this.props.setUser(userData);
                this.setState({
                    user: userData,
                });
            }
        }
        store.subscribe(() => {
            this.setState({
                user: store.getState().user,
            });
        });
    }

    public shouldComponentUpdate(
        nextProps: PropsType,
        nextState: StateType
    ): boolean {
        return (
            !deepEqual(this.props.user, nextProps.user) ||
            !deepEqual(this.state.user, nextState.user)
        );
    }

    public render(): JSX.Element {
        const userAvatar: String =
            this.state.user.avatar === "" ? avatar : this.state.user.avatar;

        return (
            <Menu secondary style={{ height: "50px", margin: 0 }}>
                <Menu.Item
                    name="主站"
                    style={{
                        color: "white",
                        position: "absolute",
                        top: "10px",
                    }}
                />
                <Menu.Item
                    style={{
                        color: "white",
                        position: "absolute",
                        right: "100px",
                    }}
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
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActionType>) => ({
    setUser: mapUserDispatchToProps(dispatch, ACTION.SET_USER),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navibar);
