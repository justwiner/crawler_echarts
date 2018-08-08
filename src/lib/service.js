import config from './config'
import Http from './httpCreate'

class Service {
  static get CommonService () {
    let service = Http.create({
      baseURL: `${config.url}`
    })
    return service
  }

  static async getjobs (data) {
    return await Service.CommonService.post('/getjobs', data)
  }

  static async updateJobs (data) {
    return await Service.CommonService.post('/updateJobs', data)
  }

  static async deleteTimedTask (data) {
    return await Service.CommonService.post('/deleteTimedTask', data)
  }

}

export default Service;