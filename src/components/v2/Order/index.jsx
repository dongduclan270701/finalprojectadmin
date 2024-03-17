import React, { useState, useEffect, useContext } from 'react';
import 'assets/scss/v2/order.scss'
import Footer from "components/v2/Footer"
import { NavLink } from 'react-router-dom';
import {
    fetchListOfOrder,
    fetchSearchOrder,
    fetchOrderInformation,
    fetchUpdateOrder,
    fetchCreateNotice,
    fetchUpdateRatingOrder,
    fetchListOfAppleCollectingByName,
    fetchListOfLaptopCollectingByName,
    fetchListOfLaptopGamingCollectingByName,
    fetchListOfPcGamingCollectingByName,
    fetchListOfPcCompanyCollectingByName,
    fetchListOfPcCreatorCollectingByName,
} from 'Apis'
import { StateContext } from 'components/Context'
import NoAuth from 'components/Error/No-Auth'
import Chart from 'components/v2/Order/Chart'
import Swal from 'sweetalert2'
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Order from 'components/v2/Order/Order'
import Loading from 'components/v2/Loading'
const Index = () => {
    const [isShowOrder, setIsShowOrder] = useState(false)
    const formatter = new Intl.NumberFormat('en-US')
    const state = useContext(StateContext)
    const optionSelect = ["Being transported", "Payment information confirmed", "Delivered to the carrier", "Ordered", "Delivery successful", "Cancel", "Delivery failed"]
    const [orderList, setOrderList] = useState()
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const date = new Date();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = year + '-' + month + "-" + day;
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [searchOrder, setSearchOrder] = useState({ orderId: "", status: "", firstDate: "", endDate: today, sortDate: 'asc' })
    const [error, setError] = useState(null)
    const [order, setOrder] = useState()
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([])
    const [steps, setSteps] = useState([]);
    const [toggleShowRate, setToggleShowRate] = useState(false);
    const handleToggleShowRate = () => setToggleShowRate(!toggleShowRate);
    const [toggleReason, setToggleReason] = useState(false);
    const handleToggleReason = () => {
        setToggleReason(true)
        setIsInfoOrder(false)
    }
    const [isReview, setIsReview] = useState(false);
    const [isInfoOrder, setIsInfoOrder] = useState(false)
    const [isInfoProduct, setIsInfoProduct] = useState(false)
    const [product, setProduct] = useState(null)
    useEffect(() => {
        fetchListOfOrder(1)
            .then(result => {
                state.setAuthentication(result.role)
                setOrderList(result.data)
                setLoading(false)
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1)
                } else if (result.total === 0) {
                    setCountMaxPage(1)
                }
                else {
                    setCountMaxPage(Math.floor(result.total / 10))
                }
            })
            .catch(error => {
                if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                    state.setAuthentication(state.authentication ? state.authentication : null)
                }
                console.log(error)
                setError(error.response.status)
                setLoading(false)
            })
    }, [state]);
    const handleSetPage = (count) => {
        setOrderList()
        setCountPage(count)
        fetchSearchOrder(searchOrder, count)
            .then(result => {
                setOrderList(result.data)
            })
            .catch(error => {
                Swal.fire({
                    title: "Ops!",
                    text: "Error connect to server!",
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
                console.log(error)
            })
    }

    const handleSearchOrder = (e) => {
        const { name, value } = e.target
        setCountPage(1)
        setOrderList()
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearchOrder({ ...searchOrder, [name]: value })
                fetchSearchOrder({ ...searchOrder, [name]: value }, 1)
                    .then((result) => {
                        setOrderList(result.data);
                        if (0 < result.total % 10 && result.total % 10 < 10) {
                            setCountMaxPage(Math.floor(result.total / 10) + 1);
                        } else if (result.total === 0) {
                            setCountMaxPage(1);
                        } else {
                            setCountMaxPage(Math.floor(result.total / 10));
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Ops!",
                            text: "Error connect to server!",
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                        console.log(error);
                    });
            }, 1000);

            setSearchTimeout(timeoutId);
        }
    }

    const handleSortDate = () => {
        setOrderList()
        setSearchOrder({ ...searchOrder, sortDate: searchOrder.sortDate === 'asc' ? 'desc' : 'asc' })
        fetchSearchOrder({ ...searchOrder, sortDate: searchOrder.sortDate === 'asc' ? 'desc' : 'asc' }, 1)
            .then((result) => {
                setOrderList(result.data);
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1);
                } else if (result.total === 0) {
                    setCountMaxPage(1);
                } else {
                    setCountMaxPage(Math.floor(result.total / 10));
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Ops!",
                    text: "Error connect to server!",
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
                console.log(error);
            });
    }
    const handleShowOrder = (orderId) => {
        setIsShowOrder(true)
        setIsInfoOrder(true)
        setSteps([
            "Ordered",
            "Payment information confirmed",
            "Delivered to the carrier",
            "Being transported",
            "Delivery successful",
        ])
        fetchOrderInformation(orderId)
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
                fetchUpdateOrder(order.orderId, newOrder)
                    .then(result => {
                        setOrder(result)
                        let updatedOrderList = orderList.map(item => {
                            if (item.orderId === newOrder.orderId) {
                                return { ...item, status: newOrder.status };
                            } else {
                                return item;
                            }
                        });
                        setOrderList(updatedOrderList)
                        fetchCreateNotice({
                            product: result.product[0],
                            email: result.email,
                            time: time,
                            date: today,
                            content: "Your order's status has been updated, please check your order",
                            status: result.status,
                            orderId: result.orderId,
                            createDate: today
                        })
                            .then(result => {
                                console.log(result)
                            })
                            .catch(error => {
                                console.log(error)
                            })
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

    const handleCancelDelivery = () => {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;

        if (order.reasonCancel === '') {
            Swal.fire({
                title: 'Warning!',
                text: 'You have no reason for the order to fail',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else {
            const newOrder = {
                ...order,
                status: "Delivery failed",
                shipping_process: [
                    { time: time, date: today, content: "Delivery failed" },
                    ...order.shipping_process
                ]
            }

            fetchUpdateOrder(order.orderId, newOrder)
                .then(result => {
                    setOrder(newOrder)
                    setToggleReason(false)
                    setIsInfoOrder(true)
                    let updatedOrderList = orderList.map(item => {
                        if (item.orderId === newOrder.orderId) {
                            return { ...item, status: newOrder.status };
                        } else {
                            return item;
                        }
                    });
                    setOrderList(updatedOrderList)
                    fetchCreateNotice({
                        product: result.product[0],
                        email: result.email,
                        time: time,
                        date: today,
                        content: "Your order's status has been updated, please check your order",
                        status: result.status,
                        orderId: result.orderId,
                        createDate: today
                    })
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    Swal.fire({
                        title: 'Successfully!',
                        text: 'You have successfully edited your order status',
                        icon: 'success',
                        confirmButtonText: 'OK!'
                    })
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        title: `Error ${error.response.status}`,
                        text: 'There seems to be a problem with the connection to the server, please try again later',
                        icon: 'error',
                        confirmButtonText: 'OK!'
                    })
                })
        }
    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
            stars.push(
                <i key={i} data-rating={i} className={starClass} style={{ color: '#dfe232', padding: '0 3px' }} />
            );
        }
        return stars;
    };
    const handleAcceptRating = (data) => {
        const dataSent = { ...order.statusReview, statusOrder: data }

        fetchUpdateRatingOrder(order.orderId, dataSent)
            .then(result => {
                setIsReview(false)
                setOrder(result)
                Swal.fire({
                    title: "Successfully sent!",
                    text: 'You have successfully submitted a product review!',
                    icon: 'success',
                    confirmButtonText: 'OK!'
                })
            })
            .catch(error => {
                Swal.fire({
                    title: "Error sent!",
                    text: 'The connection to the server seems to have a problem!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            })
    }
    const fetchListFunctionsMap = {
        'apple': fetchListOfAppleCollectingByName,
        'laptop': fetchListOfLaptopCollectingByName,
        'laptop-gaming': fetchListOfLaptopGamingCollectingByName,
        'pc-gaming': fetchListOfPcGamingCollectingByName,
        'pc-company': fetchListOfPcCompanyCollectingByName,
        'pc-creator': fetchListOfPcCreatorCollectingByName,
    };

    const handleShowProduct = (item) => {
        setIsInfoProduct(true)
        setIsInfoOrder(false)

        const fetchFunction = fetchListFunctionsMap[item.collection];
        if (fetchFunction) {
            fetchFunction(item.src)
                .then(result => {
                    setProduct(result)
                    result.category.length > 0 && setSelectState({
                        ...selectState,
                        hasValue: true
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const [selectState, setSelectState] = useState({
        hasValue: false,
        isDisabled: false,
        isFocused: false
    });
    const { hasValue, isDisabled, isFocused } = selectState
    const handleSelectFocus = () => {
        setSelectState({
            ...selectState,
            isFocused: true
        });
    };
    const handleSelectBlur = () => {
        setSelectState({
            ...selectState,
            isFocused: false
        });
    };
    return (
        <div className='section-order play-regular'>
            {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'ORDER') ?
                <>
                    <div className='col-12 section-order-content' >
                        <div style={{ width: '100%', padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                            <div className='section-order-table-goods-title'>
                                <div className='section-order-table-goods-title-name play-bold'>
                                    Order List
                                </div>
                                <div className='row section-order-table-goods-title-search'>
                                    <div className='col-md-1 title-search'>Search:</div>
                                    <div className='row col-md-11 content-search'>
                                        <input type='text' name='orderId' onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Order ID' />
                                        <select name='status' onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                            <option value=''>All</option>\
                                            {optionSelect.map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            })}
                                        </select>
                                        <input type='date' className='col-md-2 input-form-search' name="firstDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} min="1900-01-01" />
                                        <input type='date' className='col-md-2 input-form-search' name="endDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} value={searchOrder.endDate} min="1900-01-01" />
                                    </div>
                                </div>
                            </div>
                            {orderList ?
                                <>
                                    <div className="table-responsive section-order-table-goods">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Purchaser</th>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                    <th>Order Date {searchOrder.sortDate === 'asc' ?
                                                        <i className="fa-solid fa-arrow-up" style={{ cursor: "pointer" }} onClick={handleSortDate} />
                                                        :
                                                        <i className="fa-solid fa-arrow-down" style={{ cursor: "pointer" }} onClick={handleSortDate} />}</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {orderList && orderList.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td >{item.orderId.toUpperCase()}</td>
                                                        <td>{item.username}</td>
                                                        <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product[0].nameProduct}</td>

                                                        <td className='play-bold'>{formatter.format(item.sumOrder + item.ship)} VNĐ</td>
                                                        <td>{item.shipping_process[item.shipping_process.length - 1].time} {item.shipping_process[item.shipping_process.length - 1].date}</td>
                                                        <td><label className={
                                                            item.status === "Cancel" ? "badge badge-danger" : item.status === "Delivery failed" ? "badge badge-danger" : item.status === "Delivery successful" ? "badge badge-success" : item.status === "Being transported" ? "badge badge-primary" : item.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                        }>
                                                            {item.status}
                                                        </label></td>
                                                        <td><i className='fa-regular fa-eye' onClick={() => handleShowOrder(item.orderId)} style={{ cursor: 'pointer' }} /></td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='page-button' role="group" aria-label="Basic example">
                                        {countPage > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(1)}><span>1</span>
                                            <span></span></button>}
                                        {countPage > 3 && <button type="text" className='animated-button' >...</button>}
                                        {countPage - 1 > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage - 1)}><span>{countPage - 1}</span>
                                            <span></span></button>}
                                        <button type="button" className="animated-button active">{countPage}</button>
                                        {countPage + 1 < countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage + 1)}><span>{countPage + 1}</span>
                                            <span></span></button>}
                                        {countMaxPage - countPage > 2 && <button type="text" className='animated-button'  >...</button>}
                                        {countPage !== countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countMaxPage)}><span>{countMaxPage}</span>
                                            <span></span></button>}
                                    </div>
                                </>
                                :
                                <Loading />
                            }
                        </div>
                    </div>
                    <Footer />
                    <div className={isShowOrder ? 'col-12 section-info-order active' : 'col-12 section-info-order'}>
                        <div className={isInfoOrder ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                            <div className='section-form-info-order-title play-bold'><span>Information Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setOrder(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                            {order ? <Order handleToggleReason={handleToggleReason} steps={steps} currentStep={currentStep} order={order} options={options} handleSelectedOptionsChange={handleSelectedOptionsChange} setIsReview={setIsReview} setIsInfoOrder={setIsInfoOrder} handleShowProduct={handleShowProduct} />
                                :
                                <Loading />
                            }

                        </div>
                        <div className={isReview ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                            <div className='section-form-info-order-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(false), setIsInfoOrder(true))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Review Goods Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setOrder(null), setIsReview(false), setProduct(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                            {order ?
                                <div className='section-form-info-review-content'>
                                    <div className='box-info-purchaser-review'>
                                        {order.statusReview.product.map((item, index) => {
                                            return <React.Fragment key={index}>
                                                <div className='info-product-review'>
                                                    <div className='info-product-img'><img src={item.img} alt='' /></div>
                                                    <div className='info-product-content'>
                                                        <div className='play-bold'>{item.nameProduct}</div>
                                                        <div>{renderStars(item.star)}</div>
                                                        <label className='play-bold'>Content rated: {item.content}</label>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        })}
                                    </div>
                                </div>
                                :
                                <Loading />
                            }
                            <div className='section-form-info-order-title play-bold'>
                                {order && order.statusReview.statusOrder === "" ? <div className='page-button'>
                                    <button onClick={() => handleAcceptRating("Accept")} className='animated-button' type="button" >
                                        <span>Accept</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleAcceptRating("Decline")} className='animated-button' type="button" >
                                        <span style={{ color: 'red' }}>Decline</span>
                                        <span></span>
                                    </button></div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className={isInfoProduct ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                            <div className='section-form-info-order-title play-bold'>
                                <i
                                    className='fa-solid fa-arrow-left'
                                    onClick={() => (setIsInfoProduct(false), setIsInfoOrder(true), setProduct(null))}
                                    style={{ cursor: 'pointer', fontSize: 26 }} />
                                <span>Information Product</span>
                                <i
                                    className='fa-solid fa-xmark'
                                    onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setIsInfoProduct(false), setOrder(null), setProduct(null))}
                                    style={{ cursor: 'pointer', fontSize: 26 }} />
                            </div>
                            {product ?
                                <div className='section-form-info-product-content'>
                                    <div className='box-info-purchaser-product'>
                                        <div className='list-info-purchaser-product'>
                                            <div className='row info-product'>
                                                <div className='col-md-6 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                                    <Carousel>
                                                        {product.img.map((item, index) => {
                                                            return <img src={item} key={index} alt='' />
                                                        })}
                                                    </Carousel>
                                                </div>
                                                <div className='col-md-6 list-info-product'>
                                                    <div className='play-bold'>Product Details</div>
                                                    <div className="wave-group">
                                                        <input required type="text" className="input" value={product.src} disabled />
                                                        <span className="bar"></span>
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                                        </label>
                                                    </div>
                                                    <div className="wave-group">
                                                        <input required type="text" className="input" value={product.nameProduct} disabled />
                                                        <span className="bar"></span>
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                            <span className="label-char" style={{ '--index': '10' }}>m</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                                        </label>
                                                    </div>
                                                    <div className="wave-group">
                                                        <input required type="text" className="input" value={formatter.format(product.realPrice)} disabled />
                                                        <span className="bar"></span>
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>M</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>a</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>i</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>p</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '7' }}>i</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '9' }}>e (VNĐ):</span>
                                                        </label>
                                                    </div>
                                                    <div className="wave-group">
                                                        <input required type="text" className="input" value={formatter.format(product.nowPrice)} disabled />
                                                        <span className="bar"></span>
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>e</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>e</span>
                                                            <span className="label-char" style={{ '--index': '7' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>&#160;</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>p</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>i</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>e (VNĐ):</span>
                                                        </label>
                                                    </div>
                                                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                                        <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                            <input required type="text" className="input" value={product.percent} disabled />
                                                            <span className="bar"></span>
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>D</span>
                                                                <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                                <span className="label-char" style={{ '--index': '2' }}>s</span>
                                                                <span className="label-char" style={{ '--index': '4' }}>c</span>
                                                                <span className="label-char" style={{ '--index': '5' }}>o</span>
                                                                <span className="label-char" style={{ '--index': '6' }}>u</span>
                                                                <span className="label-char" style={{ '--index': '7' }}>n</span>
                                                                <span className="label-char" style={{ '--index': '8' }}>t (%):</span>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                            <input required type="text" className="input" value={product.quantity} disabled />
                                                            <span className="bar"></span>
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>Q</span>
                                                                <span className="label-char" style={{ '--index': '1' }}>u</span>
                                                                <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                                <span className="label-char" style={{ '--index': '4' }}>n</span>
                                                                <span className="label-char" style={{ '--index': '5' }}>t</span>
                                                                <span className="label-char" style={{ '--index': '6' }}>i</span>
                                                                <span className="label-char" style={{ '--index': '7' }}>t</span>
                                                                <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                            <input required type="text" className="input" value={product.view} disabled />
                                                            <span className="bar"></span>
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                                <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                                <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                                <span className="label-char" style={{ '--index': '4' }}>w:</span>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                            <input required type="text" className="input" value={product.sold} disabled />
                                                            <span className="bar"></span>
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>S</span>
                                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                                <span className="label-char" style={{ '--index': '2' }}>l</span>
                                                                <span className="label-char" style={{ '--index': '4' }}>d:</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="wave-group-product">
                                                        <Select className={`select ${hasValue || isDisabled || isFocused ? 'is-active' : ''}`} onFocus={handleSelectFocus} onBlur={handleSelectBlur} value={product.category.map((item) => ({ value: item, label: item }))} components={makeAnimated()} isMulti placeholder="Select category" isDisabled />
                                                        <span className="bar"></span>
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                            <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                            <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                            <span className="label-char" style={{ '--index': '10' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>e</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>g</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>r</span>
                                                            <span className="label-char" style={{ '--index': '11' }}>y:</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 list-info-product'>
                                                    <div className='play-bold'>Details</div>
                                                    {product.description_table.map((item, index) => {
                                                        return <div className="wave-group" key={index}>
                                                            <input required type="text" className="input" value={item[1]} disabled />
                                                            <span className="bar"></span>
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>{item[0]}:</span>
                                                            </label>
                                                        </div>
                                                    })}

                                                    <div className='play-bold'>Specifications</div>
                                                    <div className="wave-group">
                                                        {product.specifications.map((item, index) => {
                                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                                    <input required type="text" className="input" value={item[0]} disabled />
                                                                    <label className="label">
                                                                        <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                                        <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                                        <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                                        <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                                    </label>
                                                                </div>
                                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                                    <input required type="text" className="input" value={item[1]} disabled />
                                                                    <label className="label">
                                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                                        <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                                        <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                                <div className='col-md-6 list-info-product'>
                                                    <div className='play-bold'>Description</div>
                                                    <div className="wave-group">
                                                        {product.description.map((item, index) => {
                                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                                    <input required type="text" className="input" value={item[0]} disabled />
                                                                    <label className="label">
                                                                        <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                                        <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                                        <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                                        <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                                    </label>
                                                                </div>
                                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                                    <input required type="text" className="input" value={item[1]} disabled />
                                                                    <label className="label">
                                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                                        <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                                        <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>
                                                    <div className='play-bold'>Offers</div>
                                                    <div className="wave-group">
                                                        {product.gift_buy.map((item, index) => {
                                                            return <div key={index} className="wave-group">
                                                                <input required type="text" className="input" value={item} disabled />
                                                                <label className="label">
                                                                    <span className="label-char" style={{ '--index': '0' }}>O</span>
                                                                    <span className="label-char" style={{ '--index': '1' }}>f</span>
                                                                    <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                                    <span className="label-char" style={{ '--index': '3' }}>e</span>
                                                                    <span className="label-char" style={{ '--index': '4' }}>r</span>
                                                                    <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                                    <span className="label-char" style={{ '--index': '6' }}>{index + 1}:</span>
                                                                </label>
                                                            </div>
                                                        })}
                                                    </div>
                                                    <div className='play-bold'>Gift</div>
                                                    {product.gift.map((item, index) => {
                                                        return <div key={index} className="wave-group">
                                                            <input required type="text" className="input" value={item} disabled />
                                                            <label className="label">
                                                                <span className="label-char" style={{ '--index': '0' }}>G</span>
                                                                <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                                <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                                <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                                <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                                <span className="label-char" style={{ '--index': '5' }}>{index + 1}:</span>
                                                            </label>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <Loading />
                            }
                        </div>
                        <div className={toggleReason ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                            <div className='section-form-info-order-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setToggleReason(false), setIsInfoOrder(true))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Reason</span><i className='fa-solid fa-xmark' onClick={() => (setToggleReason(false), setIsShowOrder(false), setIsInfoOrder(false), setOrder(null), setIsReview(false), setProduct(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                            <div className='section-form-info-review-content'>
                                <div className='box-info-purchaser-review'>
                                    <div className="radio-input-wrapper">
                                        <label className="label">
                                            <input value="Unable to contact the buyer" onChange={e => setOrder({ ...order, reasonCancel: e.target.value })} name="value-radio" className="radio-input" type="radio" />
                                            <div className="radio-design"></div>
                                            <div className="label-text">Unable to contact the buyer</div>
                                        </label>
                                        <label className="label">
                                            <input value="The buyer refused to accept the goods" onChange={e => setOrder({ ...order, reasonCancel: e.target.value })} name="value-radio" className="radio-input" type="radio" />
                                            <div className="radio-design"></div>
                                            <div className="label-text">The buyer refused to accept the goods</div>
                                        </label>
                                        <label className="label">
                                            <input value="Other" name="value-radio" onChange={e => setOrder({ ...order, reasonCancel: e.target.value })} className="radio-input" type="radio" />
                                            <div className="radio-design"></div>
                                            <div className="label-text">Other</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='section-form-info-order-title play-bold'>
                                {order && order.status === 'Delivery failed' ? null
                                    :
                                    <div className='page-button'>
                                        <button onClick={() => handleCancelDelivery()} className='animated-button' type="button" style={{ border: '1px solid #2196f3', width: '150px' }}>
                                            <span>Submit</span>
                                            <span></span>
                                        </button></div>
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                state.authentication === 'CEO' ? <div>
                    <div className='col-12 section-order-content' >
                        <Chart />
                    </div>
                    <Footer />
                </div>
                    :
                    <div style={{ height: '100vh' }}>
                        <div style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
                            <NoAuth error={error} />
                        </div>
                        <Footer />
                    </div>
            }
        </div>
    );
}

export default Index;
