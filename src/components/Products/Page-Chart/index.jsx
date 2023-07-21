import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler,
    ArcElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);
const Index = () => {
    const optionsChartOrderTarget = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Line Chart - Sold - Target Order / Month'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left'
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }
    const optionsChartAge = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart - Age Staff',
            },
        },
    }
    const optionsChartSalaryStaff = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Line Chart - Salary Staff / Month'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left'
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }
    const optionsChartCountStaff = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart - Total Count Role'
            }
        }
    }
    const optionsChartStatusStaff = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart - Status Staff'
            }
        }
    }
    const optionsChartTotalSalaryForRole = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart - Total Salary for Role / Month'
            }
        }
    }
    var date = []
    var count = 30;
    for (var day = 1; day <= count; day++) {
        date.push(day + '/7');
    }
    var randomNumber = []
    var randomNumber1 = []
    var randomNumber2 = []
    for (var i = 0; i < 30; i++) {
        var random = Math.floor(Math.random() * 100)
        var random1 = Math.floor(Math.random() * 100)
        var random2 = Math.floor(Math.random() * 100)
        randomNumber.push(random2)
        randomNumber1.push(random1)
        randomNumber2.push(random)
    }
    const dataChartOrderTarget = {
        labels: date,
        datasets: [
            {
                label: 'Orders',
                data: randomNumber1,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'Target',
                data: randomNumber2,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1'
            }
        ]
    }
    const dataChartSalaryStaff = {
        labels: date,
        datasets: [
            {
                fill: true,
                label: 'VND',
                data: randomNumber,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            }
        ]
    }
    const dataChartTotalSalaryForRole = {
        labels: ['CEO', 'SALES', 'PRODUCT', 'ORDER', 'MANAGEMENT'],
        datasets: [
            {
                label: 'VND',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataChartStatusStaff = {
        labels: ['Has retired', 'Working'],
        datasets: [
            {
                label: 'View',
                data: [12, 19],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataChartCountStaff = {
        labels: ['CEO', 'SALES', 'PRODUCT', 'ORDER', 'MANAGEMENT'],
        datasets: [
            {
                label: 'Total',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataChartAge = {
        labels: ['Under 18', '20 - 30', '30-40', '40 - 50', 'Over 50'],
        datasets: [
            {
                label: 'Working',
                data: [1, 2, 3, 4, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Has retired',
                data: [0, 3, 4, 3, 6],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
                label: 'Total',
                data: [1, 5, 7, 7, 11],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }
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
                                    <Line options={optionsChartOrderTarget} data={dataChartOrderTarget} />
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
                                    <Doughnut options={optionsChartStatusStaff} data={dataChartStatusStaff} />
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
                                    <Doughnut options={optionsChartCountStaff} data={dataChartCountStaff} />
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
                                    <Bar options={optionsChartAge} data={dataChartAge} />
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
                                    <Line options={optionsChartSalaryStaff} data={dataChartSalaryStaff} />
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
                                    <Doughnut options={optionsChartTotalSalaryForRole} data={dataChartTotalSalaryForRole} />
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