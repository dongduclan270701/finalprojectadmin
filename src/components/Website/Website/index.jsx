import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState()
    // const [options, setOptions] = useState([
    //     {
    //         label: 'Angular',
    //         value: 'Angular',
    //     },
    //     {
    //         label: 'Bootstrap',
    //         value: 'Bootstrap',
    //     },
    //     {
    //         label: 'React.js',
    //         value: 'React.js',
    //     },
    //     {
    //         label: 'Vue.js',
    //         value: 'Vue.js',
    //     },
    //     {
    //         label: 'Vue.js1',
    //         value: 'Vue.js1',
    //     },
    //     {
    //         label: 'Vue.js2',
    //         value: 'Vue.js2',
    //     },
    //     {
    //         label: 'Vue.js3',
    //         value: 'Vue.js3',
    //     },
    // ])
    useEffect(() => {
        setInputElement({
            logo: "https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg",
            icon: "https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png",
            nameCompany: "GEARVN TRADE CO., LTD",
            email: "CSKH@GEARVN.COM",
            hotline_call_to_buy: "1800 6975",
            hotline: "1800 6173",
            address_hcm: [
                "78-80-82 Hoang Hoa Tham, Ward 12, Tan Binh District",
                "905 Kha Van Can, Linh Tay Ward, Thu Duc City",
                "1081 - 1083 Tran Hung Dao, Ward 5, District 5",
                "415 An Duong Vuong, Ward 10, District 6"
            ],
            address_hn: [
                "162 - 164 Thai Ha, Trung Liet Ward, Dong Da District, Hanoi",
                "460 Minh Khai, Vinh Tuy Ward, Hai Ba Trung District, Hanoi"
            ],
            service_center: ["436A/71 3/2 Street, Ward 12, District 10, Ho Chi Minh"],
            fanPage: "123123"
        })
    }, []);

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
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
                                            <img src={inputElement.logo} style={{ width: "300px" }} alt=''/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4 className="card-title" style={{ display: "flex", justifyContent: "center" }}>Icon website</h4>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={logo} style={{ width: "300px" }} alt=''/>
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
            <Footer />
        </div>
    );
}

export default Index;
