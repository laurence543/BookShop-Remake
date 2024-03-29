import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        //defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">
                            <Link to="/">Головна</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/about">Про нас</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/books">Каталог</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/cart">Кошик</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/contacts">Контакти</Link>
                        </Menu.Item>
                        {
                            this.props.isStaff
                                ?
                                <Menu.Item key="9">
                                    <Link to="/access/manager_control_panel">Панель керування</Link>
                                </Menu.Item>
                                :
                                <></>
                        }
                        {
                            this.props.isAuthenticated
                                ?
                                <>
                                    <Menu.Item key="6">
                                        <Link to="/access/profile">Профіль</Link>
                                    </Menu.Item>
                                    <Menu.Item key="7" onClick={this.props.logout}>
                                        Вийти
                                    </Menu.Item>
                                </>

                                :
                                <Menu.Item key="8">
                                    <Link to="/access/login">Увійти</Link>
                                </Menu.Item>
                        }
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>{this.props.location.pathname}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    BookShop © 2022
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
