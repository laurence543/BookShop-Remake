import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import CustomLayout from './containers/Layout';
import { connect, Provider } from 'react-redux';
import BaseRouter from "./routes";
import * as actions from './store/actions/auth';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
                <div>
                    <Router>
                        <CustomLayout {...this.props}>
                            <BaseRouter/>
                        </CustomLayout>
                    </Router>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isStaff: state.auth.isStaff === 'True'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
