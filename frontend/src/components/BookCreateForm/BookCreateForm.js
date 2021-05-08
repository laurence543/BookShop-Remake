import React from 'react';
import axios from "axios";
import {Form, Input, Tag, Button, Upload, Space, Tooltip, Select, message} from 'antd';
import {UploadOutlined, PlusOutlined} from '@ant-design/icons';
import './BookCreateForm.css';

const {Option} = Select;
const FormItem = Form.Item;

class BookCreateForm extends React.Component {

    state = {
        tags: [],
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/books/api-genres").then(res => {
            this.setState({
                tags: res.data
            });
        });
    }
////////////////

    handleChange(value) {
        console.log(`selected ${value}`);
    }
/////////////////
    onFinish = (values) => {
        console.log("Success:", values.title);
        //Can directly call props here
    };

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    handleFormInit = (event, requestType) => {

    }

    beforeUploadImageHandler = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
            message.error('You can only upload JPG or PNG file!');
        }
        return false;
    }

    handleFormSubmit = (event, requestType, bookID) => {

        const title = event.title;
        const author = event.author;
        const description = event.description;
        const isbn = event.isbn;
        const genre = event.genre;
        const publish_year = event.publish_year;
        const number_of_pages = event.number_of_pages;
        const publisher = event.publisher;
        const language = event.language;
        const cover = event.cover;
        const stock = event.stock;
        const price = event.price;
        const image = event.image.file;
        const genres_list = genre.map(v => parseInt(v, 10));

        const formData = new FormData();

        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("isbn", isbn);
        for (var i = 0; i < genres_list.length; i++) {
            formData.append('genre', genres_list[i]);
        }
        formData.append("publish_year", publish_year);
        formData.append("number_of_pages", number_of_pages);
        formData.append("publisher", publisher);
        formData.append("language", language);
        formData.append("cover", cover);
        formData.append("stock", stock);
        formData.append("price", price);
        formData.append("image", image);

        switch (requestType) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/books/api/', formData)
                    .then(res => console.log(res))
                    .catch(error => {
                        console.log(error);
                        console.log(error.response.data);
                    });
            case 'put':
                return axios.put(`http://127.0.0.1:8000/books/api/${bookID}/`, {
                    title: title,
                    author: author,
                    description: description,
                    isbn: isbn,
                    genre: genre,
                    publish_year: publish_year,
                    number_of_pages: number_of_pages,
                    publisher: publisher,
                    language: language,
                    cover: cover,
                    stock: stock,
                    price: price
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error.response.data));
        }
    }

    render() {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        console.log(tags);
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
                    <Form.Item label="ISBN" id='isbn' name="isbn" required>
                        <Input name="isbn" placeholder="Put an isbn here"/>
                    </Form.Item>
                    <Form.Item label="Genre" id='genre' name="genre" required>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select genre"
                            onChange={this.handleChange}
                        >
                            {this.state.tags.map(tag => {
                            return (
                                <Option key={tag.id}>
                                    {tag.genre}
                                </Option>
                            )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Publish Year" id='publish_year' name="publish_year" required>
                        <Input name="publish_year" placeholder="Put a year of publishing here"/>
                    </Form.Item>
                    <Form.Item label="Number of Pages" id='number_of_pages' name="number_of_pages" required>
                        <Input name="number_of_pages" placeholder="Put a number of pages"/>
                    </Form.Item>
                    <Form.Item label="Publisher" id='publisher' name="publisher" required>
                        <Input name="publisher" placeholder="Put a publisher here"/>
                    </Form.Item>
                    <Form.Item label="Language" id='language' name="language" required>
                        <Input name="language" placeholder="Put a book language here"/>
                    </Form.Item>
                    <Form.Item label="Cover" id='cover' name="cover" required>
                        <Input name="cover" placeholder="Put a cover type here"/>
                    </Form.Item>
                    <Form.Item label="Stock" id='stock' name="stock" required>
                        <Input name="stock" placeholder="Put a stock here"/>
                    </Form.Item>
                    <Form.Item label="Price" id='price' name="price" required>
                        <Input name="price" placeholder="Put a price here"/>
                    </Form.Item>
                    <Form.Item label="Image Root" id='image_root' name="image_root">
                        <Input name="image_root" placeholder="Image Root" disabled/>
                    </Form.Item>
                    <Form.Item label="Image" id='image' name="image">
                        <Upload
                            className="img-upload"
                            label="Image"
                            listType="picture"
                            beforeUpload={this.beforeUploadImageHandler}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default BookCreateForm;
