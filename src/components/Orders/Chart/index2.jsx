import React, { useState, useEffect } from 'react'
import ChartCountOrderStatus from 'components/Orders/Chart/ChartCountOrderStatus'
import ChartOrderOfMonth from 'components/Orders/Chart/ChartOrderOfMonth'
import ChartShipOfMonth from 'components/Orders/Chart/ChartShipOfMonth'
import ChartTotalShippingStatus from 'components/Orders/Chart/ChartTotalShippingStatus'

const Index = (props) => {
    const { chartData } = props
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(chartData)
    }, [chartData])

    return (
        <div style={{fontFamily:"inherit"}}>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Orders successful of this Month</p>
                            <p className="fs-25 mb-2">4,006</p>
                            <p>10.00% (Total order target)</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Orders failed of this Month</p>
                            <p className="fs-25 mb-2">61,344</p>
                            <p>22.00% (Total order target)</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3">Total target order of this Month</p>
                            <p className="fs-25 mb-2">13,432</p>
                            <p>2.00% (12 Months in 2023)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Total revenue of all orders of this Month</p>
                            <p className="fs-25 mb-2">13,432,234,040 VND</p>
                            <p>2.00% (12 Months in 2023)</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Total shipping fee profit of all orders this month</p>
                            <p className="fs-25 mb-2">61,344 VND</p>
                            <p>22.00% (Total Orders)</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Total profit of all orders of this Month</p>
                            <p className="fs-25 mb-2">47,123,123,033 VND</p>
                            <p>0.22% (12 Months in 2023)</p>
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
                                    <h4>Chart Orders Of Month</h4>
                                    <ChartOrderOfMonth />
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
                                    <h4>Chart Orders Status</h4>
                                    <ChartCountOrderStatus />
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
                                    <h4>Chart Shipping Status</h4>
                                    <ChartTotalShippingStatus />
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
                                    <h4>Chart Ships Of Month</h4>
                                    <ChartShipOfMonth />
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
                            <p className="card-title">Top 10 orders with the highest value this month</p>
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
                                                        Total</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd selected">
                                                    <td className="select-checkbox">
                                                        Incs234</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 1</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>
                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Business type 2</td>
                                                    <td>
                                                        Jesse Thomas</td>
                                                    <td>
                                                        $1200</td>

                                                    <td className=" details-control">
                                                    </td>
                                                </tr>
                                            </tbody>

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

export default Index;