import axios from 'axios'
import {message} from 'antd'

class Http {
    static create =  (options) => {
      let service = axios.create(options)
      return service
    } 
}

export default Http