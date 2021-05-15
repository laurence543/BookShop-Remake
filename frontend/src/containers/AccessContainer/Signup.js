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
                            message: 'Введено невалідну E-mail адресу!',
                        },
                        {
                            required: true,
                            message: 'Будь ласка, введіть Вашу E-mail адресу!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть пароль!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Підтвердження паролю"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, підтвердіть пароль!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Введені паролі не співпадають!'));
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
                            Нік&nbsp;
                            <Tooltip title="Як ви хочете, щоб вас називали інші?">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Стать"
                    rules={[
                        {
                            required: true,
                            message: 'Будь-ласка, вкажіть Вашу стать!',
                        },
                    ]}

                >
                    <Select
                        showSearch
                        placeholder="Оберіть стать"
                    >
                        <Option value="M">Чоловік</Option>
                        <Option value="F">Жінка</Option>
                        <Option value="O">Інше</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="first_name"
                    label={
                        <span>
                            Ім'я&nbsp;
                            <Tooltip title="Ваше Ім'я">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Будь-ласка, введіть Ваше ім\'я!',
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
                            Прізвище&nbsp;
                            <Tooltip title="Ваше прізвище">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    }

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="birth_date"
                    label="Дата народження"
                >

                    <DatePicker format={dateFormatVisible}/>

                </Form.Item>
                <Form.Item
                    name="location"
                    label="Адреса"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, вкажіть місце проживання!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="tel"
                    label="Номер телефону"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, вкажіть номер телефону!',
                        },
                    ]}
                >
                    <Input
                        addonBefore="+380"
                    />
                </Form.Item>

                <Form.Item label="Капча" extra="Ми маємо переконатися, що ви не робот.">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Будь ласка, введіть отриману капчу!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>Отримати капчу</Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Необхідно прийняти умови угоди')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        Я прочитав(-ла) <a href="">Умови угоди</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Зареєструватися
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
