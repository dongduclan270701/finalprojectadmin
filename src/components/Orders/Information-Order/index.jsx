import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
import 'assets/scss/Information-Order.css'
import Swal from 'sweetalert2'
import { fetchOrderInformation, fetchUpdateOrder } from 'Apis'
import ShowRating from 'components/Orders/ShowRating'

const Index = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [order, setOrder] = useState()
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([
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
    const [steps, setSteps] = useState([
        "Ordered",
        "Payment information confirmed",
        "Delivered to the carrier",
        "Being transported",
        "Delivery successful",
    ]);
    const [toggleShowRate, setToggleShowRate] = useState(false);
    const handleToggleShowRate = () => setToggleShowRate(!toggleShowRate);

    useEffect(() => {
        fetchOrderInformation(params.id)
            .then(result => {
                setOrder(result)
                if (result.status === "Đã huỷ") {
                    setSteps([
                        "Ordered",
                        "Đã Huỷ"
                    ])
                    setCurrentStep(1)
                }
                else if (result.status === 'Ordered') {
                    setCurrentStep(0)
                }
                else if (result.status === 'Payment information confirmed') {
                    setCurrentStep(1)
                    options.splice(0, 1)
                }
                else if (result.status === 'Delivered to the carrier') {
                    setCurrentStep(2)
                    options.splice(0, 2)
                    
                }
                else if (result.status === 'Being transported') {
                    setCurrentStep(3)
                    options.splice(0, 3)
                    
                }
                else if (result.status === 'Delivery successful') {
                    setCurrentStep(4)
                    options.splice(0, 4)
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


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
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;
        if (selectedCategory.value === 'Payment information confirmed') {
            Swal.fire({
                title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                showCancelButton: true,
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Không',
            }).then((result) => {
                if (result.isConfirmed) {
                    setCurrentStep(1)
                    const newOrder = {
                        ...order,
                        status: selectedCategory.value,
                        shipping_process: [
                            ...order.shipping_process,
                            { time: time, date: today, content: selectedCategory.value }
                        ]
                    }
                    fetchUpdateOrder(params.id, newOrder)
                        .then(result => {
                            console.log(result)
                            setOrder(result);
                            options.splice(0, 1)
                            Swal.fire({
                                title: 'Lưu thành công!',
                                text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                icon: 'success',
                                confirmButtonText: 'OK!'
                            })
                        })
                        .catch(error => {
                            Swal.fire({
                                title: 'Lưu thất bại!',
                                text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                        })

                }
            })
        }
        if (selectedCategory.value === 'Delivered to the carrier') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(2)
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Payment information confirmed" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 2)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(2)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 1)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 1)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
        }
        if (selectedCategory.value === 'Being transported') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(3)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [
                        //         ...order.shipping_process,
                        //         { time: time, date: today, content: "Delivered to the carrier" },
                        //         { time: time, date: today, content: selectedCategory.value }
                        //     ]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 3)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Delivered to the carrier" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 3)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else if (options.length === 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(3)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [
                        //         ...order.shipping_process,
                        //         { time: time, date: today, content: "Payment information confirmed" },
                        //         { time: time, date: today, content: "Delivered to the carrier" },
                        //         { time: time, date: today, content: selectedCategory.value }
                        //     ]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 2)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Payment information confirmed" },
                                { time: time, date: today, content: "Delivered to the carrier" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 2)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(3)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 1)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 1)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
        }
        if (selectedCategory.value === 'Delivery successful') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(4)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [
                        //         ...order.shipping_process,
                        //         { time: time, date: today, content: "Payment information confirmed" },
                        //         { time: time, date: today, content: "Delivered to the carrier" },
                        //         { time: time, date: today, content: "Being transported" },
                        //         { time: time, date: today, content: selectedCategory.value }
                        //     ]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 3)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Payment information confirmed" },
                                { time: time, date: today, content: "Delivered to the carrier" },
                                { time: time, date: today, content: "Being transported" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 3)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else if (options.length === 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(4)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [
                        //         ...order.shipping_process,
                        //         { time: time, date: today, content: "Delivered to the carrier" },
                        //         { time: time, date: today, content: "Being transported" },
                        //         { time: time, date: today, content: selectedCategory.value }
                        //     ]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 2)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Delivered to the carrier" },
                                { time: time, date: today, content: "Being transported" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 2)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else if (options.length === 2) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(4)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [
                        //         ...order.shipping_process,
                        //         { time: time, date: today, content: "Being transported" },
                        //         { time: time, date: today, content: selectedCategory.value }
                        //     ]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 2)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...order.shipping_process,
                                { time: time, date: today, content: "Being transported" },
                                { time: time, date: today, content: selectedCategory.value }
                            ]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 2)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
            else {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(4)
                        // const newOrder = {
                        //     ...order,
                        //     status: selectedCategory.value,
                        //     shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        // }
                        // setOrder(newOrder);
                        // options.splice(0, 1)
                        // Swal.fire({
                        //     title: 'Lưu thành công!',
                        //     text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        //     icon: 'success',
                        //     confirmButtonText: 'OK!'
                        // })
                        const newOrder = {
                            ...order,
                            status: selectedCategory.value,
                            shipping_process: [...order.shipping_process, { time: time, date: today, content: selectedCategory.value }]
                        }
                        fetchUpdateOrder(params.id, newOrder)
                            .then(result => {
                                console.log(result)
                                setOrder(result);
                                options.splice(0, 1)
                                Swal.fire({
                                    title: 'Lưu thành công!',
                                    text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            })
                            .catch(error => {
                                Swal.fire({
                                    title: 'Lưu thất bại!',
                                    text: 'Có vẻ như đã xảy ra vấn đề kết nối với server',
                                    icon: 'error',
                                    confirmButtonText: 'OK!'
                                })
                            })
                    }
                })
            }
        }
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết Đơn Hàng</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card" style={{ "marginBottom": "25px" }}>
                            {order ?
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
                                    <h4 className="card-title">Thông tin đơn hàng: {order._id}</h4>
                                    <div className='row'>
                                        <div className="col-lg-6 grid-margin form-group">
                                            <h4>Địa chỉ nhận hàng</h4>
                                            <p>Người mua: {order.username}</p>
                                            <p>{order.email}</p>
                                            <p>(+84) {order.phoneNumber}</p>
                                            <p>{order.address}</p>
                                        </div>
                                        <div className="col-lg-6 grid-margin form-group">
                                            {order.shipping_process.reverse().map((item, index) => {
                                                return <div className='row' style={{ margin: "auto" }} key={index}>
                                                    <i className={item.content === "Delivery successful" ? "mdi mdi-check-circle" : "mdi mdi-checkbox-blank-circle"}
                                                        style={item.content === "Delivery successful" ? { fontSize: "20px" } : { margin: "0px 2px 0px 2px" }}
                                                    />
                                                    <p style={{ paddingLeft: "15px" }}>{item.time} - {item.date} - {item.content}</p>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h4>Cập nhật trạng thái đơn hàng</h4>
                                        {order.status === "Delivery successful" ?
                                            <Select onChange={handleSelectedOptionsChange} value={{ label: order.status, value: order.status }} options={options} isMutil components={makeAnimated()} placeholder="Chọn trạng thái đơn hàng" isDisabled={true} />
                                            :
                                            <Select onChange={handleSelectedOptionsChange} value={{ label: order.status, value: order.status }} options={options} isMutil components={makeAnimated()} placeholder="Chọn trạng thái đơn hàng" />}
                                    </div>
                                    {order.statusReview.status === true && <div className="row form-group" style={{margin:"0 auto", display:"flex", alignItems:"center"}}>
                                        <button onClick={handleToggleShowRate} style={{margin: "0 auto"}} type="button" className="col-lg-2 btn btn-outline-secondary ">Xem đánh giá</button>
                                    </div>}
                                    {order.status === "Đã huỷ" ?
                                        <div className="form-group">
                                            <h4>Lý do huỷ đơn hàng</h4>
                                            <input className="form-control form-control-sm" value={order.cancel_reason} disabled />
                                        </div>
                                        : null}
                                    <div className="form-group">
                                        <h4>Danh sách sản phẩm</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Sản phẩm
                                                        </th>
                                                        <th>
                                                            Hình ảnh
                                                        </th>
                                                        <th>
                                                            Số lượng
                                                        </th>
                                                        <th>
                                                            Giá
                                                        </th>
                                                        <th>
                                                            Tổng
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
                                                                {item.nowPrice}
                                                            </td>
                                                            <td>
                                                                {item.nowPrice * item.quantity} VND
                                                            </td>
                                                        </tr>
                                                    })}
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Tổng</td>
                                                        <td>{sumPriceListProduct()} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Phí vận chuyển</td>
                                                        <td>{order.ship} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Giảm giá</td>
                                                        <td>- {sumDiscountListProduct()} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{ borderRight: "1px solid #e1e1e1" }}>Thanh toán</td>
                                                        <td style={{ fontSize: "20px", color: "red" }}>{order.sumOrder + order.ship - sumDiscountListProduct()} VND</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>Phương thức thanh toán</td>
                                                        <td>Thanh toán khi nhận hàng</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                :
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
            </div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span>
                </div>
            </footer>
            {order && order.statusReview.status === true &&<ShowRating toggleShowRate={toggleShowRate} onHandleToggleShowRate={handleToggleShowRate} order={order}/>}
        </div>
    );
}

export default Index;
