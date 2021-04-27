import {Descriptions} from 'antd';
import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserOrders from "../../components/UserOrders/UserOrders";

class Profile extends React.Component {

    state = {
        profile: {},
        profile_orders: []
    };

    componentDidMount() {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("http://127.0.0.1:8000/access/api/profile")
            .then(res => {
                this.setState({
                    profile: res.data
                });
                console.log(this.state.profile);
            })
            .catch(error => {
                console.log(error)
                this.props.history.push("/")
            });

        axios.get("http://127.0.0.1:8000/access/api/profile_orders")
            .then(res => {
                this.setState({
                    profile_orders: res.data
                });
            })
            .catch(error => {
                console.log(error)
                this.props.history.push("/")
            });
    }

    render() {
        return (
            <>
                <UserInfo data={this.state.profile}/>
                <UserOrders data={this.state.profile_orders}/>
            </>
        );
    };
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Profile);
