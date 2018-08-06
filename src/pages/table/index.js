import React, {Component} from 'react'
import {Table, message} from 'antd'
import moment from 'moment'


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
        title: '地点',
        dataIndex: 'placeAt',
        width: 150,
    }, {
        title: '受教育程度',
        dataIndex: 'education',
        width: 150,
    }, {
        title: '经验',
        dataIndex: 'experience',
        width: 150,
    }, {
        title: '来源',
        dataIndex: 'from',
        width: 150,
    }
];

class Tables extends Component {
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
        this.setState({loading: true})
        const tableData_ = handleTableData(props.jobs)
        this.setState({loading: false, tableData: tableData_})
        function handleTableData (data) {
            const handledData = data.map((e, i) => {
                const {_id, primary, company, updateAt, dataFromName} = e
                const {claims, salary, jobTitle} = primary
                const {name} = company
                const {position, education, experience,} = claims
                return {
                    key: i,
                    id: _id,
                    companyName: name,
                    positionName: jobTitle,
                    salary: `${salary.minSalary}K ~ ${salary.maxSalary}K`,
                    updateAt: moment(updateAt).format('YYYY-MM-DD HH:mm:ss'),
                    placeAt: position,
                    education,
                    experience,
                    from: dataFromName
                }
            })
            return handledData
        }
    }
    render () {
        const {loading, tableData} = this.state
        return (
            <section>
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

export default Tables