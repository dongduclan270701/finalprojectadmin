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

export const fetchUpdateLaptopCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/laptopCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}


export const fetchListOfLaptopGamingCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopGamingCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfLaptopGamingCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopGamingCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreateLaptopGamingCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/laptopGamingCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchLaptopGamingCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/laptopGamingCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateLaptopGamingCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/laptopGamingCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}


export const fetchListOfPcGamingCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcGamingCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfPcGamingCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/pcGamingCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreatePcGamingCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/pcGamingCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchPcGamingCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcGamingCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdatePcGamingCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/pcGamingCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}


export const fetchListOfPcCreatorCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCreatorCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfPcCreatorCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCreatorCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreatePcCreatorCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/pcCreatorCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchPcCreatorCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCreatorCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdatePcCreatorCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/pcCreatorCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}


export const fetchListOfPcCompanyCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCompanyCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfPcCompanyCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCompanyCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreatePcCompanyCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/pcCompanyCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchPcCompanyCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/pcCompanyCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdatePcCompanyCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/pcCompanyCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}


export const fetchListOfAppleCollecting = async (countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/appleCollecting`, { params: { count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchListOfAppleCollectingByName = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/appleCollecting/secretAdmin/${id}`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCreateAppleCollecting = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/appleCollecting`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSearchAppleCollecting = async (data, countPage) => {
    const req = await axios.get(`${API_ROOT}/v1/appleCollecting/search`, { params: { ...data, count: countPage }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchUpdateAppleCollecting = async (src, data) => {
    const req = await axios.put(`${API_ROOT}/v1/appleCollecting/${src}`, data, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalGoodsCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalGoods`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalOutOfStockCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalOutOfStock`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalAInStockCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalAInStock`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldOfMonthCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldOfMonth`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewInMonthCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewInMonth`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldInYearCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldInYear`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewInYearCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewInYear`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalSoldByDayCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalSoldByDay`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTotalViewByDayCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/totalViewByDay`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchCountGoodsByCategoryCollecting = async (category, data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/countGoodsByCategory`, { params: { category: category, collection : data },headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchSoldProductsByCategoryCollecting = async (category, data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/soldProductsByCategory`, { params: { category: category, collection : data },headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopSoldProductsCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/topSoldProducts`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchTopViewProductsCollecting = async (data) => {
    const req = await axios.get(`${API_ROOT}/v1/productChart/topViewProducts`, { params: { collection : data }, headers: { 'auth-token-admin': token } })
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

export const fetchCreateNotice = async (data, countPage) => {
    const req = await axios.post(`${API_ROOT}/v1/notice`, { headers: { 'auth-token-admin': token } })
    return req.data
}

export const fetchNotice = async () => {
    const req = await axios.get(`${API_ROOT}/v1/notice/fetch`, { headers: { 'auth-token-admin': token } })
    return req.data
}