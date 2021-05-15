import React from 'react';
import axios from "axios";
import BookCreateForm from "../../components/BookCreateForm/BookCreateForm";

class BookCreate extends React.Component {

    render() {
        return (
            <>
                <h2> Створити книгу </h2>
                <BookCreateForm
                    requestType="post"
                    bookID={null}
                    btnText="Створити"
                />
            </>
        );
    }
}
export default BookCreate;
