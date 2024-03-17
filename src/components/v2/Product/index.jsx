import React, { useState, useEffect, useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    fetchCollectingByName,
    fetchListOfAppleCollecting,
    fetchListOfPcGamingCollecting,
    fetchListOfLaptopCollecting,
    fetchListOfLaptopGamingCollecting,
    fetchSearchPcGamingCollecting,
    fetchListOfPcCompanyCollecting,
    fetchListOfPcCreatorCollecting,
    fetchSearchAppleCollecting,
    fetchSearchPcCreatorCollecting,
    fetchSearchPcCompanyCollecting,
    fetchSearchLaptopGamingCollecting,
    fetchSearchLaptopCollecting,
    fetchListOfAppleCollectingByName,
    fetchListOfLaptopCollectingByName,
    fetchListOfLaptopGamingCollectingByName,
    fetchListOfPcGamingCollectingByName,
    fetchListOfPcCompanyCollectingByName,
    fetchListOfPcCreatorCollectingByName,
} from 'Apis'
import Footer from "components/v2/Footer"
import NoAuth from 'components/Error/No-Auth'
import { StateContext } from 'components/Context'
import Chart from 'components/v2/Product/Page-Chart'
import Swal from 'sweetalert2'
import 'assets/scss/v2/product.scss'
import UpdateProduct from 'components/v2/Product/Edit-product'
import Product from 'components/v2/Product/Product'
import CreateNewProduct from 'components/v2/Product/Create-new-product'
import Loading from 'components/v2/Loading'
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const state = useContext(StateContext)
    const [collecting, setCollecting] = useState([])
    const [optionSelectLaptop, setOptionSelectLaptop] = useState([])
    const [optionSelectCollectingCPU, setOptionSelectCollectingCPU] = useState([])
    const [optionSelectCollectingRanger, setOptionSelectCollectingRanger] = useState([])
    const [optionSelectCollecting, setOptionSelectCollecting] = useState([])
    const [searchData, setSearchData] = useState({ nameProduct: "", category: ['', '', '', ''], sort: 'asc' })
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [productList, setProductList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [error, setError] = useState(null)
    const [isShowTable, setIsShowTable] = useState(false)
    const [isShowProduct, setIsShowProduct] = useState(false)
    const [isShowCreateProduct, setIsShowCreateProduct] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [collectingTable, setCollectingTable] = useState(null)
    const [product, setProduct] = useState(null)
    const [newProduct, setNewProduct] = useState(null)
    const [options, setOptions] = useState([])
    useEffect(() => {
        setIsShowTable(true)
    }, [state]);
    const fetchFunctionsMap = {
        Apple: fetchListOfAppleCollecting,
        Laptop: fetchListOfLaptopCollecting,
        'Laptop Gaming': fetchListOfLaptopGamingCollecting,
        'Pc Gaming': fetchListOfPcGamingCollecting,
        'Pc Company': fetchListOfPcCompanyCollecting,
        'Pc Creator': fetchListOfPcCreatorCollecting,
    };
    const fetchSearchFunctionsMap = {
        Apple: fetchSearchAppleCollecting,
        Laptop: fetchSearchLaptopCollecting,
        'Laptop Gaming': fetchSearchLaptopGamingCollecting,
        'Pc Gaming': fetchSearchPcGamingCollecting,
        'Pc Company': fetchSearchPcCompanyCollecting,
        'Pc Creator': fetchSearchPcCreatorCollecting,
    };
    const fetchListFunctionsMap = {
        Apple: fetchListOfAppleCollectingByName,
        Laptop: fetchListOfLaptopCollectingByName,
        'Laptop Gaming': fetchListOfLaptopGamingCollectingByName,
        'Pc Gaming': fetchListOfPcGamingCollectingByName,
        'Pc Company': fetchListOfPcCompanyCollectingByName,
        'Pc Creator': fetchListOfPcCreatorCollectingByName,
    };
    const handleShowTable = (collectingTable) => {
        setCollectingTable(collectingTable)
        fetchCollectingByName(collectingTable)
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
        const fetchFunction = fetchFunctionsMap[collectingTable];
        if (fetchFunction) {
            fetchFunction(1)
                .then(result => {
                    setProductList(result.data);
                    setLoading(false);
                    if (0 < result.total % 10 && result.total % 10 < 10) {
                        setCountMaxPage(Math.floor(result.total / 10) + 1);
                    } else if (result.total === 0) {
                        setCountMaxPage(1);
                    } else {
                        setCountMaxPage(Math.floor(result.total / 10));
                    }
                })
                .catch(error => {
                    setLoading(false);
                    if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                        state.setAuthentication(state.authentication !== null ? state.authentication : null);
                    }
                    setError(error.response.status);
                    console.log(error);
                });
        }
        setIsShowTable(false)
    }
    const handleShowChart = (collectingTable, src) => {
        setCollectingTable(collectingTable)
        fetchCollectingByName(src)
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
        setIsShowTable(false)
    }
    const handleSetPage = (count) => {
        setProductList()
        setCountPage(count)
        const fetchFunction = fetchSearchFunctionsMap[collectingTable];
        if (fetchFunction) {
            fetchFunction(searchData, count)
                .then(result => {
                    setProductList(result.data)
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
    }
    const handleOptionSelected = (e) => {
        const { name, value } = e.target
        let newSearchData = ''
        setProductList()
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
                    const fetchFunction = fetchSearchFunctionsMap[collectingTable];
                    if (fetchFunction) {
                        fetchFunction(newSearchData, countPage)
                            .then(result => {
                                setProductList(result.data)
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
                    }
                }, 1000);

                setSearchTimeout(timeoutId);
            }
        }
    }
    const handleOptionSelectedSecond = (e) => {
        const { name, value } = e.target
        setCountPage(1)
        setProductList()
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
                const fetchFunction = fetchSearchFunctionsMap[collectingTable];
                if (fetchFunction) {
                    fetchFunction(newSearchData, 1)
                        .then(result => {
                            setProductList(result.data)
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
                }
            }, 1000);
            setSearchTimeout(timeoutId);
        }
    }
    const handleSort = () => {
        setProductList()
        setCountPage(1)
        setSearchData({ ...searchData, sort: searchData.sort === 'asc' ? 'desc' : 'asc' })
        const fetchFunction = fetchSearchFunctionsMap[collectingTable];
        if (fetchFunction) {
            fetchFunction({ ...searchData, sort: searchData.sort === 'asc' ? 'desc' : 'asc' }, 1)
                .then((result) => {
                    setProductList(result.data);
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
    }
    const handleBackOption = () => {
        setIsShowTable(true)
        setCollecting([])
        setOptionSelectLaptop([])
        setOptionSelectCollectingCPU([])
        setOptionSelectCollectingRanger([])
        setOptionSelectCollecting([])
        setSearchData({ nameProduct: "", category: ['', '', '', ''], sort: 'asc' })
        setCountPage(1)
        setCountMaxPage(1)
        setProductList(null)
    }
    const handleShowProduct = (src) => {
        setIsShowProduct(true)
        fetchCollectingByName(collectingTable)
            .then(result => {
                result.category.map((item, index) => {
                    if (item.name === "Brand Name") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                        item.collecting.map((item, index) => {
                            const categoryInCollecting = item.category.map((i, index) => {

                                return { label: i.name, value: i.name }
                            })
                            setOptions(options => [...options, ...categoryInCollecting])
                        })
                    }
                    if (item.name === "Category") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    }
                    else if (item.name === "GPU") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    } else if (item.name === "CPU") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        const fetchFunction = fetchListFunctionsMap[collectingTable];
        if (fetchFunction) {
            fetchFunction(src)
                .then(result => {
                    setProduct(result)
                    setNewProduct(result)
                    result.category.map((item) => {
                        setOptions(options => [...options, { label: item, value: item }])
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const handleGetData = (data) => {
        setNewProduct(data)
    }
    const handleGetUpdateProduct = (data) => {
        const updatedOrderList = productList.map((item) =>
            item._id === data._id ? data : item
        );
        setProductList(updatedOrderList)
        setProduct(data)
    }
    return (
        <div className='section-product play-regular'>
            {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'PRODUCT') ?
                <>
                    <div className={isShowTable ? 'col-12 section-product-content' : 'col-12 section-product-content showTable'} >
                        <div style={{ width: '100%', padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                            <div className='section-product-table-goods-title'>
                                <div className='section-product-table-goods-title-name play-bold'>
                                    <p style={{ cursor: 'pointer' }} onClick={() => handleBackOption()}><i className="fa-solid fa-arrow-left" ></i></p>
                                    <span>{collectingTable} List</span>
                                    <p style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsShowCreateProduct(true)}><i className="fa-solid fa-circle-plus" ></i>&#160;New</p>
                                </div>
                            </div>
                            <div className='row section-product-table-goods-title-search'>
                                <div className='col-md-1 title-search'>Search:</div>
                                <div className='row col-md-11 content-search'>
                                    <input type='text' name='nameProduct' onChange={handleOptionSelectedSecond} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Product Name' />
                                    <select name='category' onChange={handleOptionSelected} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-2 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value='' selected>Category ( All )</option>
                                        {optionSelectLaptop.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>
                                    {optionSelectCollecting.length > 0 && <select name='categoryCollection' onChange={e => handleOptionSelectedSecond(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-2 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value='' selected>Brand ( All )</option>
                                        {optionSelectCollecting.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        })}
                                    </select>}
                                    {optionSelectCollecting.length > 0 && optionSelectCollectingCPU.length > 0 && <select name='categoryCPU' onChange={e => handleOptionSelectedSecond(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-2 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value='' selected>GPU ( All )</option>
                                        {optionSelectCollectingCPU.map((item, index) => {
                                            return <option key={index} value={item}>{item}</option>
                                        })}
                                    </select>}
                                </div>
                            </div>
                            {productList ?
                                <>
                                    <div className="table-responsive section-product-table-goods">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Image</th>
                                                    <th>Category</th>
                                                    <th>Quantity{searchData.sort === 'asc' ?
                                                        <i className="fa-solid fa-arrow-up" style={{ cursor: "pointer" }} onClick={handleSort} />
                                                        :
                                                        <i className="fa-solid fa-arrow-down" style={{ cursor: "pointer" }} onClick={handleSort} />}</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {productList.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.nameProduct}</td>
                                                        <td><img src={item.img[0]} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                                        <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.category.map((i) => i).join(", ")}</td>
                                                        <td>{item.quantity}</td>
                                                        <td><label className={
                                                            item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                                        }>
                                                            {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
                                                        </label></td>
                                                        <td>
                                                            <i className='fa-regular fa-eye' onClick={() => handleShowProduct(item.src)} style={{ cursor: 'pointer' }} />
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='page-button' role="group" aria-label="Basic example">
                                        {countPage > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(1)}><span>1</span>
                                            <span></span></button>}
                                        {countPage > 3 && <button type="text" className='animated-button' >...</button>}
                                        {countPage - 1 > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage - 1)}><span>{countPage - 1}</span>
                                            <span></span></button>}
                                        <button type="button" className="animated-button active">{countPage}</button>
                                        {countPage + 1 < countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage + 1)}><span>{countPage + 1}</span>
                                            <span></span></button>}
                                        {countMaxPage - countPage > 2 && <button type="text" className='animated-button'  >...</button>}
                                        {countPage !== countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countMaxPage)}><span>{countMaxPage}</span>
                                            <span></span></button>}
                                    </div>
                                </>
                                :
                                <Loading />
                            }
                        </div>
                    </div>
                    <div className={isShowTable ? 'col-12 section-product-option active' : 'col-12 section-product-option'}>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Laptop")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M71.339 52.0089L67.6374 44.6978V11.2222C67.6374 9.57199 66.9707 7.98934 65.7841 6.82245C64.5975 5.65555 62.9881 5 61.3099 5H10.6901C9.01193 5 7.40251 5.65555 6.21588 6.82245C5.02925 7.98934 4.3626 9.57199 4.3626 11.2222V44.6978L0.661029 52.0089C0.181786 52.9573 -0.0433646 54.0103 0.00689526 55.0682C0.0571551 56.126 0.381162 57.1538 0.948238 58.0541C1.51531 58.9545 2.30669 59.6976 3.24744 60.2131C4.18819 60.7286 5.24717 60.9994 6.32412 61H65.6759C66.7528 60.9994 67.8118 60.7286 68.7526 60.2131C69.6933 59.6976 70.4847 58.9545 71.0518 58.0541C71.6188 57.1538 71.9428 56.126 71.9931 55.0682C72.0434 54.0103 71.8182 52.9573 71.339 52.0089ZM10.6901 11.2222H61.3099V42.3333H10.6901V11.2222ZM6.32412 54.7778L9.48786 48.5556H62.5121L65.6759 54.7778H6.32412Z" /></svg><br />
                                    Laptop
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Laptop Gaming")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M71.339 52.0089L67.6374 44.6978V11.2222C67.6374 9.57199 66.9707 7.98934 65.7841 6.82245C64.5975 5.65555 62.9881 5 61.3099 5H10.6901C9.01193 5 7.40251 5.65555 6.21588 6.82245C5.02925 7.98934 4.3626 9.57199 4.3626 11.2222V44.6978L0.661029 52.0089C0.181786 52.9573 -0.0433646 54.0103 0.00689526 55.0682C0.0571551 56.126 0.381162 57.1538 0.948238 58.0541C1.51531 58.9545 2.30669 59.6976 3.24744 60.2131C4.18819 60.7286 5.24717 60.9994 6.32412 61H65.6759C66.7528 60.9994 67.8118 60.7286 68.7526 60.2131C69.6933 59.6976 70.4847 58.9545 71.0518 58.0541C71.6188 57.1538 71.9428 56.126 71.9931 55.0682C72.0434 54.0103 71.8182 52.9573 71.339 52.0089ZM10.6901 11.2222H61.3099V42.3333H10.6901V11.2222ZM6.32412 54.7778L9.48786 48.5556H62.5121L65.6759 54.7778H6.32412Z M41.7513 25.2307H29.2504C25.7984 25.2307 23 27.6415 23 30.6153C23 33.5892 25.7984 35.9999 29.2504 35.9999C30.9506 35.9999 32.4882 35.4107 33.615 34.4615H37.385C38.5118 35.4107 40.0494 35.9999 41.7496 35.9999C45.2016 35.9999 48 33.5892 48 30.6153C48 27.6415 45.2034 25.2307 41.7513 25.2307ZM31.9292 31.3846H30.1434V32.923H28.3575V31.3846H26.5717V29.8461H28.3575V28.3076H30.1434V29.8461H31.9292V31.3846ZM40.8584 28.3076H42.6443V29.0769L42.1978 29.8461H41.3049L40.8584 29.0769V28.3076ZM39.0726 31.3846V29.8461H39.9655L40.8584 30.2307V30.9999L39.9655 31.3846H39.0726ZM42.6443 32.923H40.8584V32.1538L41.3049 31.3846H42.1978L42.6443 32.1538V32.923ZM44.4301 31.3846H43.5372L42.6443 30.9999V30.2307L43.5372 29.8461H44.4301V31.3846Z M30.4489 22.4169L31.7114 23.5046C33.7366 21.7599 37.2654 21.7615 39.2888 23.5046L40.5514 22.4169C37.8512 20.0938 33.149 20.0938 30.4489 22.4169Z M35.5009 17.5385C38.3636 17.5385 41.0531 18.4985 43.0783 20.2415L44.3408 19.1538C41.98 17.12 38.8387 16 35.5009 16C32.1614 16 29.0237 17.12 26.661 19.1538L27.9236 20.2415C29.9487 18.4985 32.6382 17.5385 35.5009 17.5385Z" /></svg><br />
                                    Laptop Gaming
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Pc Gaming")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M42.5625 23.6H29.4375C25.8131 23.6 22.875 26.2639 22.875 29.55C22.875 32.8361 25.8131 35.5 29.4375 35.5C31.2225 35.5 32.8369 34.8489 34.02 33.8H37.9781C39.1613 34.8489 40.7756 35.5 42.5606 35.5C46.185 35.5 49.1231 32.8361 49.1231 29.55C49.1231 26.2639 46.1869 23.6 42.5625 23.6ZM32.25 30.4H30.375V32.1H28.5V30.4H26.625V28.7H28.5V27H30.375V28.7H32.25V30.4ZM41.625 27H43.5V27.85L43.0313 28.7H42.0938L41.625 27.85V27ZM39.75 30.4V28.7H40.6875L41.625 29.125V29.975L40.6875 30.4H39.75ZM43.5 32.1H41.625V31.25L42.0938 30.4H43.0313L43.5 31.25V32.1ZM45.375 30.4H44.4375L43.5 29.975V29.125L44.4375 28.7H45.375V30.4Z M30.6957 20.4907L32.0213 21.6926C34.1476 19.7648 37.8526 19.7665 39.9769 21.6926L41.3026 20.4907C38.4676 17.9237 33.5307 17.9237 30.6957 20.4907Z M36 15.1C39.0056 15.1 41.8294 16.1608 43.9556 18.0869L45.2813 16.885C42.8025 14.6376 39.5044 13.4 36 13.4C32.4938 13.4 29.1994 14.6376 26.7188 16.885L28.0444 18.0869C30.1706 16.1608 32.9944 15.1 36 15.1Z" /></svg><br />
                                    Pc Gaming
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Pc Company")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z " /></svg><br />
                                    Pc Company
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Pc Creator")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M36.81 26.608C37.41 25.936 36.93 24.856 35.67 24.808C34.89 24.76 34.11 25.72 33.81 26.344C33.33 27.352 33.66 28.744 34.32 29.608C34.65 29.992 34.86 30.184 34.83 29.992C34.65 27.616 36.03 27.472 36.81 26.608Z M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M47.52 13.744C43.8 16.648 40.71 19.576 37.62 22.792C37.62 22.792 36.84 23.608 36.36 24.136C36.18 24.328 36.21 24.64 36.45 24.784L36.96 25.12C37.2 25.288 37.56 25.264 37.77 25.072C38.31 24.592 39.18 23.848 39.18 23.848C42.6 20.824 45.63 17.848 48.51 14.416C48.99 13.888 48.09 13.288 47.52 13.744Z M45.45 23.1999C43.83 22.1919 42.21 22.7919 40.74 23.4399C40.41 23.7279 40.11 24.0159 39.78 24.3039C39.78 24.3039 38.31 25.5999 37.98 25.8639L37.83 25.9839C37.83 26.3199 37.68 26.6799 37.44 26.9679C37.2 27.2559 36.9 27.4719 36.63 27.6639C36 28.1199 35.52 28.4799 35.64 29.9199C35.7 30.3279 35.37 30.5679 35.07 30.6399C34.38 30.8319 33.93 30.2559 33.66 29.9199C32.91 28.9599 32.46 27.3519 33.06 26.0799C33.39 25.4079 34.2 24.3039 35.34 24.1599L35.4 24.1119C35.64 23.8479 36.66 22.7679 36.93 22.4799C36.87 22.3359 36.78 22.2159 36.75 22.0479C36.3 20.5599 35.34 18.6399 31.26 18.8319C24 19.9359 22.32 25.6719 23.85 30.0399C24.36 31.5279 25.02 32.2239 25.68 33.0159C26.07 33.4719 27.24 34.36 27.33 34.408C29.04 35.464 31.02 36.0879 33.09 36.3039C37.62 36.7839 42.48 35.3199 45.36 32.2959C49.14 28.3359 47.94 24.7359 45.45 23.1999ZM28.41 23.0079C28.59 21.9279 29.82 21.1599 31.17 21.3039C32.52 21.4479 33.48 22.4559 33.3 23.5359C33.12 24.6159 31.89 25.3839 30.54 25.2399C29.16 25.0959 28.23 24.1119 28.41 23.0079ZM27.63 30.4479C26.28 30.3039 25.32 29.2959 25.5 28.2159C25.68 27.1359 26.91 26.3679 28.26 26.5119C29.61 26.6559 30.57 27.6639 30.39 28.7439C30.21 29.8239 28.98 30.5919 27.63 30.4479ZM34.56 32.8959C34.38 33.9759 33.15 34.7439 31.8 34.5999C30.45 34.4559 29.49 33.4479 29.67 32.3679C29.85 31.2879 31.08 30.5199 32.43 30.6639C33.78 30.8319 34.71 31.8159 34.56 32.8959ZM41.46 32.3679C41.28 33.4479 40.05 34.2159 38.7 34.0719C37.35 33.9279 36.39 32.9199 36.57 31.8399C36.75 30.7599 37.98 29.9919 39.33 30.1359C40.68 30.2799 41.64 31.2879 41.46 32.3679ZM45.87 28.3839C45.69 29.4639 44.46 30.2319 43.11 30.0879C41.76 29.9439 40.8 28.9359 40.98 27.8559C41.16 26.7759 42.39 26.0079 43.74 26.1519C45.09 26.3199 46.05 27.3279 45.87 28.3839Z" /></svg><br />
                                    Pc Creator
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' >
                            <div className="e-card playing" onClick={() => handleShowTable("Apple")}>
                                <div className="image" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="wave" />
                                <div className="infotop">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                        <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M27.9337 34.6878C28.9124 35.8625 30.3828 37 32.0752 37C33.0381 37 33.856 36.5625 34.7351 36.2431C35.5447 35.9549 36.4006 35.8068 37.2635 35.8056C38.096 35.801 38.921 35.9572 39.69 36.265C40.0978 36.4312 40.5011 36.6084 40.9157 36.7616C41.3364 36.9183 41.7834 36.9992 42.2343 37C43.0685 36.9908 43.8803 36.7384 44.5634 36.2759C46.5481 34.9634 48.0184 32.6578 49.0606 30.6387C49.1649 30.4375 49.2645 30.2341 49.3642 30.0328C49.5296 29.6959 49.2691 29.2694 48.8069 29.0244C46.7678 27.9438 45.5738 26.2725 45.3745 23.9669C45.1751 21.6612 46.104 19.8413 47.9686 18.52L48.3356 18.2291C48.5395 18.0672 48.4285 17.6187 48.0456 17.2687C46.6353 15.9278 44.7458 15.1605 42.7667 15.125C42.3826 15.1252 41.9992 15.1559 41.6203 15.2169C39.8984 15.5013 38.5164 16.2931 36.8942 16.2931C36.402 16.2936 35.9128 16.2198 35.4442 16.0744C34.0849 15.6544 32.7345 15.125 31.2891 15.125C31.1305 15.125 30.9696 15.125 30.8088 15.1447C29.0268 15.328 27.3628 16.0927 26.0917 17.3125C23.5859 19.6969 23.2302 23.4003 23.8556 26.5306C24.4559 29.5625 25.9331 32.2947 27.9337 34.6878Z M36.7266 15.125C36.759 15.1278 36.7916 15.1278 36.824 15.125C41.6112 14.2631 42.1346 10.6931 42.1641 9.38939C42.1651 9.33668 42.1548 9.28433 42.1339 9.23562C42.113 9.18691 42.0819 9.1429 42.0425 9.10634C42.0032 9.06979 41.9564 9.04147 41.9052 9.02318C41.854 9.00488 41.7994 8.997 41.7449 9.00002C41.7045 8.99998 41.6642 9.00438 41.6248 9.01314C36.79 10.0938 36.287 13.4603 36.2734 14.7181C36.2746 14.7739 36.2873 14.8288 36.3109 14.8797C36.3345 14.9306 36.3684 14.9764 36.4107 15.0143C36.4529 15.0523 36.5027 15.0816 36.557 15.1007C36.6112 15.1197 36.6689 15.128 36.7266 15.125ZM41.2034 10.026C41.0109 11.3516 40.2156 13.3925 37.225 14.1363C37.4062 12.8916 38.1675 10.9185 41.2034 10.026Z" /></svg><br />
                                    Apple
                                    <br />

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                    <div className={isShowProduct ? 'col-12 section-info-product active' : 'col-12 section-info-product'}>
                        <div className={isReview ? 'first-form section-form-info-product' : 'first-form section-form-info-product show-product'}>
                            <div className='section-form-info-product-title play-bold'><span>Information product</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowProduct(false), setProduct(null), setOptions([]))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>

                            {product ? <>
                                <div className='section-form-info-product-edit play-bold'>
                                    <div className='page-button'>
                                        <button className='animated-button' type="button" onClick={() => setIsReview(true)} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                            <span>Edit <i className="fa-solid fa-pen-to-square"></i></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                                <Product product={product} />
                            </>
                                :
                                <Loading />
                            }
                        </div>
                        <div className={isReview ? 'second-form section-form-info-product show-review' : 'second-form section-form-info-product'}>
                            <div className='section-form-info-product-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(!isReview))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Edit product</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowProduct(false), setProduct(null), setNewProduct(null), setIsReview(false), setOptions([]))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>

                            {newProduct ?
                                <UpdateProduct handleGetUpdateProduct={handleGetUpdateProduct} newProduct={newProduct} product={product} options={options} handleGetData={handleGetData} collectingTable={collectingTable} />
                                :
                                <Loading />
                            }
                        </div>
                    </div>
                    <div className={isShowCreateProduct ? 'col-12 section-info-product active' : 'col-12 section-info-product'}>
                        <div className='first-form section-form-info-product show-product'>
                            <div className='section-form-info-product-title play-bold'><span>Create new product</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowCreateProduct(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                            <CreateNewProduct collectingTable={collectingTable} isShowCreateProduct={isShowCreateProduct} />
                        </div>
                    </div>
                </>
                :
                state.authentication === 'CEO' ?
                    <>
                        <div className={isShowTable ? 'col-12 section-product-content' : 'col-12 section-product-content showTable'} >
                            <div>
                                <div className='section-product-table-goods-title'>
                                    <div className='section-product-table-goods-title-name play-bold' style={{padding:'0 20px 20px 20px'}}>
                                        <p style={{ cursor: 'pointer' }} onClick={() => handleBackOption()}><i className="fa-solid fa-arrow-left" ></i></p>
                                        <span>{collectingTable}</span>
                                        <p style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsShowCreateProduct(true)}></p>
                                    </div>
                                </div>
                                <Chart collectingTable={collectingTable} optionSelectLaptop={optionSelectLaptop} />
                            </div>
                        </div>
                        <div className={isShowTable ? 'col-12 section-product-option active' : 'col-12 section-product-option'}>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("laptop","Laptop")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M71.339 52.0089L67.6374 44.6978V11.2222C67.6374 9.57199 66.9707 7.98934 65.7841 6.82245C64.5975 5.65555 62.9881 5 61.3099 5H10.6901C9.01193 5 7.40251 5.65555 6.21588 6.82245C5.02925 7.98934 4.3626 9.57199 4.3626 11.2222V44.6978L0.661029 52.0089C0.181786 52.9573 -0.0433646 54.0103 0.00689526 55.0682C0.0571551 56.126 0.381162 57.1538 0.948238 58.0541C1.51531 58.9545 2.30669 59.6976 3.24744 60.2131C4.18819 60.7286 5.24717 60.9994 6.32412 61H65.6759C66.7528 60.9994 67.8118 60.7286 68.7526 60.2131C69.6933 59.6976 70.4847 58.9545 71.0518 58.0541C71.6188 57.1538 71.9428 56.126 71.9931 55.0682C72.0434 54.0103 71.8182 52.9573 71.339 52.0089ZM10.6901 11.2222H61.3099V42.3333H10.6901V11.2222ZM6.32412 54.7778L9.48786 48.5556H62.5121L65.6759 54.7778H6.32412Z" /></svg><br />
                                        Laptop
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("laptop-gaming","Laptop Gaming")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M71.339 52.0089L67.6374 44.6978V11.2222C67.6374 9.57199 66.9707 7.98934 65.7841 6.82245C64.5975 5.65555 62.9881 5 61.3099 5H10.6901C9.01193 5 7.40251 5.65555 6.21588 6.82245C5.02925 7.98934 4.3626 9.57199 4.3626 11.2222V44.6978L0.661029 52.0089C0.181786 52.9573 -0.0433646 54.0103 0.00689526 55.0682C0.0571551 56.126 0.381162 57.1538 0.948238 58.0541C1.51531 58.9545 2.30669 59.6976 3.24744 60.2131C4.18819 60.7286 5.24717 60.9994 6.32412 61H65.6759C66.7528 60.9994 67.8118 60.7286 68.7526 60.2131C69.6933 59.6976 70.4847 58.9545 71.0518 58.0541C71.6188 57.1538 71.9428 56.126 71.9931 55.0682C72.0434 54.0103 71.8182 52.9573 71.339 52.0089ZM10.6901 11.2222H61.3099V42.3333H10.6901V11.2222ZM6.32412 54.7778L9.48786 48.5556H62.5121L65.6759 54.7778H6.32412Z M41.7513 25.2307H29.2504C25.7984 25.2307 23 27.6415 23 30.6153C23 33.5892 25.7984 35.9999 29.2504 35.9999C30.9506 35.9999 32.4882 35.4107 33.615 34.4615H37.385C38.5118 35.4107 40.0494 35.9999 41.7496 35.9999C45.2016 35.9999 48 33.5892 48 30.6153C48 27.6415 45.2034 25.2307 41.7513 25.2307ZM31.9292 31.3846H30.1434V32.923H28.3575V31.3846H26.5717V29.8461H28.3575V28.3076H30.1434V29.8461H31.9292V31.3846ZM40.8584 28.3076H42.6443V29.0769L42.1978 29.8461H41.3049L40.8584 29.0769V28.3076ZM39.0726 31.3846V29.8461H39.9655L40.8584 30.2307V30.9999L39.9655 31.3846H39.0726ZM42.6443 32.923H40.8584V32.1538L41.3049 31.3846H42.1978L42.6443 32.1538V32.923ZM44.4301 31.3846H43.5372L42.6443 30.9999V30.2307L43.5372 29.8461H44.4301V31.3846Z M30.4489 22.4169L31.7114 23.5046C33.7366 21.7599 37.2654 21.7615 39.2888 23.5046L40.5514 22.4169C37.8512 20.0938 33.149 20.0938 30.4489 22.4169Z M35.5009 17.5385C38.3636 17.5385 41.0531 18.4985 43.0783 20.2415L44.3408 19.1538C41.98 17.12 38.8387 16 35.5009 16C32.1614 16 29.0237 17.12 26.661 19.1538L27.9236 20.2415C29.9487 18.4985 32.6382 17.5385 35.5009 17.5385Z" /></svg><br />
                                        Laptop Gaming
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("pc-gaming","Pc Gaming")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M42.5625 23.6H29.4375C25.8131 23.6 22.875 26.2639 22.875 29.55C22.875 32.8361 25.8131 35.5 29.4375 35.5C31.2225 35.5 32.8369 34.8489 34.02 33.8H37.9781C39.1613 34.8489 40.7756 35.5 42.5606 35.5C46.185 35.5 49.1231 32.8361 49.1231 29.55C49.1231 26.2639 46.1869 23.6 42.5625 23.6ZM32.25 30.4H30.375V32.1H28.5V30.4H26.625V28.7H28.5V27H30.375V28.7H32.25V30.4ZM41.625 27H43.5V27.85L43.0313 28.7H42.0938L41.625 27.85V27ZM39.75 30.4V28.7H40.6875L41.625 29.125V29.975L40.6875 30.4H39.75ZM43.5 32.1H41.625V31.25L42.0938 30.4H43.0313L43.5 31.25V32.1ZM45.375 30.4H44.4375L43.5 29.975V29.125L44.4375 28.7H45.375V30.4Z M30.6957 20.4907L32.0213 21.6926C34.1476 19.7648 37.8526 19.7665 39.9769 21.6926L41.3026 20.4907C38.4676 17.9237 33.5307 17.9237 30.6957 20.4907Z M36 15.1C39.0056 15.1 41.8294 16.1608 43.9556 18.0869L45.2813 16.885C42.8025 14.6376 39.5044 13.4 36 13.4C32.4938 13.4 29.1994 14.6376 26.7188 16.885L28.0444 18.0869C30.1706 16.1608 32.9944 15.1 36 15.1Z" /></svg><br />
                                        Pc Gaming
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("pc-company","Pc Company")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z " /></svg><br />
                                        Pc Company
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("pc-creator","Pc Creator")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M36.81 26.608C37.41 25.936 36.93 24.856 35.67 24.808C34.89 24.76 34.11 25.72 33.81 26.344C33.33 27.352 33.66 28.744 34.32 29.608C34.65 29.992 34.86 30.184 34.83 29.992C34.65 27.616 36.03 27.472 36.81 26.608Z M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M47.52 13.744C43.8 16.648 40.71 19.576 37.62 22.792C37.62 22.792 36.84 23.608 36.36 24.136C36.18 24.328 36.21 24.64 36.45 24.784L36.96 25.12C37.2 25.288 37.56 25.264 37.77 25.072C38.31 24.592 39.18 23.848 39.18 23.848C42.6 20.824 45.63 17.848 48.51 14.416C48.99 13.888 48.09 13.288 47.52 13.744Z M45.45 23.1999C43.83 22.1919 42.21 22.7919 40.74 23.4399C40.41 23.7279 40.11 24.0159 39.78 24.3039C39.78 24.3039 38.31 25.5999 37.98 25.8639L37.83 25.9839C37.83 26.3199 37.68 26.6799 37.44 26.9679C37.2 27.2559 36.9 27.4719 36.63 27.6639C36 28.1199 35.52 28.4799 35.64 29.9199C35.7 30.3279 35.37 30.5679 35.07 30.6399C34.38 30.8319 33.93 30.2559 33.66 29.9199C32.91 28.9599 32.46 27.3519 33.06 26.0799C33.39 25.4079 34.2 24.3039 35.34 24.1599L35.4 24.1119C35.64 23.8479 36.66 22.7679 36.93 22.4799C36.87 22.3359 36.78 22.2159 36.75 22.0479C36.3 20.5599 35.34 18.6399 31.26 18.8319C24 19.9359 22.32 25.6719 23.85 30.0399C24.36 31.5279 25.02 32.2239 25.68 33.0159C26.07 33.4719 27.24 34.36 27.33 34.408C29.04 35.464 31.02 36.0879 33.09 36.3039C37.62 36.7839 42.48 35.3199 45.36 32.2959C49.14 28.3359 47.94 24.7359 45.45 23.1999ZM28.41 23.0079C28.59 21.9279 29.82 21.1599 31.17 21.3039C32.52 21.4479 33.48 22.4559 33.3 23.5359C33.12 24.6159 31.89 25.3839 30.54 25.2399C29.16 25.0959 28.23 24.1119 28.41 23.0079ZM27.63 30.4479C26.28 30.3039 25.32 29.2959 25.5 28.2159C25.68 27.1359 26.91 26.3679 28.26 26.5119C29.61 26.6559 30.57 27.6639 30.39 28.7439C30.21 29.8239 28.98 30.5919 27.63 30.4479ZM34.56 32.8959C34.38 33.9759 33.15 34.7439 31.8 34.5999C30.45 34.4559 29.49 33.4479 29.67 32.3679C29.85 31.2879 31.08 30.5199 32.43 30.6639C33.78 30.8319 34.71 31.8159 34.56 32.8959ZM41.46 32.3679C41.28 33.4479 40.05 34.2159 38.7 34.0719C37.35 33.9279 36.39 32.9199 36.57 31.8399C36.75 30.7599 37.98 29.9919 39.33 30.1359C40.68 30.2799 41.64 31.2879 41.46 32.3679ZM45.87 28.3839C45.69 29.4639 44.46 30.2319 43.11 30.0879C41.76 29.9439 40.8 28.9359 40.98 27.8559C41.16 26.7759 42.39 26.0079 43.74 26.1519C45.09 26.3199 46.05 27.3279 45.87 28.3839Z" /></svg><br />
                                        Pc Creator
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4' >
                                <div className="e-card playing" onClick={() => handleShowChart("apple","Apple")}>
                                    <div className="image" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="wave" />
                                    <div className="infotop">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.209 -12.5366 75 80" className="icon">
                                            <path fill="currentColor" d="M61.6915 0H10.3085C7.57455 0 4.95253 1.05213 3.0193 2.92494C1.08608 4.79775 0 7.33783 0 9.98638V41.6632C0 44.3117 1.08608 46.8518 3.0193 48.7246C4.95253 50.5974 7.57455 51.6496 10.3085 51.6496H26.8151V61.0068H21.7691C21.0856 61.0068 20.4301 61.2698 19.9467 61.738C19.4634 62.2062 19.1919 62.8413 19.1919 63.5034C19.1919 64.1655 19.4634 64.8006 19.9467 65.2688C20.4301 65.737 21.0856 66 21.7691 66H50.2309C50.9144 66 51.5699 65.737 52.0532 65.2688C52.5366 64.8006 52.8081 64.1655 52.8081 63.5034C52.8081 62.8413 52.5366 62.2062 52.0532 61.738C51.5699 61.2698 50.9144 61.0068 50.2309 61.0068H45.1849V51.6496H61.6915C64.4255 51.6496 67.0475 50.5974 68.9807 48.7246C70.9139 46.8518 72 44.3117 72 41.6632V9.98638C72 7.33783 70.9139 4.79775 68.9807 2.92494C67.0475 1.05213 64.4255 0 61.6915 0ZM40.0306 61.0068H31.9694V51.6496H40.0306V61.0068ZM66.8457 41.6632C66.8457 42.9875 66.3027 44.2575 65.3361 45.1939C64.3695 46.1303 63.0585 46.6564 61.6915 46.6564H10.3085C8.94154 46.6564 7.63053 46.1303 6.66392 45.1939C5.69731 44.2575 5.15427 42.9875 5.15427 41.6632V9.98638C5.15427 8.6621 5.69731 7.39207 6.66392 6.45566C7.63053 5.51926 8.94154 4.99319 10.3085 4.99319H61.6915C63.0585 4.99319 64.3695 5.51926 65.3361 6.45566C66.3027 7.39207 66.8457 8.6621 66.8457 9.98638V41.6632Z M27.9337 34.6878C28.9124 35.8625 30.3828 37 32.0752 37C33.0381 37 33.856 36.5625 34.7351 36.2431C35.5447 35.9549 36.4006 35.8068 37.2635 35.8056C38.096 35.801 38.921 35.9572 39.69 36.265C40.0978 36.4312 40.5011 36.6084 40.9157 36.7616C41.3364 36.9183 41.7834 36.9992 42.2343 37C43.0685 36.9908 43.8803 36.7384 44.5634 36.2759C46.5481 34.9634 48.0184 32.6578 49.0606 30.6387C49.1649 30.4375 49.2645 30.2341 49.3642 30.0328C49.5296 29.6959 49.2691 29.2694 48.8069 29.0244C46.7678 27.9438 45.5738 26.2725 45.3745 23.9669C45.1751 21.6612 46.104 19.8413 47.9686 18.52L48.3356 18.2291C48.5395 18.0672 48.4285 17.6187 48.0456 17.2687C46.6353 15.9278 44.7458 15.1605 42.7667 15.125C42.3826 15.1252 41.9992 15.1559 41.6203 15.2169C39.8984 15.5013 38.5164 16.2931 36.8942 16.2931C36.402 16.2936 35.9128 16.2198 35.4442 16.0744C34.0849 15.6544 32.7345 15.125 31.2891 15.125C31.1305 15.125 30.9696 15.125 30.8088 15.1447C29.0268 15.328 27.3628 16.0927 26.0917 17.3125C23.5859 19.6969 23.2302 23.4003 23.8556 26.5306C24.4559 29.5625 25.9331 32.2947 27.9337 34.6878Z M36.7266 15.125C36.759 15.1278 36.7916 15.1278 36.824 15.125C41.6112 14.2631 42.1346 10.6931 42.1641 9.38939C42.1651 9.33668 42.1548 9.28433 42.1339 9.23562C42.113 9.18691 42.0819 9.1429 42.0425 9.10634C42.0032 9.06979 41.9564 9.04147 41.9052 9.02318C41.854 9.00488 41.7994 8.997 41.7449 9.00002C41.7045 8.99998 41.6642 9.00438 41.6248 9.01314C36.79 10.0938 36.287 13.4603 36.2734 14.7181C36.2746 14.7739 36.2873 14.8288 36.3109 14.8797C36.3345 14.9306 36.3684 14.9764 36.4107 15.0143C36.4529 15.0523 36.5027 15.0816 36.557 15.1007C36.6112 15.1197 36.6689 15.128 36.7266 15.125ZM41.2034 10.026C41.0109 11.3516 40.2156 13.3925 37.225 14.1363C37.4062 12.8916 38.1675 10.9185 41.2034 10.026Z" /></svg><br />
                                        Apple
                                        <br />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
                    :
                    <div style={{ height: '100vh' }}>
                        <div style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
                            <NoAuth error={error} />
                        </div>
                        <Footer />
                    </div>
            }
        </div>
    );
}

export default Index;
