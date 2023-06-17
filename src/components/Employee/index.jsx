import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchListOfEmployee, fetchSearchEmployee } from 'Apis'
import NoAuth from 'components/Error/No-Auth'
import Footer from "components/Footer"
// import PageChartSalary from 'components/Employee/Page-Chart/Salary'
import PageChartEmployee from 'components/Employee/Page-Chart/Employees'
const Index = () => {
    const [employeeList, setEmployeeList] = useState()
    const [authentication, setAuthentication] = useState(null)
    const [loading, setLoading] = useState(true)
    const role = ['CEO', 'PRODUCT', 'ORDER', 'EMPLOYEE', 'DEVELOPER', 'MANAGEMENT']
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [search, setSearch] = useState({ email: "", role: "", status: "" })
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        fetchListOfEmployee(1)
            .then(result => {
                setAuthentication(result.role)
                setLoading(false)
                setEmployeeList(result.data)
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
                console.log(error)
                if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                    setAuthentication(null)
                }
                setLoading(false)
            })
    }, [])

    const handleSetPage = (count) => {
        setEmployeeList()
        setCountPage(count)
        fetchSearchEmployee(search, count)
            .then(result => {
                setEmployeeList(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSearchEmployee = (e) => {
        setEmployeeList()
        const { name, value } = e.target;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearch({ ...search, [name]: value })
                fetchSearchEmployee({ ...search, [name]: value }, 1)
                    .then((result) => {
                        setEmployeeList(result.data);
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
    };


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    {loading === false ?
                        <div className="col-lg-12 stretch-card">
                            <div className="card">
                                {(authentication === 'MANAGEMENT' || authentication === 'DEVELOPER') &&
                                    <div className="card-body">
                                        <h4 className="card-title">List of Employee</h4>
                                        <NavLink to={"/employee/create"} className="card-description" style={{ textDecoration: "none" }}>
                                            <code><i className="mdi mdi-plus-circle-outline" />  Add new staff</code>
                                        </NavLink>
                                        <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                            <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                                <p className="card-description" style={{ margin: "0" }}>
                                                    Search :
                                                </p>
                                            </div>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <input
                                                    style={{ borderRadius: "15px" }}
                                                    name="email"
                                                    onChange={e => handleSearchEmployee(e)}
                                                    nBlur={() => setInputFocused(false)}
                                                    onFocus={() => setInputFocused(true)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    aria-label="Email" />
                                            </ul>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <li className="nav-item nav-search d-lg-block">
                                                    <div className="input-group">
                                                        <select style={{ borderRadius: "15px" }} name="role" onChange={e => handleSearchEmployee(e)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                            <option value="">All</option>\
                                                            {role.map((item, index) => {
                                                                return <option key={index} value={item}>{item}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                                <li className="nav-item nav-search d-lg-block">
                                                    <div className="input-group">
                                                        <select onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} name="status" onChange={e => handleSearchEmployee(e)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                            <option value="">All</option>\
                                                            <option value={true}>Active</option>
                                                            <option value={false}>Deactivate</option>
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {employeeList ? <>
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Name
                                                            </th>
                                                            <th>
                                                                Email
                                                            </th>
                                                            <th>
                                                                Role
                                                            </th>
                                                            <th>
                                                                Image
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
                                                        {employeeList && employeeList.map((item, index) => {
                                                            return <tr className="table" key={index}>
                                                                <td>{item.username}</td>
                                                                <td>
                                                                    {item.email}
                                                                </td>
                                                                <td>
                                                                    {item.role}
                                                                </td>
                                                                <td>
                                                                    <img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} />
                                                                </td>
                                                                <td>
                                                                    {item.status ? <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                                        Active
                                                                    </label>
                                                                        :
                                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                                            Deactivate
                                                                        </label>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <NavLink to={"/employee/" + item._id} ><button type="button" className="btn btn-outline-secondary btn-fw">Show</button></NavLink>
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
                                }

                                {authentication === 'CEO' &&
                                    <>
                                        {/* <div className="card-body">
                                            <h4 className="card-title">List of Employee</h4>
                                            <PageChartSalary />
                                        </div> */}
                                        <div className="card-body">
                                            <PageChartEmployee />
                                        </div>
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
