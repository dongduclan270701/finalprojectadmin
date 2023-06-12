import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import CreateForm from 'components/Utils/Create-Form'
import Select from "react-select"
import faceUser from "assets/images/faces/face28.jpg"
import makeAnimated from "react-select/animated"
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        nameBanner: "qưe",
        src: "qưe",
        img: faceUser,
        createAt: "12/4/2022",
        status: true,
        view: 12
    })

    const handleChangeInput = (event, data) => {
        const { name, value } = event.target
        if (data !== "status") {
            setInputElement(inputElement => ({
                ...inputElement,
                [name]: value
            }));
        } else {
            setInputElement(inputElement => ({
                ...inputElement,
                [data]: !inputElement.status
            }));
        }
    }
    const handleConfirm = () => {
        Swal.fire({
            title: 'Tạo sản phẩm thành công!',
            text: 'Bạn đã tạo mới thành công thông tin sản phẩm',
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    }
    const handleSubmitUpdated = () => {
        Swal.fire({
            title: 'Bạn có đồng ý thực hiện chỉnh sửa hay không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirm();
            }
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Chỉnh sửa thông tin chi tiết Mã Giảm Giá</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Lưu</button>
                </div>
                <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin mã giảm giá</h4>
                                    <div className="form-group">
                                        <label>Mã giảm giá:</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="form-control form-control-sm" placeholder="Mã sản phẩm" aria-label="Mã sản phẩm" value={inputElement.src} />
                                    </div>
                                    <div className="form-group">
                                        <label>Tên mã giảm giá:</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="nameBanner" type="text" className="form-control form-control-sm" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" value={inputElement.nameBanner} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin mã giảm giá</h4>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Ngày tạo</label>
                                            <input onChange={(e) => handleChangeInput(e, null)} name="createAt" type="number" className="form-control form-control-sm" placeholder="Giá chính" aria-label="Giá chính" value={inputElement.createAt} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Ngày kết thúc</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Ngày kết thúc" aria-label="Ngày kết thúc" value={inputElement.view} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Lượt dùng</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Lượt dùng" aria-label="Lượt dùng" value={inputElement.view} disabled />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Trạng thái</label>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                                {inputElement.status ? (
                                                    <>
                                                        <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                            Hoạt động
                                                        </label>
                                                        <button name="status" onClick={(e) => handleChangeInput(e, "status")} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                            <i className="mdi mdi-checkbox-marked-circle" style={{ fontSize: 20 }} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                            Ngừng hoạt động
                                                        </label>
                                                        <button name="status" onClick={(e) => handleChangeInput(e, "status")} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                            <i className="mdi mdi-checkbox-blank-circle-outline" style={{ fontSize: 20 }} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
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
