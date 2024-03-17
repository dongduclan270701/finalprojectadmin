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
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(totalOrder)} orders</div>
                            <div className='text-pie-title play-bold' >Order of this Month</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalOrderSuccessful / totalOrder * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalOrderSuccessful / totalOrder * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalOrderSuccessful)} orders / Total Goods</div>
                            <div className='text-pie-title play-bold' >Orders successful of this Month</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalOrderFailed / totalOrder * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalOrderFailed / totalOrder * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalOrderFailed)} orders / Total Goods</div>
                            <div className='text-pie-title play-bold' >Orders failed of this Month</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalAmountOrderSuccessful / totalAmountOrder * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalAmountOrderSuccessful / totalAmountOrder * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content play-bold' >Estimate: {formatter.format(totalAmountOrder)} VNĐ</div>
                            <div className='text-pie-content play-bold' >Practice: {formatter.format(totalAmountOrderSuccessful)} VNĐ</div>
                            <div className='text-pie-title' >Revenue of all orders of this Month</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalOrderSuccessful * 30000) / (totalOrder * 30000) * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalOrderSuccessful * 30000) / (totalOrder * 30000) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content play-bold' >Estimate: {formatter.format(totalOrder * 30000)} VNĐ</div>
                            <div className='text-pie-content play-bold' >Practice: {formatter.format(totalOrderSuccessful * 30000)} VNĐ</div>
                            <div className='text-pie-title' >Shipping fee profit of all orders this month</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content play-bold' >Estimate: {formatter.format(totalAmountOrder * 0.2)} VNĐ</div>
                            <div className='text-pie-content play-bold' >Practice: {formatter.format(totalAmountOrderSuccessful * 0.2)} VNĐ</div>
                            <div className='text-pie-title' >Profit of all orders of this Month</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
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
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
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
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
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
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
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
                <div className="col-md-6 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-order-table-goods">
                            <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 orders with the highest amount this month ( {currentMonthName} )</p>
                            <table className='table table-striped section-table-goods '>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Date Order</th>
                                        <th>Goods</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                    {totalTopOrder && totalTopOrder.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order._id}</div></div></td>
                                            <td>{item.order.email}</td>
                                            <td>{item.order.createDate}</td>
                                            <td className='play-bold'>{formatter.format(item.productCount)}</td>
                                            <td className='play-bold'>{formatter.format(item.order.sumOrder)} VND</td>
                                            <td><label className={
                                                item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                            }>
                                                {item.order.status}
                                            </label></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-order-table-goods">
                            <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 orders with the highest goods this month ( {currentMonthName} )</p>
                            <table className='table table-striped section-table-goods '>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Date Order</th>
                                        <th>Goods</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                    {totalTopProduct && totalTopProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order._id}</div></div></td>
                                            <td>{item.order.email}</td>
                                            <td>{item.order.createDate}</td>
                                            <td className='play-bold'>{formatter.format(item.productCount)}</td>
                                            <td className='play-bold'>{formatter.format(item.order.sumOrder)}</td>
                                            <td>
                                                <label className={
                                                    item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                }>
                                                    {item.order.status}
                                                </label>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);