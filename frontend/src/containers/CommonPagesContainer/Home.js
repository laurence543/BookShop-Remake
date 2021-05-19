import React from "react";
import { Carousel } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Головна сторінка</h1>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>Безкоштовна доставка при замовленні від 700 грн.</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            Іменинникам знижка 20% (при наявності паспорту)
                        </h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default Home;
