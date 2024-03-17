import React, { useState, useEffect, useContext, memo } from 'react';
import 'assets/scss/v2/dashboard.scss'
import peopleImage from 'assets/images/dashboard/people.png'
import Footer from "components/v2/Footer"
import { StateContext } from 'components/Context'
import {
    fetchTemperature,
    fetchTotalOrderDashboard,
    fetchTotalOrderSuccessfulDashboard,
    fetchTotalChartSoldInMonth,
    fetchTotalTopProductAll,
    fetchTotalTopOrderAll,
    fetchTopEmployeeHighestValueInYear,
    fetchTopEmployeeHighestOrderInYear,
    fetchTopUserHighestValueAll,
    fetchTopUserHighestOrderAll,
    fetchTopViewProductDashboard,
    fetchTopSoldProductDashboard,
    fetchTopEmployeeHighestValueInYearNotLimit,
    fetchListOfAppleCollectingByName,
    fetchListOfLaptopCollectingByName,
    fetchListOfLaptopGamingCollectingByName,
    fetchListOfPcGamingCollectingByName,
    fetchListOfPcCompanyCollectingByName,
    fetchListOfPcCreatorCollectingByName,
    fetchOrderInformation,
    fetchRequest
} from 'Apis'
import Product from 'components/v2/Product/Product'
import 'assets/scss/v2/product.scss'
import 'assets/scss/v2/order.scss'
import 'assets/scss/v2/user.scss'
import Loading from 'components/v2/Loading'
import Order from 'components/v2/Order/Order'
import ChartRequest from 'components/v2/Dashboard/Chart-request'
const Index = () => {
    const state = useContext(StateContext)
    const formatter = new Intl.NumberFormat('en-US')
    const [locationTemp, setLocationTemp] = useState(null)
    const [totalOrder, setTotalOrder] = useState(null)
    const [totalAmountOrder, setTotalAmountOrder] = useState(0)
    const [totalOrderSuccessful, setTotalOrderSuccessful] = useState(0)
    const [totalAmountOrderSuccessful, setTotalAmountOrderSuccessful] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    const [totalTopOrder, setTotalTopOrder] = useState(null)
    const [totalTopProduct, setTotalTopProduct] = useState(null)
    const [topStaff, setTopStaff] = useState(null)
    const [topStaffNotLimit, setTopStaffNotLimit] = useState(null)
    const [topStaffOrder, setTopStaffOrder] = useState(null)
    const [totalTopUser, setTotalTopUser] = useState(null)
    const [totalTopOrderUser, setTotalTopOrderUser] = useState(null)
    const [totalTopSoldProduct, setTotalTopSoldProduct] = useState(null)
    const [totalTopViewProduct, setTotalTopViewProduct] = useState(null)
    const [categoryTopSoldProduct, setCategoryTopSoldProduct] = useState('laptop')
    const [categoryTopViewProduct, setCategoryTopViewProduct] = useState('laptop')
    // const totalProductInYear = topStaffNotLimit ? topStaffNotLimit.reduce((accumulator, item) => accumulator + item.totalProduct, 0) : 0
    const [totalProductInYear, setTotalProductInYear] = useState(0)
    const [product, setProduct] = useState(null)
    const [isShowProduct, setIsShowProduct] = useState(false)
    const [order, setOrder] = useState(null)
    const [isShowOrder, setIsShowOrder] = useState(false)
    const [isInfoOrder, setIsInfoOrder] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [isInfoProduct, setIsInfoProduct] = useState(false)
    const [request, setRequest] = useState(null)
    const fetchHTemperature = () => {
        fetchTemperature()
            .then(result => {
                setLocationTemp(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const fetchOrder = () => {
        fetchTotalOrderDashboard()
            .then(result => {
                setTotalOrder(result.total)
                setTotalAmountOrder(result.totalAmount)
            })
            .catch(error => {
                setTotalOrder(0)
                setTotalAmountOrder(0)
                console.log(error)
            })
    }
    const fetchOrderSuccessful = () => {
        fetchTotalOrderSuccessfulDashboard()
            .then(result => {
                setTotalOrderSuccessful(result.total)
                setTotalAmountOrderSuccessful(result.totalAmount)
            })
            .catch(error => {
                setTotalOrderSuccessful(0)
                setTotalAmountOrderSuccessful(0)
                console.log(error)
            })
    }
    const fetchTotalChartSold = () => {
        fetchTotalChartSoldInMonth()
            .then(result => {
                // const combinedData = result.resultTotal.reduce((accumulator, currentValue) => {
                //     currentValue.soldProductInMonth.forEach(item => {
                //         const { day, month, soldProduct, amount } = item
                //         const key = `${day}`
                //         if (!accumulator[key]) {
                //             accumulator[key] = {
                //                 day,
                //                 month,
                //                 totalSoldProduct: 0,
                //                 totalAmount: 0
                //             }
                //         }
                //         accumulator[key].totalSoldProduct += soldProduct
                //         accumulator[key].totalAmount += amount
                //     })
                //     return accumulator
                // }, {})
                // const sumProduct = Object.values(combinedData).reduce((total, item) => total + item.totalSoldProduct, 0)
                setTotalProduct(result.totalSumProductInMonth)
                setTotalProductInYear(result.totalSumProductInYear)
            })
            .catch(error => {
                setTotalProduct(0)
                console.log(error)
            })
    }
    const fetchTopOrder = () => {
        fetchTotalTopOrderAll()
            .then(result => {
                setTotalTopOrder(result.resultTotalOrder)
            })
            .catch(error => {
                setTotalTopOrder(0)
                console.log(error)
            })
    }
    const fetchTopProduct = () => {
        fetchTotalTopProductAll()
            .then(result => {
                setTotalTopProduct(result.resultTopProduct)
            })
            .catch(error => {
                setTotalTopProduct(0)
                console.log(error)
            })
    }
    const fetchTopEmployee = () => {
        fetchTopEmployeeHighestValueInYear()
            .then(result => {
                setTopStaff(result.topEmployeeHighestValue)
            })
            .catch(error => {
                setTopStaff([]);
                console.log(error)
            })
    }
    const fetchEmployeeHighestValueInYearNotLimit = () => {
        fetchTopEmployeeHighestValueInYearNotLimit()
            .then(result => {
                setTopStaffNotLimit(result.topEmployeeHighestValue)
            })
            .catch(error => {
                setTopStaffNotLimit([]);
                console.log(error)
            })
    }
    const fetchTopEmployeeOrder = () => {
        fetchTopEmployeeHighestOrderInYear()
            .then(result => {
                setTopStaffOrder(result.topEmployeeHighestOrder)
            })
            .catch(error => {
                setTopStaffOrder([]);
                console.log(error)
            })
    }
    const fetchTopHighestValueAll = () => {
        fetchTopUserHighestValueAll()
            .then(result => {
                setTotalTopUser(result.resultTopUser)
                console.log(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopUser(0)
                console.log(error)
            })
    }
    const fetchTopHighestOrderAll = () => {
        fetchTopUserHighestOrderAll()
            .then(result => {
                setTotalTopOrderUser(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopOrderUser(0)
                console.log(error)
            })
    }
    const fetchTopViewProduct = () => {
        fetchTopViewProductDashboard(categoryTopViewProduct)
            .then(result => {
                setTotalTopViewProduct(result.topViewProducts)
            })
            .catch(error => {
                setTotalTopViewProduct(0)
                console.log(error)
            })
    }
    const fetchTopSoldProduct = () => {
        fetchTopSoldProductDashboard(categoryTopSoldProduct)
            .then(result => {
                setTotalTopSoldProduct(result.topSoldProducts)
            })
            .catch(error => {
                setTotalTopSoldProduct(0)
                console.log(error)
            })
    }
    const fetchRequestAll = () => {
        fetchRequest()
            .then(result => {
                setRequest(result.data)
            })
            .catch(error => {
                console.log('Error:', error);
            })
    }
    useEffect(() => {
        fetchHTemperature()
        if (state.authentication === 'CEO' || state.authentication === 'MANAGEMENT') {
        fetchOrder()
        fetchOrderSuccessful()
        fetchTotalChartSold()
        fetchTopOrder()
        fetchTopEmployee()
        fetchTopEmployeeOrder()
        fetchTopHighestValueAll()
        fetchTopHighestOrderAll()
        fetchTopProduct()
        fetchTopViewProduct()
        fetchTopSoldProduct()
        fetchEmployeeHighestValueInYearNotLimit()
        fetchRequestAll()
        }
    }, [state]);
    const handleChangeCategoryTopSoldProduct = (category) => {
        setTotalTopSoldProduct(null)
        setCategoryTopSoldProduct(category)

        fetchTopSoldProductDashboard(category)
            .then(result => {
                setTotalTopSoldProduct(result.topSoldProducts)
            })
            .catch(error => {
                setTotalTopSoldProduct(0)
                console.log(error)
            })
    }
    const handleChangeCategoryTopViewProduct = (category) => {
        setTotalTopViewProduct(null)
        setCategoryTopViewProduct(category)

        fetchTopViewProductDashboard(category)
            .then(result => {
                setTotalTopViewProduct(result.topViewProducts)
            })
            .catch(error => {
                setTotalTopViewProduct(0)
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
    const handleShowProduct = (item, type) => {
        if (type === 'product') {
            setIsShowProduct(true)
        } else {
            setIsInfoProduct(true)
            setIsInfoOrder(false)
        }
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

    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([])
    const handleShowOrder = (orderId) => {
        setIsShowOrder(true)
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
                    setOptions([
                        {
                            label: 'Payment information confirmed',
                            value: 'Payment information confirmed',
                        },
                        {
                            label: 'Delivered to the carrier',
                            value: 'Delivered to the carrier',
                        },
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Payment information confirmed') {
                    setCurrentStep(1)
                    setOptions([
                        {
                            label: 'Delivered to the carrier',
                            value: 'Delivered to the carrier',
                        },
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Delivered to the carrier') {
                    setCurrentStep(2)
                    setOptions([
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Being transported') {
                    setCurrentStep(3)
                    setOptions([
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Delivery successful') {
                    setCurrentStep(4)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
            stars.push(
                <i key={i} data-rating={i} className={starClass} style={{ color: '#dfe232', padding: '0 3px' }} />
            );
        }
        return stars;
    };

    return (
        <div className='section-dashboard play-regular'>
            <div className='row mb-5 section-dashboard-content'>
                <div className="col-md-6 section-dashboard-temp stretch-card">
                    <div className="card tale-bg ">
                        <div className="card-people mt-auto ">
                            <img src={peopleImage} alt="people" />
                            {locationTemp ? <div className="weather-info">
                                <div className="d-flex">
                                    <div>
                                        <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2" />{locationTemp.main.temp}<sup>C</sup></h2>
                                    </div>
                                    <div className="ml-2">
                                        <h4 className="location font-weight-normal">{locationTemp.name}</h4>
                                        <h6 className="font-weight-normal">{locationTemp.sys.country}</h6>
                                    </div>
                                </div>
                            </div> : <div className="lds-dual-ring" ></div>}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 transparent stretch-card">
                    <div className="row " style={{ textAlign: 'center', justifyContent: 'center' }}>
                        <div className="col-md-6 mb-3 stretch-card">
                            <div className="card card-pie">
                                <div className="pie-st">
                                    <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalOrderSuccessful / totalOrder * 100))))} blue pie-st-1`}>
                                        <span>{Math.floor(parseFloat(formatter.format(totalOrderSuccessful / totalOrder * 100)))}%</span>
                                        <div className="slice">
                                            <div className="bar"></div>
                                            <div className="fill"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className='text-pie-content' >{formatter.format(totalOrder)} orders / year</div>
                                    <div className='text-pie-content' >{formatter.format(totalOrderSuccessful)} orders / month</div>
                                    <div className='text-pie-title' >Orders successful (2024)</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 stretch-card">
                            <div className="card card-pie">
                                <div className="pie-st">
                                    <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalProduct / totalProductInYear * 100))))} blue pie-st-1`}>
                                        <span>{Math.floor(parseFloat(formatter.format(totalProduct / totalProductInYear * 100)))}%</span>
                                        <div className="slice">
                                            <div className="bar"></div>
                                            <div className="fill"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className='text-pie-content' >{formatter.format(totalProductInYear)} goods / month</div>
                                    <div className='text-pie-content' >{formatter.format(totalProduct)} goods / year</div>
                                    <div className='text-pie-title' >Sold (Goods) (2024)</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 stretch-card">
                            <div className="card card-pie">
                                <div className="pie-st">
                                    <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)))} blue pie-st-1`}>
                                        <span>{Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)))}%</span>
                                        <div className="slice">
                                            <div className="bar"></div>
                                            <div className="fill"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className='text-pie-content' >{formatter.format(totalAmountOrder * 0.2)} VNĐ / year</div>
                                    <div className='text-pie-content' >{formatter.format(totalAmountOrderSuccessful * 0.2)} VNĐ / month</div>
                                    <div className='text-pie-title' >Profit of Month</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 stretch-card">
                            <div className="card card-pie">
                                <div className="pie-st">
                                    <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful) / (totalAmountOrder) * 100)))} blue pie-st-1`}>
                                        <span>{Math.floor(parseFloat(formatter.format((totalAmountOrderSuccessful) / (totalAmountOrder) * 100)))}%</span>
                                        <div className="slice">
                                            <div className="bar"></div>
                                            <div className="fill"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className='text-pie-content' >{formatter.format(totalAmountOrder)} VNĐ / month</div>
                                    <div className='text-pie-content' >{formatter.format(totalAmountOrderSuccessful)} VNĐ / month</div>
                                    <div className='text-pie-title' >Amount of month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5 section-dashboard-content'>
                <div className="col-md-12 section-dashboard-temp stretch-card">
                    <div className="card tale-bg ">
                        <div className='play-bold' style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 0 0', fontSize: 20 }}> Request in Month</div>
                        <div className='play-bold' style={{ display: 'flex', justifyContent: 'center', padding: '0 0 20px 0'}}>Total request in month: {request ? `${request.resultTotalLengthMonth[0].total_count} ( ${formatter.format(request.resultTotalLengthMonth[0].total_count/request.resultTotalLengthYear[0].total_count*100)}% / Year )` : 0}  </div>
                        <ChartRequest request={request} />
                    </div>
                </div>

            </div>
            <div className='row mb-5'>
                <div className='col-md-6' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Best - Selling Product
                                </div>
                                <div className='section-dashboard-table-goods-title-content'>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('laptop')} className={categoryTopSoldProduct === 'laptop' ? "animated-button active" : "animated-button"}>
                                        <span>Laptop</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('laptop-gaming')} className={categoryTopSoldProduct === 'laptop-gaming' ? "animated-button active" : "animated-button"}>
                                        <span>Laptop Gaming</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('pc-gaming')} className={categoryTopSoldProduct === 'pc-gaming' ? "animated-button active" : "animated-button"}>
                                        <span>PC Gaming</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('pc-creator')} className={categoryTopSoldProduct === 'pc-creator' ? "animated-button active" : "animated-button"}>
                                        <span>PC Creator</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('pc-company')} className={categoryTopSoldProduct === 'pc-company' ? "animated-button active" : "animated-button"}>
                                        <span>PC Company</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopSoldProduct('apple')} className={categoryTopSoldProduct === 'apple' ? "animated-button active" : "animated-button"}>
                                        <span>Apple</span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Sold</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopSoldProduct && totalTopSoldProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowProduct(item, 'product')} style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</div> <i className='fa-regular fa-eye' /></div></td>
                                            <td>{item.category[0]}</td>
                                            <td>{item.totalSold}</td>
                                            <td>{formatter.format(item.nowPrice)} VND</td>
                                            <td><label className={
                                                item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                            }>
                                                {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
                                            </label></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-6' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Most Viewed Products
                                </div>
                                <div className='section-dashboard-table-goods-title-content'>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('laptop')} className={categoryTopViewProduct === 'laptop' ? "animated-button active" : "animated-button"}>
                                        <span>Laptop</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('laptop-gaming')} className={categoryTopViewProduct === 'laptop-gaming' ? "animated-button active" : "animated-button"}>
                                        <span>Laptop Gaming</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('pc-gaming')} className={categoryTopViewProduct === 'pc-gaming' ? "animated-button active" : "animated-button"}>
                                        <span>PC Gaming</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('pc-creator')} className={categoryTopViewProduct === 'pc-creator' ? "animated-button active" : "animated-button"}>
                                        <span>PC Creator</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('pc-company')} className={categoryTopViewProduct === 'pc-company' ? "animated-button active" : "animated-button"}>
                                        <span>PC Company</span>
                                        <span></span>
                                    </button>
                                    <button onClick={() => handleChangeCategoryTopViewProduct('apple')} className={categoryTopViewProduct === 'apple' ? "animated-button active" : "animated-button"}>
                                        <span>Apple</span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>View</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopViewProduct && totalTopViewProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowProduct(item, 'product')} style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</div> <i className='fa-regular fa-eye' /></div></td>
                                            <td>{item.category[0]}</td>
                                            <td>{item.totalView}</td>
                                            <td>{formatter.format(item.nowPrice)} VND</td>
                                            <td><label className={
                                                item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                            }>
                                                {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
                                            </label></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-md-4' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top Employee Highest Amount
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Role</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {topStaff ? topStaff.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 50, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '100px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.username}</div></div></td>
                                            <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                            <td>{item.role}</td>
                                            <td><span className="play-bold">{formatter.format(item.totalAmount)} VND</span></td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-4' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top Employee Highest Order
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Role</th>
                                        <th>Orders</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {topStaffOrder ? topStaffOrder.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 50, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '100px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.username}</div></div></td>
                                            <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                            <td>{item.role}</td>
                                            <td><span className="play-bold">{formatter.format(item.totalOrder)}</span></td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-4' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top Discount
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Places</th>
                                        <th>Orders</th>
                                        <th>Users</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                        <td style={{ display: 'flex' }}><div style={{ maxWidth: '50px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Laptop Lenovo Yoga Slim 7 Pro 14IHU5 O 82NH00BDVN</div></td>
                                        <td>LENOVO</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-md-6' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top User Highest Number Of Order
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Phone number</th>
                                        <th>Order</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopOrderUser ? totalTopOrderUser.map((item, index) => {
                                        return <tr key={index}>

                                            <td><div style={{ maxWidth: '150px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.email}</div></td>
                                            <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                            <td>{item.phoneNumber ? item.phoneNumber : 0}</td>
                                            <td><span className="play-bold">{formatter.format(item.ordersCount)}</span></td>
                                            <td><span className="play-bold">{formatter.format(item.totalSumOrder)} VNĐ</span></td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-6' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top User Highest Amount Of Order
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Phone number</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopUser ? totalTopUser.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ maxWidth: '150px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.email}</div></td>
                                            <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                            <td>{item.phoneNumber ? item.phoneNumber : 0}</td>
                                            <td><span className="play-bold">{formatter.format(item.orders.sumOrder)} VNĐ</span></td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-md-12' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top value in Order
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>#ID</th>
                                        <th>Username</th>
                                        <th>Date Order</th>
                                        <th>Goods</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopOrder ? totalTopOrder.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowOrder(item.order.orderId)} style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '130px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order.orderId.toUpperCase()}</div> <i className='fa-regular fa-eye' /></div></td>
                                            <td><div style={{ maxWidth: '200px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order.email}</div></td>
                                            <td>{item.order.createDate}</td>
                                            <td><span className="play-bold">{formatter.format(item.productCount)}</span></td>
                                            <td><span className="play-bold">{formatter.format(item.order.sumOrder)} VNĐ</span></td>
                                            <td>
                                                <label className={
                                                    item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                }>
                                                    {item.order.status}
                                                </label>
                                            </td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-md-12' >
                    <div style={{ padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className="table-responsive section-dashboard-table-goods">
                            <div className='section-dashboard-table-goods-title'>
                                <div className='section-dashboard-table-goods-title-name play-bold'>
                                    Top goods in Order
                                </div>
                            </div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>#ID</th>
                                        <th>Username</th>
                                        <th>Date Order</th>
                                        <th>Goods</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {totalTopProduct ? totalTopProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowOrder(item.order.orderId)} style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '130px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order.orderId.toUpperCase()}</div> <i className='fa-regular fa-eye' /></div></td>
                                            <td><div style={{ maxWidth: '200px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.order.email}</div></td>
                                            <td>{item.order.createDate}</td>
                                            <td><span className="play-bold">{formatter.format(item.productCount)}</span></td>
                                            <td><span className="play-bold">{formatter.format(item.order.sumOrder)} VNĐ</span></td>
                                            <td>
                                                <label className={
                                                    item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                }>
                                                    {item.order.status}
                                                </label>
                                            </td>
                                        </tr>
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className='section-product'>
                <div className={isShowProduct ? 'col-12 section-info-product active' : 'col-12 section-info-product'}>
                    <div className='first-form section-form-info-product show-product'>
                        <div className='section-form-info-product-title play-bold'><span>Information product</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowProduct(false), setProduct(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        {product ? <>
                            <Product product={product} />
                        </>
                            :
                            <Loading />
                        }
                    </div>
                </div>
            </div>
            <div className='section-order'>
                <div className={isShowOrder ? 'col-12 section-info-order active' : 'col-12 section-info-order'}>
                    <div className={isInfoOrder ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'><span>Information Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setOrder(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        {order ? <Order steps={steps} currentStep={currentStep} order={order} options={options} setIsReview={setIsReview} setIsInfoOrder={setIsInfoOrder} handleShowProduct={handleShowProduct} />
                            :
                            <Loading />
                        }
                    </div>
                    <div className={isReview ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(false), setIsInfoOrder(true))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Review Goods Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setOrder(null), setIsReview(false), setProduct(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        {order ?
                            <div className='section-form-info-review-content'>
                                <div className='box-info-purchaser-review'>
                                    {order.statusReview.product.map((item, index) => {
                                        return <React.Fragment key={index}>
                                            <div className='info-product-review'>
                                                <div className='info-product-img'><img src={item.img} alt='' /></div>
                                                <div className='info-product-content'>
                                                    <div className='play-bold'>{item.nameProduct}</div>
                                                    <div>{renderStars(item.star)}</div>
                                                    <label className='play-bold'>Content rated: {item.content}</label>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    })}
                                </div>
                            </div>
                            :
                            <Loading />
                        }
                    </div>
                    <div className={isInfoProduct ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'>
                            <i
                                className='fa-solid fa-arrow-left'
                                onClick={() => (setIsInfoProduct(false), setIsInfoOrder(true), setProduct(null))}
                                style={{ cursor: 'pointer', fontSize: 26 }} />
                            <span>Information Product</span>
                            <i
                                className='fa-solid fa-xmark'
                                onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setIsInfoProduct(false), setOrder(null), setProduct(null))}
                                style={{ cursor: 'pointer', fontSize: 26 }} />
                        </div>
                        {product ?
                            <Product product={product} />
                            :
                            <Loading />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
