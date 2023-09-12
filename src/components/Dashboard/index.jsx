import React, { useState, useEffect, memo } from 'react';
import Footer from "components/Footer"
import TotalParameters from 'components/Dashboard/Total-parameters'
import ChartsDetails from 'components/Dashboard/Charts-detail'
import RateProduct from 'components/Dashboard/Rate-product'
import ListOrder from 'components/Dashboard/List-order'
import {
    fetchTemperature,
    fetchTotalOrder,
    fetchTotalOrderSuccessful,
    fetchTotalChartSoldInMonth,
    fetchTotalTopOrder,
    fetchTopEmployeeHighestValueInYear,
    fetchTopEmployeeHighestOrderInYear,
    fetchTopUserHighestValueAll,
    fetchTopUserHighestOrderAll
} from 'Apis'

const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const [locationTemp, setLocationTemp] = useState(null)
    const [totalOrder, setTotalOrder] = useState(null)
    const [totalAmountOrder, setTotalAmountOrder] = useState(null)
    const [totalOrderSuccessful, setTotalOrderSuccessful] = useState(null)
    const [totalAmountOrderSuccessful, setTotalAmountOrderSuccessful] = useState(null)
    const [totalProduct, setTotalProduct] = useState(null)
    const [totalTopOrder, setTotalTopOrder] = useState(null)
    const [topStaff, setTopStaff] = useState(null)
    const [topStaffOrder, setTopStaffOrder] = useState(null)
    const [totalTopUser, setTotalTopUser] = useState(null)
    const [totalTopOrderUser, setTotalTopOrderUser] = useState(null)
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
        fetchTotalOrder()
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
        fetchTotalOrderSuccessful()
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
        fetchTotalTopOrder()
            .then(result => {
                setTotalTopOrder(result.resultTotalOrder)
            })
            .catch(error => {
                setTotalTopOrder(0)
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
    const fetchTopEmployeeOrder = () => {
        fetchTopEmployeeHighestOrderInYear()
            .then(result => {
                console.log(result.topEmployeeHighestOrder)
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
                console.log(result.resultTopUser)
                setTotalTopOrderUser(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopOrderUser(0)
                console.log(error)
            })
    }
    useEffect(() => {
        fetchHTemperature()
        fetchOrder()
        fetchOrderSuccessful()
        fetchTotalChartSold()
        fetchTopOrder()
        fetchTopEmployee()
        fetchTopEmployeeOrder()
        fetchTopHighestValueAll()
        fetchTopHighestOrderAll()
    }, []);
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Welcome to Gearvn's admin website</h3>
                                <h6 className="font-weight-normal mb-0">All systems run very smoothly! You have<span className="text-primary"> 3 unread notifications!</span></h6>
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
                />
                <ChartsDetails />
                <RateProduct />
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
                                            {topStaff ? topStaff.map((item,index) => {
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
                                            {topStaffOrder ? topStaffOrder.map((item,index) => {
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
                                            {totalTopOrderUser ? totalTopOrderUser.map((item,index) => {
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
                                            {totalTopUser ? totalTopUser.map((item,index) => {
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
                        <ListOrder totalTopOrder={totalTopOrder} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default memo(Index);
