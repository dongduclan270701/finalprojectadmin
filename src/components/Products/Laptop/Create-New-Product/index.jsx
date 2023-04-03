import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"

const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        img: [],
        src: "",
        gift: ["", ""],
        gift_buy: [],
        nameProduct: "",
        realPrice: 0,
        nowPrice: 0,
        description_table: [
            ["CPU", ""],
            ["RAM", ""],
            ["Storage", ''],
            ["GPU", ""],
            ["Monitor", ''],
            ["Keyboard", ""],
            ["Audio", ""],
            ["LAN", ""],
            ["Wireless", ""],
            ["Webcam", ""],
            ["Communication", ['']],
            ["System", ""],
            ["Battery", ""],
            ["Weight", ""],
            ["Color", ""],
            ["Security", ""],
            ["Size", ""],
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
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        setSelectedImages(fileArray)
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
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Tạo mới thông tin chi tiết sản phẩm Laptop</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button className="col-lg-2 btn btn-outline-secondary btn-fw">Tạo</button>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <p className="card-description">
                                    ID:<code>123123</code>
                                </p>
                                <div className="table-responsive">
                                    <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input onChange={getImg} type="file" className="form-control file-upload-info" placeholder="Upload Image" multiple />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {renderImages(selectedImages)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Mã sản phẩm</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Mã sản phẩm" aria-label="Mã sản phẩm" />
                                    </div>
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá chính</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Giá chính" aria-label="Giá chính" />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá giảm</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Giá giảm" aria-label="Giá giảm" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phần trăm giảm giá</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Phần trăm giảm giá" aria-label="Phần trăm giảm giá" />
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <Select placeholder="Chọn danh mục" options={options} components={makeAnimated()} isMulti />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Quà tặng</h4>
                                    <div className="form-group">
                                        <label>Quà tặng sản phẩm</label>
                                        {inputElement.gift.map((item, index) => {
                                            return <input style={{ marginBottom: "15px" }} key={index} type="text" onChange={(e) => setInputElement((inputElement) => ({ ...inputElement, gift: [e.target.value] }))} className="form-control form-control-sm" placeholder="Quà tặng" aria-label="Quà tặng" />
                                        })}
                                        <button type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Ưu đãi</label>
                                        <input style={{ marginBottom: "15px" }} type="text" className="form-control form-control-sm" placeholder="Ưu đãi" aria-label="Ưu đãi" />
                                        <button type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Thông số sản phẩm</h4>
                                <div className="form-group">
                                    <label>CPU</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="CPU" aria-label="CPU" />
                                </div>
                                <div className="form-group">
                                    <label>RAM</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="RAM" aria-label="RAM" />
                                </div>
                                <div className="form-group">
                                    <label>Storage</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Storage" aria-label="Storage" />
                                </div>
                                <div className="form-group">
                                    <label>GPU</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="GPU" aria-label="GPU" />
                                </div>
                                <div className="form-group">
                                    <label>Monitor</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Monitor" aria-label="Monitor" />
                                </div>
                                <div className="form-group">
                                    <label>Keyboard</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Keyboard" aria-label="Keyboard" />
                                </div>
                                <div className="form-group">
                                    <label>Audio</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Audio" aria-label="Audio" />
                                </div>
                                <div className="form-group">
                                    <label>LAN</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="LAN" aria-label="LAN" />
                                </div>
                                <div className="form-group">
                                    <label>Wireless</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Wireless" aria-label="Wireless" />
                                </div>
                                <div className="form-group">
                                    <label>Webcam</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Webcam" aria-label="Webcam" />
                                </div>
                                <div className="form-group">
                                    <label>Communication</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Communication" aria-label="Communication" />
                                </div>
                                <div className="form-group">
                                    <label>System</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="System" aria-label="System" />
                                </div>
                                <div className="form-group">
                                    <label>Battery</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Battery" aria-label="Battery" />
                                </div>
                                <div className="form-group">
                                    <label>Weight</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Weight" aria-label="Weight" />
                                </div>
                                <div className="form-group">
                                    <label>Color</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Color" aria-label="Color" />
                                </div>
                                <div className="form-group">
                                    <label>Security</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Security" aria-label="Security" />
                                </div>
                                <div className="form-group">
                                    <label>Size</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Size" aria-label="Size" />
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
