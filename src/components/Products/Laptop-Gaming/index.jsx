import React, { useState, useEffect, useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    fetchCollectingByName,
    fetchListOfLaptopGamingCollecting,
    fetchSearchLaptopGamingCollecting
} from 'Apis'
import Footer from "components/Footer"
import NoAuth from 'components/Error/No-Auth'
import { StateContext } from 'components/Context'
import Chart from 'components/Products/Page-Chart'
import Swal from 'sweetalert2'
const Index = () => {
    const state = useContext(StateContext)
    const [collecting, setCollecting] = useState([])
    const [optionSelectLaptop, setOptionSelectLaptop] = useState([])
    const [optionSelectCollectingCPU, setOptionSelectCollectingCPU] = useState([])
    const [optionSelectCollectingRanger, setOptionSelectCollectingRanger] = useState([])
    const [optionSelectCollecting, setOptionSelectCollecting] = useState([])
    const [searchData, setSearchData] = useState({ nameProduct: "", category: ['', '', '', ''], sort: 'asc' })
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCollectingByName("Laptop Gaming")
            .then(result => {
                setCollecting(result.category)
                result.category.map((item, index) => {
                    if (item.name === "Brand Name" || item.name === "Category") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectLaptop(optionSelectLaptop => [...optionSelectLaptop, ...category])
                    }
                    else if (item.name === "GPU") {
                        const category = item.collecting.map((item, index) => {
                            return item.name
                        })
                        setOptionSelectCollectingRanger(optionSelectCollectingRanger => [...optionSelectCollectingRanger, ...category])
                    } else if (item.name === "CPU") {
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
        fetchListOfLaptopGamingCollecting(1)
            .then(result => {
                setProduct(result.data)
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
                setLoading(false)
                if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                    state.setAuthentication(state.authentication !== null ? state.authentication : null)
                }
                setError(error.response.status)
                console.log(error)
            })
    }, [state]);
    const handleSetPage = (count) => {
        setProduct()
        setCountPage(count)
        fetchSearchLaptopGamingCollecting(searchData, count)
            .then(result => {
                setProduct(result.data)
            })
            .catch(error => {
                Swal.fire({
                    title: "Ops!",
                    text: "Error connect to server!",
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
                console.log(error)
            })

    }
    const handleOptionSelected = (e) => {
        const { name, value } = e.target
        let newSearchData = ''
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
            setCountPage(1)
            newSearchData = { ...searchData, category: [value, '', '', ''] }
            setSearchData(newSearchData)
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            if (inputFocused) {
                const timeoutId = setTimeout(() => {
                    fetchSearchLaptopGamingCollecting(newSearchData, countPage)
                        .then(result => {
                            setProduct(result.data)
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
                            Swal.fire({
                                title: "Ops!",
                                text: "Error connect to server!",
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                            console.log(error)
                        })
                }, 1000);

                setSearchTimeout(timeoutId);
            }
        }
    }
    const handleOptionSelectedSecond = (e) => {
        const { name, value } = e.target
        setCountPage(1)
        setProduct()
        let newCategory = ''
        let newSearchData = ''
        if (name === "nameProduct") {
            newSearchData = { ...searchData, [name]: value }
        }
        if (name === "categoryCollection") {
            newCategory = searchData.category.map((data, index) => index === 1 ? value : data)
            newSearchData = { ...searchData, category: newCategory }
        }
        if (name === "categoryCPU") {
            newCategory = searchData.category.map((data, index) => index === 2 ? value : data)
            newSearchData = { ...searchData, category: newCategory }
        }
        if (name === "categoryRange") {
            newCategory = searchData.category.map((data, index) => index === 3 ? value : data)
            newSearchData = { ...searchData, category: newCategory }
        }
        setSearchData(newSearchData)
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                fetchSearchLaptopGamingCollecting(newSearchData, 1)
                    .then(result => {
                        setProduct(result.data)
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
                        Swal.fire({
                            title: "Ops!",
                            text: "Error connect to server!",
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                        console.log(error)
                    })
            }, 1000);
            setSearchTimeout(timeoutId);
        }
    }

    const handleSort = () => {
        setProduct()
        setCountPage(1)
        setSearchData({ ...searchData, sort: searchData.sort === 'asc' ? 'desc' : 'asc' })
        fetchSearchLaptopGamingCollecting({ ...searchData, sort: searchData.sort === 'asc' ? 'desc' : 'asc' }, 1)
            .then((result) => {
                setProduct(result.data);
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1);
                } else if (result.total === 0) {
                    setCountMaxPage(1);
                } else {
                    setCountMaxPage(Math.floor(result.total / 10));
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Ops!",
                    text: "Error connect to server!",
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
                console.log(error);
            });
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'PRODUCT') &&
                    <>{loading === false ?
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List of Laptop products</h4>
                                    <NavLink to={"/laptop-gaming/create"} className="card-description" style={{ textDecoration: "none" }}>
                                        <code><i className="mdi mdi-plus-circle-outline" />  Add new products</code>
                                    </NavLink>
                                    <p className="card-description" style={{ display: "flex", "justifyContent": "flex-end" }}>
                                        Search:
                                    </p>
                                    <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <input
                                                name="nameProduct"
                                                onChange={handleOptionSelectedSecond}
                                                nBlur={() => setInputFocused(false)}
                                                onFocus={() => setInputFocused(true)}
                                                style={{ borderRadius: "15px" }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Product Name"
                                                aria-label="Product Name" />
                                        </ul>
                                        <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                            <li className="nav-item nav-search d-lg-block">
                                                <div className="input-group">
                                                    <select name="category" style={{ borderRadius: "15px" }} onChange={handleOptionSelected} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                        <option value=''>Category ( All )</option>
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
                                                    <select name="categoryCollection" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                        <option value=''>Brand ( All )</option>
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
                                                    <select name="categoryCPU" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                        <option value=''><p>CPU ( All )</p></option>
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
                                                    <select name="categoryRange" onChange={handleOptionSelectedSecond} style={{ borderRadius: "15px" }} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                        <option value=''>GPU ( All )</option>
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
                                                            <th>Name</th>
                                                            <th>Image</th>
                                                            <th>Category</th>
                                                            <th>Quantity{searchData.sort === 'asc' ?
                                                                <i className="mdi mdi-arrow-down" style={{ cursor: "pointer" }} onClick={handleSort} />
                                                                :
                                                                <i className="mdi mdi-arrow-up" style={{ cursor: "pointer" }} onClick={handleSort} />}</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {product.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.nameProduct}</td>
                                                                <td>
                                                                    <img src={item.img[0]} className="img-fluid" alt="" style={{ borderRadius: "0%" }} />
                                                                </td>
                                                                <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {item.category.map((i) => i).join(", ")}
                                                                </td>
                                                                <td>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>
                                                                    <label className={
                                                                        item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                                                    }>
                                                                        {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <NavLink to={"/laptop-gaming/" + item.src} ><button type="button" className="btn btn-outline-secondary btn-fw">Show</button></NavLink>
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
                    }</>
                }
                {state.authentication === 'CEO' && <div className="col-lg-12 grid-margin stretch-card">
                    <Chart optionSelectLaptop={optionSelectLaptop} />
                </div>
                }
                {state.authentication === null &&
                    <div className="col-lg-12 grid-margin stretch-card">
                        <NoAuth error={error} />
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}

export default memo(Index);
