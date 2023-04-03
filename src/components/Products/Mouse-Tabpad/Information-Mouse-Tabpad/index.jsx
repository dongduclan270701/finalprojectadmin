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
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Chuột - Lót Chuột</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/mouse-tabpad/update/1"}>Chỉnh sửa</NavLink>
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
                                        <label>Hãng sản xuất</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Hãng sản xuất" aria-label="Hãng sản xuất" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Model</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Model" aria-label="Model" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Prog Buttons</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Prog Buttons" aria-label="Prog Buttons" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>DPI</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="DPI" aria-label="DPI" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Sensor</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Sensor" aria-label="Sensor" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Sensor Type</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Sensor Type" aria-label="Sensor Type" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Mouse Backlighting</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Mouse Backlighting" aria-label="Mouse Backlighting" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>On Board Memory</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="On Board Memory" aria-label="On Board Memory" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Mouse button Type</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Mouse button Type" aria-label="Mouse button Type" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Mouse Button Durability</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Mouse Button Durability" aria-label="Mouse Button Durability" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Connectivity</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Connectivity" aria-label="Connectivity" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Grip Type</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Grip Type" aria-label="Grip Type" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Weight" aria-label="Weight" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Cable</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Cable" aria-label="Cable" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>CUE Software</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="CUE Software" aria-label="CUE Software" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Game Type</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Game Type" aria-label="Game Type" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Mouse Feet</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Mouse Feet" aria-label="Mouse Feet" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Report Rate</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Report Rate" aria-label="Report Rate" disabled />
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
