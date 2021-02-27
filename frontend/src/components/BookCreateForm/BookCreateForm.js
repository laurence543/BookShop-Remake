import React from 'react';
import axios from "axios";
import {Form, Input, Button, Upload, Space} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import './BookCreateForm.css';

const FormItem = Form.Item;

class BookCreateForm extends React.Component {

    onFinish = (values) => {
        console.log("Success:", values.title);
        //Can directly call props here
    };

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    handleFormInit = (event, requestType) => {

    }

    handleFormSubmit = (event, requestType, bookID) => {
        const title = event.title;
        const author = event.author;
        const description = event.description;
        const publish_year = event.publish_year;
        const stock = event.stock;
        const price = event.price;
        const publisher = event.publisher;

        switch (requestType) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/books/api/', {
                    title: title,
                    author: author,
                    description: description,
                    publish_year: publish_year,
                    stock: stock,
                    price: price,
                    publisher: publisher
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/books/api/${bookID}/`, {
                    title: title,
                    author: author,
                    description: description,
                    publish_year: publish_year,
                    stock: stock,
                    price: price,
                    publisher: publisher
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
        }
    }

    render() {
        return (
            <div>
                <Form
                    className="book-form"
                    onFinish={(event) => this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.bookID
                    )}
                    onFinishFailed={this.onFinishFailed}
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}

                >
                    <Form.Item label="Title" id='title' name="title" required>
                        <Input name="title" placeholder="Put a title here"/>
                    </Form.Item>
                    <Form.Item label="Author" id='author' name="author" required>
                        <Input name="author" placeholder="Put an author here"/>
                    </Form.Item>
                    <Form.Item label="Description" id='description' name="description" required>
                        <Input name="description" placeholder="Put a description here"/>
                    </Form.Item>
                    <Form.Item label="Publish Year" id='publish_year' name="publish_year" required>
                        <Input name="publish_year" placeholder="Put a year of publishing here"/>
                    </Form.Item>
                    <Form.Item label="Publisher" id='publisher' name="publisher" required>
                        <Input name="publisher" placeholder="Put a publisher here"/>
                    </Form.Item>
                    <Form.Item label="Stock" id='stock' name="stock" required>
                        <Input name="stock" placeholder="Put a stock here"/>
                    </Form.Item>
                    <Form.Item label="Price" id='price' name="price" required>
                        <Input name="price" placeholder="Put a price here"/>
                    </Form.Item>
                    <Form.Item label="Image Root" id='image_root' name="image_root">
                        <Input name="image_root" placeholder="Put an image here"/>
                    </Form.Item>
                    <Upload
                        className="img-upload"
                        label="Image"
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                    </Upload>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default BookCreateForm;
