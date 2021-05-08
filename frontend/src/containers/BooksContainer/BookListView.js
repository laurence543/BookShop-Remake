import React from "react";
import axios from "axios";
import {Button} from 'antd';
import {NavLink} from 'react-router-dom';
import Book from "../../components/Book/Book";

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
                <NavLink to='/books/create'>
                    <Button type="primary" htmlType="button">Create Book</Button>
                </NavLink>
                <Book data={this.state.books}/>
            </div>
        );
    }
}

export default BookList;
