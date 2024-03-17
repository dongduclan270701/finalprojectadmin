import React, { useState, useEffect, memo } from 'react'
import ChartSoldProductOfMonth from 'components/Employee/Page-Chart/ChartSoldProductOfMonth'
import ChartOrderOfMonth from 'components/Employee/Page-Chart/ChartOrderOfMonth'
import ChartStaffStatus from 'components/Employee/Page-Chart/ChartStaffStatus'
import ChartRole from 'components/Employee/Page-Chart/ChartRole'
import ChartStaffAge from 'components/Employee/Page-Chart/ChartStaffAge'
import _ from 'lodash'
import {
    fetchTotalEmployee,
    fetchTotalEmployeeWorking,
    fetchTotalAgeEmployee,
    fetchTotalRole,
    fetchTotalSoldInMonth,
    fetchTotalChartSoldInMonth,
    fetchTopEmployeeHighestValue,
    fetchTotalOrderInMonth,
    fetchTotalChartOrderInMonth,
    fetchTopEmployeeHighestOrder
} from 'Apis'
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const [totalStaff, setTotalStaff] = useState(null)
    const [totalStaffWorking, setTotalStaffWorking] = useState(null)
    const [totalStaffSalary, setTotalStaffSalary] = useState(null)
    const [totalKPI, setKPI] = useState({ target: 0 })
    const [totalOrder, setTotalOrder] = useState({ totalOrderInMonth: 0 })
    const [totalSoldInMonth, setTotalSoldInMonth] = useState(null)
    const [totalSoldInYear, setTotalSoldInYear] = useState(null)
    const [totalProductChart, setTotalProductChart] = useState(null)
    const [totalOrderChart, setTotalOrderChart] = useState(null)
    const [totalStatusStaff, setTotalStatusStaff] = useState(null)
    const [totalRole, setTotalRole] = useState(null)
    const [totalAgeStaff, setTotalAgeStaff] = useState(null)
    const [topStaff, setTopStaff] = useState(null)
    const [topStaffOrder, setTopStaffOrder] = useState(null)
    const [changeChart, setChangeChart] = useState(true)
    const fetchTotalStaff = () => {
        fetchTotalEmployee()
            .then(result => {
                setTotalStaff(result.total)
            })
            .catch(error => {
                setTotalStaff(0)
                console.log(error)
            })
    }
    const fetchTotalStaffWorking = () => {
        fetchTotalEmployeeWorking()
            .then(result => {
                setTotalStaffWorking(result.total)
            })
            .catch(error => {
                setTotalStaffWorking(0)
                console.log(error)
            })
    }
    const fetchTotalOrder = () => {
        fetchTotalOrderInMonth()
            .then(result => {
                let total = {
                    totalOrderInMonth: _.sumBy(result.resultTotal, 'totalOrderInMonth'),
                    totalOrderInYear: _.sumBy(result.resultTotal, 'totalOrderInYear')
                }
                setTotalOrder(total)
            })
            .catch(error => {
                setTotalOrder(0)
                console.log(error)
            })
    }
    const fetchTotalSold = () => {
        fetchTotalSoldInMonth()
            .then(result => {
                let total = {
                    soldProductMonth: _.sumBy(result.resultTotal, 'totalSoldProductInMonth'),
                    soldProductYear: _.sumBy(result.resultTotal, 'totalSoldProductInYear')
                }
                setTotalSoldInMonth(total.soldProductMonth)
                setTotalSoldInYear(total.soldProductYear)
            })
            .catch(error => {
                setTotalStaff(0)
                console.log(error)
            })
    }
    const fetchTotalAgeStaff = () => {
        fetchTotalAgeEmployee()
            .then(result => {
                setTotalStatusStaff(result.totalAgeEmployee)
                setTotalAgeStaff(result.totalAgeEmployee)
            })
            .catch(error => {
                setTotalAgeStaff(0)
                console.log(error)
            })
    }
    const fetchAPITotalRole = () => {
        fetchTotalRole()
            .then(result => {
                setTotalRole(result)
            })
            .catch(error => {
                setTotalAgeStaff(0)
                console.log(error)
            })
    }
    const fetchTotalChartSold = () => {
        fetchTotalChartSoldInMonth()
            .then(result => {
                let total = {
                    target: _.sumBy(result.resultTotal, 'target'),
                    salary: _.sumBy(result.resultTotal, 'salary')
                }
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
                setKPI(total)
                let totalAmountPercent = {
                    profit: _.sumBy(Object.values(combinedData), 'totalAmount')
                }
                setTotalStaffSalary(totalAmountPercent.profit * 0.02 + total.salary)
                setTotalProductChart(Object.values(combinedData))
            })
            .catch(error => {
                setTotalProductChart([])
                console.log(error)
            })
    }
    const fetchTotalOrderSold = () => {
        fetchTotalChartOrderInMonth()
            .then(result => {
                const combinedData = result.resultTotal.reduce((accumulator, currentValue) => {
                    currentValue.soldOrderInMonth.forEach(item => {
                        const { day, month, order, amount } = item;
                        const key = `${day}`
                        if (!accumulator[key]) {
                            accumulator[key] = {
                                day,
                                month,
                                totalOrder: 0,
                                totalAmount: 0
                            };
                        }
                        accumulator[key].totalOrder += order
                        accumulator[key].totalAmount += amount
                    })
                    return accumulator
                }, {})
                setTotalOrderChart(Object.values(combinedData))
            })
            .catch(error => {
                setTotalOrderChart([])
                console.log(error)
            })
    }
    const fetchTopEmployee = () => {
        fetchTopEmployeeHighestValue()
            .then(result => {
                setTopStaff(result.topEmployeeHighestValue)
            })
            .catch(error => {
                setTopStaff([]);
                console.log(error)
            })
    }
    const fetchTopEmployeeOrder = () => {
        fetchTopEmployeeHighestOrder()
            .then(result => {
                setTopStaffOrder(result.topEmployeeHighestOrder)
            })
            .catch(error => {
                setTopStaffOrder([]);
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
        fetchTotalStaff()
        fetchTotalStaffWorking()
        fetchTotalAgeStaff()
        fetchAPITotalRole()
        fetchTotalSold()
        fetchTotalChartSold()
        fetchTopEmployee()
        fetchTotalOrder()
        fetchTotalOrderSold()
        fetchTopEmployeeOrder()
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
            case "totalOrder":
                setTotalOrder(null)
                fetchTotalOrder()
                break;
            case "totalSoldInMonth":
                setTotalSoldInMonth(null)
                fetchTotalSold()
                break;
            default:
                break;
        }
    }
    const handleChangeChart = () => {
        setChangeChart(!changeChart)
    }
    return (
        <div>
            <div className="row"><div className="col-md-4 mb-3 stretch-card">
                <div className="card card-pie">
                    <div className="pie-st">

                    </div>
                    <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                        <div className='text-pie-content' >{formatter.format(totalStaff)} Staff</div>
                        <div className='text-pie-title play-bold' >Total Staff</div>
                    </div>
                </div>
            </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalStaffWorking / totalStaff * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalStaffWorking / totalStaff * 100)))} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalStaffWorking)} Staff / Total Staff</div>
                            <div className='text-pie-title play-bold' >Staff working</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(totalStaffSalary)} VNĐ</div>
                            <div className='text-pie-title play-bold' >Salary</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + totalKPI !== null ? Math.floor(parseFloat(formatter.format(totalSoldInMonth / totalKPI.target * 100))) : 0} blue pie-st-1`}>
                                <span>{totalKPI !== null ? Math.floor(parseFloat(formatter.format(totalSoldInMonth / totalKPI.target * 100))) : 0} % </span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-title play-bold' >&nbsp;</div>
                            <div className='text-pie-title play-bold' >KPI rate</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + totalOrder !== null ? Math.floor(parseFloat(formatter.format(totalOrder.totalOrderInMonth / totalOrder.totalOrderInYear * 100))) : 0} blue pie-st-1`}>
                                <span>{totalOrder !== null ? Math.floor(parseFloat(formatter.format(totalOrder.totalOrderInMonth / totalOrder.totalOrderInYear * 100))) : 0} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalOrder.totalOrderInMonth)} Order / Total staff worked</div>
                            <div className='text-pie-title play-bold' >Sold ( Order )</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalSoldInMonth / totalSoldInYear * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalSoldInMonth / totalSoldInYear * 100)))} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalSoldInMonth)} Goods</div>
                            <div className='text-pie-title play-bold' >Sold ( Goods )</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    {changeChart ?
                                        <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                            <h4 className='play-bold'>Chart Order In Month ( {currentMonthName} )
                                                <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>Goods</p>
                                            </h4>
                                            {totalOrderChart ? <ChartOrderOfMonth totalOrderChart={totalOrderChart} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                        </div>
                                        :
                                        <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                            <h4 className='play-bold'>Chart Sold - Target Product In Month ( {currentMonthName} )
                                                <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>Order</p>
                                            </h4>
                                            {totalProductChart ? <ChartSoldProductOfMonth totalProductChart={totalProductChart} totalKPI={totalKPI} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Staff Status </h4>
                                    {totalStatusStaff ? <ChartStaffStatus totalStatusStaff={totalStatusStaff} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Role</h4>
                                    {/* <ChartRole /> */}
                                    {totalRole ? <ChartRole totalRole={totalRole} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Staff Age</h4>
                                    {/* <ChartStaffAge /> */}
                                    {totalAgeStaff ? <ChartStaffAge totalAgeStaff={totalAgeStaff} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <p className="card-title play-bold">Top 10 employees with the highest order this month</p>
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
                                                        Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Amount</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topStaffOrder ? topStaffOrder.map(item => {
                                                    return <tr className="odd selected">
                                                        <td className="sorting_1">
                                                            {item.username}</td>
                                                        <td>
                                                            {item.role}</td>
                                                        <td>
                                                            {item.totalOrder}</td>
                                                        <td>
                                                            {formatter.format(item.totalAmount)} VND</td>
                                                        <td>
                                                            <label className={
                                                                item.status === false ? "badge badge-danger" : "badge badge-success"
                                                            }>
                                                                {item.status === false ? "Deactivate" : "Active"}
                                                            </label></td>
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
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <p className="card-title play-bold">Top 10 employees with the highest product this month</p>
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
                                                        Product</th>
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
                                                            {item.username}</td>
                                                        <td>
                                                            {item.role}</td>
                                                        <td>
                                                            {item.totalProduct}</td>
                                                        <td>
                                                            {formatter.format(item.totalAmount)} VND</td>
                                                        <td>
                                                            <label className={
                                                                item.status === false ? "badge badge-danger" : "badge badge-success"
                                                            }>
                                                                {item.status === false ? "Deactivate" : "Active"}
                                                            </label></td>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);