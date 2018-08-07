import positions from '../../data/position'
import moment from 'moment'
let JobServer = (() => {
    class JobServer {
        static async handleTableData (data) {
            const handledData = data.map((e, i) => {
                const {_id, primary, company, updateAt, dataFromName, classify} = e
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
                    from: dataFromName,
                    classify,
                    classifyName: ((classify) => {
                        const length_1 = positions.data.length
                        for (let a = 0;  a < length_1; a ++) {
                            const length_2 = positions.data[a].subLevelModelList.length
                            for (let b = 0;  b < length_2; b ++) {
                                const length_3 = positions.data[a].subLevelModelList[b].subLevelModelList.length
                                for (let c = 0;  c < length_3; c ++) {
                                    const item = positions.data[a].subLevelModelList[b].subLevelModelList[c]
                                    if (item.code === classify - 0) {
                                        return item.name
                                    }
                                }
                            }
                        }
                    })(classify)
                }
            })
            return handledData
        }
    }
    return JobServer
})()

export default JobServer