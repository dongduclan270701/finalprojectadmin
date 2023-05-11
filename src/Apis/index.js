import axios from 'axios'
import { API_ROOT } from 'Apis/utils'
const token = JSON.parse(localStorage.getItem('auth-token-admin'))

export const fetchCollectingByName = async (name) => {
    const req = await axios.get(`${API_ROOT}/v1/collecting/${name}`)
    return req.data
}

export const fetchlaptopCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting`, { params: {count:countPage }})
    return req.data
}

export const fetchLaptopCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting/secretAdmin/${id}`,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchCreateLaptopCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/laptopCollecting`, data)
    return req.data
}

export const fetchSearchLaptopCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting/search`, { params: {...data, count:countPage }})
    return req.data
}

export const fetchUpdateLaptopCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/laptopCollecting/${src}`, data)
    return req.data
}

export const fetchOrderList = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/order`, { params: {count:countPage }})
    return req.data
}

export const fetchOrderInformation = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/order/${id}`,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/order/${id}`, data)
    return req.data
}

export const fetchSearchOrder = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/order/search`, { params: {...data, count:countPage }})
    return req.data
}

export const fetchAdminDetails = async (username, password) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/${username}/${password}`)
    return req.data
}