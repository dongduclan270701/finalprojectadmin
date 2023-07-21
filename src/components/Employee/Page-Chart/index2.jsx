import React, { useState, useEffect } from 'react'
import ChartSoldOrdersOfMonth from 'components/Employee/Page-Chart/ChartSoldOrderOfMonth'
import ChartStaffStatus from 'components/Employee/Page-Chart/ChartStaffStatus'
import ChartRole from 'components/Employee/Page-Chart/ChartRole'
import ChartStaffAge from 'components/Employee/Page-Chart/ChartStaffAge'
import ChartSalaryStaffOfMonth from 'components/Employee/Page-Chart/ChartSalaryStaffOfMonth'
import ChartSalaryOfRole from 'components/Employee/Page-Chart/ChartSalaryOfRole'

const Index = () => {

    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Total staff worked</p>
                            <p className="fs-25 mb-2">4,006</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Total staff working</p>
                            <p className="fs-25 mb-2">61,344</p>
                            <p>22.00% / Total staff worked</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3">Total salary staff in the Month</p>
                            <p className="fs-25 mb-2">47,123,123 VND</p>
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
                                    <h4>Chart Sold - Target Orders</h4>
                                    <ChartSoldOrdersOfMonth />
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
                                    <h4>Chart Staff Status </h4>
                                    <ChartStaffStatus />
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
                                    <h4>Chart Role</h4>
                                    <ChartRole />
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
                                    <h4>Chart Staff Age</h4>
                                    <ChartStaffAge />
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
                                    <h4>Chart Salary Staff of Month</h4>
                                    <ChartSalaryStaffOfMonth />
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
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 employees with the highest value this month</p>
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

export default Index;