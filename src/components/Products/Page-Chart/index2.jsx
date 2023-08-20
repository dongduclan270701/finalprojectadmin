import React, { useState, useEffect, memo } from 'react'
import ChartSoldOrdersOfMonth from 'components/Products/Page-Chart/ChartSoldOrderOfMonth'
import ChartCategory from 'components/Products/Page-Chart/ChartCategory'
import ChartRateGoods from 'components/Products/Page-Chart/ChartRateGoods'
import ChartViewGoods from 'components/Products/Page-Chart/ChartViewGoods'

const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { optionSelectLaptop, dataChart } = props
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Total category</p>
                            <p className="fs-25 mb-2">{formatter.format(optionSelectLaptop.length)}</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3">Total goods</p>
                            <p className="fs-25 mb-2">{formatter.format(dataChart.total)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Total Out of Stock</p>
                            <p className="fs-25 mb-2">{formatter.format(dataChart.totalOutStock)}</p>
                            <p>{formatter.format((dataChart.totalOutStock / dataChart.total)*100)}% / Total Goods</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3">Total available in stock</p>
                            <p className="fs-25 mb-2">{formatter.format(dataChart.total - dataChart.totalOutStock)} - {formatter.format(dataChart.totalAvailable)} VND</p>
                            <p>{formatter.format(100 - (dataChart.totalOutStock / dataChart.total)*100)}%/ Total Goods</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3">Total Sold this Month</p>
                            <p className="fs-25 mb-2">{formatter.format(dataChart.totalSold)} - {formatter.format(dataChart.totalProfit)} VND ( Profit )</p>
                            <p>{formatter.format((dataChart.totalSold / dataChart.totalSoldInYear) * 100)}% / Year</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3">Total View this Month</p>
                            <p className="fs-25 mb-2">{formatter.format(dataChart.totalView)}</p>
                            <p>{formatter.format((dataChart.totalView / dataChart.totalViewInYear) * 100)}% / Year</p>
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
                                    <h4>Chart Sold in Month</h4>
                                    <ChartSoldOrdersOfMonth dataChart={dataChart}/>
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
                                    <h4>Chart Category</h4>
                                    <ChartCategory optionSelectLaptop={optionSelectLaptop}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Sold Goods on Category in Month</h4>
                                    <ChartRateGoods optionSelectLaptop={optionSelectLaptop}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart View Goods in Month</h4>
                                    <ChartViewGoods dataChart={dataChart}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Salary Staff of Month</h4>
                                    <ChartViewGoods />
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
                                    <h4>Chart total Salary Staff of Month</h4>
                                    <ChartSalaryOfRole />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 Best Selling Products This Month</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Username</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Role</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Sold Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Amount</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd selected">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        1</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 Most Viewed Products This Month</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Username</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Role</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Sold Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Amount</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd selected">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        1</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        Car insurance</td>
                                                    <td>
                                                        Order</td>
                                                    <td>
                                                        2</td>
                                                    <td>
                                                        230,000 VND</td>
                                                    <td>
                                                        Active</td>

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

export default memo(Index)