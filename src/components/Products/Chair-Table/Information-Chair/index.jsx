import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        img: [],
        src: "",
        gift: [""],
        gift_buy: [],
        nameProduct: "",
        realPrice: 0,
        nowPrice: 0,
        description_table: [
            ["Mainboard", "", "36 Tháng"],
            ["CPU", "", "36 Tháng"],
            ["RAM", "", "36 Tháng"],
            ["VGA", '', "36 Tháng"],
            ["SSD", "", "36 Tháng"],
            ["HDD", '', "36 Tháng"],
            ["PSU", "", "36 Tháng"],
            ["CASE", "", "36 Tháng"],
            ["TẢN NHIỆT", "", "36 Tháng"],
            ["Quạt tản nhiệt", "", "36 Tháng"],
        ],
        description: [
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""]
        ]
    },)
    const options = [
        {
            label: 'Angular',
            value: 'Angular',
        },
        {
            label: 'Bootstrap',
            value: 'Bootstrap',
        },
        {
            label: 'React.js',
            value: 'React.js',
        },
        {
            label: 'Vue.js',
            value: 'Vue.js',
        },
        {
            label: 'Vue.js1',
            value: 'Vue.js1',
        },
        {
            label: 'Vue.js2',
            value: 'Vue.js2',
        },
        {
            label: 'Vue.js3',
            value: 'Vue.js3',
        },
    ]
    const [selectedImages, setSelectedImages] = useState([])
    const handleAddGift = () => {
        setInputElement([...inputElement,])
    }
    const getImg = (e) => {
        console.log(e.target.files)
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        console.log(fileArray)
        setSelectedImages((prevImages) => prevImages.concat(fileArray))
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const renderImages = (source) => {
        return source.map((image, index) => {
            return <img src={image} key={index} className="img-fluid" alt="" />
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Bàn - Ghế</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/speaker/update/1"}>Chỉnh sửa</NavLink>
                </div>

                <div className="row">
                    <div className="col-lg-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <div className="col-sm-12 col-xs-12 ">
                                    <Carousel>
                                        <img src={logo} />
                                        <img src={logo} />
                                        <img src={logo} />
                                        <img src={logo} />
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card" style={{ "marginBottom": "25px" }}>
                            <div className="card-body">
                                <h4 className="card-title">Thông tin sản phẩm</h4>
                                <div className="form-group">
                                    <label>Mã sản phẩm</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Mã sản phẩm" aria-label="Mã sản phẩm" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Giá chính</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Giá chính" aria-label="Giá chính" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Giá giảm</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Giá giảm" aria-label="Giá giảm" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Phần trăm giảm giá</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Phần trăm giảm giá" aria-label="Phần trăm giảm giá" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Danh mục</label>
                                    <Select options={options} components={makeAnimated()} isMulti placeholder="Chọn danh mục" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Thông số sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Thương hiệu</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Thương hiệu" aria-label="Thương hiệu" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chất liệu:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chất liệu:" aria-label="Chất liệu:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngã lưng</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Ngã lưng" aria-label="Ngã lưng" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Phần kê tay</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Phần kê tay" aria-label="Phần kê tay" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Tựa đầu</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tựa đầu" aria-label="Tựa đầu" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Trục thủy lực</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Trục thủy lực" aria-label="Trục thủy lực" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chân ghế </label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chân ghế " aria-label="Chân ghế " disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Màu sắc</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Màu sắc" aria-label="Màu sắc" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Tải trọng tối đa </label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tải trọng tối đa " aria-label="Tải trọng tối đa " disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chiều cao tối đa</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chiều cao tối đa" aria-label="Chiều cao tối đa" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Ưu đãi</label>
                                        <input style={{ marginBottom: "15px" }} type="text" className="form-control form-control-sm" placeholder="Ưu đãi" aria-label="Ưu đãi" disabled />
                                    </div>
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
