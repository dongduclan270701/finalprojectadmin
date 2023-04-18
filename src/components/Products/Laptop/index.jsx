import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fetchCollectingByName } from 'Apis'

const Index = () => {
    const [collecting, setCollecting] = useState([])
    const [optionSelectLaptop, setOptionSelectLaptop] = useState([])
    const [optionSelectCollectingCPU, setOptionSelectCollectingCPU] = useState([])

    const [optionSelectCollectingRanger, setOptionSelectCollectingRanger] = useState([])

    const [optionSelectCollecting, setOptionSelectCollecting] = useState([])

    const [product, setProduct] = useState([
        {
            id: 1,
            nameProduct: "abc1",
            category: ["danh muc 1", "danh muc 2", "danh muc 3", "danh muc 4"],
            quantity: 2,
            src: "abc1"
        },
        {
            id: 2,
            nameProduct: "abc2",
            category: ["danh muc 11", "danh muc 21", "danh muc 31", "danh muc 41"],
            quantity: 11,
            src: "abc2"
        },
        {
            id: 3,
            nameProduct: "abc3",
            category: ["danh muc 12", "danh muc 22", "danh muc 32", "danh muc 42"],
            quantity: 0,
            src: "abc3"
        }
    ])

    useEffect(() => {
        fetchCollectingByName("Laptop")
            .then(result => {
                setCollecting(result.category)
                result.category.map((item, index) => {
                    if (item.name === "Thương hiệu" || item.name === "Laptop nhu cầu" || item.name === "Linh kiện & phụ kiện Laptop") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectLaptop(optionSelectLaptop => [...optionSelectLaptop, ...category])
                    }
                    else if (item.name === "Laptop theo giá bán") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectCollectingRanger(optionSelectCollectingRanger => [...optionSelectCollectingRanger, ...category])
                    } else if (item.name === "Laptop theo CPU") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectCollectingCPU(optionSelectCollectingCPU => [...optionSelectCollectingCPU, ...category])
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    const handleOptionSelected = (e) => {
        console.log(collecting)
        if (e.target.value !== null) {
            const findIndexOptionSelectCollecting = collecting.findIndex(index => index.name === "Thương hiệu")
            const findIndexOptionSelectCollectingCategory = collecting[findIndexOptionSelectCollecting].collecting.findIndex(index => index.name === e.target.value)
            if (findIndexOptionSelectCollectingCategory >= 0) {
                const findOptionSelectCollectingCategory = collecting[findIndexOptionSelectCollecting].collecting[findIndexOptionSelectCollectingCategory].category.map((item, index) => {
                    return item
                })
                setOptionSelectCollecting(findOptionSelectCollectingCategory)
            }
            else {
                setOptionSelectCollecting([])
            }
        }
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách sản phẩm Laptop</h4>

                                <NavLink to={"/laptop/create"} className="card-description" style={{ textDecoration: "none" }}>
                                    <code><i className="mdi mdi-plus-circle-outline" />  Thêm sản phẩm mới</code>
                                </NavLink>
                                <p className="card-description" style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    Tìm kiếm sản phẩm
                                </p>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên sản phẩm" aria-label="Giá chính" />
                                    </ul>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} onChange={handleOptionSelected} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn danh mục</option>\
                                                    {optionSelectLaptop.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                    {optionSelectCollecting.length > 0 && <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn loại</option>\
                                                    {optionSelectCollecting.map((item, index) => {
                                                        return <option key={index} value={item.name}>{item.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                    }
                                    {optionSelectCollecting.length > 0 && optionSelectCollectingCPU.length > 0 && <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn loại CPU</option>\
                                                    {optionSelectCollectingCPU.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                    }
                                    {optionSelectCollecting.length > 0 && optionSelectCollectingRanger.length > 0 && <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn mức giá</option>\
                                                    {optionSelectCollectingRanger.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                    }

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Danh mục</th>
                                                <th>Số lượng</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nameProduct}</td>
                                                    <td>
                                                        {item.category}
                                                    </td>
                                                    <td>
                                                        {item.quantity}
                                                    </td>
                                                    <td>

                                                        <label className={
                                                            item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                                        }>
                                                            {item.quantity === 0 ? "Hết hàng" : item.quantity >= 10 ? "Còn hàng" : 0 < item.quantity < 10 ? "Sắp hết" : null}
                                                        </label>

                                                    </td>
                                                    <td>
                                                        <NavLink to={"/laptop/" + item.src} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
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
