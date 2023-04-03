import React, { useState } from 'react';

import TotalParammeters from 'components/Dashboard/Total-parameters'
import ChartsDetails from 'components/Dashboard/Charts-detail'
import RateProduct from 'components/Dashboard/Rate-product'
import ListOrder from 'components/Dashboard/List-order'

const Index = () => {
    const [chooseDate, setChooseDate] = useState(false)
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Chào mừng đến với website admin của Gearvn</h3>
                                <h6 className="font-weight-normal mb-0">Tất cả hệ thống đều chạy rất mượt mà! Bạn có <span className="text-primary">3 thông báo chưa đọc!</span></h6>
                            </div>
                            <div className="col-12 col-xl-4" >
                                <div className="justify-content-end d-flex">
                                    <div className={chooseDate ? "dropdown flex-md-grow-1 flex-xl-grow-0 show" : "dropdown flex-md-grow-1 flex-xl-grow-0"}>
                                        <button onClick={() => setChooseDate(!chooseDate)} className="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded={chooseDate}>
                                            <i className="mdi mdi-calendar" /> Today (10 Jan 2021)
                                        </button>
                                        <div className={chooseDate ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right"} aria-labelledby="dropdownMenuDate2">
                                            <a className="dropdown-item" href="#">January - March</a>
                                            <a className="dropdown-item" href="#">March - June</a>
                                            <a className="dropdown-item" href="#">June - August</a>
                                            <a className="dropdown-item" href="#">August - November</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TotalParammeters />
                <ChartsDetails />
                <RateProduct />
                {/* <div className="row">
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-title mb-0">Projects</p>
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
                                                        <td className="pl-0">Kentucky</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">65</span>(2.15%)</p></td>
                                                        <td className="text-muted">65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0">Ohio</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">54</span>(3.25%)</p></td>
                                                        <td className="text-muted">51</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0">Nevada</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">22</span>(2.22%)</p></td>
                                                        <td className="text-muted">32</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0">North Carolina</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">46</span>(3.27%)</p></td>
                                                        <td className="text-muted">15</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0">Montana</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">17</span>(1.25%)</p></td>
                                                        <td className="text-muted">25</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0">Nevada</td>
                                                        <td><p className="mb-0"><span className="font-weight-bold mr-2">52</span>(3.11%)</p></td>
                                                        <td className="text-muted">71</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pl-0 pb-0">Louisiana</td>
                                                        <td className="pb-0"><p className="mb-0"><span className="font-weight-bold mr-2">25</span>(1.32%)</p></td>
                                                        <td className="pb-0">14</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="row">
                                    <div className="col-md-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-title">Charts</p>
                                                <div className="charts-data">
                                                    <div className="mt-3">
                                                        <p className="mb-0">Data 1</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                                <div className="progress-bar bg-inf0" role="progressbar" style={{ width: '95%' }} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                            <p className="mb-0">5k</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="mb-0">Data 2</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: '35%' }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                            <p className="mb-0">1k</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="mb-0">Data 3</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: '48%' }} aria-valuenow={48} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                            <p className="mb-0">992</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="mb-0">Data 4</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                            <p className="mb-0">687</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 stretch-card grid-margin grid-margin-md-0">
                                        <div className="card data-icon-card-primary">
                                            <div className="card-body">
                                                <p className="card-title text-white">Number of Meetings</p>
                                                <div className="row">
                                                    <div className="col-8 text-white">
                                                        <h3>34040</h3>
                                                        <p className="text-white font-weight-500 mb-0">The total number of sessions within the date range.It is calculated as the sum . </p>
                                                    </div>
                                                    <div className="col-4 background-icon">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-title">Notifications</p>
                                        <ul className="icon-data-list">
                                            <li>
                                                <div className="d-flex">
                                                    <img src="images/faces/face1.jpg" alt="user" />
                                                    <div>
                                                        <p className="text-info mb-1">Isabella Becker</p>
                                                        <p className="mb-0">Sales dashboard have been created</p>
                                                        <small>9:30 am</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <img src="images/faces/face2.jpg" alt="user" />
                                                    <div>
                                                        <p className="text-info mb-1">Adam Warren</p>
                                                        <p className="mb-0">You have done a great job #TW111</p>
                                                        <small>10:30 am</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <img src="images/faces/face3.jpg" alt="user" />
                                                    <div>
                                                        <p className="text-info mb-1">Leonard Thornton</p>
                                                        <p className="mb-0">Sales dashboard have been created</p>
                                                        <small>11:30 am</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <img src="images/faces/face4.jpg" alt="user" />
                                                    <div>
                                                        <p className="text-info mb-1">George Morrison</p>
                                                        <p className="mb-0">Sales dashboard have been created</p>
                                                        <small>8:50 am</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <img src="images/faces/face5.jpg" alt="user" />
                                                    <div>
                                                        <p className="text-info mb-1">Ryan Cortez</p>
                                                        <p className="mb-0">Herbs are fun and easy to grow.</p>
                                                        <small>9:00 am</small>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                <ListOrder />
            </div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span>
                </div>
            </footer>
        </div>

    );
}

export default Index;
