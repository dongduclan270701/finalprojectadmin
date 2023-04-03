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
            ["Mainboard", "","36 Tháng"],
            ["CPU", "","36 Tháng"],
            ["RAM", "","36 Tháng"],
            ["VGA", '',"36 Tháng"],
            ["SSD", "","36 Tháng"],
            ["HDD", '',"36 Tháng"],
            ["PSU", "","36 Tháng"],
            ["CASE", "","36 Tháng"],
            ["TẢN NHIỆT", "","36 Tháng"],
            ["Quạt tản nhiệt", "","36 Tháng"],
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
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Tạo mới thông tin chi tiết sản phẩm PC Khuyến mại</h3>
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
                    <div className="col-md-6 grid-margin">
                        <div className="card">
                        <div className="card-body">
                                    <h4 className="card-title">Thông số sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Drivers</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Drivers" aria-label="Drivers" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Màu sắc</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Màu sắc" aria-label="Màu sắc" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Dải tần số</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Dải tần số" aria-label="Dải tần số" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Kết nối</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Kết nối" aria-label="Kết nối" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Micro</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Micro" aria-label="Micro" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Dải tần micro</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Dải tần micro" aria-label="Dải tần micro" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chất liệu đêm tai</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chất liệu đêm tai" aria-label="Chất liệu đêm tai" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Trọng lượng</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Trọng lượng" aria-label="Trọng lượng" disabled />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Thông số sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Thương hiệu:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Thương hiệu:" aria-label="Thương hiệu:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Model:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Model:" aria-label="Model:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Màu sắc:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Màu sắc:" aria-label="Màu sắc:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Kết nối:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Kết nối:" aria-label="Kết nối:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Kiểu tai nghe</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Kiểu tai nghe" aria-label="Kiểu tai nghe" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Kiểu kết nối:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Kiểu kết nối:" aria-label="Kiểu kết nối:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Đèn led:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Đèn led:" aria-label="Đèn led:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chuẩn kết nối:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chuẩn kết nối:" aria-label="Chuẩn kết nối:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Microphone:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Microphone:" aria-label="Microphone:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Dây:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Dây:" aria-label="Dây:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Trở kháng:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Trở kháng:" aria-label="Trở kháng:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Tần số :</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tần số :" aria-label="Tần số :" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Khả năng cách âm:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Khả năng cách âm:" aria-label="Khả năng cách âm:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chất liệu khung:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chất liệu khung:" aria-label="Chất liệu khung:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Chất liệu đệm tai nghe :</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Chất liệu đệm tai nghe :" aria-label="Chất liệu đệm tai nghe :" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Phụ kiện đi kèm:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Phụ kiện đi kèm:" aria-label="Phụ kiện đi kèm:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Tương thích:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tương thích:" aria-label="Tương thích:" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Tính năng:</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tính năng:" aria-label="Tính năng:" disabled />
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
