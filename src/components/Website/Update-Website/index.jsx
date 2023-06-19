import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
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
    },)
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
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Website details</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/accessory/update/1"}>Update</NavLink>
                </div>

                <div className="row">
                    <div className="col-lg-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Image</h4>
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
                                        <img src={inputElement.logo} style={{ width: "300px" }} alt=''/>
                                    </div>
                                    <div className="col-sm-4 col-xs-4 " style={{display:"flex",justifyContent:"center"}}>
                                        <img  src={inputElement.icon} style={{ width: "150px" }} alt=''/>
                                    </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Store Information</h4>
                                    <div className="form-group">
                                        <label>Company name</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="nameCompany" className="form-control form-control-sm" placeholder="Company name" aria-label="Company name" value={inputElement.nameCompany} />
                                    </div>
                                    <div className="form-group">
                                        <label>Company email</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="email" className="form-control form-control-sm" placeholder="Company email" aria-label="Company email" value={inputElement.email} />
                                    </div>
                                    <div className="form-group">
                                        <label>Hotline</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="hotline_call_to_buy" className="form-control form-control-sm" placeholder="Hotline" aria-label="Hotline" value={inputElement.hotline_call_to_buy} />
                                    </div>
                                    <div className="form-group">
                                        <label>Support</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="hotline" className="form-control form-control-sm" placeholder="Support" aria-label="Support" value={inputElement.hotline} />
                                    </div>
                                    <div className="form-group">
                                        <label>FanPage</label>
                                        <input type="text" onChange={(e) => handleChangeInput(e, null)} name="fanPage" className="form-control form-control-sm" placeholder="FanPage" aria-label="FanPage" value={inputElement.fanPage} />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Service Center</h4>
                                    <div className="form-group">
                                        <label>Warranty branch</label>
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
                                        <button onClick={() => handleAdd("service_center")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Branch</h4>
                                    <div className="form-group">
                                        <label>Ho Chi Minh Branch</label>
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
                                        <button onClick={() => handleAdd("address_hcm")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                                    </div>
                                    <div className="form-group">
                                        <label>Ha Noi Branch</label>
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
                                        <button onClick={() => handleAdd("address_hn")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
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
