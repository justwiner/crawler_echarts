import React, {Component} from 'react'
import { Switch, message } from 'antd';
import {Service} from '../../lib'
import './index.css'

class Set extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            ifTrue: false
        }
    }
    componentDidMount () {
        this.setState({
            ifTrue: localStorage.getItem('ifLoop')
        })
    }
    handleChange = async (value) => {
        this.setState({loading: true})
        let res = null
        if (value) {
            res = (await Service.updateJobs({
                from: [1],
                ifLoop: [true],
                loopTime: [2]
            })).data
        } else {
            res = (await Service.deleteTimedTask({
                from: [1]
            })).data
        }
        if (res.success) {
            message.success(res.msg)
        } else {
            message.warn(res.msg)
        }
        localStorage.setItem('ifLoop', value)
        this.setState({loading: false, ifTrue: value})
    }
    render () {
        const {loading, ifTrue} = this.state
        return (
            <section>
                <p className="getDataCheck">
                    <label>
                        自动爬取数据：
                    </label>
                    <Switch loading={loading} checked={eval(ifTrue)} onChange={this.handleChange} />
                </p>
            </section>
        )
    }
}

export default Set