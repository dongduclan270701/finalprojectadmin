import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "assets/scss/Banner-Ads/Banner-Slide/Banner-Slide.scss"
import faceUser from "assets/images/faces/face28.jpg"
const Index = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [optionSelect, setOptionSelect] = useState(["Hoạt động", "Khoá"])
    const [bannerSlide, setBannerSlide] = useState([
        {
            id: "23",
            nameUser: "qưe",
            email: "qưe",
            image: "12/4/2022",
            order_buy: [
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
            ],
            updateAt: "12/4/2022",
            createAt: "",
            status: true,
        }, {
            id: "23",
            nameUser: "qưe1",
            email: "qưe1",
            image: "12/4/2022",
            order_buy: [
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
                
            ],
            updateAt: "12/4/2022",
            createAt: "",
            status: false,
        }, {
            id: "23",
            nameUser: "qưe2",
            email: "qưe2",
            image: "12/4/2022",
            order_buy: [
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
                {
                    id: "123987qưe",
                    status: "Delivered to the carrier",
                    username: "Đồng Đức Lân",
                    phoneNumber: "0379382992",
                    address: "hoàng mai, hà nội",
                    shipping_process: [
                        { time: "8:45", date: "23/23/2033", content: "Ordered" }
                    ],
                    method_payment: "Thanh toán khi nhận hàng",
                    discount: [
                        { src: "1", nameDiscount: "Mã giảm giá 1", amount: 20000 },
                        { src: "2", nameDiscount: "Mã giảm giá 2", amount: 10000 }
                    ],
                    cancel_reason: "Không thích",
                    listProduct: [
                        { src: "2123987qưe123987qưe123987qưe123987qưe", nameProduct: "2123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 20000, quantity: 2 },
                        { src: "1123987qưe123987qưe123987qưe123987qưe", nameProduct: "1123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 10000, quantity: 1 },
                        { src: "3123987qưe123987qưe123987qưe123987qưe", nameProduct: "3123987qưe123987qưe123987qưe123987qưe", realPrice: 0, nowPrice: 30000, quantity: 3 },
                    ],
                    ship: 30000,
                    sumOrder:140000
                },
            ],
            updateAt: "12/4/2022",
            createAt: "",
            status: true,
        },
    ])
    const [optionSelected, setOptionSelected] = useState("")
    const handleOptionSelected = (e) => {
        if (e.target.value !== null) {
            setOptionSelected(e.target.value)
        }
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">

                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách Người dùng</h4>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                        <p className="card-description" style={{ margin: "0" }}>
                                            Tìm kiếm:
                                        </p>
                                    </div>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên người dùng" aria-label="Tên người dùng" />
                                    </ul>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} onChange={handleOptionSelected} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn trạng thái</option>\
                                                    {optionSelect.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Hình ảnh</th>
                                                <th>Đơn hàng đã mua</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bannerSlide.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nameUser}</td>
                                                    <td>
                                                        {item.email}
                                                    </td>
                                                    <td>
                                                        {item.image}
                                                    </td>
                                                    <td>
                                                        {item.order_buy.length}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                                            {item.status ? (
                                                                <>
                                                                    <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                                        Hoạt động
                                                                    </label>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                                        Khoá
                                                                    </label>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <NavLink to={"/user/" + item.id} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-group" style={{ "display": "flex", "justify-content": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-secondary active">1</button>
                                    <button type="button" className="btn btn-outline-secondary">2</button>
                                    <button type="button" className="btn btn-outline-secondary">...</button>
                                    <button type="button" className="btn btn-outline-secondary">5</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
