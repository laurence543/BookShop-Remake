import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Button} from 'antd';
import {NavLink} from 'react-router-dom';
import Book from "../../components/Book/Book";

class BookList extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

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
