import React from 'react';
import {List, Avatar, Space} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import { addToCart } from "../../store/actions/cart";
import './Book.css';

const IconText = ({type, text}) => (
    <span>
        {text}
    </span>
);

const Book = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={props.data}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        //<IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        //<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        //<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={200} //272
                            alt={item.title}
                            src={item.image}
                        />
                    }
                >
                    <List.Item.Meta
                        title={<a href={`books/${item.id}`}>{item.title}</a>}
                        //description={item.description}

                    />
                    {item.content}
                    <div className="author-div">{item.author}</div>
                    <div>{item.description}</div>
                    <br/>
                    <button
                        className="add-to-cart-button"
                        onClick={() => props.addToCart(item)}
                    >Add to Cart <ShoppingCartOutlined/></button>

                </List.Item>
            )}
        />
    )
}
export default connect(
    (state) => ({}),
    {
        addToCart,
    }
)(Book);
