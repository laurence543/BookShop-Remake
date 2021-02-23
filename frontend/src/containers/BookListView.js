import React from "react";
import axios from "axios";
import Books from "../components/Book";


class BookList extends React.Component {
  state = {
    books: []
  };

  render() {
    return (
      <div>
        <Books /> <br />
        <h2> Create a book </h2>
      </div>
    );
  }
}

export default BookList;