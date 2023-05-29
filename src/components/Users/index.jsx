import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "assets/scss/Banner-Ads/Banner-Slide/Banner-Slide.scss"
import faceUser from "assets/images/faces/face28.jpg"
import { fetchListOfUser } from 'Apis'
const Index = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [optionSelect, setOptionSelect] = useState(["Hoạt động", "Khoá"])
    const [userList, setUserList] = useState()
    const [optionSelected, setOptionSelected] = useState("")
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)

    useEffect(() => {
        fetchListOfUser(countPage)
            .then(result => {
                setUserList(result.data)
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
    }, [])

    const handleSetPage = (count) => {
        setUserList()
        setCountPage(count)
        fetchListOfUser(count)
            .then(result => {
                setUserList(result.data)
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
                                <h4 className="card-title">Danh sách Người dùng</h4>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                        <p className="card-description" style={{ margin: "0" }}>
                                            Tìm kiếm:
                                        </p>
                                    </div>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên người dùng" aria-label="Tên người dùng" />
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
                                                {/* <th>Id</th> */}
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Hình ảnh</th>
                                                <th>Đơn hàng đã mua</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userList ? userList.map((item, index) => {
                                                return <tr key={index}>
                                                    {/* <td>{item.id}</td> */}
                                                    <td>{item.username}</td>
                                                    <td>
                                                        {item.email}
                                                    </td>
                                                    <td>
                                                        <img src={item.image} className="img-fluid" alt="" style={{ width: "80px", height: "80px", borderRadius: "0%" }} />
                                                    </td>
                                                    <td>
                                                        {item.orders.length}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                            {item.status ? (
                                                                <>
                                                                    <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                                        Hoạt động
                                                                    </label>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                                        Khoá
                                                                    </label>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <NavLink to={"/user/" + item.email} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
                                                    </td>
                                                </tr>
                                            }) :
                                                <>
                                                    <style dangerouslySetInnerHTML={{
                                                        __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                                                    }} />
                                                    <div className="loader" />
                                                </>}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-group" style={{ "display": "flex", "justifyContent": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                    {countPage - 1 > 0 ? <button type="button" onClick={() => { handleSetPage(countPage - 1) }} className="btn btn-outline-secondary">{countPage - 1}</button> : null}
                                    <button type="button" className="btn btn-outline-secondary active">{countPage}</button>
                                    {countPage + 1 < countMaxPage ? <button type="button" onClick={() => { handleSetPage(countPage + 1) }} className="btn btn-outline-secondary">{countPage + 1}</button> : null}
                                    {countMaxPage > 3 ? <button type="button" className="btn btn-outline-secondary">...</button> : null}
                                    {countPage === countMaxPage ? null : <button type="button" onClick={() => { handleSetPage(countMaxPage) }} className="btn btn-outline-secondary">{countMaxPage}</button>}
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
