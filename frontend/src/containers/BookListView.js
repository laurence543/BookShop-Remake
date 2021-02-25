import React from "react";
import axios from "axios";
import Book from "../components/Book";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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
        <Book data={this.state.books} /> <br />
        <h2> Create a book </h2>
      </div>
    );
  }
}

export default BookList;