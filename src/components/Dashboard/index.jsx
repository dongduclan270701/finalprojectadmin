import React, { useState, useEffect, useContext, memo } from 'react';
import Footer from "components/Footer"
import TotalParameters from 'components/Dashboard/Total-parameters'
import RateProduct from 'components/Dashboard/Rate-product'
import ListOrderTopAmount from 'components/Dashboard/List-orderTopAmount'
import ListOrderTopProduct from 'components/Dashboard/List-orderTopProduct'
import { StateContext } from 'components/Context'
import {
    fetchTemperature,
    fetchTotalOrderDashboard,
    fetchTotalOrderSuccessfulDashboard,
    fetchTotalChartSoldInMonth,
    fetchTotalTopProductAll,
    fetchTotalTopOrderAll,
    fetchTopEmployeeHighestValueInYear,
    fetchTopEmployeeHighestOrderInYear,
    fetchTopUserHighestValueAll,
    fetchTopUserHighestOrderAll,
    fetchTopViewProductDashboard,
    fetchTopSoldProductDashboard,
    fetchTopEmployeeHighestValueInYearNotLimit
} from 'Apis'

const Index = () => {
    const state = useContext(StateContext)
    const formatter = new Intl.NumberFormat('en-US')
    const [locationTemp, setLocationTemp] = useState(null)
    const [totalOrder, setTotalOrder] = useState(null)
    const [totalAmountOrder, setTotalAmountOrder] = useState(null)
    const [totalOrderSuccessful, setTotalOrderSuccessful] = useState(null)
    const [totalAmountOrderSuccessful, setTotalAmountOrderSuccessful] = useState(null)
    const [totalProduct, setTotalProduct] = useState(null)
    const [totalTopOrder, setTotalTopOrder] = useState(null)
    const [totalTopProduct, setTotalTopProduct] = useState(null)
    const [topStaff, setTopStaff] = useState(null)
    const [topStaffNotLimit, setTopStaffNotLimit] = useState(null)
    const [topStaffOrder, setTopStaffOrder] = useState(null)
    const [totalTopUser, setTotalTopUser] = useState(null)
    const [totalTopOrderUser, setTotalTopOrderUser] = useState(null)
    const [totalTopSoldProduct, setTotalTopSoldProduct] = useState(null)
    const [totalTopViewProduct, setTotalTopViewProduct] = useState(null)
    const [categoryTopSoldProduct, setCategoryTopSoldProduct] = useState('laptop')
    const [categoryTopViewProduct, setCategoryTopViewProduct] = useState('laptop')
    const fetchHTemperature = () => {
        fetchTemperature()
            .then(result => {
                setLocationTemp(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const fetchOrder = () => {
        fetchTotalOrderDashboard()
            .then(result => {
                setTotalOrder(result.total)
                setTotalAmountOrder(result.totalAmount)
            })
            .catch(error => {
                setTotalOrder(0)
                setTotalAmountOrder(0)
                console.log(error)
            })
    }
    const fetchOrderSuccessful = () => {
        fetchTotalOrderSuccessfulDashboard()
            .then(result => {
                setTotalOrderSuccessful(result.total)
                setTotalAmountOrderSuccessful(result.totalAmount)
            })
            .catch(error => {
                setTotalOrderSuccessful(0)
                setTotalAmountOrderSuccessful(0)
                console.log(error)
            })
    }
    const fetchTotalChartSold = () => {
        fetchTotalChartSoldInMonth()
            .then(result => {
                const combinedData = result.resultTotal.reduce((accumulator, currentValue) => {
                    currentValue.soldProductInMonth.forEach(item => {
                        const { day, month, soldProduct, amount } = item
                        const key = `${day}`
                        if (!accumulator[key]) {
                            accumulator[key] = {
                                day,
                                month,
                                totalSoldProduct: 0,
                                totalAmount: 0
                            }
                        }
                        accumulator[key].totalSoldProduct += soldProduct
                        accumulator[key].totalAmount += amount
                    })
                    return accumulator
                }, {})
                const sumProduct = Object.values(combinedData).reduce((total, item) => total + item.totalSoldProduct, 0)
                setTotalProduct(sumProduct)
            })
            .catch(error => {
                setTotalProduct([])
                console.log(error)
            })
    }
    const fetchTopOrder = () => {
        fetchTotalTopOrderAll()
            .then(result => {
                setTotalTopOrder(result.resultTotalOrder)
            })
            .catch(error => {
                setTotalTopOrder(0)
                console.log(error)
            })
    }
    const fetchTopProduct = () => {
        fetchTotalTopProductAll()
            .then(result => {
                setTotalTopProduct(result.resultTopProduct)
            })
            .catch(error => {
                setTotalTopProduct(0)
                console.log(error)
            })
    }
    const fetchTopEmployee = () => {
        fetchTopEmployeeHighestValueInYear()
            .then(result => {
                setTopStaff(result.topEmployeeHighestValue)
            })
            .catch(error => {
                setTopStaff([]);
                console.log(error)
            })
    }
    const fetchEmployeeHighestValueInYearNotLimit = () => {
        fetchTopEmployeeHighestValueInYearNotLimit()
            .then(result => {
                setTopStaffNotLimit(result.topEmployeeHighestValue)
            })
            .catch(error => {
                setTopStaffNotLimit([]);
                console.log(error)
            })
    }
    const fetchTopEmployeeOrder = () => {
        fetchTopEmployeeHighestOrderInYear()
            .then(result => {
                setTopStaffOrder(result.topEmployeeHighestOrder)
            })
            .catch(error => {
                setTopStaffOrder([]);
                console.log(error)
            })
    }
    const fetchTopHighestValueAll = () => {
        fetchTopUserHighestValueAll()
            .then(result => {
                setTotalTopUser(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopUser(0)
                console.log(error)
            })
    }
    const fetchTopHighestOrderAll = () => {
        fetchTopUserHighestOrderAll()
            .then(result => {
                setTotalTopOrderUser(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopOrderUser(0)
                console.log(error)
            })
    }
    const fetchTopViewProduct = () => {
        fetchTopViewProductDashboard(categoryTopViewProduct)
            .then(result => {
                setTotalTopViewProduct(result.topViewProducts)
            })
            .catch(error => {
                setTotalTopViewProduct(0)
                console.log(error)
            })
    }
    const fetchTopSoldProduct = () => {
        fetchTopSoldProductDashboard(categoryTopSoldProduct)
            .then(result => {
                setTotalTopSoldProduct(result.topSoldProducts)
            })
            .catch(error => {
                setTotalTopSoldProduct(0)
                console.log(error)
            })
    }
    useEffect(() => {
        fetchHTemperature()
        if (state.authentication === 'CEO' || state.authentication === 'MANAGEMENT') {
            fetchOrder()
            fetchOrderSuccessful()
            fetchTotalChartSold()
            fetchTopOrder()
            fetchTopEmployee()
            fetchTopEmployeeOrder()
            fetchTopHighestValueAll()
            fetchTopHighestOrderAll()
            fetchTopProduct()
            fetchTopViewProduct()
            fetchTopSoldProduct()
            fetchEmployeeHighestValueInYearNotLimit()
        }
    }, [state]);

    const handleChangeCategoryTopSoldProduct = (category) => {
        setTotalTopSoldProduct(null)
        fetchTopSoldProductDashboard(category)
            .then(result => {
                setTotalTopSoldProduct(result.topSoldProducts)
            })
            .catch(error => {
                setTotalTopSoldProduct(0)
                console.log(error)
            })
    }
    const handleChangeCategoryTopViewProduct = (category) => {
        setTotalTopViewProduct(null)
        fetchTopViewProductDashboard(category)
            .then(result => {
                setTotalTopViewProduct(result.topViewProducts)
            })
            .catch(error => {
                setTotalTopViewProduct(0)
                console.log(error)
            })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Welcome to KTech's dashboard</h3>
                                <h6 className="font-weight-normal mb-0">Welcome back, {state.authentication.toLowerCase()}!</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <TotalParameters
                    locationTemp={locationTemp}
                    totalOrder={totalOrder}
                    totalAmountOrderSuccessful={totalAmountOrderSuccessful}
                    totalOrderSuccessful={totalOrderSuccessful}
                    totalAmountOrder={totalAmountOrder}
                    totalProduct={totalProduct}
                    topStaffNotLimit={topStaffNotLimit}
                />
                {/* <ChartsDetails /> */}
                <RateProduct
                    totalTopSoldProduct={totalTopSoldProduct}
                    totalTopViewProduct={totalTopViewProduct}
                    handleChangeCategoryTopSoldProduct={handleChangeCategoryTopSoldProduct}
                    handleChangeCategoryTopViewProduct={handleChangeCategoryTopViewProduct}
                />
                <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0" style={{ textAlign: "center" }}>Top Employee Highest Amount</p>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="pl-0  pb-2 border-bottom">Name</th>
                                                <th className="border-bottom pb-2">Image</th>
                                                <th className="border-bottom pb-2">Role</th>
                                                <th className="border-bottom pb-2">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topStaff ? topStaff.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="pl-0">
                                                        {item.username}
                                                    </td>
                                                    <td className="text-muted">
                                                        <img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} />
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">{item.role}</p>
                                                    </td>
                                                    <td>
                                                        <span className="font-weight-bold mr-2">{formatter.format(item.totalAmount)} VND</span>
                                                    </td>
                                                </tr>
                                            }) : <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                </td>
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0" style={{ textAlign: "center" }}>Top Employee Highest Order</p>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="pl-0  pb-2 border-bottom">Name</th>
                                                <th className="border-bottom pb-2">Image</th>
                                                <th className="border-bottom pb-2">Role</th>
                                                <th className="border-bottom pb-2">Orders</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topStaffOrder ? topStaffOrder.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="pl-0">
                                                        {item.username}</td>
                                                    <td>
                                                        <img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} />
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">{item.role}</p>
                                                    </td>
                                                    <td className="font-weight-bold mr-2">
                                                        {item.totalOrder}
                                                    </td>
                                                </tr>
                                            }) : <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                </td>
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0" style={{ textAlign: "center" }}>Top Discount</p>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="pl-0  pb-2 border-bottom">Places</th>
                                                <th className="border-bottom pb-2">Orders</th>
                                                <th className="border-bottom pb-2">Users</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                </td>
                                            </tr>
                                            {/* <tr>
                                                <td className="pl-0">Kentucky</td>
                                                <td><p className="mb-0"><span className="font-weight-bold mr-2">65</span>(2.15%)</p></td>
                                                <td className="text-muted">65</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0" style={{ textAlign: "center" }}>Top User Highest Number of Order</p>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="pl-0  pb-2 border-bottom">Name</th>
                                                <th className="border-bottom pb-2">Image</th>
                                                <th className="border-bottom pb-2">Phone number</th>
                                                <th className="border-bottom pb-2">Total Order</th>
                                                <th className="border-bottom pb-2">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalTopOrderUser ? totalTopOrderUser.map((item, index) => {
                                                return <tr >
                                                    <td className="pl-0">
                                                        {item.username} - {item.email}</td>
                                                    <td>
                                                        <img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} />
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">{item.phoneNumber ? item.phoneNumber : 'None'}</p>
                                                    </td>
                                                    <td className="font-weight-bold mr-2">
                                                        {formatter.format(item.ordersCount)}
                                                    </td>
                                                    <td className="font-weight-bold mr-2">
                                                        {formatter.format(item.totalSumOrder)} VNĐ
                                                    </td>
                                                </tr>
                                            }) : <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                </td>
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 stretch-card grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0" style={{ textAlign: "center" }}>Top User Highest Amount Of Order</p>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="pl-0  pb-2 border-bottom">Name</th>
                                                <th className="border-bottom pb-2">Image</th>
                                                <th className="border-bottom pb-2">Phone number</th>
                                                <th className="border-bottom pb-2">Total Goods</th>
                                                <th className="border-bottom pb-2">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalTopUser ? totalTopUser.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="pl-0">
                                                        {item.username} - {item.email}</td>
                                                    <td>
                                                        <img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} />
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">{item.phoneNumber ? item.phoneNumber : 'None'}</p>
                                                    </td>
                                                    <td className="font-weight-bold mr-2">
                                                        {item.orders.product.length}
                                                    </td>
                                                    <td className="font-weight-bold mr-2">
                                                        {formatter.format(item.orders.sumOrder)} VND
                                                    </td>
                                                </tr>
                                            }) : <tr>
                                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                                    <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                </td>
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 stretch-card grid-margin">
                        <ListOrderTopAmount totalTopOrder={totalTopOrder} />
                    </div>
                    <div className="col-md-12 stretch-card grid-margin">
                        <ListOrderTopProduct totalTopProduct={totalTopProduct} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default memo(Index);
