import React, { useState, useEffect, memo } from 'react'
import ChartCountOrderStatus from 'components/Orders/Chart/ChartCountOrderStatus'
import ChartOrderOfMonth from 'components/Orders/Chart/ChartOrderOfMonth'
import ChartAmountOrderOfMonth from 'components/Orders/Chart/ChartAmountOrderOfMonth'
import ChartTotalShippingStatus from 'components/Orders/Chart/ChartTotalShippingStatus'
import {
    fetchTotalOrder,
    fetchTotalOrderSuccessful,
    fetchTotalOrderFailed,
    fetchTotalOrderByStatus,
    fetchTotalTopOrder,
    fetchTotalTopProduct,
    fetchTotalOrdersByDay
} from 'Apis'
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const [totalOrder, setTotalOrder] = useState(null)
    const [totalAmountOrder, setTotalAmountOrder] = useState(null)
    const [totalOrderSuccessful, setTotalOrderSuccessful] = useState(null)
    const [totalAmountOrderSuccessful, setTotalAmountOrderSuccessful] = useState(null)
    const [totalOrderFailed, setTotalOrderFailed] = useState(null)
    const [totalOrderByStatus, setTotalOrderByStatus] = useState(null)
    const [totalChartOrder, setTotalChartOrder] = useState(null)
    const [totalTopOrder, setTotalTopOrder] = useState(null)
    const [totalTopProduct, setTotalTopProduct] = useState(null)
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
    const fetchOrderFailed = () => {
        fetchTotalOrderFailed()
            .then(result => {
                setTotalOrderFailed(result.total)
            })
            .catch(error => {
                setTotalOrderFailed(0)
                console.log(error)
            })
    }
    const fetchOrderByStatus = () => {
        fetchTotalOrderByStatus()
            .then(result => {
                setTotalOrderByStatus(result)
            })
            .catch(error => {
                setTotalOrderByStatus(0)
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
    const fetchTopProduct = () => {
        fetchTotalTopProduct()
            .then(result => {
                setTotalTopProduct(result.resultTopProduct)
            })
            .catch(error => {
                setTotalTopProduct(0)
                console.log(error)
            })
    }
    const fetchOrdersByDay = () => {
        fetchTotalOrdersByDay()
            .then(result => {
                setTotalChartOrder(result.resultTotalOrder)
            })
            .catch(error => {
                setTotalChartOrder(0)
                console.log(error)
            })
    }
    const getCurrentMonthName = () => {
        const currentDate = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthIndex = currentDate.getMonth();
        const currentMonthName = monthNames[currentMonthIndex];
        return currentMonthName;
    }
    const currentMonthName = getCurrentMonthName()
    useEffect(() => {
        fetchOrder()
        fetchOrderSuccessful()
        fetchOrderFailed()
        fetchOrderByStatus()
        fetchTopOrder()
        fetchOrdersByDay()
        fetchTopProduct()
    }, [])
    const handleResetData = (event, name) => {
        switch (name) {
            case "totalOrder":
                setTotalOrder(null)
                fetchOrder()
                break;
            default:
                break;
        }
    }
    return (
        <div style={{ fontFamily: "inherit" }}>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total order of this Month </p>
                            {totalOrder === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalOrder)}</p>
                                    <p></p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Orders successful of this Month </p>
                            {totalOrderSuccessful === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalOrderSuccessful)}</p>
                                    <p>{formatter.format(totalOrderSuccessful / totalOrder * 100)} % / Total Order</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Orders failed of this Month </p>
                            {totalOrderFailed === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalOrderFailed)}</p>
                                    <p>{formatter.format(totalOrderFailed / totalOrder * 100)} % / Total Order</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total revenue of all orders of this Month </p>
                            {totalAmountOrderSuccessful === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">Practice: {formatter.format(totalAmountOrderSuccessful)} VNĐ</p>
                                    <p>Estimate: {formatter.format(totalAmountOrder)} VNĐ</p>
                                    <p>{formatter.format(totalAmountOrderSuccessful / totalAmountOrder * 100)} % / Total Order</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total shipping fee profit of all orders this month </p>
                            {totalOrderSuccessful === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">Practice: {formatter.format(totalOrderSuccessful * 30000)} VNĐ</p>
                                    <p>Estimate: {formatter.format(totalOrder * 30000)} VNĐ</p>
                                    <p>{formatter.format((totalOrderSuccessful * 30000) / (totalOrder * 30000) * 100)} % / Total Order</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total profit of all orders of this Month </p>
                            {totalAmountOrderSuccessful === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">Practice: {formatter.format(totalAmountOrderSuccessful * 0.2)} VNĐ</p>
                                    <p>Estimate: {formatter.format(totalAmountOrder * 0.2)} VNĐ</p>
                                    <p>{formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)} % / Total Order</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Orders Of Month ( {currentMonthName} )</h4>
                                    {/* <ChartOrderOfMonth /> */}
                                    {totalChartOrder ? <ChartOrderOfMonth totalChartOrder={totalChartOrder} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Orders Status In Month ( {currentMonthName} )</h4>
                                    {/* <ChartCountOrderStatus /> */}
                                    {totalOrderByStatus ? <ChartCountOrderStatus totalOrderByStatus={totalOrderByStatus} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Shipping Status In Month ( {currentMonthName} )</h4>
                                    {/* <ChartTotalShippingStatus /> */}
                                    {totalOrderByStatus ? <ChartTotalShippingStatus totalOrderByStatus={totalOrderByStatus} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Amount Order In Month ( {currentMonthName} )</h4>
                                    {/* <ChartAmountOrderOfMonth /> */}
                                    {totalChartOrder ? <ChartAmountOrderOfMonth totalChartOrder={totalChartOrder} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 orders with the highest amount this month</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                                        ID</th>
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Username</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Date Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Total Amount</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {totalTopOrder ? totalTopOrder.map((item, index) => {
                                                    return <tr className="odd " key={index}>
                                                        <td className="sorting_1" style={{ maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            {item.order._id}</td>
                                                        <td>
                                                            {item.order.username + ' - ' + item.order.email}</td>
                                                        <td>
                                                            {item.order.createDate}</td>
                                                        <td>
                                                            {formatter.format(item.order.sumOrder)} VND</td>
                                                        <td>
                                                            <label className={
                                                                item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                            }>
                                                                {item.order.status}
                                                            </label>
                                                        </td>
                                                    </tr>
                                                }) : <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                                        <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                    </td>
                                                </tr>
                                                }</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 orders with the highest goods this month</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                                        ID</th>
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Username</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Date Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Total Goods</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {totalTopProduct ? totalTopProduct.map((item, index) => {
                                                    return <tr className="odd " key={index}>
                                                        <td className="sorting_1" style={{ maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            {item._id}</td>
                                                        <td>
                                                            {item.username + ' - ' + item.email}</td>
                                                        <td>
                                                            {item.createDate}</td>
                                                        <td>
                                                            {item.product.length}</td>
                                                        <td>
                                                            <label className={
                                                                item.status === "Cancel" ? "badge badge-danger" : item.status === "Delivery failed" ? "badge badge-danger" : item.status === "Delivery successful" ? "badge badge-success" : item.status === "Being transported" ? "badge badge-primary" : item.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                            }>
                                                                {item.status}
                                                            </label>
                                                        </td>
                                                    </tr>
                                                }) : <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                                        <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                    </td>
                                                </tr>
                                                }</tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);