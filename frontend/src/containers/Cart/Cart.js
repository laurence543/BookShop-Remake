import React from "react";
import {List, message, Avatar, Spin, Table} from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import {connect} from "react-redux";
import {removeFromCart} from "../../store/actions/cart";
import "./Cart.css"

//const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const DragHandle = SortableHandle(() => <MenuOutlined style={{cursor: 'grab', color: '#999'}}/>);
const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle/>,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        className: 'drag-visible',
    },
    {
        title: 'Author',
        dataIndex: 'author',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Amount',
        dataIndex: 'count',
    },
    {
        title: 'Cost',
        render: (text, record, index) => {
            return record.count * record.price
        }
    },
];

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        this.props.createOrder(order);
    };
    closeModal = () => {
        this.props.clearOrder();
    };

    getSummary = (items) => {

        let total = 0;
        items.forEach(element => total += element.price * element.count)
        return (
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5} className="total total-header">Total:</Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="total">{total}</Table.Summary.Cell>
            </Table.Summary.Row>
        )

    }

    render() {
        const {cartItems, order} = this.props;
        console.log(cartItems);
        return (
            <>
                <div>
                    {cartItems.length === 0 ? (
                        <div className="cart cart-header">Cart is empty</div>
                    ) : (
                        <div>
                            <div className="cart cart-header">
                                You have {cartItems.length} types of books in the cart.
                            </div>
                            <>
                                <Table
                                    bordered
                                    pagination={false}
                                    dataSource={cartItems}
                                    columns={columns}
                                    rowKey="id"
                                    components={{
                                        body: {
                                            //wrapper: this.DraggableContainer,
                                            //row: this.DraggableBodyRow,
                                        },
                                    }}
                                    summary={this.getSummary}

                                />

                            </>
                        </div>
                    )
                    }
                </div>

            </>
        );
    }

}

export default connect(
    (state) => ({cartItems: state.cart.cartItems,}), {removeFromCart}
)(Cart);
