import React from 'react';
import { Route } from 'react-router-dom';
import BookList from "./containers/BooksContainer/BookListView";
import BookDetail from "./containers/BooksContainer/BookDetailView";
import Home from "./containers/CommonPagesContainer/Home";
import About from "./containers/CommonPagesContainer/About";
import Contacts from "./containers/CommonPagesContainer/Contacts";
import Login from "./containers/AccessContainer/Login";
import Signup from "./containers/AccessContainer/Signup";
import Profile from "./containers/AccessContainer/Profile";
import Cart from "./containers/Cart/Cart";

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about/" component={About}/>
        <Route exact path="/contacts/" component={Contacts}/>
        <Route exact path="/books/" component={BookList}/>
        <Route exact path="/cart/" component={Cart}/>
        <Route exact path="/books/:bookID/" component={BookDetail}/>
        <Route exact path="/access/login/" component={Login}/>
        <Route exact path="/access/signup/" component={Signup}/>
        <Route exact path="/access/profile/" component={Profile}/>
    </div>
);

export default BaseRouter;
