import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "assets/scss/Banner-Ads/Banner-Slide/Banner-Slide.scss"
import Footer from "components/Footer"
import { fetchListOfVoucher, fetchSearchVoucher } from 'Apis'
import NoAuth from 'components/Error/No-Auth'
import { StateContext } from 'components/Context'
import PageChartDiscount from 'components/Discount/Page-Chart/index2'
const Index = () => {
    const state = useContext(StateContext)
    const optionSelect = ["Active", "Deactivate"]
    const [voucherList, setVoucherList] = useState()
    const [loading, setLoading] = useState(true)
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [search, setSearch] = useState({ code: "", status: "" })
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchListOfVoucher(1)
            .then(result => {
                setVoucherList(result.data)
                setLoading(false)
                state.setAuthentication(result.role)
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
                    state.setAuthentication(state.authentication !== null ? state.authentication : null)
                }
                setError(error.response.status)
                setLoading(false)
            })
    }, [state])

    const handleSetPage = (count) => {
        setVoucherList()
        setCountPage(count)
        fetchSearchVoucher(search, count)
            .then((result) => {
                setVoucherList(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSearchVoucher = (e) => {
        setVoucherList()
        setCountPage(1)
        const { name, value } = e.target;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearch({ ...search, [name]: value })
                fetchSearchVoucher({ ...search, [name]: value }, 1)
                    .then((result) => {
                        setVoucherList(result.data);
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
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                {loading === false ?
                    <div className="col-lg-12 stretch-card">
                        {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'SALES') &&
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List of Discount Codes</h4>
                                    <NavLink to={"/discount/create"} style={{ textDecoration: "none" }} className="card-description">
                                        <code><i className="mdi mdi-plus-circle-outline" />  Add New Discount Code</code>
                                    </NavLink>
                                    <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                        <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                            <p className="card-description" style={{ margin: "0" }}>
                                                Search:
                                            </p>
                                        </div>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <input
                                                name='code'
                                                style={{ borderRadius: "15px" }}
                                                type="text"
                                                onChange={handleSearchVoucher}
                                                nBlur={() => setInputFocused(false)}
                                                onFocus={() => setInputFocused(true)}
                                                className="form-control"
                                                placeholder="Code"
                                                aria-label="Code" />
                                        </ul>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <li className="nav-item nav-search d-lg-block">
                                                <div className="input-group">
                                                    <select name='status' style={{ borderRadius: "15px" }} onChange={handleSearchVoucher} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search">
                                                        <option value=''>All</option>\
                                                        {optionSelect.map((item, index) => {
                                                            return <option key={index} value={item}>{item}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {voucherList ? voucherList.length === 0 ?
                                        <div className="row flex-grow">
                                            <div className="col-lg-7 mx-auto">
                                                <div className="row mt-5">
                                                    <div className="col-12 text-center mt-xl-2">
                                                        <h2>SORRY!</h2>
                                                        <h3 className="font-weight">No discount codes available yet!</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Date Create</th>
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            <th>Usage</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {voucherList.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>{item.code}</td>
                                                                <td>
                                                                    {item.dateCreated}
                                                                </td>
                                                                <td>
                                                                    {item.startDate}
                                                                </td>
                                                                <td>
                                                                    {item.endDate}
                                                                </td>
                                                                <td>
                                                                    {item.usage}
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                        {item.status ? (
                                                                            <>
                                                                                <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                                                    Active
                                                                                </label>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                                                    Deactivate
                                                                                </label>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <NavLink to={"/discount/" + item.discountId} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
                                                                </td>
                                                            </tr>
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="btn-group" style={{ display: "flex", justifyContent: "center", width: "fit-content", margin: "auto" }} role="group" aria-label="Basic example">
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
                                        </>}
                                </div>
                            </div>
                        }
                        {state.authentication === 'CEO' &&
                            <>
                                {/* <div className="card-body">
                                            <h4 className="card-title">List of Employee</h4>
                                            <PageChartSalary />
                                        </div> */}
                                <div className="card-body">
                                            <PageChartDiscount />
                                        </div>
                            </>
                        }
                        {state.authentication === null &&
                            <NoAuth error={error}/>
                        }

                    </div>
                    :
                    <>
                        <style dangerouslySetInnerHTML={{
                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                        }} />
                        <div className="loader" />
                    </>
                }
            </div>
            <Footer />
        </div>
    );
}

export default Index;
