import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "assets/scss/Banner-Ads/Banner-Slide/Banner-Slide.scss"
import faceUser from "assets/images/faces/face28.jpg"
const Index = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [optionSelect, setOptionSelect] = useState(["Hoạt động", "Ngưng hoạt động"])
    const [bannerSlide, setBannerSlide] = useState([
        {
            nameBanner: "qưe",
            src: "qưe",
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt:"12/4/2022",
            updateBy:"",
            status: true,
            used: 12
        }, {
            nameBanner: "qưe1",
            src: "qưe1",
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt:"12/4/2022",
            updateBy:"",
            status: false,
            used: 42
        }, {
            nameBanner: "qưe2",
            src: "qưe2",
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt:"12/4/2022",
            updateBy:"",
            status: true,
            used: 123
        },
    ])

    const handleToggleCheckbox = (indexInput) => {
        const updateBanner = bannerSlide.map((item, index) => {
            if (index === indexInput) {
                return { ...item, status: !item.status }
            }
            return item
        })
        setBannerSlide(updateBanner);
    };
    const [optionSelected, setOptionSelected] = useState("")
    const handleOptionSelected = (e) => {
        if (e.target.value !== null) {
            setOptionSelected(e.target.value)
        }
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">

                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách Mã Giảm Giá</h4>
                                <NavLink to={"/discount/create"} style={{ textDecoration: "none" }} className="card-description">
                                    <code><i className="mdi mdi-plus-circle-outline" />  Thêm danh sách mới</code>
                                </NavLink>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                        <p className="card-description" style={{ margin: "0" }}>
                                            Tìm kiếm sản phẩm:
                                        </p>
                                    </div>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên sản phẩm" aria-label="Giá chính" />
                                    </ul>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} onChange={handleOptionSelected} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn trạng thái</option>\
                                                    {optionSelect.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Tên mã</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày kết thúc</th>
                                                <th>Lượt dùng</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bannerSlide.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.nameBanner}</td>
                                                    <td>
                                                        {item.createAt}
                                                    </td>
                                                    <td>
                                                        {item.endAt}
                                                    </td>
                                                    <td>
                                                        {item.used}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                                            {item.status ? (
                                                                <>
                                                                    <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                                        Hoạt động
                                                                    </label>
                                                                    <button onClick={() => handleToggleCheckbox(index)} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                                        <i className="mdi mdi-checkbox-marked-circle" style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                                        Ngừng hoạt động
                                                                    </label>
                                                                    <button onClick={() => handleToggleCheckbox(index)} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                                        <i className="mdi mdi-checkbox-blank-circle-outline" style={{ fontSize: 20 }} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <NavLink to={"/discount/" + item.src} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-group" style={{ "display": "flex", "justify-content": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-secondary active">1</button>
                                    <button type="button" className="btn btn-outline-secondary">2</button>
                                    <button type="button" className="btn btn-outline-secondary">...</button>
                                    <button type="button" className="btn btn-outline-secondary">5</button>
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
