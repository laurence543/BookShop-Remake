import React from "react";
import {InstagramFilled, FacebookFilled, TwitterCircleFilled} from '@ant-design/icons';

class Contacts extends React.Component {

    render() {
        return (
            <div>
                <h1>Контакти</h1>
                <div>
                    <h2>Телефони</h2>
                    <h3>+380 96 123 45 67</h3>
                    <h3>+380 73 123 45 67</h3>
                    <h3>+380 50 123 45 67</h3>
                </div>
                <br/>
                <div>
                    <h2>Пошта</h2>
                    <h3>bookshop@gmail.com</h3>
                </div>
                <br/>
                <div>
                    <h2>Ми у соціальних мережах</h2>
                    <h3><InstagramFilled /> <a href="https://www.instagram.com/" target="_blank">bookshop</a></h3>
                    <h3><FacebookFilled /> <a href="https://www.facebook.com/" target="_blank">bookshop</a></h3>
                    <h3><TwitterCircleFilled /> <a href="https://twitter.com/" target="_blank">bookshop</a></h3>

                </div>
            </div>
        );
    }
}

export default Contacts;
