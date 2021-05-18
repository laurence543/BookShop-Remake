import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import Book from "../../components/Book/Book";
import {Card, Button, Descriptions} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import BookCreateForm from "../../components/BookCreateForm/BookCreateForm";
import './BookDetailView.css';
import { addToCart } from "../../store/actions/cart";



class BookDetail extends React.Component {
    state = {
        book: [],
        genre: [],
    };

    componentDidMount() {
        const bookID = this.props.match.params.bookID;
        axios.get(`http://127.0.0.1:8000/books/api-genres`).then(res => {
            this.setState({
                genre: res.data
            });
            console.log(res.data);
        });
        axios.get(`http://127.0.0.1:8000/books/api/${bookID}`).then(res => {
            this.setState({
                book: res.data
            });
            console.log(res.data);
        });
    }

    handleDelete = (event) => {
        const bookID = this.props.match.params.bookID;
        axios.delete(`http://127.0.0.1:8000/books/api/${bookID}`);
        this.props.history.push('/books');
        this.forceUpdate();
    }

    handleGenre = (genres) => {
        this.state?.book?.genre?.forEach((el, index) => {
            if (this.state.book.genre[index] = this.state.genre[el - 1].id) {
                this.state.book.genre[index] = this.state.genre[el - 1].genre;
                console.log(this.state.book.genre[index]);
            }
        });
        //console.log(genres);
        //return (this.state?.book?.genre?.join('; '));
        return (this.state?.book?.genre?.map(g => <p>{g};</p>));
    }

    render() {
        return (
            <div>
                <Descriptions
                    title={this.state.book.title}
                    bordered
                >
                    <Descriptions.Item label="Про книгу:">{this.state.book.description}</Descriptions.Item>
                    <Descriptions.Item >
                        <img src={this.state.book.image} alt={this.state.book.title} />
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions
                    bordered
                    layout="vertical"
                >
                    <Descriptions.Item label="Видавництво:">{this.state.book.publisher}</Descriptions.Item>

                    <Descriptions.Item label="Тип обкладинки:">{this.state.book.cover}</Descriptions.Item>
                    <Descriptions.Item label="ISBN:">{this.state.book.isbn}</Descriptions.Item>
                    <Descriptions.Item label="Рік видання:">{this.state.book.publish_year}</Descriptions.Item>
                    <Descriptions.Item label="Мова:">{this.state.book.language}</Descriptions.Item>
                    <Descriptions.Item label="Кількість сторінок:">{this.state.book.number_of_pages}</Descriptions.Item>
                    <Descriptions.Item label="Жанри:">{this.handleGenre()}</Descriptions.Item>
                    <Descriptions.Item label="Ціна:"><h1><b>{this.state.book.price}</b></h1></Descriptions.Item>
                </Descriptions>
                <br/>
                    <button
                        className="add-to-cart-button"
                        onClick={() => this.props.addToCart(this.state.book)}
                    >Додати в кошик <ShoppingCartOutlined/></button>
                    {
                        this.props.isStaff
                        ?
                        <>
                            <BookCreateForm
                                requestType="put"
                                bookID={this.props.match.params.bookID}
                                btnText="Оновити"
                            />
                            <form className="book-form-button-delete" onSubmit={this.handleDelete}>
                                <Button type="danger" htmlType="submit">
                                    Видалити
                                </Button>
                            </form>
                        </>
                        :
                        <></>
                    }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isStaff: state.auth.isStaff === 'True'
    }
}
export default connect(mapStateToProps, {addToCart})(BookDetail);
