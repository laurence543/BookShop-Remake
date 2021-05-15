import React from "react";
import axios from "axios";
import Book from "../../components/Book/Book";
import {Card, Button} from "antd";
import BookCreateForm from "../../components/BookCreateForm/BookCreateForm";

class BookDetail extends React.Component {
    state = {
        book: {}
    };

    componentDidMount() {
        const bookID = this.props.match.params.bookID;
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

    render() {
        return (
            <div>
                <Card title={this.state.book.title}>
                    <p>{this.state.book.description}</p>
                </Card>
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
            </div>
        )
    }
}

export default BookDetail;
