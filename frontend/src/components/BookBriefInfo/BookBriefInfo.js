import React from 'react';
import {List, Avatar, Space} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import { addToCart } from "../../store/actions/cart";
import './BookBriefInfo.css';

const IconText = ({type, text}) => (
    <span>
        {text}
    </span>
);

class BookBriefInfo extends React.Component {

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                bordered="true"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={this.props.data}
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
                        <div className="author-div">{item.author}</div>
                        <div>{item.description}</div>
                        <br/>
                        <div><h1>Ціна: {item.price}</h1></div>
                        <br/>
                        <button
                            className="add-to-cart-button"
                            onClick={() => this.props.addToCart(item)}
                        >Додати в кошик <ShoppingCartOutlined/></button>

                    </List.Item>
                )}
            />
        );
    }
}
export default connect(
    (state) => ({}),
    {
        addToCart,
    }
)(BookBriefInfo);
