import React from "react";
import {List, message, Avatar, Spin} from 'antd';
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import './UserOrders.css';

const dateFormat = 'DD/MM/YYYY mm:hh';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const UserOrders = (props) => {
    console.log("PPPPP");
    console.log(props);

    return (
        <>
            <h1 className={"orders-header"}>Orders</h1>

            <div className="demo-infinite-container">
                <List
                    dataSource={props.data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                title={<a href="https://ant.design">Order #{item.id}</a>}

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

export default UserOrders;
