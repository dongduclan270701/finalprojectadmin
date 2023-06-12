import axios from 'axios'
import { API_ROOT } from 'Apis/utils'
const token = JSON.parse(localStorage.getItem('auth-token-admin'))

export const fetchCollectingByName = async (name) => {
    const req = await axios.get(`${API_ROOT}/v1/collecting/${name}`)
    return req.data
}

export const fetchListOfLaptopCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting`, { params: {count:countPage }})
    return req.data
}

export const fetchListOfLaptopCollectingByName = async (id) => {
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

export const fetchListOfOrder = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin`, { params: {count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchOrderInformation = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin/${id}`,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderAdmin/${id}`, data,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchSearchOrder = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin/search`, { params: {...data, count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchLoginAdmin = async (username, password) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/login/${username}/${password}`)
    return req.data
}

export const fetchListOfEmployee = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/admin`, { params: {count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchSearchListOfEmployee = async (countPage, data) => {
    const req = await axios.get(`${API_ROOT}/v1/admin`, { params: {count:countPage, search: data }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchCreateEmployee = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/admin`, data,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateEmployee = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/admin/employee/${id}`, data,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchInformationEmployee = async (id, data) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/employee/${id}`,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchListOfUser = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser`,{ params: {count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateRatingOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderAdmin/ratingOrder/${id}`, data,{ headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateStatusEmployee = async (email, data) => {
    const req = await axios.put(`${API_ROOT}/v1/admin/status/${email}`, data, { headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchSearchEmployee = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/search`, { params: {...data, count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchSearchUser = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser/search`, { params: {...data, count:countPage }, headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUser = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser/${id}`, { headers: { 'auth-token-admin': token }})
    return req.data
}

export const fetchUpdateStatusUser = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/managementUser/${id}`, data, { headers: { 'auth-token-admin': token }})
    return req.data
}