import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Index = () => {
    const [optionSelect, setOptionSelect] = useState(["Đang vận chuyển", "Đang chờ xác nhận", "Đã giao hàng", "Đã huỷ"])
    const [bannerSlide, setBannerSlide] = useState([
        {
            id: "qưe",
            nameUser: "qưe",
            listProduct: ["1", "2", "3"],
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt: "12/4/2022",
            updateBy: "",
            status: "Đang vận chuyển",
            total: 12
        }, {
            id: "qưe1",
            nameUser: "qưe1",
            listProduct: ["1", "2", "3"],
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt: "12/4/2022",
            updateBy: "",
            status: "Đang chờ xác nhận",
            total: 42
        }, {
            id: "qưe2",
            nameUser: "qưe2",
            listProduct: ["1", "2", "3"],
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt: "12/4/2022",
            updateBy: "",
            status: "Đã giao hàng",
            total: 123
        },
        {
            id: "qưe3",
            nameUser: "qưe3",
            listProduct: ["1", "2", "3"],
            endAt: "12/4/2022",
            createAt: "12/4/2022",
            updateAt: "12/4/2022",
            updateBy: "",
            status: "Đã huỷ",
            total: 123
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
                    <div className="col-lg-12 stretch-card">

                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách Đơn Hàng</h4>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                        <p className="card-description" style={{ margin: "0" }}>
                                            Tìm kiếm :
                                        </p>
                                    </div>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Mã đơn hàng" aria-label="Mã đơn hàng" />
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
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    Người mua
                                                </th>
                                                <th>
                                                    Sản phẩm
                                                </th>
                                                <th>
                                                    Tổng giá
                                                </th>
                                                <th>
                                                    Ngày đặt
                                                </th>
                                                <th>
                                                    Trạng thái
                                                </th>
                                                <th>
                                                    Tác vụ
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bannerSlide.map((item, index) => {
                                                return <tr className="table"key={index}>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        {item.nameUser}
                                                    </td>
                                                    <td>
                                                        {item.listProduct[0]}
                                                    </td>
                                                    <td>
                                                        {item.total}
                                                    </td>
                                                    <td>
                                                        {item.createAt}
                                                    </td>

                                                    <td>
                                                        <label className={
                                                            item.status === "Đã huỷ" ? "badge badge-danger" : item.status === "Đã giao hàng" ? "badge badge-success" : item.status === "Đang vận chuyển" ? "badge badge-primary" : "badge badge-warning"
                                                        }>
                                                            {item.status === "Đã huỷ" ? "Đã huỷ" : item.status === "Đã giao hàng" ? "Đã giao hàng" : item.status === "Đang vận chuyển" ? "Đang vận chuyển" : "Đang chờ xác nhận"}
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <NavLink to={"/orders/" + item.nameUser} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
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
