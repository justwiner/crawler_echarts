import React, { Component } from 'react';
import { Layout, Menu, Icon, Spin, Button, message } from 'antd';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css';
import Table from './pages/table'
import Statistics from './pages/statistics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import {Service, DB, JobServer} from './lib'
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    loading: false
  };
  async componentWillMount () {
    await this.loadData()
  }
  async loadData (ifLocal = true) {
    this.setState({loading: true})
    // 获取所有数据
    let jobs = []
    let tableData = []
    let from = [1], res = {};
    if (ifLocal) {
      const res_ = await DB.get('res')
      if (res_ !== undefined) {
        res = res_
      } else {
        res = (await Service.getjobs({from})).data
        await DB.set('res', res)
      }
    } else {
      res = (await Service.getjobs({from})).data
      await DB.set('res', res)
    }
    if (res.success) {
      jobs = res.data
    }
    if ( jobs.length !== 0 ) {
        // 处理为表格可展示的数据
        tableData = await JobServer.handleTableData(jobs)
    }
    this.setState({loading: false})
    this.props.actions.firstLoad({jobs, tableData})
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
                  onClick={this.loadData.bind(this, false)}>刷新</Button>
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
      job: state.jobs
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
