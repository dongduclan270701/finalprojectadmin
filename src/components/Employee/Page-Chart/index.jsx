import React, { useState, useEffect } from 'react'
import ChartSoldOrdersOfMonth from 'components/Employee/Page-Chart/ChartSoldOrderOfMonth'
import ChartStaffStatus from 'components/Employee/Page-Chart/ChartStaffStatus'
import ChartRole from 'components/Employee/Page-Chart/ChartRole'
import ChartStaffAge from 'components/Employee/Page-Chart/ChartStaffAge'
import ChartSalaryStaffOfMonth from 'components/Employee/Page-Chart/ChartSalaryStaffOfMonth'
import ChartSalaryOfRole from 'components/Employee/Page-Chart/ChartSalaryOfRole'

const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const [totalStaff, setTotalStaff] = useState(null)
    const [totalStaffWorking, setTotalStaffWorking] = useState(null)
    const [totalStaffSalary, setTotalStaffSalary] = useState(null)
    const [totalKPIRate, setKPIRate] = useState(null)
    const [totalTotalOrder, setTotalOrder] = useState(null)
    const [totalTotalSold, setTotalSold] = useState(null)
    const [totalTotalOrderChart, setTotalOrderChart] = useState(null)
    const [totalStatusStaff, setTotalStatusStaff] = useState(null)
    const [totalRole, setTotalRole] = useState(null)
    const [totalAgeStaff, setTotalAgeStaff] = useState(null)
    const [topStaff, setTopStaff] = useState(null)

    const fetchTotalStaff = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
    }
    const fetchTotalStaffWorking = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
    }
    const fetchTotalStaffSalary = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
    }
    const fetchTotalKPIRate = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
    }
    const fetchTotalOrder = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
    }
    const fetchTotalSold = () => {
        // fetchTotalGoodsLaptopCollecting()
        //     .then(result => {
        //         console.log(1)
        //         setTotalStaff(result.total)
        //     })
        //     .catch(error => {
        //         setTotalStaff(0)
        //         console.log(error)
        //     })
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

    const currentMonthName = getCurrentMonthName();
    useEffect(() => {

    }, []);
    const handleResetData = (event, name) => {
        switch (name) {
            case "totalStaff":
                setTotalStaff(null)
                fetchTotalStaff()
                break;
            case "totalStaffWorking":
                setTotalStaffWorking(null)
                fetchTotalStaffWorking()
                break;
            case "totalStaffSalary":
                setTotalStaffSalary(null)
                fetchTotalStaffSalary()
                break;
            case "totalKPIRate":
                setKPIRate(null)
                fetchTotalKPIRate()
                break;
            case "totalTotalOrder":
                setTotalOrder(null)
                fetchTotalOrder()
                break;
            case "totalTotalSold":
                setTotalSold(null)
                fetchTotalSold()
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total staff worked <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalStaff")} /></p>
                            {totalStaff === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalStaff)}</p>
                                    <p></p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total staff working <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalStaffWorking")} /></p>
                            {totalStaffWorking === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalStaffWorking)}</p>
                                    <p></p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-danger">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total staff salary in the month <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalStaffSalary")} /></p>
                            {totalStaffSalary === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalStaffSalary)}</p>
                                    <p>0.22% (12 Months in 2023)</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>KPI rate <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalKPIRate")} /></p>
                            {totalKPIRate === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalKPIRate)}%</p>
                                    <p></p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total order quantity <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalTotalOrder")} /></p>
                            {totalTotalOrder === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalTotalOrder)}</p>
                                    <p>22.00% / Total staff worked</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total number of goods sold <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalTotalSold")} /></p>
                            {totalTotalSold === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalTotalSold)} VND</p>
                                    <p>0.22% (12 Months in 2023)</p>
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
                                    <h4>Chart Sold - Target Orders ( {currentMonthName} )</h4>
                                    {/* <ChartSoldOrdersOfMonth /> */}
                                    {totalTotalOrderChart ? <ChartSoldOrdersOfMonth totalTotalOrderChart={totalTotalOrderChart} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
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
                                    {/* <ChartStaffStatus /> */}
                                    {totalStatusStaff ? <ChartStaffStatus totalStatusStaff={totalStatusStaff} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
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
                                    {/* <ChartRole /> */}
                                    {totalRole ? <ChartRole totalRole={totalRole} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
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
                                    {/* <ChartStaffAge /> */}
                                    {totalAgeStaff ? <ChartStaffAge totalAgeStaff={totalAgeStaff} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
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
                </div> */}
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
                                                
                                                {topStaff ? topStaff.map(item => {
                                                    return <tr className="odd selected">
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
                                                }) : <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                                        <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>
                                                    </td>
                                                </tr>
                                                }
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