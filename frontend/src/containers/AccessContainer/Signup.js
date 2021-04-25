import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    DatePicker,
} from 'antd';
import moment from 'moment';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/auth';

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';
const dateFormatVisible = 'DD/MM/YYYY';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class RegistrationForm extends React.Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.props.onAuth(
            values.email,
            values.password,
            values.confirm,
            values.username,
            values.gender,
            values.first_name,
            values.last_name,
            moment(values.birth_date).format(dateFormat),
            values.location,
            values.tel.toString()
        );
        this.props.history.push('/');
    };

    render() {
        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label={
                        <span>
                            Username&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your gender!',
                        },
                    ]}

                >
                    <Select
                        showSearch
                        placeholder="Select a gender"
                    >
                        <Option value="M">Male</Option>
                        <Option value="F">Female</Option>
                        <Option value="O">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="first_name"
                    label={
                        <span>
                            First Name&nbsp;
                            <Tooltip title="Your Name">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First Name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label={
                        <span>
                            Last Name&nbsp;
                            <Tooltip title="Your Surname">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="birth_date"
                    label="Date of Birth"
                >

                    <DatePicker format={dateFormatVisible}/>

                </Form.Item>
                <Form.Item
                    name="location"
                    label="Location"
                    rules={[
                        {
                            required: true,
                            message: 'Please select your habitual residence!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="tel"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore="+380"
                    />
                </Form.Item>

                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (
            email,
            password1,
            password2,
            username,
            gender,
            first_name,
            last_name,
            birth_date,
            location,
            tel
        ) => dispatch(actions.authSignup(
            email,
            password1,
            password2,
            username,
            gender,
            first_name,
            last_name,
            birth_date,
            location,
            tel
        ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
