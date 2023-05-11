import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchOrderList, fetchSearchOrder } from 'Apis'
const Index = () => {
    const [optionSelect, setOptionSelect] = useState(["Being transported", "Payment information confirmed", "Delivered to the carrier", "Ordered", "Delivery successful", "Đã huỷ"])
    const [orderList, setOrderList] = useState()
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(0)
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = year + '-' + month + "-" + day;
    const [dateEnd, setDateEnd] = useState(today)
    useEffect(() => {
        fetchOrderList(1)
            .then(result => {
                console.log(result.data)
                setOrderList(result.data)
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1)
                }
                else {
                    setCountMaxPage(Math.floor(result.total / 10))
                }
            })
    }, []);
    const hanldSetPage = (count) => {
        setOrderList()
    }
    const [searchData, setSearchData] = useState({ orderId: "", status: "", firstDate: "", endDate: today })
    const handleOptionSelected = (e) => {
        setOrderList()
        if (e.target.value !== null) {
            setSearchData({ ...searchData, status: e.target.value })
            fetchSearchOrder({ ...searchData, status: e.target.value }, countPage)
                .then(result => {
                    setOrderList(result.data)
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
    const handleOptionDate = (e) => {
        setOrderList()
        const { name, value } = e.target
        if (name === "firstDate") {
            setSearchData({ ...searchData, firstDate: e.target.value })
            fetchSearchOrder({ ...searchData, firstDate: e.target.value }, countPage)
                .then(result => {
                    setOrderList(result.data)
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
        } else {
            setSearchData({ ...searchData, endDate: e.target.value })
            setDateEnd(e.target.value)
            fetchSearchOrder({ ...searchData, endDate: e.target.value }, countPage)
                .then(result => {
                    setOrderList(result.data)
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
    console.log(searchData)
    const handleSearchName = (e) => {
        setOrderList()
        setSearchData({ ...searchData, orderId: e.target.value })
        fetchSearchOrder({ ...searchData, orderId: e.target.value }, countPage)
                .then(result => {
                    setOrderList(result.data)
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
                                        <input onChange={handleSearchName} style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Mã đơn hàng" aria-label="Mã đơn hàng" />
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
                                    <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input type="date" name="firstDate" onChange={handleOptionDate} style={{ borderRadius: "15px" }} className='form-control'
                                            min="1900-01-01" />
                                    </ul>
                                    <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input type="date" name="endDate" onChange={handleOptionDate} style={{ borderRadius: "15px" }} className='form-control'
                                            value={dateEnd} min="1900-01-01" />
                                    </ul>

                                </div>
                                {orderList ? <>
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
                                                {orderList && orderList.map((item, index) => {
                                                    return <tr className="table" key={index}>
                                                        <td>{item.orderId}</td>
                                                        <td>
                                                            {item.username}
                                                        </td>
                                                        <td>
                                                            {item.product[0].nameProduct}
                                                        </td>
                                                        <td>
                                                            {item.sumOrder}
                                                        </td>
                                                        <td>
                                                            {item.shipping_process[0].time} {item.shipping_process[0].date}
                                                        </td>
                                                        <td>
                                                            <label className={
                                                                item.status === "Đã huỷ" ? "badge badge-danger" : item.status === "Delivery successful" ? "badge badge-success" : item.status === "Being transported" ? "badge badge-primary" : item.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                            }>
                                                                {item.status}
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <NavLink to={"/orders/" + item._id} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
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
