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
    ArcElement,
    BarElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

const Index = (props) => {
    const { chartData } = props
    const [orders, setOrders] = useState([])
    const countByMonthShip = {
        '01': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '02': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '03': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '04': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '05': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '06': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '07': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '08': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '09': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '10': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '11': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
        '12': { total: 0, deliveryFailed: 0, deliverySuccessful: 0, ordered: 0, paymentInformationConfirmed: 0, deliveredToTheCarrier: 0, beingTransported: 0, cancel: 0, totalDeliveryFailed: 0, totalDeliverySuccessful: 0, totalOrdered: 0, totalPaymentInformationConfirmed: 0, totalDeliveredToTheCarrier: 0, totalBeingTransported: 0, totalCancel: 0 },
    };

    useEffect(() => {
        setOrders(chartData)
    }, [chartData])
    for (const order of orders) {
        const lastShippingProcess = order.shipping_process[order.shipping_process.length - 1];
        const firstShippingProcess = order.shipping_process[0];
        const month = lastShippingProcess.date.split('-')[1];
        // const month2 = firstShippingProcess.date.split('-')[1];

        // if (countByMonthShip.hasOwnProperty(month2)) {

        // }
        if (countByMonthShip.hasOwnProperty(month)) {
            if (firstShippingProcess.content === "Delivery failed") {
                countByMonthShip[month].deliveryFailed++;
                countByMonthShip[month].totalDeliveryFailed += order.sumOrder
            } else if (firstShippingProcess.content === "Delivery successful") {
                countByMonthShip[month].deliverySuccessful++;
                countByMonthShip[month].total++;
                countByMonthShip[month].totalDeliverySuccessful += order.sumOrder
            } else if (firstShippingProcess.content === "Ordered") {
                countByMonthShip[month].ordered++;
                countByMonthShip[month].totalOrdered += order.sumOrder
            } else if (firstShippingProcess.content === "Payment information confirmed") {
                countByMonthShip[month].paymentInformationConfirmed++;
                countByMonthShip[month].totalPaymentInformationConfirmed += order.sumOrder
            } else if (firstShippingProcess.content === "Delivered to the carrier") {
                countByMonthShip[month].deliveredToTheCarrier++;
                countByMonthShip[month].totalDeliveredToTheCarrier += order.sumOrder
            } else if (firstShippingProcess.content === "Being transported") {
                countByMonthShip[month].beingTransported++;
                countByMonthShip[month].totalBeingTransported += order.sumOrder
            } else if (firstShippingProcess.content === "Cancel") {
                countByMonthShip[month].cancel++;
                countByMonthShip[month].totalCancel += order.sumOrder
            }
        }
    }

    const orderedCountsShip = Object.keys(countByMonthShip)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(month => countByMonthShip[month])

    const optionsChartOrder = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Line Chart - Orders / Month'
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
    const optionsChartShip = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Line Chart - Ship / Month'
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
    const optionsChartStatus = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart - Total Count Order Status'
            }
        }
    }
    const optionsChartTotal = {
        // responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart - Total Shipping Status'
            }
        }
    }
    const sumsTotalOrderStatus = orderedCountsShip.reduce((acc, monthData) => {
        acc.ordered += monthData.ordered;
        acc.paymentInformationConfirmed += monthData.paymentInformationConfirmed
        acc.deliveredToTheCarrier += monthData.deliveredToTheCarrier
        acc.beingTransported += monthData.beingTransported
        acc.deliverySuccessful += monthData.deliverySuccessful
        acc.cancel += monthData.cancel
        acc.deliveryFailed += monthData.deliveryFailed
        return acc;
    }, {
        ordered: 0,
        paymentInformationConfirmed: 0,
        deliveredToTheCarrier: 0,
        beingTransported: 0,
        deliverySuccessful: 0,
        cancel: 0,
        deliveryFailed: 0
    });

    const sumsTotalPriceOrderStatus = orderedCountsShip.reduce((acc, monthData) => {
        acc.totalDeliveryFailed += monthData.totalDeliveryFailed
        acc.totalDeliverySuccessful += monthData.totalDeliverySuccessful
        acc.totalOrdered += monthData.totalOrdered
        acc.totalPaymentInformationConfirmed += monthData.totalPaymentInformationConfirmed
        acc.totalDeliveredToTheCarrier += monthData.totalDeliveredToTheCarrier
        acc.totalBeingTransported += monthData.totalBeingTransported
        acc.totalCancel += monthData.totalCancel
        return acc;
    }, {
        totalDeliveryFailed: 0,
        totalDeliverySuccessful: 0,
        totalOrdered: 0,
        totalPaymentInformationConfirmed: 0,
        totalDeliveredToTheCarrier: 0,
        totalBeingTransported: 0,
        totalCancel: 0
    });

    const dataChartStatus = {
        labels: ["Processing", "Successful", "Failed"],
        datasets: [
            {
                label: 'Total',
                data: [1, 2, 3],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(238, 15, 15, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(238, 15, 15, 1)',

                ],
                borderWidth: 1,
            }
        ]
    }
    const dataChartShippingStatus = {
        labels: ["Successful", "Failed"],
        datasets: [
            {
                label: 'Total',
                data: [1, 2],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(238, 15, 15, 0.2)',

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(238, 15, 15, 1)',

                ],
                borderWidth: 1,
            }
        ]
    }
    let date = []
    let count = 30;
    for (let day = 1; day <= count; day++) {
        date.push(day + '/7');
    }
    let randomNumber = []
    let randomNumber1 = []
    let randomNumber2 = []
    for (let i = 0; i < 30; i++) {
        let random = Math.floor(Math.random() * 100)
        let random1 = Math.floor(Math.random() * 100)
        let random2 = Math.floor(Math.random() * 100)
        randomNumber.push(random2)
        randomNumber1.push(random1)
        randomNumber2.push(random)
    }

    const dataChartOrder = {
        labels: date,
        datasets: [
            {
                label: 'Orders Successful',
                data: randomNumber,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'Processing',
                data: randomNumber1,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

    const dataChartShip = {
        labels: date,
        datasets: [
            {
                label: 'Successful',
                data: randomNumber,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'Failed',
                data: randomNumber2,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1'
            }
        ]
    }

    return (
        <div>
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
                    <div className="card card-light-blue">
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
                    <div className="card card-light-danger">
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
                                    <Bar options={optionsChartOrder} data={dataChartOrder} />
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
                                    <Doughnut options={optionsChartStatus} data={dataChartStatus} />
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
                                    <Doughnut options={optionsChartTotal} data={dataChartShippingStatus} />
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
                                    <Bar options={optionsChartShip} data={dataChartShip} />
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
                                    <table id="example" className="display expandable-table" style={{ width: '100%', textAlign:"center" }}>
                                        <thead>
                                            <tr role="row">
                                                <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{"width": "128px"}} aria-label="Quote#">
                                                    ID</th>
                                                <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{"width": "146px"}} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                    Username</th>
                                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{"width": "174px"}} aria-label="Business type: activate to sort column ascending">
                                                    Date Order</th>
                                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{"width": "166px"}} aria-label="Policy holder: activate to sort column ascending">
                                                    Total</th>
                                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{"width": "122px"}} aria-label="Premium: activate to sort column ascending">
                                                    Status</th>
                                                <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{"width": "49px"}} aria-label="">
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