import React, { useState, useEffect } from 'react'
import ChartStatusUsers from 'components/Users/Page-Chart/ChartStatusUsers'
import ChartUsersAge from 'components/Users/Page-Chart/ChartUsersAge'
import ChartUsersRegisterOfMonth from 'components/Users/Page-Chart/ChartUsersRegisterOfMonth'

const Index = () => {

    return (
        <div>
            <div className="row">
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Total users</p>
                            <p className="fs-25 mb-2">4,006</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3">Total users active (1 Month)</p>
                            <p className="fs-25 mb-2">61,344</p>
                            <p>22.00% / </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3">Total users stopped working (1 Month)</p>
                            <p className="fs-25 mb-2">61,344</p>
                            <p>22.00% / </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3">Total users have purchased</p>
                            <p className="fs-25 mb-2">47,123</p>
                            <p>0.22% / </p>
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
                                    <h4>Chart Number of Subscribers / Month</h4>
                                    <ChartUsersRegisterOfMonth />
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
                                    <h4>Chart User Age </h4>
                                    <ChartUsersAge />
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
                                    <h4>Chart Status User</h4>
                                    <ChartStatusUsers />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 " style={{ textAlign: "center" }}>
                                    <h4>Top 10 users with the highest Orders this month</h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Index;