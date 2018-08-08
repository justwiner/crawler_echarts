import React, {Component} from 'react'
import JobsTable from './jobs'
import './table.css'

class Tables extends Component {
    render () {
        return (
            <section>
                <JobsTable {...this.props}/>
            </section>
        )
    }
}

export default Tables