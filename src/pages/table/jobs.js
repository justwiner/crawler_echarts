import React, {Component} from 'react'
import {Table} from 'antd'

const columns = [
    {
        title: '发布日期',
        dataIndex: 'updateAt',
        width: 200,
    }, {
        title: '职位名',
        dataIndex: 'positionName',
    }, {
        title: '工资',
        dataIndex: 'salary',
        width: 150,
    }, {
        title: '分类',
        dataIndex: 'classifyName',
        width: 150,
    }, {
        title: '地点',
        dataIndex: 'placeAt',
        width: 100,
    }, {
        title: '受教育程度',
        dataIndex: 'education',
        width: 120,
    }, {
        title: '经验',
        dataIndex: 'experience',
        width: 120,
    }, {
        title: '来源',
        dataIndex: 'from',
        width: 100,
    }
];


class JobsTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            tableData: []
        }
    }
    componentWillMount () {
        this.loadData(this.props)
    }
    componentWillReceiveProps (nextProps) {
        this.loadData(nextProps)
    }
    loadData (props) {
        this.setState({tableData: props.job.tableData})
    }
    render () {
        const {loading, tableData} = this.state
        return (
            <section>
                <div className="totalNum">共 <font>{tableData.length}</font> 条数据</div>
                <Table
                bordered
                loading={loading}
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 100 }}
                scroll={{ y: 450 }}/>
            </section>
        )
    }
}

export default JobsTable