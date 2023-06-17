import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "assets/scss/Banner-Ads/Banner-Slide/Banner-Slide.scss"
import { fetchListOfUser, fetchSearchUser } from 'Apis'
import Footer from "components/Footer"
import NoAuth from 'components/Error/No-Auth'
const Index = () => {
    const [userList, setUserList] = useState()
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [authentication, setAuthentication] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [search, setSearch] = useState({ email: '', status: '', sort: 'asc' })

    useEffect(() => {
        fetchListOfUser(1)
            .then(result => {
                setUserList(result.data)
                setLoading(false)
                setAuthentication(result.role)
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
                    setAuthentication(null)
                }
                console.log(error)
                setLoading(false)
            })
    }, [])

    const handleSetPage = (count) => {
        setUserList()
        setCountPage(count)
        fetchSearchUser(search, count)
            .then(result => {
                setUserList(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSearchUser = (e) => {
        const { name, value } = e.target
        setUserList()
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearch({ ...search, [name]: value })
                fetchSearchUser({ ...search, [name]: value }, 1)
                    .then((result) => {
                        console.log(result)
                        setUserList(result.data);
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

    const handleSort = () => {
        setUserList()
        setSearch({ ...search, sort: search.sort === 'asc' ? 'desc' : 'asc' })
        fetchSearchUser({ ...search, sort: search.sort === 'asc' ? 'desc' : 'asc' }, 1)
            .then((result) => {
                setUserList(result.data);
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
                <div className="row">
                    {loading === false ?
                        <div className="col-lg-12 stretch-card">
                            <div className="card">
                                {(authentication === 'MANAGEMENT' || authentication === 'DEVELOPER' || authentication === 'CEO') &&
                                    <div className="card-body">
                                        <h4 className="card-title">List of User</h4>
                                        <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                            <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                                <p className="card-description" style={{ margin: "0" }}>
                                                    Search:
                                                </p>
                                            </div>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <input
                                                    style={{ borderRadius: "15px" }}
                                                    type="text"
                                                    name="email"
                                                    onChange={e => handleSearchUser(e)}
                                                    nBlur={() => setInputFocused(false)}
                                                    onFocus={() => setInputFocused(true)}
                                                    className="form-control"
                                                    placeholder="Email"
                                                    aria-label="Email"
                                                />
                                            </ul>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <li className="nav-item nav-search d-lg-block">
                                                    <div className="input-group">
                                                        <select name="status" style={{ borderRadius: "15px" }} onChange={e => handleSearchUser(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                            <option value=''>All</option>
                                                            <option value='true'>Active</option>
                                                            <option value='false'>Deactivate</option>
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>

                                        </div>
                                        {userList ? <>
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Image</th>
                                                            <th>Orders purchased{search.sort === 'asc' ?
                                                                <i className="mdi mdi-arrow-down" style={{ cursor: "pointer" }} onClick={handleSort} />
                                                                :
                                                                <i className="mdi mdi-arrow-up" style={{ cursor: "pointer" }} onClick={handleSort} />}</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userList && userList.map((item, index) => {
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
                                                                    <NavLink to={"/user/" + item._id} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
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
                                        </> :
                                            <>
                                                <style dangerouslySetInnerHTML={{
                                                    __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                                                }} />
                                                <div className="loader" />
                                            </>}
                                    </div>
                                }
                                {authentication === 'CEO' &&
                                    <>
                                        {/* <div className="card-body">
                                            <h4 className="card-title">List of Employee</h4>
                                            <PageChartSalary />
                                        </div> */}
                                        {/* <div className="card-body">
                                            <PageChartEmployee />
                                        </div> */}
                                    </>
                                }
                                {authentication === null &&
                                    <NoAuth />
                                }
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
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;

