import React from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import {List, message, Avatar, Spin} from 'antd';
import moment from "moment";
import './MCPOrders.css';

const dateFormat = 'DD/MM/YYYY hh:mm';

class MCPOrders extends React.Component {

    render() {
        return (
            <>
                <h1 className={"orders-header"}>Замовлення</h1>
                <div className="demo-infinite-container">
                    <List
                        dataSource={this.props.data}
                        bordered="true"
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">Замовлення #{item.id}</a>}

                                />
                                <List.Item.Meta
                                    title={item.user}
                                />
                                <div>{moment(item.order_date).format(dateFormat)}</div>
                            </List.Item>
                        )}
                    >
                    </List>
                </div>
            </>
        );
    }
}

export default MCPOrders;
