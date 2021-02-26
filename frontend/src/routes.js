import React from 'react';
import {Route} from 'react-router-dom';
import BookList from "./containers/BooksContainer/BookListView";
import BookDetail from "./containers/BooksContainer/BookDetailView";
import Home from "./containers/CommonPagesContainer/Home";
import About from "./containers/CommonPagesContainer/About";
import Contacts from "./containers/CommonPagesContainer/Contacts";

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contacts" component={Contacts}/>
        <Route exact path="/books" component={BookList}/>
        <Route exact path="/books/:bookID/" component={BookDetail}/>
    </div>
);

export default BaseRouter;
