import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import axios from "axios";
import { Descriptions, Button, Space, Modal } from 'antd';
import "./Checkout.css";
import {createOrder} from "../../store/actions/order.js";

class Checkout extends React.Component {

    state = {
        user_info: {},
        loading: true,
    };

    componentDidMount() {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("http://127.0.0.1:8000/access/api/checkout")
            .then(res => {
                this.setState({
                user_info: res.data
                });
            })
            .catch(error => {
                console.log(error)
                this.props.history.push("/")
            });
    }

    success() {
        let secondsToGo = 10;
        const modal = Modal.success();
        modal.update({
            content: 'The order successfully created.',
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
              okText: `OK (${secondsToGo})`,
            });
          }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    }

    onSubmit = () => {
        const cartItems = this.props.cartItems;
        cartItems.forEach(book => {
            book.book = book.id;
            book.amount = book.count;
        });
        this.props.createOrder(cartItems);
        this.success();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Descriptions className="checkout-user-info-descriptions-title" title="Is everything correct?" layout="horizontal">
                    <Descriptions.Item label="First Name">{this.state.user_info.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">+380{this.state.user_info.tel}</Descriptions.Item>
                    <Descriptions.Item label="Location">{this.state.user_info.location}</Descriptions.Item>
                </Descriptions>
                <div className="checkout-submit-button-wrapper">
                    <Button
                        className="checkout-submit-button"
                        shape="round"
                        htmlType="button"
                    >No, update info</Button>
                    <Button
                        className="checkout-submit-button"
                        onClick={this.onSubmit}
                        type="primary"
                        shape="round"
                        htmlType="submit"
                    >Yes, submit</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        cartItems: state.cart.cartItems,
    }
}
export default connect(mapStateToProps, { createOrder })(Checkout);
