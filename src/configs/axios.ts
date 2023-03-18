import axios from 'axios'
import { AxiosOptions } from '@/types/axios.types'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
} as AxiosOptions)


// API request interceptor
instance.interceptors.request
  .use(
    (config) => {

      return config
    },
    (err) => {
      return Promise.reject(err)
    })


// API response interceptor
instance.interceptors.response
  .use(
    (res) => {
      return res
    },
    (err) => {

      return Promise.reject(err)
    })

export default instance
