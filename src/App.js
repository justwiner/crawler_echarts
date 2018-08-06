import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css';
import Table from './pages/table'
import Statistics from './pages/statistics'
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Layout id="layout-content">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
              <Menu.Item key="/">
                <Link to='/'>
                  <Icon type="area-chart" />
                  <span>统计</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/table">
                <Link to='/table'>
                  <Icon type="table" />
                  <span>图表</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/" render={() => <Statistics />}></Route>
              <Route path="/table" render={() => <Table />}></Route>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
