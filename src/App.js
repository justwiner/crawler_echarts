import React, { Component } from 'react';
import { Layout, Menu, Icon, Spin, Button } from 'antd';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css';
import Table from './pages/table'
import Statistics from './pages/statistics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import {Service} from './lib'
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    loading: false
  };
  async componentWillMount () {
    await this.loadData()
  }
  async loadData () {
    this.setState({loading: true})
    let jobs = []
    const from = [1],
          res = (await Service.getjobs({from})).data,
          msg = res.msg;
    if (res.success) {
        if(from.includes(1)) {
            const {zhiPin} = res
            jobs.push(...zhiPin.data)
        }
    }
    this.setState({loading: false})
    this.props.actions.setJobs(jobs)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Spin 
        spinning={this.state.loading}
        tip="loading ... "
        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
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
              <Header className="header">
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Button
                  className="refresh"
                  type="primary"
                  icon="reload"
                  loading={this.state.loading}
                  onClick={this.loadData.bind(this)}>刷新</Button>
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Route exact path="/" render={() => <Statistics {...this.props}/>}></Route>
                <Route path="/table" render={() => <Table {...this.props}/>}></Route>
              </Content>
            </Layout>
          </Layout>
        </Spin>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      jobs: state.jobs.jobs,
      loading: state.jobs.loading
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
