import React from "react";
import axios from "axios";
import Book from "../../components/Book/Book";
import BookCreateForm from "../../components/BookCreateForm/BookCreateForm";

class BookList extends React.Component {
    state = {
        books: [],
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/books/api").then(res => {
            this.setState({
                books: res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Book data={this.state.books}/>
                <br/>
                <h2> Create a book </h2>
                <BookCreateForm
                    requestType="post"
                    bookID={null}
                    btnText="Create"
                />
            </div>
        );
    }
}

export default BookList;
