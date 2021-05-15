import React from 'react';
import axios from "axios";
import { Input } from 'antd';
import './BookSearchAutoComplete.css';

const { Search } = Input;

class BookSearchAutoComplete extends React.Component {

    render() {
        return (
            <>
                <div className="book-search-wrapper">
                    <Search
                        className="book-search"
                        placeholder="Введіть назву того, що ви шукаєте"
                        onSearch={this.props.searchHandler}
                    />
                </div>
            </>
        );
    }
}
export default BookSearchAutoComplete;
