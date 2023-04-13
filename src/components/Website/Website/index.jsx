import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        logo: logo,
        icon: "",
        nameCompany: "CÔNG TY TNHH THƯƠNG MẠI GEARVN",
        email: "CSKH@GEARVN.COM",
        hotline_call_to_buy: "1800 6975",
        hotline: "1800 6173",
        address_hcm: [
            "78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình",
            "905 Kha Vạn Cân, Phường Linh Tây, Thành phố Thủ Đức",
            "1081 - 1083 Trần Hưng Đạo, Phường 5, Quận 5",
            "415 An Dương Vương, Phường 10, Quận 6"
        ],
        address_hn: [
            "162 - 164 Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội",
            "460 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà Nội"
        ],
        service_center: "436A/71 đường 3/2, Phường 12, Quận 10, Hồ Chí Minh",
        fanpage:"123123"
    },)
    const [options, setOptions] = useState([
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
    ])
    useEffect(() => {
    }, []);

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Phụ Kiện</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/website/update"}>Chỉnh sửa</NavLink>
                </div>

                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card" style={{ "marginBottom": "25px" }}>
                            <div className="card-body">
                                <div className='row'>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4 className="card-title" style={{ display: "flex", justifyContent: "center" }}>Logo website</h4>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={inputElement.logo} style={{ width: "300px" }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4 className="card-title" style={{ display: "flex", justifyContent: "center" }}>Icon website</h4>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={logo} style={{ width: "300px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin cửa hàng</h4>
                                    <div className="form-group">
                                        <label>Tên công ty</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Tên công ty" aria-label="Tên công ty" value={inputElement.nameCompany} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Email công ty</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Email công ty" aria-label="Email công ty" value={inputElement.email} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Gọi mua hàng</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Gọi mua hàng" aria-label="Gọi mua hàng" value={inputElement.hotline_call_to_buy} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Hỗ trợ khách hàng</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Hỗ trợ khách hàng" aria-label="Hỗ trợ khách hàng" value={inputElement.hotline} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Fanpage</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Fanpage" aria-label="Fanpage" value={inputElement.fanpage} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Trung tâm bảo hành</h4>
                                    <div className="form-group">
                                        <label>Trung tâm bảo hành</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Trung tâm bảo hành" aria-label="Trung tâm bảo hành" value={inputElement.service_center} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Chi nhánh Hồ Chí Minh</h4>
                                    {inputElement.address_hcm.map((item, index) => {
                                        return <div className="form-group" key={index}>
                                            <label>Địa chỉ {index + 1}:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Tên công ty" aria-label="Tên công ty" value={item} disabled />
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Chi nhánh Hà Nội</h4>
                                    {inputElement.address_hn.map((item, index) => {
                                        return <div className="form-group" key={index}>
                                            <label>Địa chỉ {index + 1}:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Tên công ty" aria-label="Tên công ty" value={item} disabled />
                                        </div>
                                    })}
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
