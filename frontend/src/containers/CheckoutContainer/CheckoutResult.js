import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import axios from "axios";
import { Descriptions, Button } from 'antd';

class CheckoutResult extends React.Component {

    state = {
        order_info: {}
    };

    componentDidMount() {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("http://127.0.0.1:8000/access/api/profile")
            .then(res => {
                this.setState({
                    order_info: res.data
                });
            })
            .catch(error => {
                console.log(error)
                console.log(error.response_data)
                this.props.history.push("/")
            });
    }

    render() {
        return (
            <div>
                hhhh
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(CheckoutResult);
