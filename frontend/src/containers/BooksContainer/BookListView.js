import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Button, Menu, Space} from 'antd';
import {NavLink} from 'react-router-dom';
import Book from "../../components/Book/Book";

class BookList extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    state = {
        books: [],
        genres: []
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/books/api").then(res => {
            this.setState({
                books: res.data
            });
        });
        axios.get("http://127.0.0.1:8000/books/api-genres").then(res => {
            this.setState({
                genres: res.data
            });
        });
    }

    getGenreQuery = e => {
        axios.get(`http://127.0.0.1:8000/books/api/?genre=${e.key}`).then(res => {
            this.setState({
                books: res.data
            });
        });
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <div className="sidebar">
                        <Menu
                            onClick={this.getGenreQuery}
                            mode="horizontal"
                            theme="dark"
                        >
                        {this.state.genres.map(g => {
                            return (<Menu.Item key={g.genre}>{g.genre}</Menu.Item>)})
                        }

                        </Menu>
                    </div>
                    <div>
                        {
                            this.props.isStaff
                            ?
                            <NavLink to='/books/create'>
                                <Button type="primary" htmlType="button">Create Book</Button>
                            </NavLink>
                            :
                            <></>
                        }
                        <Book data={this.state.books}/>
                    </div>
                </div>
            </>
        );

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isStaff: state.auth.isStaff === 'True'
    }
}

export default connect(mapStateToProps)(BookList);
