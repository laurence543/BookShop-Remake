import React from 'react';
import axios from "axios";
import {Form, Input, Button, Upload, Space} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import './BookForm.css';

const FormItem = Form.Item;

class BookForm extends React.Component {

    handleFormSubmit = (event, requestType, bookID) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const author = event.target.elements.author.value;
        const description = event.target.elements.description.value;
        const publish_year = event.target.elements.publish_year.value;
        const stock = event.target.elements.stock.value;
        const price = event.target.elements.price.value;
        const publisher = event.target.elements.publisher.value;

        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:8000/api/', {
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
                break
            case 'put':
                axios.put(`http://127.0.0.1:8000/api/${bookID}/`, {
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
                break
        }
    }

    render() {
        return (
            <div>
                <Form
                    className="book-form"
                    onSubmit={(event) => this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.bookID
                        )}
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}

                >
                    <Form.Item label="Title" required>
                        <Input placeholder="Put a title here"/>
                    </Form.Item>
                    <Form.Item label="Author" required>
                        <Input placeholder="Put an author here"/>
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <Input placeholder="Put a description here"/>
                    </Form.Item>
                    <Form.Item label="Publish Year" required>
                        <Input placeholder="Put a year of publishing here"/>
                    </Form.Item>
                    <Form.Item label="Publisher" required>
                        <Input placeholder="Put a publisher here"/>
                    </Form.Item>
                    <Form.Item label="Stock" required>
                        <Input placeholder="Put a stock here"/>
                    </Form.Item>
                    <Form.Item label="Price" required>
                        <Input placeholder="Put a price here"/>
                    </Form.Item>
                    <Form.Item label="Image Root">
                        <Input placeholder="Put an image here"/>
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

export default BookForm;
