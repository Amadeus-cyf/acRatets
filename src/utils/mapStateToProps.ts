import { StateType } from "../interface/StateType";

const mapStateToProps = (state: StateType) => ({
    user: state.user,
});

export default mapStateToProps;
