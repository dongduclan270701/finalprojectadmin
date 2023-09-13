import axios from 'axios'
import { API_ROOT } from 'Apis/utils'
const token = JSON.parse(localStorage.getItem('auth-token-admin'))
const apiKey = '7b26c92417fd3678d52eac12dc870222';
export const fetchTemperature = async (name) => {
    const req = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${apiKey}&units=metric`)
    return req.data
}

export const fetchCollectingByName = async (name) => {
    const req = await axios.get(`${API_ROOT}/v1/collecting/${name}`)
    return req.data
}

export const fetchListOfLaptopCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfLaptopCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreateLaptopCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/laptopCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchLaptopCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalGoodsLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalGoods`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOutOfStockLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalOutOfStock`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalAInStockLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalAInStock`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldOfMonthLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldOfMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewInMonthLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldInYearLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldInYear`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewInYearLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewInYear`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldByDayLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldByDay`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewByDayLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewByDay`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCountGoodsByCategoryLaptopCollecting = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/countGoodsByCategory`, { params: { category: category },headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSoldProductsByCategoryLaptopCollecting = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/soldProductsByCategory`, { params: { category: category },headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopSoldProductsLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/topSoldProducts`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopViewProductsLaptopCollecting = async () => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/topViewProducts`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalEmployee = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalEmployee`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalEmployeeWorking = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalEmployeeWorking`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalAgeEmployee = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalAgeEmployee`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalRole = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalRole`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldInMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalSoldInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalChartSoldInMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalChartSoldInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderInMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalOrderInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalChartOrderInMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/totalChartOrderInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopEmployeeHighestValue = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/topEmployeeHighestValue`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopEmployeeHighestOrder = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/topEmployeeHighestOrder`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopEmployeeHighestValueInYear = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/topEmployeeHighestValueInYear`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopEmployeeHighestOrderInYear = async () => {
    const req = await axios.get(`${API_ROOT}/v1/employeeChart/topEmployeeHighestOrderInYear`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUsers = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUsers`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUserLoginLastMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUserLoginLastMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUserLoginOverMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUserLoginOverMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUserAddGoodsToWishlist = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUserAddGoodsToWishlist`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUserPurchased = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUserPurchased`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalUserJoinInMonth = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalUserJoinInMonth`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalAgeUser = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalAgeUser`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalStatusUser = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/totalStatusUser`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopUserHighestValue = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/topUserHighestValue`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopUserHighestOrder = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/topUserHighestOrder`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopUserHighestValueAll = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/topUserHighestValueAll`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopUserHighestOrderAll = async () => {
    const req = await axios.get(`${API_ROOT}/v1/usersChart/topUserHighestOrderAll`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrder = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalOrder`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderSuccessful = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalOrderSuccessful`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderFailed = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalOrderFailed`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderByStatus = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalOrderByStatus`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalTopOrder = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalTopOrder`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalTopProduct = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalTopProduct`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalTopOrderAll = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalTopOrderAll`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalTopProductAll = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalTopProductAll`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrdersByDay = async () => {
    const req = await axios.get(`${API_ROOT}/v1/orderChart/totalOrdersByDay`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopViewProductDashboard = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/dashboard/topViewProducts`, { params: { category: category },  headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopSoldProductDashboard = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/dashboard/topSoldProducts`, { params: { category: category },  headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderDashboard = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/dashboard/totalOrder`, { params: { category: category },  headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOrderSuccessfulDashboard = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/dashboard/totalOrderSuccessful`, { params: { category: category },  headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopEmployeeHighestValueInYearNotLimit = async (category) => {
    const req = await axios.get(`${API_ROOT}/v1/dashboard/topEmployeeHighestValueInYearNotLimit`, { params: { category: category },  headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateLaptopCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/laptopCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfOrder = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchOrderInformation = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderAdmin/${id}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchOrder = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/orderAdmin/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchLoginAdmin = async (username, password) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/login/${username}/${password}`)
    return req.data
}

export const fetchListOfEmployee = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/admin`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchListOfEmployee = async (countPage, data) => {
    const req = await axios.get(`${API_ROOT}/v1/admin`, { params: { count: countPage, search: data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreateEmployee = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/admin`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateEmployee = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/admin/employee/${id}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchInformationEmployee = async (id, data) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/employee/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfUser = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateRatingOrder = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/orderAdmin/ratingOrder/${id}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateStatusEmployee = async (email, data) => {
    const req = await axios.put(`${API_ROOT}/v1/admin/status/${email}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchEmployee = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/admin/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchUser = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUser = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/managementUser/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateStatusUser = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/managementUser/${id}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreateVoucher = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/voucherAdmin`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfVoucher = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/voucherAdmin`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchVoucher = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/voucherAdmin/details/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateVoucher = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/voucherAdmin/details/${id}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchVoucher = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/voucherAdmin/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}