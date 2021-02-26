import React from "react";
import axios from "axios";
import Book from "../../components/Book/Book";

class BookList extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/books/api").then(res => {
            this.setState({
                books: res.data
            });
            console.log(res.data);
        });
    }

    render() {
        return (
            <div>
                <Book data={this.state.books}/> <br/>
                <h2> Create a book </h2>
            </div>
        );
    }
}

export default BookList;
