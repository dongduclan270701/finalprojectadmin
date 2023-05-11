import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { fetchCollectingByName, fetchlaptopCollecting, fetchSearchLaptopCollecting } from 'Apis'

const Index = () => {
    const [collecting, setCollecting] = useState([])
    const [optionSelectLaptop, setOptionSelectLaptop] = useState([])
    const [optionSelectCollectingCPU, setOptionSelectCollectingCPU] = useState([])
    const [optionSelectCollectingRanger, setOptionSelectCollectingRanger] = useState([])
    const [optionSelectCollecting, setOptionSelectCollecting] = useState([])
    const [searchData, setSearchData] = useState({ nameProduct: "", category: [[], [], [], []] })
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(0)
    const [product, setProduct] = useState()
    useEffect(() => {
        fetchCollectingByName("Laptop")
            .then(result => {
                setCollecting(result.category)
                result.category.map((item, index) => {
                    if (item.name === "Brand Name" || item.name === "Laptop needs" || item.name === "Laptop Components & Accessories") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectLaptop(optionSelectLaptop => [...optionSelectLaptop, ...category])
                    }
                    else if (item.name === "Laptop by price") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectCollectingRanger(optionSelectCollectingRanger => [...optionSelectCollectingRanger, ...category])
                    } else if (item.name === "Laptop by CPU") {
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

        fetchlaptopCollecting(1)
            .then(result => {
                setProduct(result.data)
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1)
                }
                else {
                    setCountMaxPage(Math.floor(result.total / 10))
                }
            })
    }, []);
    const hanldSetPage = (count) => {
        setProduct()
        if (JSON.stringify(searchData) === JSON.stringify({ nameProduct: "", category: [[], [], [], []] })) {
            console.log("ko Có data")
            fetchlaptopCollecting(count)
                .then(result => {
                    setProduct(result.data)
                    setCountPage(count)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
            
            
        } else {
            console.log("Có data")
            console.log(count)
            fetchSearchLaptopCollecting(searchData, count)
                .then(result => {
                    console.log(result)
                    setProduct(result.data)
                    setCountPage(count)
                    console.log(result.total % 10)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const handleOptionSelected = (e) => {
        const { name, value } = e.target
        setProduct()
        if (value !== null) {
            const findIndexOptionSelectCollecting = collecting.findIndex(index => index.name === "Brand Name")
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

        if (name === "category") {
            // setSearchData({...searchData, category: [value]})
            setCountPage(1)
            const newCategory = searchData.category.map((data, index) => index === 0 ? value : data)
            const newSearchData = { ...searchData, category: newCategory }
            setSearchData(newSearchData)
            fetchSearchLaptopCollecting(newSearchData, countPage)
                .then(result => {
                    setProduct(result.data)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }
    const handleOptionSelectedSecond = (e) => {
        const { name, value } = e.target
        setCountPage(1)
        setProduct()
        if (name === "nameProduct") {
            setSearchData({ ...searchData, nameProduct: value })
            fetchSearchLaptopCollecting({ ...searchData, [name]: value }, countPage)
                .then(result => {
                    setProduct(result.data)
                    
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                    // setCountMaxPage(result.maxPage)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (name === "categoryCollection") {

            const newCategory = searchData.category.map((data, index) => index === 1 ? value : data)
            const newSearchData = { ...searchData, category: newCategory }
            setSearchData(newSearchData)
            fetchSearchLaptopCollecting(newSearchData, countPage)
                .then(result => {
                    setProduct(result.data)
                    console.log(result.total % 10)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (name === "categoryCPU") {

            const newCategory = searchData.category.map((data, index) => index === 2 ? value : data)
            const newSearchData = { ...searchData, category: newCategory }
            setSearchData(newSearchData)
            fetchSearchLaptopCollecting(newSearchData, countPage)
                .then(result => {
                    setProduct(result.data)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if (name === "categoryRange") {
            const newCategory = searchData.category.map((data, index) => index === 3 ? value : data)
            const newSearchData = { ...searchData, category: newCategory }
            setSearchData(newSearchData)
            fetchSearchLaptopCollecting(newSearchData, countPage)
                .then(result => {
                    setProduct(result.data)
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1)
                    }
                    else {
                        setCountMaxPage(Math.floor(result.total / 10))
                    }
                })
                .catch(error => {
                    console.log(error)
                })
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
                                        <input name="nameProduct" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên sản phẩm" aria-label="Giá chính" />
                                    </ul>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select name="category" style={{ borderRadius: "15px" }} onChange={handleOptionSelected} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option>Chọn danh mục</option>
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
                                                <select name="categoryCollection" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option >Chọn loại</option>
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
                                                <select name="categoryCPU" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option ><p>Chọn loại CPU</p></option>
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
                                                <select name="categoryRange" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option defaultValue={null}>Chọn mức giá</option>
                                                    {optionSelectCollectingRanger.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>
                                    }

                                </div>
                                {product ?
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Ảnh sản phẩm</th>
                                                        <th>Danh mục</th>
                                                        <th>Số lượng</th>
                                                        <th>Trạng thái</th>
                                                        <th>Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.nameProduct}</td>
                                                            <td>
                                                                <img src={item.img[0]} className="img-fluid" alt="" style={{ width: "80px", height: "80px", borderRadius: "0%" }} />
                                                            </td>
                                                            <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {item.category.map((item, index) => { return item + ", " })}
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
                                        <div className="btn-group" style={{ "display": "flex", "justifyContent": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                            {countPage - 1 > 0 ? <button type="button" onClick={() => { hanldSetPage(countPage - 1) }} className="btn btn-outline-secondary">{countPage - 1}</button> : null}
                                            <button type="button" className="btn btn-outline-secondary active">{countPage}</button>
                                            {countPage + 1 < countMaxPage ? <button type="button" onClick={() => { hanldSetPage(countPage + 1) }} className="btn btn-outline-secondary">{countPage + 1}</button> : null}
                                            {countMaxPage > 3 ? <button type="button" className="btn btn-outline-secondary">...</button> : null}
                                            {countPage === countMaxPage ? null : <button type="button" onClick={() => { hanldSetPage(countMaxPage) }} className="btn btn-outline-secondary">{countMaxPage}</button>}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <style dangerouslySetInnerHTML={{
                                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                                        }} />
                                        <div className="loader" />
                                    </>
                                }
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
