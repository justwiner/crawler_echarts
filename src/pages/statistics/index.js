import React, {Component} from 'react'
import JobsStatistics from './jobs'

class Statistics extends Component {
    
    render () {
        return (
            <section>
                <JobsStatistics {...this.props}/>
            </section>
        )
    }
}

export default Statistics