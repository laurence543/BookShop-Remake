import React from 'react';
import {List, Avatar, Space, Descriptions} from 'antd';
import moment from "moment";
import "./UserInfo.css";

const UserInfo = (props) => {
    console.log(props)
    return (

        <Descriptions className="user-info-descriptions-title" title="Профіль користувача">
            <Descriptions.Item label="Нік користувача">{props.data.username}</Descriptions.Item>
            <Descriptions.Item label="Номер телефону">+380{props.data.tel}</Descriptions.Item>
            <Descriptions.Item label="Email">{props.data.email}</Descriptions.Item>
            <Descriptions.Item label="Ім'я">{props.data.first_name}</Descriptions.Item>
            <Descriptions.Item label="Дата народження">
                {moment(props.data.birth_date).format('DD/MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Стать">{props.data.gender}</Descriptions.Item>
            <Descriptions.Item label="Прізвище">{props.data.last_name}</Descriptions.Item>
            <Descriptions.Item label="Адреса">{props.data.location}</Descriptions.Item>
        </Descriptions>
    )
}
export default UserInfo;
