import axios from 'axios'
import { TIMEOUT } from 'dns'

/**
 * 创建axios实例
 */
const service = axios.create(
    baseURL:"http://localhost:8080",
    timeout:5000
)