import React from "react";
import axios from "axios";
import Book from "../../components/Book";
import {Card} from "antd";

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

    render() {
        return (
            <Card title={this.state.book.title}>
                <p>{this.state.book.description}</p>
            </Card>
        );
    }
}

export default BookDetail;
