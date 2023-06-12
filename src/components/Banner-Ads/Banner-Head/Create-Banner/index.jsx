import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import CreateBanner from 'components/Utils/Create-Banner'
import Select from "react-select"
import faceUser from "assets/images/faces/face28.jpg"
import makeAnimated from "react-select/animated"
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        nameBanner: "",
        src: "",
        img: "",
        createAt: "",
        status: false,
        view: 0
    })

    const handleGetData = (data) => {
        setInputElement(data)
    }

    const handleSubmitUpdated = () => {
        Swal.fire({
            title: 'Tạo sản phẩm thành công!',
            text: 'Bạn đã tạo mới thành công thông tin sản phẩm',
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Tạo mới thông tin chi tiết Quảng Cáo Header</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Tạo</button>
                </div>
                <CreateBanner inputElement={inputElement} handleGetData={handleGetData}/>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
