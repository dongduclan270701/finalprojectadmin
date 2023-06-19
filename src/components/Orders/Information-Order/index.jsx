import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'assets/scss/Information-Order.css'
import Swal from 'sweetalert2'
import { fetchOrderInformation, fetchUpdateOrder } from 'Apis'
import ShowRating from 'components/Orders/ShowRating'
import ShowReason from 'components/Orders/ModalDeliveryReason'
import Footer from "components/Footer"
import Process from 'assets/images/box.png'
import Delivery from 'assets/images/delivery.png'
import Correct from 'assets/images/correct.png'
import Cancel from 'assets/images/cancel.png'
import NoAuth from 'components/Error/No-Auth'
import { StateContext } from 'components/Context'
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const params = useParams()
    const navigate = useNavigate();
    const state = useContext(StateContext)
    const [order, setOrder] = useState()
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([])
    const [steps, setSteps] = useState([]);
    const [toggleShowRate, setToggleShowRate] = useState(false);
    const handleToggleShowRate = () => setToggleShowRate(!toggleShowRate);
    const [toggleReason, setToggleReason] = useState(false);
    const handleToggleReason = () => setToggleReason(!toggleReason);
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const time = `${hours}:${minutes}`;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;

    useEffect(() => {
        setSteps([
            "Ordered",
            "Payment information confirmed",
            "Delivered to the carrier",
            "Being transported",
            "Delivery successful",
        ])
            fetchOrderInformation(params.id)
                .then(result => {
                    setOrder(result)
                    if (result.status === "Cancel") {
                        setSteps([
                            "Ordered",
                            "Cancel"
                        ])
                        setCurrentStep(1)
                    } else if (result.status === "Delivery failed") {
                        setSteps([
                            "Ordered",
                            "Payment information confirmed",
                            "Delivered to the carrier",
                            "Being transported",
                            "Delivery failed"
                        ])
                        setCurrentStep(4)
                    }
                    else if (result.status === 'Ordered') {
                        setCurrentStep(0)
                        setOptions([
                            {
                                label: 'Payment information confirmed',
                                value: 'Payment information confirmed',
                            },
                            {
                                label: 'Delivered to the carrier',
                                value: 'Delivered to the carrier',
                            },
                            {
                                label: 'Being transported',
                                value: 'Being transported',
                            },
                            {
                                label: 'Delivery successful',
                                value: 'Delivery successful',
                            }
                        ])
                    }
                    else if (result.status === 'Payment information confirmed') {
                        setCurrentStep(1)
                        setOptions([
                            {
                                label: 'Delivered to the carrier',
                                value: 'Delivered to the carrier',
                            },
                            {
                                label: 'Being transported',
                                value: 'Being transported',
                            },
                            {
                                label: 'Delivery successful',
                                value: 'Delivery successful',
                            }
                        ])
                    }
                    else if (result.status === 'Delivered to the carrier') {
                        setCurrentStep(2)
                        setOptions([
                            {
                                label: 'Being transported',
                                value: 'Being transported',
                            },
                            {
                                label: 'Delivery successful',
                                value: 'Delivery successful',
                            }
                        ])
                    }
                    else if (result.status === 'Being transported') {
                        setCurrentStep(3)
                        setOptions([
                            {
                                label: 'Delivery successful',
                                value: 'Delivery successful',
                            }
                        ])
                    }
                    else if (result.status === 'Delivery successful') {
                        setCurrentStep(4)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
    }, [params]);


    const sumPriceListProduct = () => {
        let sumPriceListProduct = 0
        order && order.product.map((item) => {
            sumPriceListProduct += item.nowPrice * item.quantity
        })
        return sumPriceListProduct
    }
    const sumDiscountListProduct = () => {
        let sumDiscountListProduct = 0
        order && order.discountCode.map((item) => {
            sumDiscountListProduct += item.amount
        })
        return sumDiscountListProduct
    }

    const handleSelectedOptionsChange = (selectedCategory) => {
        let newOrder
        Swal.fire({
            title: 'Do you agree to make corrections??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Updating...',
                    html: 'Please wait...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });
                if (selectedCategory.value === 'Payment information confirmed') {
                    setCurrentStep(1)
                    newOrder = {
                        ...order,
                        status: selectedCategory.value,
                        shipping_process: [
                            { time: time, date: today, content: selectedCategory.value },
                            ...order.shipping_process
                        ]
                    }
                    setOptions([
                        {
                            label: 'Delivered to the carrier',
                            value: 'Delivered to the carrier',
                        },
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (selectedCategory.value === 'Delivered to the carrier') {
                    setCurrentStep(2)

                    if (order.shipping_process.length === 1) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Payment information confirmed' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 2) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                ...order.shipping_process
                            ]
                        }
                    }
                    setOptions([
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (selectedCategory.value === 'Being transported') {
                    setCurrentStep(3)
                    if (order.shipping_process.length === 1) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Delivered to the carrier' },
                                { time: time, date: today, content: 'Payment information confirmed' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 2) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Delivered to the carrier' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 3) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                ...order.shipping_process
                            ]
                        }
                    }
                    setOptions([
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (selectedCategory.value === 'Delivery successful') {
                    setCurrentStep(4)
                    if (order.shipping_process.length === 1) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Being transported' },
                                { time: time, date: today, content: 'Delivered to the carrier' },
                                { time: time, date: today, content: 'Payment information confirmed' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 2) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Delivered to the carrier' },
                                { time: time, date: today, content: 'Payment information confirmed' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 3) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                { time: time, date: today, content: 'Delivered to the carrier' },
                                ...order.shipping_process
                            ]
                        }
                    }
                    else if (order.shipping_process.length === 4) {
                        newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                { time: time, date: today, content: selectedCategory.value },
                                ...order.shipping_process
                            ]
                        }
                    }
                }
                fetchUpdateOrder(params.id, newOrder)
                    .then(result => {
                        setOrder(result)
                        Swal.fire({
                            title: 'Successfully!',
                            text: 'You have successfully edited your order status',
                            icon: 'success',
                            confirmButtonText: 'OK!'
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            title: `Error ${error.response.status}`,
                            text: 'There seems to be a problem with the connection to the server, please try again later',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    })
            }
        })
    }

    const handleCancelDelivery = (data) => {
        setOrder(data)
        setSteps([
            "Ordered",
            "Payment information confirmed",
            "Delivered to the carrier",
            "Being transported",
            "Delivery failed"
        ])
        setCurrentStep(4)
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                    <div className="col-lg-12 grid-margin">
                        <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                            <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                            <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Information Order</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            {order ? <div className="card" style={{ "marginBottom": "25px" }}>

                                <div className="card-body">
                                    <div className="row progress-bar-process">
                                        {steps.map((step, index) => (
                                            <div key={index} className={`col-2 step ${currentStep === index ? "active" : ""}`}>
                                                <div className="circle">{index + 1}</div>
                                                <div className="label">{step}</div>
                                                {index <= steps.length - 1 && <div className="line"></div>}
                                            </div>
                                        ))
                                        }
                                    </div>
                                    <h4 className="card-title">Order ID: {order.orderId.toUpperCase()}</h4>
                                    <div className='row'>
                                        <div className="col-lg-6 grid-margin form-group">
                                            <h4>Delivery address</h4>
                                            <p>Purchaser: {order.username}</p>
                                            <p>{order.email}</p>
                                            <p>(+84) {order.phoneNumber}</p>
                                            <p>{order.address}</p>
                                        </div>
                                        <div className="col-lg-6 grid-margin form-group">
                                            {order.shipping_process.map((item, index) => {
                                                return <div className='row' style={{ margin: "auto" }} key={index}>
                                                    <img alt="" src={
                                                        item.content === "Ordered" ? Process :
                                                            item.content === "Payment information confirmed" ? Process :
                                                                item.content === "Being transported" ? Delivery :
                                                                    item.content === "Delivered to the carrier" ? Delivery : item.content === 'Delivery failed' ? Cancel : Correct} style={{ width: "20px", height: "20px", padding: "0" }} />
                                                    <p style={{ paddingLeft: "15px" }}>{item.time} - {item.date} - {item.content}</p>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h4>Update order status</h4>
                                        {order.status === "Delivery successful" || order.status === 'Delivery failed' ?
                                            <Select value={{ label: order.status, value: order.status }} options={options} isMutil components={makeAnimated()} isDisabled={true} />
                                            :
                                            <Select onChange={handleSelectedOptionsChange} value={{ label: order.status, value: order.status }} options={options} isMutil components={makeAnimated()} placeholder="Select order status" />}
                                    </div>
                                    {order.statusReview.status === true && <div className="row form-group" style={{ margin: "0 auto", display: "flex", alignItems: "center" }}>
                                        <button onClick={handleToggleShowRate} style={{ margin: "0 auto" }} type="button" className="col-lg-2 btn btn-outline-secondary ">Show reviews</button>
                                    </div>}
                                    {order.status === 'Being transported' && <div className="form-group" style={{ margin: "0 auto", display: "flex", alignItems: "center" }}>
                                        <button onClick={handleToggleReason} style={{ margin: "0 auto" }} type="button" className="col-lg-2 btn btn-outline-secondary ">Delivery failed</button>
                                    </div>
                                    }
                                    {order.status === "Cancel" || order.status === 'Delivery failed' ?
                                        <div className="form-group">
                                            <h4>Reason for order cancellation</h4>
                                            <input className="form-control form-control-sm" value={order.reasonCancel} disabled />

                                        </div>
                                        : null}
                                    <div className="form-group">
                                        <h4>List of Goods</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Product
                                                        </th>
                                                        <th>
                                                            Image
                                                        </th>
                                                        <th>
                                                            Quantity
                                                        </th>
                                                        <th>
                                                            Price
                                                        </th>
                                                        <th>
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.product.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>
                                                                {item.nameProduct}
                                                            </td>
                                                            <td>
                                                                <img src={item.img[0]} className="img-fluid" alt="" style={{ width: "60px", height: "60px" }} />
                                                            </td>
                                                            <td>
                                                                {item.quantity}
                                                            </td>
                                                            <td>
                                                                {formatter.format(item.nowPrice)} VND
                                                            </td>
                                                            <td>
                                                                {formatter.format(item.nowPrice * item.quantity)} VND
                                                            </td>
                                                        </tr>
                                                    })}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Total</td>
                                                        <td>{formatter.format(sumPriceListProduct())} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Fee</td>
                                                        <td>{formatter.format(order.ship)} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Discount</td>
                                                        <td>- {formatter.format(sumDiscountListProduct())} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Pay</td>
                                                        <td style={{ fontSize: "20px", color: "red" }}>{formatter.format(order.sumOrder + order.ship - sumDiscountListProduct())} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Payment methods</td>
                                                        <td>Payment on delivery</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                                <>
                                    <style dangerouslySetInnerHTML={{
                                        __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                                    }} />
                                    <div className="loader" />
                                </>
                            }
                        </div>
                    </div>
            </div>
            <Footer />
            {order && order.statusReview.status === true && <ShowRating toggleShowRate={toggleShowRate} onHandleToggleShowRate={handleToggleShowRate} order={order} />}
            <ShowReason toggleReason={toggleReason} onHandleToggleReason={handleToggleReason} order={order} onHandleCancelDelivery={handleCancelDelivery} />
        </div>
    );
}

export default Index;
