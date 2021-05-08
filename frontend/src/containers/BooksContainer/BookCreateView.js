import React from 'react';
import axios from "axios";
import BookCreateForm from "../../components/BookCreateForm/BookCreateForm";

class BookCreate extends React.Component {

    render() {
        return (
            <>
                <h2> Create a book </h2>
                <BookCreateForm
                    requestType="post"
                    bookID={null}
                    btnText="Create"
                />
            </>
        );
    }
}
export default BookCreate;
