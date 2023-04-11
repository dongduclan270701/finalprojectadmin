import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
import 'assets/scss/Information-Order.css'
import Swal from 'sweetalert2'

const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        id: "123987qưe",
        status: "Đã giao cho bên vận chuyển",
        username: "Đồng Đức Lân",
        phoneNumber: "0379382992",
        address: "hoàng mai, hà nội",
        shipping_process: [
            { time: "8:45", date: "23/23/2033", content: "Đã đặt đơn hàng" }
        ],
        method_payment: "Thanh toán khi nhận hàng",
        discount: [
            { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
            { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
        ],
        cancel_reason: "Không thích",
        listProduct: [
            { src: "2123987qưe123987qưe123987qưe123987qưe", img: logo, nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
            { src: "1123987qưe123987qưe123987qưe123987qưe", img: logo, nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
            { src: "3123987qưe123987qưe123987qưe123987qưe", img: logo, nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
        ],
        ship: 30000,
        sumOrder:140000
    },)
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([
        {
            label: 'Đã xác nhận thông tin thanh toán',
            value: 'Đã xác nhận thông tin thanh toán',
        },
        {
            label: 'Đã giao cho bên vận chuyển',
            value: 'Đã giao cho bên vận chuyển',
        },
        {
            label: 'Đang vận chuyển',
            value: 'Đang vận chuyển',
        },
        {
            label: 'Giao hàng thành công',
            value: 'Giao hàng thành công',
        }
    ])
    const [steps, setSteps] = useState([
        "Đã Đặt đơn hàng",
        "Đã xác nhận thông tin thanh toán",
        "Đã giao cho bên vận chuyển",
        "Đang vận chuyển",
        "Giao hàng thành công",
    ]);

    useEffect(() => {
        if (inputElement.status === "Đã huỷ") {
            setSteps([
                "Đã Đặt đơn hàng",
                "Đã Huỷ"
            ])
            setCurrentStep(1)
        }
        else if (inputElement.status === 'Đã Đặt đơn hàng') {
            setCurrentStep(0)
        }
        else if (inputElement.status === 'Đã xác nhận thông tin thanh toán') {
            setCurrentStep(1)
            const newOption = options.splice(options.length - 1, 1)
            setOptions(newOption)
        }
        else if (inputElement.status === 'Đã giao cho bên vận chuyển') {
            setCurrentStep(2)
            const newOption = options.splice(options.length - 2, 2)
            setOptions(newOption)
        }
        else if (inputElement.status === 'Đang vận chuyển') {
            setCurrentStep(3)
            const newOption = options.splice(options.length - 3, 3)
            setOptions(newOption)
        }
        else if (inputElement.status === 'Giao hàng thành công') {
            setCurrentStep(4)
            const newOption = options.splice(options.length - 4, 4)
            setOptions(newOption)
        }
    }, []);


    const sumPriceListProduct = () => {
        let sumPriceListProduct = 0
        inputElement.listProduct.map((item) => {
            sumPriceListProduct += item.nowPrice * item.quantity
        })
        return sumPriceListProduct
    }
    const sumDiscountListProduct = () => {
        let sumDiscountListProduct = 0
        inputElement.discount.map((item) => {
            sumDiscountListProduct += item.amount
        })
        return sumDiscountListProduct
    }

    const handleSelectedOptionsChange = (selectedCategory) => {
        if (selectedCategory.value === 'Đã Đặt đơn hàng') {
            setCurrentStep(0)
            setInputElement(inputElement => ({
                ...inputElement,
                status: selectedCategory.value
            }));
        }
        if (selectedCategory.value === 'Đã xác nhận thông tin thanh toán') {
            Swal.fire({
                title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                showCancelButton: true,
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Không',
            }).then((result) => {
                if (result.isConfirmed) {
                    setCurrentStep(1)
                    setInputElement(inputElement => ({
                        ...inputElement,
                        status: selectedCategory.value,
                        shipping_process: [...inputElement.shipping_process, { time: "8:45", date: "23/23/2033", content: selectedCategory.value }]
                    }));
                    options.splice(0, 1)
                    Swal.fire({
                        title: 'Lưu thành công!',
                        text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                        icon: 'success',
                        confirmButtonText: 'OK!'
                    })
                }
            })
        }
        if (selectedCategory.value === 'Đã giao cho bên vận chuyển') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(2)
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đã xác nhận thông tin thanh toán" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 2)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [...inputElement.shipping_process, { time: "8:45", date: "23/23/2033", content: selectedCategory.value }]
                        }));
                        options.splice(0, 1)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
                        })
                    }
                })
            }
        }
        if (selectedCategory.value === 'Đang vận chuyển') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(3)
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đã giao cho bên vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 3)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đã giao cho bên vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 2)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [...inputElement.shipping_process, { time: "8:45", date: "23/23/2033", content: selectedCategory.value }]
                        }));
                        options.splice(0, 1)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
                        })
                    }
                })
            }
        }
        if (selectedCategory.value === 'Giao hàng thành công') {
            if (options.length > 3) {
                Swal.fire({
                    title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Không',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentStep(4)
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đã xác nhận thông tin thanh toán" },
                                { time: "8:45", date: "23/23/2033", content: "Đã giao cho bên vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: "Đang vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 3)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đã giao cho bên vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: "Đang vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 2)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [
                                ...inputElement.shipping_process,
                                { time: "8:45", date: "23/23/2033", content: "Đang vận chuyển" },
                                { time: "8:45", date: "23/23/2033", content: selectedCategory.value }
                            ]
                        }));
                        options.splice(0, 2)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                        setInputElement(inputElement => ({
                            ...inputElement,
                            status: selectedCategory.value,
                            shipping_process: [...inputElement.shipping_process, { time: "8:45", date: "23/23/2033", content: selectedCategory.value }]
                        }));
                        options.splice(0, 1)
                        Swal.fire({
                            title: 'Lưu thành công!',
                            text: 'Bạn đã chỉnh sửa thành công trạng thái đơn hàng',
                            icon: 'success',
                            confirmButtonText: 'OK!'
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
                                <h4 className="card-title">Thông tin đơn hàng: {inputElement.id}</h4>

                                <div className='row'>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4>Địa chỉ nhận hàng</h4>
                                        <p>Người mua: {inputElement.username}</p>
                                        <p>(+84) {inputElement.phoneNumber}</p>
                                        <p>{inputElement.address}</p>
                                    </div>
                                    <div className="col-lg-6 grid-margin form-group">
                                        {inputElement.shipping_process.reverse().map((item, index) => {
                                            return <div className='row' style={{ margin: "auto" }} key={index}>
                                                <i className={item.content === "Giao hàng thành công" ? "mdi mdi-check-circle" : "mdi mdi-checkbox-blank-circle"}
                                                    style={item.content === "Giao hàng thành công" ? { fontSize: "20px" } : { margin: "0px 2px 0px 2px" }}
                                                />
                                                <p style={{ paddingLeft: "15px" }}>{item.time} - {item.date} - {item.content}</p>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h4>Cập nhật trạng thái đơn hàng</h4>
                                    {inputElement.status === "Giao hàng thành công" ?
                                        <Select onChange={handleSelectedOptionsChange} value={{ label: inputElement.status, value: inputElement.status }} options={options} isMutil components={makeAnimated()} placeholder="Chọn trạng thái đơn hàng" isDisabled={true} />
                                        :
                                        <Select onChange={handleSelectedOptionsChange} value={{ label: inputElement.status, value: inputElement.status }} options={options} isMutil components={makeAnimated()} placeholder="Chọn trạng thái đơn hàng" />}
                                </div>
                                {inputElement.status === "Đã huỷ" ?
                                    <div className="form-group">
                                        <h4>Lý do huỷ đơn hàng</h4>
                                        <input className="form-control form-control-sm" value={inputElement.cancel_reason} disabled />
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
                                                {inputElement.listProduct.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>
                                                            {item.nameProduct}
                                                        </td>
                                                        <td>
                                                            <img src={item.img} className="img-fluid" alt="" style={{ width: "60px", height: "60px" }} />
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
                                                    <td>{inputElement.ship} VND</td>
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
                                                    <td style={{ fontSize: "20px", color: "red" }}>{inputElement.sumOrder} VND</td>
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
                        </div>
                    </div>

                    {/* <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Thông số sản phẩm</h4>
                                    {inputElement.description_table.map((item, index) => {
                                        return <div className="form-group" key={index}>
                                            <label>{item[0]}</label>
                                            <input type="text" className="form-control form-control-sm" placeholder={item[0]} aria-label={item[0]} value={item[1]} disabled />
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Mô tả sản phẩm</h4>
                                    <div className='row' style={{ margin: "inherit" }}>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <label>Tiêu đề:</label>
                                        </div>
                                        <div className='col-6' style={{ padding: "0" }}>
                                            <label>Nội dung:</label>
                                        </div>
                                    </div>
                                    {inputElement.description.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='NameDescription' type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} disabled />
                                            </div>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='ContentDescription' type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} disabled />
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Ưu đãi</label>
                                        {inputElement.offer_buy.map((item, index) => {
                                            return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Quà tặng" aria-label="Quà tặng" disabled />
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Quà tặng</h4>
                                    <div className="form-group">
                                        <label>Quà tặng</label>
                                        {inputElement.gift.map((item, index) => {
                                            return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Quà tặng" aria-label="Quà tặng" disabled />
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}

                </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:../../partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span>
                </div>
            </footer>
            {/* partial */}
        </div>
    );
}

export default Index;
