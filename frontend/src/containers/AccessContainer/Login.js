import React from 'react';
import {Form, Input, Button, Checkbox, Spin} from 'antd';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/auth';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class LoginForm extends React.Component {

    handleSubmit = values => {
        console.log('Received values of form: ', values);
        this.props.onAuth(values.email, values.password);
        this.props.history.push('/');
    }

    render() {

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={this.handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Log In
                    </Button>
                    <span> or</span>
                    <NavLink
                        to='/access/signup/'> Sign Up
                    </NavLink>
                </Form.Item>
            </Form>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
