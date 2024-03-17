import React, { useState, useEffect, useContext, memo } from 'react';
import {
    fetchListOfUser,
    fetchSearchUser,
    fetchUser,
    fetchUpdateStatusUser,
    fetchOrderInformation,
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
import Chart2 from 'components/v2/User/Page-Chart'
import Swal from 'sweetalert2'
import 'assets/scss/v2/user.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import User from 'components/v2/User/User'
import Loading from 'components/v2/Loading'
const Index = () => {
    const state = useContext(StateContext)
    const [userList, setUserList] = useState(null)
    const [fullUserList, setFullUserList] = useState([])
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [search, setSearch] = useState({ email: '', status: '', sort: 'asc' })
    const [error, setError] = useState(null)
    const [isInfoUser, setIsInfoUser] = useState(false);
    const [isShowUser, setIsShowUser] = useState(false)
    const [isInfoOrder, setIsInfoOrder] = useState(false)
    const [isInfoProduct, setIsInfoProduct] = useState(false)
    const [user, setUser] = useState(null)
    const [countPageOrder, setCountPageOrder] = useState(1)
    const [countMaxPageOrder, setCountMaxPageOrder] = useState(1)
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
    const startIndex = (countPageOrder - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, orderSearch.length)
    const [order, setOrder] = useState(null)
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [product, setProduct] = useState(null)
    const [isReview, setIsReview] = useState(false);
    useEffect(() => {
        fetchListOfUser(1)
            .then(result => {
                setUserList(result.data)
                setLoading(false)
                setFullUserList(result.chartData)
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
                    // console.log(state.authentication)
                    state.setAuthentication(state.authentication ? state.authentication : null)
                    setError(error.response.status)
                    setLoading(false)
                }
            })
    }, [state])
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
        setCountPage(1)
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
        setCountPage(1)
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

    const handleShowUser = (id) => {
        setIsShowUser(true)
        setIsInfoUser(true)
        setEndDate(today)
        fetchUser(id)
            .then(result => {
                setUser(result)
                setOrderList(result.orders)
                setOrderSearch(result.orders)
                if (0 < result.orders.length % 10 && result.orders.length % 10 < 10) {
                    setCountMaxPageOrder(Math.floor(result.orders.length / 10) + 1)
                } else if (result.orders.length === 0) {
                    setCountMaxPageOrder(1)
                }
                else {
                    setCountMaxPageOrder(Math.floor(result.orders.length / 10))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSetPageOrder = (count) => {
        setCountPageOrder(count)
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
                fetchUpdateStatusUser(user._id, { status: !user.status })
                    .then(result => {
                        let updatedUserList = userList.map(item => {
                            if (item._id === user._id) {
                                return { ...item, status: !user.status };
                            } else {
                                return item;
                            }
                        });
                        setUserList(updatedUserList)
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
        setCountPageOrder(1)
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
            setCountMaxPageOrder(Math.floor(orderSearch2.length / 10) + 1)
        } else if (orderSearch2.length === 0) {
            setCountMaxPageOrder(1)
        }
        else {
            setCountMaxPageOrder(Math.floor(orderSearch2.length / 10))
        }
    }
    const handleShowOrder = (orderId) => {
        setIsInfoUser(false)
        setIsInfoOrder(true)
        setSteps([
            "Ordered",
            "Payment information confirmed",
            "Delivered to the carrier",
            "Being transported",
            "Delivery successful",
        ])
        fetchOrderInformation(orderId)
            .then(result => {
                setOrder(result)
                if (result.status === "Cancel") {
                    setSteps([
                        "Ordered",
                        "Cancel"
                    ])
                    setCurrentStep(1)
                } else if (result.status === "Delivery failed") {
                    setSteps([
                        "Ordered",
                        "Payment information confirmed",
                        "Delivered to the carrier",
                        "Being transported",
                        "Delivery failed"
                    ])
                    setCurrentStep(4)
                }
                else if (result.status === 'Ordered') {
                    setCurrentStep(0)
                }
                else if (result.status === 'Payment information confirmed') {
                    setCurrentStep(1)
                }
                else if (result.status === 'Delivered to the carrier') {
                    setCurrentStep(2)
                }
                else if (result.status === 'Being transported') {
                    setCurrentStep(3)
                }
                else if (result.status === 'Delivery successful') {
                    setCurrentStep(4)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    const fetchListFunctionsMap = {
        'apple': fetchListOfAppleCollectingByName,
        'laptop': fetchListOfLaptopCollectingByName,
        'laptop-gaming': fetchListOfLaptopGamingCollectingByName,
        'pc-gaming': fetchListOfPcGamingCollectingByName,
        'pc-company': fetchListOfPcCompanyCollectingByName,
        'pc-creator': fetchListOfPcCreatorCollectingByName,
    };

    const handleShowProduct = (item) => {
        setIsInfoProduct(true)
        setIsInfoOrder(false)

        const fetchFunction = fetchListFunctionsMap[item.collection];
        if (fetchFunction) {
            fetchFunction(item.src)
                .then(result => {
                    setProduct(result)
                    result.category.length > 0 && setSelectState({
                        ...selectState,
                        hasValue: true
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const [selectState, setSelectState] = useState({
        hasValue: false,
        isDisabled: false,
        isFocused: false
    });
    const { hasValue, isDisabled, isFocused } = selectState
    const handleSelectFocus = () => {
        setSelectState({
            ...selectState,
            isFocused: true
        });
    };
    const handleSelectBlur = () => {
        setSelectState({
            ...selectState,
            isFocused: false
        });
    };
    return (
        <div className='section-user play-regular'>
            {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER') ?
                <>
                    <div className='col-12 section-user-content' >
                        <div style={{ width: '100%', padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                            <div className='section-user-table-goods-title'>
                                <div className='section-user-table-goods-title-name play-bold'>
                                    <span>User List</span>
                                    {/* <p style={{ cursor: 'pointer' }} onClick={() => setIsShowCreateDiscount(true)}>
                                <i className="fa-solid fa-circle-plus" ></i>Add
                            </p> */}
                                </div>
                            </div>
                            <div className='row section-user-table-goods-title-search'>
                                <div className='col-md-1 title-search'>Search:</div>
                                <div className='row col-md-11 content-search'>
                                    <input type='text' name='email' onChange={e => handleSearchUser(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Email' />
                                    <select name='status' onChange={e => handleSearchUser(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value=''>All</option>
                                        <option value='true'>Active</option>
                                        <option value='false'>Deactivate</option>
                                    </select>
                                </div>
                            </div>
                            {userList ?
                                <>
                                    <div className="table-responsive section-user-table-goods">
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Image</th>
                                                    <th>Orders purchased{search.sort === 'asc' ?
                                                        <i className="fa-solid fa-arrow-down" style={{ cursor: "pointer" }} onClick={handleSort} />
                                                        :
                                                        <i className="fa-solid fa-arrow-up" style={{ cursor: "pointer" }} onClick={handleSort} />}</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {userList.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td >{item.username}</td>
                                                        <td>{item.email}</td>
                                                        <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "0%" }} /></td>
                                                        <td className='play-bold'>{item.orders.length}</td>
                                                        <td><label className={
                                                            item.status ? "badge badge-success" : "badge badge-danger"
                                                        }>
                                                            {item.status ? 'Active' : 'Deactivate'}
                                                        </label></td>
                                                        <td><i className='fa-regular fa-eye' onClick={() => handleShowUser(item._id)} style={{ cursor: 'pointer' }} /></td>
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
                    <User
                        isShowUser={isShowUser}
                        isInfoUser={isInfoUser}
                        setIsShowUser={setIsShowUser}
                        setUser={setUser}
                        user={user}
                        handleDeactivateAccount={handleDeactivateAccount}
                        handleSearchOrder={handleSearchOrder}
                        setInputFocused={setInputFocused}
                        optionSelect={optionSelect}
                        countPageOrder={countPageOrder}
                        handleSetPageOrder={handleSetPageOrder}
                        countMaxPageOrder={countMaxPageOrder}
                        setOrder={setOrder}
                        searchOrder={searchOrder}
                        order={order}
                        product={product}
                        startIndex={startIndex}
                        isReview={isReview}
                        setIsReview={setIsReview}
                        currentStep={currentStep}
                        steps={steps}
                        setIsInfoOrder={setIsInfoOrder}
                        setProduct={setProduct}
                        setIsInfoUser={setIsInfoUser}
                        orderSearch={orderSearch}
                        endIndex={endIndex}
                        handleShowOrder={handleShowOrder}
                        isInfoOrder={isInfoOrder}
                        handleShowProduct={handleShowProduct}
                        isInfoProduct={isInfoProduct}
                        setIsInfoProduct={setIsInfoProduct}
                        hasValue={hasValue}
                    />
                </>
                :
                state.authentication === 'CEO' ? <>
                    <div className="section-user-content">
                        <Chart2 />
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
