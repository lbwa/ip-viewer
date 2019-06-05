import axios from 'axios'

const request = axios.create({
  timeout: 15000
})

export default request
