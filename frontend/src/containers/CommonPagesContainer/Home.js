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
                <p>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et imperdiet mauris, at pharetra
                        metus. Nulla consequat maximus leo vel blandit. Nam porttitor nunc quis turpis placerat finibus.
                        Ut euismod turpis sed lacinia porttitor. Vivamus id dui accumsan, facilisis dolor vel, ullamcorper
                        augue. Pellentesque pellentesque diam ac vestibulum condimentum. Nulla porttitor accumsan porttitor.
                        Duis ac vulputate enim, sit amet gravida ante. Nullam eget leo a velit semper pellentesque nec
                        ut eros.
                    </h3>
                </p>
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
