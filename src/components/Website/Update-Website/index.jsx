import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        logo: "https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg",
        icon: "https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png",
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
        service_center: ["436A/71 đường 3/2, Phường 12, Quận 10, Hồ Chí Minh"],
        fanpage: "123123"
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
    const handleChangeInput = (event, indexInput) => {
        const { name, value } = event.target
        if (indexInput === null) {
            setInputElement(inputElement => ({
                ...inputElement,
                [name]: value
            }));
        }
        else {
            setInputElement(inputElement => ({
                ...inputElement,
                [name]: inputElement[name].map((row, index) => {
                    if (index === indexInput) {
                        return value
                    }
                    return row;
                })
            }));
        }
    }
    const handleRemove = (name, removeIndex) => {
        const updatedGift = inputElement[name].filter((item, index) => index !== removeIndex);
        setInputElement({ ...inputElement, [name]: updatedGift });
    };
    const handleAdd = (name) => {
        setInputElement(inputElement => ({
            ...inputElement,
            [name]: [...inputElement[name], ""]
        }));
    }
    const getImg = (e) => {
        const { name } = e.target
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        setInputElement(inputElement => ({
            ...inputElement,
            [name]: fileArray
        }))
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
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
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/accessory/update/1"}>Chỉnh sửa</NavLink>
                </div>

                <div className="row">
                    <div className="col-lg-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <div className='row' style={{ display: "flex", alignItems: "center" }}>
                                    <div className="col-sm-4 col-xs-4 ">
                                        <div className="form-group">
                                            <label>Upload logo mới</label>
                                            <input onChange={getImg} type="file" name="logo" className="form-control form-control-sm" placeholder="Upload logo mới" aria-label="Upload logo mới" />
                                        </div>
                                        <div className="form-group">
                                            <label>Upload icon mới</label>
                                            <input onChange={getImg} type="file" name="icon" className="form-control form-control-sm" placeholder="Upload icon mới" aria-label="Upload icon mới" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-xs-4 " style={{display:"flex",justifyContent:"center"}}>
                                        <img src={inputElement.logo} style={{ width: "300px" }} />
                                    </div>
                                    <div className="col-sm-4 col-xs-4 " style={{display:"flex",justifyContent:"center"}}>
                                        <img  src={inputElement.icon} style={{ width: "150px" }} />
                                    </div></div>
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
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="nameCompany" className="form-control form-control-sm" placeholder="Tên công ty" aria-label="Tên công ty" value={inputElement.nameCompany} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email công ty</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="email" className="form-control form-control-sm" placeholder="Email công ty" aria-label="Email công ty" value={inputElement.email} />
                                    </div>
                                    <div className="form-group">
                                        <label>Gọi mua hàng</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="hotline_call_to_buy" className="form-control form-control-sm" placeholder="Gọi mua hàng" aria-label="Gọi mua hàng" value={inputElement.hotline_call_to_buy} />
                                    </div>
                                    <div className="form-group">
                                        <label>Hỗ trợ khách hàng</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="hotline" className="form-control form-control-sm" placeholder="Hỗ trợ khách hàng" aria-label="Hỗ trợ khách hàng" value={inputElement.hotline} />
                                    </div>
                                    <div className="form-group">
                                        <label>Fanpage</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="fanpage" className="form-control form-control-sm" placeholder="Fanpage" aria-label="Fanpage" value={inputElement.fanpage} />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Trung tâm bảo hành</h4>
                                    <div className="form-group">
                                        <label>Chi nhánh bảo hành</label>
                                        {inputElement.service_center.length > 1 ? inputElement.service_center.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                <div className='col-10' style={{ paddingLeft: "0" }}>
                                                    <input name="service_center" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                </div>
                                                <div className='col-2' style={{ paddingLeft: "0" }}>
                                                    <button onClick={() => handleRemove("service_center", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                                </div>
                                            </div>
                                        })
                                            :
                                            inputElement.service_center.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                    <div className='col-12' style={{ paddingLeft: "0" }}>
                                                        <input name="service_center" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <button onClick={() => handleAdd("service_center")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Chi nhánh</h4>
                                    <div className="form-group">
                                        <label>Chi nhánh Hồ Chí Minh</label>
                                        {inputElement.address_hcm.length > 1 ? inputElement.address_hcm.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                <div className='col-10' style={{ paddingLeft: "0" }}>
                                                    <input name="address_hcm" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                </div>
                                                <div className='col-2' style={{ paddingLeft: "0" }}>
                                                    <button onClick={() => handleRemove("address_hcm", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                                </div>
                                            </div>
                                        })
                                            :
                                            inputElement.address_hcm.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                    <div className='col-12' style={{ paddingLeft: "0" }}>
                                                        <input name="address_hcm" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <button onClick={() => handleAdd("address_hcm")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                    <div className="form-group">
                                        <label>Chi nhánh Hà Nội</label>
                                        {inputElement.address_hn.length > 1 ? inputElement.address_hn.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                <div className='col-10' style={{ paddingLeft: "0" }}>
                                                    <input name="address_hn" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                </div>
                                                <div className='col-2' style={{ paddingLeft: "0" }}>
                                                    <button onClick={() => handleRemove("address_hn", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                                </div>
                                            </div>
                                        })
                                            :
                                            inputElement.address_hn.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                    <div className='col-12' style={{ paddingLeft: "0" }}>
                                                        <input name="address_hn" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <button onClick={() => handleAdd("address_hn")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
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
