import axios from 'axios'
export const restPath = '/api/'

export const request = ( method, path, data = {} ) => {
  const options = {
    method,
    data,
    url: restPath + path,
    timeout: 300000,
  }
  return axios(options)
}
