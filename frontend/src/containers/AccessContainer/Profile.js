import {Descriptions} from 'antd';
import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import UserInfo from "../../components/UserInfo/UserInfo";


class Profile extends React.Component {

    state = {
        profile: {}
    };

    componentDidMount() {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("http://127.0.0.1:8000/access/api/profile").then(res => {
            this.setState({
                profile: res.data
            });
            console.log(this.state.profile);
        });

    }

    render() {
        return (
            <UserInfo data={this.state.profile}/>
        );
    };
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile);
