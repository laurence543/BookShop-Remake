import React from 'react';
import {List, Avatar, Space, Descriptions} from 'antd';
import moment from "moment";
import "./UserInfo.css";

const UserInfo = (props) => {
    console.log(props)
    return (

        <Descriptions className="user-info-descriptions-title" title="User Info">
            <Descriptions.Item label="User Name">{props.data.username}</Descriptions.Item>
            <Descriptions.Item label="Telephone">+380{props.data.tel}</Descriptions.Item>
            <Descriptions.Item label="Email">{props.data.email}</Descriptions.Item>
            <Descriptions.Item label="First Name">{props.data.first_name}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
                {moment(props.data.birth_date).format('DD/MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{props.data.gender}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{props.data.last_name}</Descriptions.Item>
            <Descriptions.Item label="Location">{props.data.location}</Descriptions.Item>
        </Descriptions>
    )
}
export default UserInfo;
