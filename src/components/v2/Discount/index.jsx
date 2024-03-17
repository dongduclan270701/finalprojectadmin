import React, { useState, useEffect, useContext } from 'react';
import Footer from "components/v2/Footer"
import { fetchListOfVoucher, fetchSearchVoucher, fetchVoucher, fetchUpdateVoucher, fetchCreateVoucher } from 'Apis'
import NoAuth from 'components/Error/No-Auth'
import { StateContext } from 'components/Context'
import PageChartDiscount from 'components/v2/Discount/Page-Chart/index2'
import 'assets/scss/v2/discount.scss'
import Swal from 'sweetalert2'
import Loading from 'components/v2/Loading'
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
    const [isReview, setIsReview] = useState(false);
    const [isShowDiscount, setIsShowDiscount] = useState(false)
    const [isShowCreateDiscount, setIsShowCreateDiscount] = useState(false)
    const [voucher, setVoucher] = useState()
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    const [newVoucher, setNewVoucher] = useState({
        discountId: "",
        code: "",
        discountName: "",
        description: "",
        dateCreated: today,
        startDate: "",
        endDate: "",
        cost: 0,
        status: true,
        usage: 0
    })
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

    const handleShowOrder = (orderId) => {
        setIsShowDiscount(true)
        fetchVoucher(orderId)
            .then(result => {
                setVoucher(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDeactivateAccount = () => {
        setVoucher({ ...voucher, status: !voucher.status, reasonUpdate: 'Update status' })
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target
        setVoucher(voucher => ({
            ...voucher,
            [name]: value
        }));
    }
    const handleSubmitUpdated = () => {
        Swal.fire({
            title: 'Do you agree to make corrections??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                if (voucher.reasonUpdate === '') {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered reason update, please try again',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else {
                    Swal.fire({
                        title: 'Updating...',
                        html: 'Please wait...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    });
                    fetchUpdateVoucher(voucher.discountId, voucher)
                        .then(result => {
                            setVoucher({ ...result, reasonUpdate: '' })
                            let updatedVoucherList = voucherList.map(item => {
                                if (item._id === voucher._id) {
                                    return result
                                } else {
                                    return item;
                                }
                            });
                            setVoucherList(updatedVoucherList)
                            setIsReview(false)
                            Swal.fire({
                                title: 'Successfully saved information!',
                                text: 'You have successfully edited the discount code information',
                                icon: 'success',
                                confirmButtonText: 'OK!'
                            })
                        })
                        .catch(error => {
                            Swal.fire({
                                title: `Error ${error.response.status}`,
                                text: 'There seems to be a problem with the connection to the server, please try again later',
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                        })

                }
            }
        })
    }
    const handleChangeCreateInput = (e) => {
        const { name, value } = e.target
        setNewVoucher(voucher => ({
            ...voucher,
            [name]: value
        }));
    }
    const handleSubmitCreate = () => {
        Swal.fire({
            title: 'Do you agree to make corrections??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                if (!newVoucher.discountId) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount id information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.code) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount code information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.discountName) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount name information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.description) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount description information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.startDate) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount start date information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.endDate) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount end date information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!newVoucher.cost) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount cost information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else {
                    Swal.fire({
                        title: 'Updating...',
                        html: 'Please wait...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    });
                    fetchCreateVoucher(newVoucher)
                        .then(result => {
                            if (result.message === 'Discount code already exists') {
                                Swal.fire({
                                    title: 'Warning!',
                                    text: 'Discount code already exists, you need to create new discount code',
                                    icon: 'warning',
                                    confirmButtonText: 'OK!'
                                })
                            } else {
                                setIsShowCreateDiscount(false);
                                setNewVoucher({
                                    discountId: "",
                                    code: "",
                                    discountName: "",
                                    description: "",
                                    dateCreated: today,
                                    startDate: "",
                                    endDate: "",
                                    cost: 0,
                                    status: true,
                                    usage: 0
                                })
                                Swal.fire({
                                    title: 'Successfully created new discount code!',
                                    text: 'You have successfully created a new discount code information',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            }
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
            }
        })
    }
    return (
        <div className='section-discount play-regular'>
            {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER' || state.authentication === 'SALES') ?<>
            <div className='col-12 section-discount-content' >
                <div style={{ width: '100%', padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                    <div className='section-discount-table-goods-title'>
                        <div className='section-discount-table-goods-title-name play-bold'>
                            <span>Voucher List</span><p style={{ cursor: 'pointer' }} onClick={() => setIsShowCreateDiscount(true)}><i className="fa-solid fa-circle-plus" ></i>Add</p>
                        </div>
                    </div>
                    <div className='row section-discount-table-goods-title-search'>
                        <div className='col-md-1 title-search'>Search:</div>
                        <div className='row col-md-11 content-search'>
                            <input type='text' name='code' onChange={e => handleSearchVoucher(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Code ID' />
                            <select name='status' onChange={e => handleSearchVoucher(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                <option value=''>All</option>
                                {optionSelect.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    {voucherList ?
                        <>
                            <div className="table-responsive section-discount-table-goods">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Create Date</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Usage</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {voucherList.map((item, index) => {
                                            return <tr key={index}>
                                                <td >{item.code}</td>
                                                <td>{item.dateCreated}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                                <td>{item.usage}</td>
                                                <td><label className={
                                                    item.status ? "badge badge-success" : "badge badge-danger"
                                                }>
                                                    {item.status ? 'Active' : 'Deactivate'}
                                                </label></td>
                                                <td><i className='fa-regular fa-eye' onClick={() => handleShowOrder(item.discountId)} style={{ cursor: 'pointer' }} /></td>
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
            <Footer />
            <div className={isShowDiscount ? 'col-12 section-info-discount active' : 'col-12 section-info-discount'}>
                <div className={isReview ? 'first-form section-form-info-discount' : 'first-form section-form-info-discount show-discount'}>
                    <div className='section-form-info-discount-title play-bold'><span>Information Discount</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowDiscount(false), setVoucher(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                    <div className='section-form-info-discount-edit play-bold'><div className='page-button'>
                        <button className='animated-button' type="button" onClick={() => setIsReview(true)} style={{ border: '1px solid #2196f3', width: '150px' }}>
                            <span>Edit <i className="fa-solid fa-pen-to-square"></i></span>
                            <span></span>
                        </button>
                    </div></div>
                    {voucher ?
                        <div className='section-form-info-discount-content'>
                            <div className='box-info-purchaser-discount'>
                                <div className='list-info-purchaser-discount'>
                                    <div className='row info-id-discount play-bold'>DISCOUNT ID: {voucher.discountId.toUpperCase()}</div>
                                    <div className='row info-discount'>
                                        <div className='col-md-4 list-info-discount'>
                                            <div className='play-bold'>DETAIL DISCOUNT</div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.code} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.discountName} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>m</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.description} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '13' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '14' }}>p</span>
                                                    <span className="label-char" style={{ '--index': '15' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '16' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '17' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '18' }}>n:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.status ? 'Active' : 'Deactivate'} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '13' }}>s:</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-4 list-info-discount'>
                                            <div className='play-bold'>USAGE & DATE</div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.dateCreated} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '13' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '14' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '15' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '16' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '17' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '18' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '18' }}>d:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.usage} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>g</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.startDate} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '13' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '14' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '15' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '16' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '17' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.endDate} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '12' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '13' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '14' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '15' }}>e:</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-4 list-info-discount'>
                                            <div className='play-bold'>UPDATE & COST</div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.cost} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.createdBy.username + " ( " + voucher.createdBy.email + ' - ' + voucher.createdBy.role + " )"} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>b</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>y:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.updatedBy.length > 0 ? voucher.updatedBy[voucher.updatedBy.length - 1].username + " ( " + voucher.updatedBy[voucher.updatedBy.length - 1].email + ' - ' + voucher.updatedBy[voucher.updatedBy.length - 1].role + " )" : "None"} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>U</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>p</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>b</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>y:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" className="input" value={voucher.updatedBy.length > 0 ? voucher.updatedBy[voucher.updatedBy.length - 1].reasonUpdate : "None"} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>p</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>d</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>e:</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Loading/>
                    }
                </div>
                <div className={isReview ? 'second-form section-form-info-discount show-review' : 'second-form section-form-info-discount'}>
                    <div className='section-form-info-discount-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(!isReview))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Edit discount</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowDiscount(false), setVoucher(null), setIsReview(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                    <div className='section-form-info-discount-edit play-bold'>
                        <div className='page-button'>
                            <button className='animated-button' type="button" onClick={() => (handleSubmitUpdated())} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                <span>Save <i className="fa-regular fa-floppy-disk"></i></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                    {voucher ?
                        <div className='row edit-info-discount'>
                            <div className='col-md-4 list-info-discount'>
                                <div className='play-bold'>DETAIL DISCOUNT</div>
                                <div className="wave-group">
                                    <input required type="text" className="input" value={voucher.code} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '9' }}>o</span>
                                        <span className="label-char" style={{ '--index': '10' }}>d</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="text" className="input" onChange={handleChangeInput} name="discountName" value={voucher.discountName} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>n</span>
                                        <span className="label-char" style={{ '--index': '9' }}>a</span>
                                        <span className="label-char" style={{ '--index': '10' }}>m</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="text" onChange={handleChangeInput} name="description" className="input" value={voucher.description} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>d</span>
                                        <span className="label-char" style={{ '--index': '9' }}>e</span>
                                        <span className="label-char" style={{ '--index': '10' }}>s</span>
                                        <span className="label-char" style={{ '--index': '11' }}>c</span>
                                        <span className="label-char" style={{ '--index': '12' }}>r</span>
                                        <span className="label-char" style={{ '--index': '13' }}>i</span>
                                        <span className="label-char" style={{ '--index': '14' }}>p</span>
                                        <span className="label-char" style={{ '--index': '15' }}>t</span>
                                        <span className="label-char" style={{ '--index': '16' }}>i</span>
                                        <span className="label-char" style={{ '--index': '17' }}>o</span>
                                        <span className="label-char" style={{ '--index': '18' }}>n:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="number" name='cost' onChange={handleChangeInput} className="input" value={voucher.cost} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '9' }}>o</span>
                                        <span className="label-char" style={{ '--index': '10' }}>s</span>
                                        <span className="label-char" style={{ '--index': '11' }}>t:</span>
                                    </label>
                                </div>
                            </div>
                            <div className='col-md-4 list-info-discount'>
                                <div className='play-bold'>USAGE & DATE</div>
                                <div className="wave-group">
                                    <input required type="date" className="input" value={voucher.dateCreated} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>d</span>
                                        <span className="label-char" style={{ '--index': '9' }}>a</span>
                                        <span className="label-char" style={{ '--index': '10' }}>t</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e</span>
                                        <span className="label-char" style={{ '--index': '12' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '13' }}>c</span>
                                        <span className="label-char" style={{ '--index': '14' }}>r</span>
                                        <span className="label-char" style={{ '--index': '15' }}>e</span>
                                        <span className="label-char" style={{ '--index': '16' }}>a</span>
                                        <span className="label-char" style={{ '--index': '17' }}>t</span>
                                        <span className="label-char" style={{ '--index': '18' }}>e</span>
                                        <span className="label-char" style={{ '--index': '18' }}>d:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="text" className="input" value={voucher.usage} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>u</span>
                                        <span className="label-char" style={{ '--index': '9' }}>s</span>
                                        <span className="label-char" style={{ '--index': '10' }}>a</span>
                                        <span className="label-char" style={{ '--index': '11' }}>g</span>
                                        <span className="label-char" style={{ '--index': '12' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="date" className="input" name='startDate' onChange={handleChangeInput} value={voucher.startDate} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>s</span>
                                        <span className="label-char" style={{ '--index': '9' }}>t</span>
                                        <span className="label-char" style={{ '--index': '10' }}>a</span>
                                        <span className="label-char" style={{ '--index': '11' }}>r</span>
                                        <span className="label-char" style={{ '--index': '12' }}>t</span>
                                        <span className="label-char" style={{ '--index': '13' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '14' }}>d</span>
                                        <span className="label-char" style={{ '--index': '15' }}>a</span>
                                        <span className="label-char" style={{ '--index': '16' }}>t</span>
                                        <span className="label-char" style={{ '--index': '17' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="date" className="input" name='endDate' onChange={handleChangeInput} value={voucher.endDate} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>e</span>
                                        <span className="label-char" style={{ '--index': '9' }}>n</span>
                                        <span className="label-char" style={{ '--index': '10' }}>d</span>
                                        <span className="label-char" style={{ '--index': '11' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '12' }}>d</span>
                                        <span className="label-char" style={{ '--index': '13' }}>a</span>
                                        <span className="label-char" style={{ '--index': '14' }}>t</span>
                                        <span className="label-char" style={{ '--index': '15' }}>e:</span>
                                    </label>
                                </div>
                            </div>
                            <div className='col-md-4 list-info-discount'>
                                <div className='play-bold'>UPDATE & STATUS</div>

                                <div className="wave-group">
                                    <input required type="text" className="input" value={voucher.createdBy.username + " ( " + voucher.createdBy.email + ' - ' + voucher.createdBy.role + " )"} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                        <span className="label-char" style={{ '--index': '1' }}>r</span>
                                        <span className="label-char" style={{ '--index': '2' }}>e</span>
                                        <span className="label-char" style={{ '--index': '3' }}>a</span>
                                        <span className="label-char" style={{ '--index': '4' }}>t</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>d</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>b</span>
                                        <span className="label-char" style={{ '--index': '9' }}>y:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="text" className="input" value={voucher.updatedBy.length > 0 ? voucher.updatedBy[voucher.updatedBy.length - 1].username + " ( " + voucher.updatedBy[voucher.updatedBy.length - 1].email + ' - ' + voucher.updatedBy[voucher.updatedBy.length - 1].role + " )" : "None"} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>U</span>
                                        <span className="label-char" style={{ '--index': '1' }}>p</span>
                                        <span className="label-char" style={{ '--index': '2' }}>d</span>
                                        <span className="label-char" style={{ '--index': '3' }}>a</span>
                                        <span className="label-char" style={{ '--index': '4' }}>t</span>
                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                        <span className="label-char" style={{ '--index': '6' }}>d</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>b</span>
                                        <span className="label-char" style={{ '--index': '9' }}>y:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required type="text" name='reasonUpdate' onChange={handleChangeInput} className="input" value={voucher.reasonUpdate} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>R</span>
                                        <span className="label-char" style={{ '--index': '1' }}>e</span>
                                        <span className="label-char" style={{ '--index': '2' }}>a</span>
                                        <span className="label-char" style={{ '--index': '3' }}>s</span>
                                        <span className="label-char" style={{ '--index': '4' }}>o</span>
                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>u</span>
                                        <span className="label-char" style={{ '--index': '9' }}>p</span>
                                        <span className="label-char" style={{ '--index': '8' }}>d</span>
                                        <span className="label-char" style={{ '--index': '9' }}>a</span>
                                        <span className="label-char" style={{ '--index': '8' }}>t</span>
                                        <span className="label-char" style={{ '--index': '9' }}>e:</span>
                                    </label>
                                </div>
                                <div className='page-button'>
                                    <button className='animated-button' type="button" onClick={() => (handleDeactivateAccount())} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                        <span>{voucher.status ? 'Active' : 'Deactivate'}</span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <Loading/>
                    }
                    <div className='section-form-info-discount-title play-bold'>
                        {/* {order && order.statusReview.statusOrder === "" ? <div className='page-button'>
                            <button onClick={() => handleAcceptRating("Accept")} className='animated-button' type="button" >
                                <span>Accept</span>
                                <span></span>
                            </button>
                            <button onClick={() => handleAcceptRating("Decline")} className='animated-button' type="button" >
                                <span style={{color:'red'}}>Decline</span>
                                <span></span>
                            </button></div>
                            :
                            null
                        } */}
                    </div>
                </div>
            </div>
            <div className={isShowCreateDiscount ? 'col-12 section-info-discount active' : 'col-12 section-info-discount'}>
                <div className={isReview ? 'first-form section-form-info-discount' : 'first-form section-form-info-discount show-discount'}>
                    <div className='section-form-info-discount-title play-bold'><span>CREATE NEW DISCOUNT</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowCreateDiscount(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                    <div className='section-form-info-discount-edit play-bold'><div className='page-button'>
                        <button className='animated-button' type="button" onClick={handleSubmitCreate} style={{ border: '1px solid #2196f3', width: '150px' }}>
                            <span>Add <i className="fa-solid fa-pen-to-square"></i></span>
                            <span></span>
                        </button>
                    </div></div>
                    <div className='section-form-info-discount-content'>
                        <div className='box-info-purchaser-discount'>
                            <div className='list-info-purchaser-discount'>
                                <div className='row info-discount'>
                                    <div className='col-md-4 list-info-discount'>
                                        <div className='play-bold'>DETAIL DISCOUNT</div>
                                        <div className="wave-group">
                                            <input required type="text" onChange={handleChangeCreateInput} name="code" className="input" value={newVoucher.code} />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" onChange={handleChangeCreateInput} name="discountId" className="input" value={newVoucher.discountId}  />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '10' }}>i</span>
                                                <span className="label-char" style={{ '--index': '11' }}>d:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" onChange={handleChangeCreateInput} name="discountName" className="input" value={newVoucher.discountName}  />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>n</span>
                                                <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                <span className="label-char" style={{ '--index': '10' }}>m</span>
                                                <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" onChange={handleChangeCreateInput} name="description" className="input" value={newVoucher.description}  />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>d</span>
                                                <span className="label-char" style={{ '--index': '9' }}>e</span>
                                                <span className="label-char" style={{ '--index': '10' }}>s</span>
                                                <span className="label-char" style={{ '--index': '11' }}>c</span>
                                                <span className="label-char" style={{ '--index': '12' }}>r</span>
                                                <span className="label-char" style={{ '--index': '13' }}>i</span>
                                                <span className="label-char" style={{ '--index': '14' }}>p</span>
                                                <span className="label-char" style={{ '--index': '15' }}>t</span>
                                                <span className="label-char" style={{ '--index': '16' }}>i</span>
                                                <span className="label-char" style={{ '--index': '17' }}>o</span>
                                                <span className="label-char" style={{ '--index': '18' }}>n:</span>
                                            </label>
                                        </div>
                                        
                                    </div>
                                    <div className='col-md-4 list-info-discount'>
                                        <div className='play-bold'>USAGE & DATE</div>
                                        <div className="wave-group">
                                            <input required type="number" name="cost" onChange={handleChangeCreateInput} className="input" value={newVoucher.cost} />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                <span className="label-char" style={{ '--index': '10' }}>s</span>
                                                <span className="label-char" style={{ '--index': '11' }}>t:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={newVoucher.usage} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>u</span>
                                                <span className="label-char" style={{ '--index': '9' }}>s</span>
                                                <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                <span className="label-char" style={{ '--index': '11' }}>g</span>
                                                <span className="label-char" style={{ '--index': '12' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="date" name="startDate" onChange={handleChangeCreateInput} className="input" value={newVoucher.startDate} />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>s</span>
                                                <span className="label-char" style={{ '--index': '9' }}>t</span>
                                                <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                <span className="label-char" style={{ '--index': '11' }}>r</span>
                                                <span className="label-char" style={{ '--index': '12' }}>t</span>
                                                <span className="label-char" style={{ '--index': '13' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '14' }}>d</span>
                                                <span className="label-char" style={{ '--index': '15' }}>a</span>
                                                <span className="label-char" style={{ '--index': '16' }}>t</span>
                                                <span className="label-char" style={{ '--index': '17' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="date" name="endDate" onChange={handleChangeCreateInput} className="input" value={newVoucher.endDate} />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>e</span>
                                                <span className="label-char" style={{ '--index': '9' }}>n</span>
                                                <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                <span className="label-char" style={{ '--index': '11' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '12' }}>d</span>
                                                <span className="label-char" style={{ '--index': '13' }}>a</span>
                                                <span className="label-char" style={{ '--index': '14' }}>t</span>
                                                <span className="label-char" style={{ '--index': '15' }}>e:</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 list-info-discount'>
                                        <div className='play-bold'>STATUS</div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={newVoucher.status ? 'Active' : 'Deactivate'} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>s</span>
                                                <span className="label-char" style={{ '--index': '9' }}>t</span>
                                                <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                <span className="label-char" style={{ '--index': '11' }}>t</span>
                                                <span className="label-char" style={{ '--index': '12' }}>u</span>
                                                <span className="label-char" style={{ '--index': '13' }}>s:</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            :
            state.authentication === 'CEO' ?
                <>
                    <div className="section-discount-content">
                        <PageChartDiscount />
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
