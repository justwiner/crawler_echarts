import config from './config'
import Http from './httpCreate'

class Service {
  static get CommonService () {
    let service = Http.create({
      baseURL: `${config.url}`,
      timeout: config.timeOut
    })
    return service
  }

  static async getjobs (data) {
    return await Service.CommonService.post('/getjobs', data)
  }

}

export default Service;