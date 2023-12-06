import React, { useState, useEffect, memo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'assets/scss/Information-Order.css'
import Swal from 'sweetalert2'
import Footer from "components/Footer"
import { fetchUser, fetchUpdateStatusUser } from 'Apis/index'

const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState()
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const optionSelect = ["Being transported", "Payment information confirmed", "Delivered to the carrier", "Ordered", "Delivery successful", "Đã huỷ"]
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = year + '-' + month + "-" + day;
    const [endDate, setEndDate] = useState()
    const [orderList, setOrderList] = useState([])
    const [orderSearch, setOrderSearch] = useState([])
    const [searchOrder, setSearchOrder] = useState({ orderId: '', status: '', firstDate: '', endDate: endDate })
    const itemsPerPage = 10;
    const startIndex = (countPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, orderSearch.length)

    useEffect(() => {
        setEndDate(today)
        fetchUser(params.id)
            .then(result => {
                setUser(result)
                setOrderList(result.orders)
                console.log(result.orders)
                setOrderSearch(result.orders)
                if (0 < result.orders.length % 10 && result.orders.length % 10 < 10) {
                    setCountMaxPage(Math.floor(result.orders.length / 10) + 1)
                } else if (result.orders.length === 0) {
                    setCountMaxPage(1)
                }
                else {
                    setCountMaxPage(Math.floor(result.orders.length / 10))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [params, today]);

    const handleSetPageOrder = (count) => {
        setCountPage(count)
    }

    const handleDeactivateAccount = () => {
        Swal.fire({
            title: 'Do you agree to update status user??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Updating...',
                    html: 'Please wait...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });
                fetchUpdateStatusUser(params.id, { status: !user.status })
                    .then(result => {
                        Swal.fire({
                            title: 'Successfully!',
                            text: 'You have successfully updated user!',
                            icon: 'success',
                            confirmButtonText: 'OK!'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    setUser({ ...user, status: !user.status })
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            title: `Error ${error.response.status}`,
                            text: 'There seems to be a problem with the connection to the server, please try again later',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    })
            }
        })
    }

    const handleSearchOrder = (e) => {
        const { name, value } = e.target
        setSearchOrder({ ...searchOrder, [name]: value })
        setCountPage(1)
        const arr = { ...searchOrder, [name]: value }
        const orderSearch2 = orderList.filter((order) => {
            const { orderId, status, firstDate, endDate } = arr;
            if (orderId && !order.orderId.includes(orderId)) {
                return false;
            }
            if (status && order.status !== status) {
                return false;
            }
            if (firstDate && endDate) {
                const orderDate = new Date(order.shipping_process[0].date);
                const startDate = new Date(firstDate);
                const endDateObj = new Date(endDate);
                if (orderDate < startDate || orderDate > endDateObj) {
                    return false;
                }
            }
            return true;
        })
        setOrderSearch(orderSearch2)
        if (0 < orderSearch2.length % 10 && orderSearch2.length % 10 < 10) {
            setCountMaxPage(Math.floor(orderSearch2.length / 10) + 1)
        } else if (orderSearch2.length === 0) {
            setCountMaxPage(1)
        }
        else {
            setCountMaxPage(Math.floor(orderSearch2.length / 10))
        }
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Customer details</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card" style={{ "marginBottom": "25px" }}>
                            {user ? <div className="card-body">
                                <h4 className="card-title">Customer information: {user.username}</h4>
                                <div className='row'>
                                    <div className="col-lg-6 grid-margin form-group" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div className="form-group">
                                            <img src={user.image} style={{ width: "300px", borderRadius: "50%" }} alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 grid-margin form-group">
                                        <h4>Delivery information</h4>
                                        <div className="form-group">
                                            <label>Username:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="username" aria-label="username" value={user.username} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone number:</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Phone number" aria-label="Phone number" value={user.phoneNumber} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Delivery address</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Delivery address" aria-label="Delivery address" value={user.address} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Email" aria-label="Email" value={user.email} disabled />
                                        </div>
                                        <div className="form-group">
                                            {user.status ? <>
                                                <div className="row" style={{ margin: "0 auto" }}>
                                                    <label className="badge badge-success">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="col-lg-6 form-group" style={{ padding: "10px 0" }}>
                                                    <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Deactivate the account</button>
                                                </div>
                                            </>
                                                : <>
                                                    <div className="row" style={{ margin: "0 auto" }}>
                                                        <label className="badge badge-danger">
                                                            Deactivate
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 form-group" style={{ padding: "10px 0" }}>
                                                        <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Recover account</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h4>Order List ( {user.orders.length} Orders purchased )</h4>
                                    <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                        <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                            <p className="card-description" style={{ margin: "0" }}>
                                                Search :
                                            </p>
                                        </div>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <input name='orderId' onChange={e => handleSearchOrder(e)} style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Order ID" aria-label="Order ID" />
                                        </ul>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <li className="nav-item nav-search d-lg-block">
                                                <div className="input-group">
                                                    <select name='status' style={{ borderRadius: "15px" }} onChange={e => handleSearchOrder(e)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                        <option value=''>All</option>\
                                                        {optionSelect.map((item, index) => {
                                                            return <option key={index} value={item}>{item}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <input type="date" name="firstDate" onChange={e => handleSearchOrder(e)} style={{ borderRadius: "15px" }} className='form-control'
                                                min="1900-01-01" />
                                        </ul>
                                        <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <input type="date" value={searchOrder.endDate} name="endDate" onChange={e => handleSearchOrder(e)} style={{ borderRadius: "15px" }} className='form-control'
                                                min="1900-01-01" />
                                        </ul>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        OrderId
                                                    </th>
                                                    <th>
                                                        Image
                                                    </th>
                                                    <th>
                                                        Quantity
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Total
                                                    </th>
                                                    <th>
                                                        Order date
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderSearch.slice(startIndex, endIndex).map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>
                                                            <NavLink to={"/orders/" + item.orderId} style={{ color: "#57b657", textDecoration: "none" }}>{item.orderId}</NavLink>
                                                        </td>
                                                        <td>
                                                            <img src={item.product[0].img} className="img-fluid" alt="" style={{ width: "60px", height: "60px" }} />
                                                        </td>
                                                        <td>
                                                            {item.product[0].quantity}
                                                        </td>
                                                        <td>
                                                            {formatter.format(item.product[0].nowPrice)} VND
                                                        </td>
                                                        <td>
                                                            {formatter.format(item.sumOrder + item.ship)} VND
                                                        </td>
                                                        <td>
                                                            {item.shipping_process[0].date}
                                                        </td>
                                                        <td>
                                                            <label
                                                                className={item.status === "Cancel" ? "badge badge-danger" :
                                                                    item.status === "Payment information confirmed" ? "badge badge-warning" :
                                                                        item.status === "Delivery successful" ? "badge badge-success" :
                                                                            item.status === "Ordered" ? "badge badge-warning" : "badge badge-primary"
                                                                }
                                                                style={{ marginRight: "10px" }}>
                                                                {item.status}
                                                            </label>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="btn-group" style={{ "display": "flex", "justifyContent": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                        {countPage > 1 && <button type="button" onClick={() => handleSetPageOrder(1)} className="btn btn-outline-secondary">1</button>}
                                        {countPage > 3 && <input type="text" className="btn btn-outline-secondary input-as-button" placeholder='...' />}
                                        {countPage - 1 > 1 && <button type="button" onClick={() => handleSetPageOrder(countPage - 1)} className="btn btn-outline-secondary">{countPage - 1}</button>}
                                        <button type="button" className="btn btn-outline-secondary active">{countPage}</button>
                                        {countPage + 1 < countMaxPage && <button type="button" onClick={() => handleSetPageOrder(countPage + 1)} className="btn btn-outline-secondary">{countPage + 1}</button>}
                                        {countMaxPage - countPage > 2 && <input type="text" className="btn btn-outline-secondary input-as-button" placeholder='...' />}
                                        {countPage !== countMaxPage && <button type="button" onClick={() => handleSetPageOrder(countMaxPage)} className="btn btn-outline-secondary">{countMaxPage}</button>}
                                    </div>
                                </div>
                            </div>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default memo(Index);
