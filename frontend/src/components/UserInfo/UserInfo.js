import React from 'react';
import {List, Avatar, Space, Descriptions} from 'antd';

const UserInfo = (props) => {
    console.log(props)
    return (

        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">{props.data.username}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{props.data.tel}</Descriptions.Item>
            <Descriptions.Item label="Email">{props.data.email}</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions>
    )
}
export default UserInfo;
