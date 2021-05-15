import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import MCPOrders from "../../components/MCPOrders/MCPOrders";

class ManagerControlPanel extends React.Component {
    state = {
        all_orders: [],
    };
    componentDidMount() {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.get("http://127.0.0.1:8000/access/api/all_orders")
            .then(res => {
                this.setState({
                    all_orders: res.data
                });
                console.log(this.state.all_orders);
            })
            .catch(error => {
                console.log(error)
                this.props.history.push("/")
            });
    }


    render() {
        return (
            <>
                <div>
                    <p>Контрольна панель менеджера</p>
                </div>
                <MCPOrders data={this.state.all_orders}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(ManagerControlPanel);
