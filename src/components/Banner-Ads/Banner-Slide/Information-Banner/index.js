import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Index = () => {
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
        return source.map((image,index) => {
            return <img src={image} key={index} className="img-fluid" alt="" />
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Thông tin chi tiết thanh trượt quảng cáo</h3>
                            </div>
                        </div>
                    </div>
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
                                            <input onChange={getImg} type="file" className="form-control file-upload-info" placeholder="Upload Image" multiple/>
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
                                        <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá chính</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá giảm</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phần trăm giảm giá</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Quà tặng</h4>
                                    <div className="form-group">
                                        <label>Mã sản phẩm</label>
                                        {inputElement.gift.map((item, index) => {
                                            return <input key={index} type="text" onChange={(e) => setInputElement((inputElement) => ({ ...inputElement, gift: [e.target.value] }))} className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                        })}
                                        <button type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                                    </div>
                                </div>
                            </div>
                            {console.log(inputElement)}
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Mã sản phẩm</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
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
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>RAM</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Storage</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>GPU</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Monitor</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Keyboard</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Audio</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>LAN</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Wireless</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Webcam</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Communication</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>System</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Battery</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Weight</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Color</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Security</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Size</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Username" aria-label="Username" />
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
