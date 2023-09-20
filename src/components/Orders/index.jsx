import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchListOfOrder, fetchSearchOrder } from 'Apis'
import { StateContext } from 'components/Context'
import Footer from "components/Footer"
import NoAuth from 'components/Error/No-Auth'
import Chart from 'components/Orders/Chart'

const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const state = useContext(StateContext)
    const optionSelect = ["Being transported", "Payment information confirmed", "Delivered to the carrier", "Ordered", "Delivery successful", "Cancel", "Delivery failed"]
    const [orderList, setOrderList] = useState()
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = year + '-' + month + "-" + day;
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [searchOrder, setSearchOrder] = useState({ orderId: "", status: "", firstDate: "", endDate: today, sortDate: 'asc' })
    const [error, setError] = useState(null)
    useEffect(() => {
        fetchListOfOrder(1)
            .then(result => {
                state.setAuthentication(result.role)
                setOrderList(result.data)
                setLoading(false)
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1)
                } else if (result.total === 0) {
                    setCountMaxPage(1)
                }
                else {
                    setCountMaxPage(Math.floor(result.total / 10))
                }
            })
            .catch(error => {
                if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                    state.setAuthentication(state.authentication ? state.authentication : null)
                }
                console.log(error)
                setError(error.response.status)
                setLoading(false)
            })
    }, [state]);
    const handleSetPage = (count) => {
        setOrderList()
        setCountPage(count)
        fetchSearchOrder(searchOrder, count)
            .then(result => {
                setOrderList(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSearchOrder = (e) => {
        const { name, value } = e.target
        setOrderList()
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearchOrder({ ...searchOrder, [name]: value })
                fetchSearchOrder({ ...searchOrder, [name]: value }, 1)
                    .then((result) => {
                        setOrderList(result.data);
                        if (0 < result.total % 10 && result.total % 10 < 10) {
                            setCountMaxPage(Math.floor(result.total / 10) + 1);
                        } else if (result.total === 0) {
                            setCountMaxPage(1);
                        } else {
                            setCountMaxPage(Math.floor(result.total / 10));
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 1000);

            setSearchTimeout(timeoutId);
        }
    }

    const handleSortDate = () => {
        setOrderList()
        setSearchOrder({ ...searchOrder, sortDate: searchOrder.sortDate === 'asc' ? 'desc' : 'asc' })
        fetchSearchOrder({ ...searchOrder, sortDate: searchOrder.sortDate === 'asc' ? 'desc' : 'asc' }, 1)
            .then((result) => {
                setOrderList(result.data);
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1);
                } else if (result.total === 0) {
                    setCountMaxPage(1);
                } else {
                    setCountMaxPage(Math.floor(result.total / 10));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (

        <div className="main-panel">
            <div className="content-wrapper">
                {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'ORDER') ?
                    <>
                        {loading === false ?
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Order List</h4>
                                        <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                            <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                                <p className="card-description" style={{ margin: "0" }}>
                                                    Search :
                                                </p>
                                            </div>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <input name='orderId' onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Order ID" aria-label="Order ID" />
                                            </ul>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <li className="nav-item nav-search d-lg-block">
                                                    <div className="input-group">
                                                        <select name='status' style={{ borderRadius: "15px" }} onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                            <option value=''>All</option>\
                                                            {optionSelect.map((item, index) => {
                                                                return <option key={index} value={item}>{item}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <input type="date" name="firstDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} className='form-control'
                                                    min="1900-01-01" />
                                            </ul>
                                            <ul className="col-lg-2 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <input type="date" name="endDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} className='form-control'
                                                    value={searchOrder.endDate} min="1900-01-01" />
                                            </ul>

                                        </div>
                                        {orderList ? <>
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Order ID
                                                            </th>
                                                            <th>
                                                                Purchaser
                                                            </th>
                                                            <th>
                                                                Product
                                                            </th>
                                                            <th>
                                                                Total
                                                            </th>
                                                            <th>
                                                                Order Date{searchOrder.sortDate === 'asc' ?
                                                                    <i className="mdi mdi-arrow-up" style={{ cursor: "pointer" }} onClick={handleSortDate} />
                                                                    :
                                                                    <i className="mdi mdi-arrow-down" style={{ cursor: "pointer" }} onClick={handleSortDate} />}
                                                            </th>
                                                            <th>
                                                                Status
                                                            </th>
                                                            <th>
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderList && orderList.map((item, index) => {
                                                            return <tr className="table" key={index}>
                                                                <td>{item.orderId.toUpperCase()}</td>
                                                                <td>
                                                                    {item.username}
                                                                </td>
                                                                <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {item.product[0].nameProduct}
                                                                </td>
                                                                <td>
                                                                    {formatter.format(item.sumOrder + item.ship)} VND
                                                                </td>
                                                                <td>
                                                                    {item.shipping_process[item.shipping_process.length - 1].time} {item.shipping_process[item.shipping_process.length - 1].date}
                                                                </td>
                                                                <td>
                                                                    <label className={
                                                                        item.status === "Cancel" ? "badge badge-danger" : item.status === "Delivery failed" ? "badge badge-danger" : item.status === "Delivery successful" ? "badge badge-success" : item.status === "Being transported" ? "badge badge-primary" : item.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                                    }>
                                                                        {item.status}
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <NavLink to={"/orders/" + item.orderId} ><button type="button" className="btn btn-outline-secondary btn-fw">Show</button></NavLink>
                                                                </td>
                                                            </tr>
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="btn-group" style={{ "display": "flex", "justifyContent": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                                {countPage > 1 && <button type="button" onClick={() => handleSetPage(1)} className="btn btn-outline-secondary">1</button>}
                                                {countPage > 3 && <input type="text" className="btn btn-outline-secondary input-as-button" placeholder='...' />}
                                                {countPage - 1 > 1 && <button type="button" onClick={() => handleSetPage(countPage - 1)} className="btn btn-outline-secondary">{countPage - 1}</button>}
                                                <button type="button" className="btn btn-outline-secondary active">{countPage}</button>
                                                {countPage + 1 < countMaxPage && <button type="button" onClick={() => handleSetPage(countPage + 1)} className="btn btn-outline-secondary">{countPage + 1}</button>}
                                                {countMaxPage - countPage > 2 && <input type="text" className="btn btn-outline-secondary input-as-button" placeholder='...' />}
                                                {countPage !== countMaxPage && <button type="button" onClick={() => handleSetPage(countMaxPage)} className="btn btn-outline-secondary">{countMaxPage}</button>}
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
                            :
                            <>
                                <style dangerouslySetInnerHTML={{
                                    __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                                }} />
                                <div className="loader" />
                            </>
                        }
                    </>
                    :
                    state.authentication === 'CEO' ? <div className="col-lg-12 grid-margin">
                    <Chart />
                </div> :
                <div className="col-lg-12 grid-margin stretch-card">
                <NoAuth error={error} />
            </div>
                }
                {/* {
                }
                {(state.authentication !== 'MANAGEMENT' || state.authentication !== 'ORDER' || state.authentication.toString() !== 'CEO') &&
                    
                } */}
            </div>
            <Footer />

        </div>
    );
}

export default Index;