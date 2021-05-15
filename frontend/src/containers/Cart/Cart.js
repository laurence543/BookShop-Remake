import React from "react";
import {Button, List, message, Avatar, Spin, Table} from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import {connect} from "react-redux";
import {removeFromCart} from "../../store/actions/cart";
import {createOrder, clearOrder} from "../../store/actions/order";
import "./Cart.css";

const DragHandle = SortableHandle(() => <MenuOutlined style={{cursor: 'grab', color: '#999'}}/>);
const columns = [
    {
        title: 'Сортування',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        align: 'center',
        render: () => <DragHandle/>,
    },
    {
        title: 'Назва',
        dataIndex: 'title',
        className: 'drag-visible',
    },
    {
        title: 'Автор',
        dataIndex: 'author',
    },
    {
        title: 'Ціна',
        dataIndex: 'price',
        align: 'center',
    },
    {
        title: 'Кількість',
        dataIndex: 'count',
        align: 'center',
    },
    {
        title: 'Вартість',
        align: 'center',
        render: (text, record, index) => {
            return record.count * record.price
        }
    },
];

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    getSummary = (items) => {

        let total = 0;
        items.forEach(element => total += element.price * element.count)
        return (
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5} className="total total-header">Всього:</Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="total">{total}</Table.Summary.Cell>
            </Table.Summary.Row>
        )
    }

    render() {
        const {cartItems, order} = this.props;

        return (
            <>
                <div>
                    {cartItems.length === 0 ? (
                        <div className="cart cart-header">Кошик порожній</div>
                    ) : (
                        <>
                            <div>
                                <div className="cart cart-header">
                                    Ви маєте {cartItems.length} типів книжок у кошику.
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
                            <div className="order-button-wrapper">
                                {
                                    this.props.isAuthenticated
                                    ?
                                    <NavLink to='/access/checkout'>
                                        <Button
                                            className="order-button"
                                            type="primary"
                                            shape="round"
                                            htmlType="submit"
                                        >Замовити</Button>
                                    </NavLink>
                                    :
                                    <NavLink to='/access/signup'>
                                        <Button
                                            className="order-button"
                                            type="primary"
                                            shape="round"
                                            htmlType="submit"
                                        >Зареєструватися та замовити</Button>
                                    </NavLink>

                                }
                            </div>
                        </>
                    )
                    }
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        order: state.order.order,
        cartItems: state.cart.cartItems,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Cart);
