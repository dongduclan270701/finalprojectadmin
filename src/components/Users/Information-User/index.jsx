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
    const [inputElement, setInputElement] = useState(
        {
            id: "23",
            username: "Đồng Đức Lân",
            phoneNumber: "0379382992",
            address: "hoàng mai, hà nội",
            email: "qưe1",
            image: "12/4/2022",
            order_buy: [
                {
                    id: "123987qưe",
                    status: "Đã Đặt đơn hàng",
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
                    sumOrder: 140000
                },
                {
                    id: "123987qưe",
                    status: "Đã xác nhận thông tin thanh toán",
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
                    sumOrder: 140000
                },
                {
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
                    sumOrder: 140000
                },
                {
                    id: "123987qưe",
                    status: "Đang vận chuyển",
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
                    sumOrder: 140000
                },
                {
                    id: "123987qưe",
                    status: "Giao hàng thành công",
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
                    sumOrder: 140000
                },
                {
                    id: "123987qưe",
                    status: "Đã huỷ",
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
                    sumOrder: 140000
                },
            ],
            updateAt: "12/4/2022",
            createAt: "",
            status: true,
        })

    useEffect(() => {

    }, []);
    const handleStatusAccountUser = () => {
        Swal.fire({
            title: 'Bạn có đồng ý chỉnh sửa tài khoản này hay không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                setInputElement(inputElement => ({
                    ...inputElement,
                    status: !inputElement.status
                }))
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Bạn đã chỉnh sửa thành công trạng thái tài khoản này',
                    icon: 'success',
                    confirmButtonText: 'OK!'
                })
            }
        })
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
                                <h4 className="card-title">Thông tin khách hàng: {inputElement.id}</h4>
                                <div className='row'>
                                    <div className="col-lg-6 grid-margin form-group" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div className="form-group">
                                            <img src="https://i.postimg.cc/DwP04m9J/face1.jpg" style={{ width: "300px", borderRadius: "50%" }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4>Địa chỉ nhận hàng</h4>
                                        <div className="form-group">
                                            <label>Tên:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Tên:" aria-label="Tên:" value={inputElement.username} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Số điện thoại" aria-label="Số điện thoại" value={inputElement.phoneNumber} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ nhận hàng</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Địa chỉ nhận hàng" aria-label="Địa chỉ nhận hàng" value={inputElement.address} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Email" aria-label="Email" value={inputElement.email} disabled />
                                        </div>
                                        <div className="form-group">
                                            {inputElement.status ?
                                                <div className="row" style={{ margin: "0 auto" }}>
                                                    <label className="badge badge-success">
                                                        Đang hoạt động
                                                    </label>
                                                    <button name="status" onClick={handleStatusAccountUser} style={{ display: "flex", alignItems: "center", background: "none", border: "none", padding: "0 0 0 15px", margin: "0" }}>
                                                        <i className="mdi mdi-checkbox-marked-circle" style={{ fontSize: 20 }} />
                                                    </button>
                                                </div>
                                                :
                                                <div className="row" style={{ margin: "0 auto" }}>
                                                    <label className="badge badge-danger">
                                                        Khoá
                                                    </label>
                                                    <button name="status" onClick={handleStatusAccountUser} style={{ display: "flex", alignItems: "center", background: "none", border: "none", padding: "0 0 0 15px", margin: "0" }}>
                                                        <i className="mdi mdi-checkbox-blank-circle-outline" style={{ fontSize: 20 }} />
                                                    </button>
                                                </div>
                                            }

                                        </div>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <h4>Danh sách đơn hàng</h4>
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
                                                    <th>
                                                        Trạng thái
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inputElement.order_buy.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>
                                                            {item.listProduct[0].nameProduct}
                                                        </td>
                                                        <td>
                                                            <img src={item.listProduct[0].img} className="img-fluid" alt="" style={{ width: "60px", height: "60px" }} />
                                                        </td>
                                                        <td>
                                                            {item.listProduct[0].quantity}
                                                        </td>
                                                        <td>
                                                            {item.listProduct[0].nowPrice} VND
                                                        </td>
                                                        <td>
                                                            {item.sumOrder} VND
                                                        </td>
                                                        <td>
                                                            <label
                                                                className={item.status === "Đã huỷ" ? "badge badge-danger" :
                                                                    item.status === "Đã xác nhận thông tin thanh toán" ? "badge badge-warning" :
                                                                        item.status === "Giao hàng thành công" ? "badge badge-success" :
                                                                            item.status === "Đã Đặt đơn hàng" ? "badge badge-warning" : "badge badge-primary"
                                                                }
                                                                style={{ marginRight: "10px" }}>
                                                                {item.status}
                                                            </label>
                                                        </td>
                                                    </tr>
                                                })}
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
                                        {inputElement.gift_buy.map((item, index) => {
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
