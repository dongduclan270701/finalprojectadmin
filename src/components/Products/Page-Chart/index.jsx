import React, { useState, useEffect, memo } from 'react'
import ChartSoldOrdersOfMonth from 'components/Products/Page-Chart/ChartSoldOrderOfMonth'
import ChartCategory from 'components/Products/Page-Chart/ChartCategory'
import ChartSoldGoodsInMonth from 'components/Products/Page-Chart/ChartSoldGoodsInMonth'
import ChartViewGoodsOnCategory from 'components/Products/Page-Chart/ChartViewGoodsInMonth'
import ChartViewGoods from 'components/Products/Page-Chart/ChartViewGoods'
import {
    fetchTotalGoodsLaptopCollecting,
    fetchTotalOutOfStockLaptopCollecting,
    fetchTotalAInStockLaptopCollecting,
    fetchTotalSoldOfMonthLaptopCollecting,
    fetchTotalViewInMonthLaptopCollecting,
    fetchTotalSoldInYearLaptopCollecting,
    fetchTotalViewInYearLaptopCollecting,
    fetchTotalSoldByDayLaptopCollecting,
    fetchTotalViewByDayLaptopCollecting,
    fetchCountGoodsByCategoryLaptopCollecting,
    fetchSoldProductsByCategoryLaptopCollecting,
    fetchTopSoldProductsLaptopCollecting,
    fetchTopViewProductsLaptopCollecting
} from 'Apis'

const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { optionSelectLaptop } = props
    const [changeChart, setChangeChart] = useState(false)
    const [totalGoods, setTotalGoods] = useState(null)
    const [totalOutOfStock, setTotalOutOfStock] = useState(null)
    const [totalInStock, setTotalInStock] = useState(null)
    const [totalAvailableInStock, setTotalAvailableInStock] = useState(null)
    const [totalSoldOfMonth, setTotalSoldOfMonth] = useState(null)
    const [totalProfitOfMonth, setTotalProfitOfMonth] = useState(null)
    const [totalViewInMonth, setTotalViewInMonth] = useState(null)
    const [totalSoldInYear, setTotalSoldInYear] = useState(null)
    const [totalSoldByDay, setTotalSoldByDay] = useState(null)
    const [totalViewInYear, setTotalViewInYear] = useState(null)
    const [totalViewByDay, setTotalViewByDay] = useState(null)
    const [countGoodsByCategory, setCountGoodsByCategory] = useState(null)
    const [soldProductsByCategory, setSoldProductsByCategory] = useState(null)
    const [topSoldProducts, setTopSoldProducts] = useState(null)
    const [topViewProducts, setTopViewProducts] = useState(null)
    const fetchTotalGoods = () => {
        fetchTotalGoodsLaptopCollecting()
            .then(result => {
                console.log(1)
                setTotalGoods(result.total)
            })
            .catch(error => {
                setTotalGoods(0)
                console.log(error)
            })
    }
    const fetchTotalOutOfStock = () => {
        fetchTotalOutOfStockLaptopCollecting()
            .then(result => {
                setTotalOutOfStock(result.totalOutStock)
            })
            .catch(error => {
                setTotalOutOfStock(0)
                console.log(error)
            })
    }
    const fetchTotalAInStock = () => {
        fetchTotalAInStockLaptopCollecting()
            .then(result => {
                setTotalAvailableInStock(result.totalAvailable)
                setTotalInStock(result.totalInStock)
            })
            .catch(error => {
                setTotalAvailableInStock(0)
                console.log(error)
            })
    }
    const fetchTotalSoldOfMonth = () => {
        fetchTotalSoldOfMonthLaptopCollecting()
            .then(result => {
                setTotalSoldOfMonth(result.totalSold)
                setTotalProfitOfMonth(result.totalProfit)
            })
            .catch(error => {
                setTotalSoldOfMonth(0)
                console.log(error)
            })
    }
    const fetchTotalViewInMonth = () => {
        fetchTotalViewInMonthLaptopCollecting()
            .then(result => {
                setTotalViewInMonth(result.totalView)
            })
            .catch(error => {
                setTotalSoldOfMonth(0)
                console.log(error)
            })
    }
    const fetchTotalSoldInYear = () => {
        fetchTotalSoldInYearLaptopCollecting()
            .then(result => {
                setTotalSoldInYear(result.totalSoldInYear)
            })
            .catch(error => {
                setTotalSoldInYear(0)
                console.log(error)
            })
    }
    const fetchTotalViewInYear = () => {
        fetchTotalViewInYearLaptopCollecting()
            .then(result => {
                setTotalViewInYear(result.totalViewInYear)
            })
            .catch(error => {
                setTotalViewInYear(0)
                console.log(error)
            })
    }
    const fetchTotalSoldByDay = () => {
        fetchTotalSoldByDayLaptopCollecting()
            .then(result => {
                setTotalSoldByDay(result.totalSoldByDay)
            })
            .catch(error => {
                setTotalSoldByDay(0)
                console.log(error)
            })
    }
    const fetchTotalViewByDay = () => {
        fetchTotalViewByDayLaptopCollecting()
            .then(result => {
                setTotalViewByDay(result.totalViewByDay)
            })
            .catch(error => {
                setTotalViewByDay(0)
                console.log(error)
            })
    }
    const fetchCountGoodsByCategory = (optionSelectLaptop) => {
        fetchCountGoodsByCategoryLaptopCollecting(optionSelectLaptop)
            .then(result => {
                setCountGoodsByCategory(result.total)
            })
            .catch(error => {
                setCountGoodsByCategory(0)
                console.log(error)
            })
    }
    const fetchSoldProductsByCategory = (optionSelectLaptop) => {
        fetchSoldProductsByCategoryLaptopCollecting(optionSelectLaptop)
            .then(result => {
                setSoldProductsByCategory(result.resultSold)
            })
            .catch(error => {
                setSoldProductsByCategory(0)
                console.log(error)
            })
    }
    const fetchTopSoldProducts = () => {
        fetchTopSoldProductsLaptopCollecting()
            .then(result => {
                setTopSoldProducts(result.topSoldProducts)
            })
            .catch(error => {
                setTopSoldProducts([])
                console.log(error)
            })
    }
    const fetchTopViewProducts = () => {
        fetchTopViewProductsLaptopCollecting()
            .then(result => {
                setTopViewProducts(result.topViewProducts)
            })
            .catch(error => {
                setTopViewProducts([])
                console.log(error)
            })
    }
    useEffect(() => {
        if (optionSelectLaptop.length > 0) {
            fetchTotalGoods()
            fetchTotalOutOfStock()
            fetchTotalAInStock()
            fetchTotalSoldOfMonth()
            fetchTotalViewInMonth()
            fetchTotalSoldInYear()
            fetchTotalViewInYear()
            fetchTotalSoldByDay()
            fetchTotalViewByDay()
            fetchTopSoldProducts()
            fetchTopViewProducts()
            fetchSoldProductsByCategory(optionSelectLaptop)
            fetchCountGoodsByCategory(optionSelectLaptop)
        }
    }, [optionSelectLaptop]);
    const handleChangeChart = () => {
        setChangeChart(!changeChart)
    }
    const getCurrentMonthName = () => {
        const currentDate = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthIndex = currentDate.getMonth();
        const currentMonthName = monthNames[currentMonthIndex];
        return currentMonthName;
    }
    const currentMonthName = getCurrentMonthName()
    const handleResetData = (event, name) => {
        switch (name) {
            case "totalGoods":
                setTotalGoods(null)
                fetchTotalGoods()
                break;
            case "totalOutOfStock":
                setTotalOutOfStock(null)
                fetchTotalOutOfStock()
                break;
            case "totalInStock":
                setTotalInStock(null)
                setTotalAvailableInStock(null)
                fetchTotalAInStock()
                break;
            case "totalSoldAndProfitOfMonth":
                setTotalSoldOfMonth(null)
                setTotalProfitOfMonth(null)
                setTotalSoldInYear(null)
                fetchTotalSoldOfMonth()
                fetchTotalSoldInYear()
                break;
            case "totalViewInMonth":
                setTotalViewInMonth(null)
                setTotalViewInYear(null)
                fetchTotalViewInMonth()
                fetchTotalViewInYear()
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3">Total category</p>
                            <p className="fs-25 mb-2">{formatter.format(optionSelectLaptop.length)}</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total goods <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalGoods")} /></p>
                            {totalGoods === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <p className="fs-25 mb-2">{formatter.format(totalGoods)}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total Out of Stock <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalOutOfStock")} /></p>
                            {totalOutOfStock === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalOutOfStock)}</p>
                                    <p>{formatter.format((totalOutOfStock / totalGoods) * 100)}% / Total Goods</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total available in stock <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalInStock")} /></p>
                            {totalInStock === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalInStock)} - {formatter.format(totalAvailableInStock)} VND</p>
                                    <p>{formatter.format((totalInStock / totalGoods) * 100)}%/ Total Goods</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total Sold this Month <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalSoldAndProfitOfMonth")} /></p>
                            {totalSoldOfMonth === null && totalSoldInYear === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalSoldOfMonth)} - {formatter.format(totalProfitOfMonth)} VND ( Profit )</p>
                                    <p>{formatter.format((totalSoldOfMonth / totalSoldInYear) * 100)}% / Year</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total View this Month <i className="mdi mdi-reload" style={{ cursor: "pointer" }} onClick={event => handleResetData(event, "totalViewInMonth")} /></p>
                            {totalViewInMonth === null || totalViewInYear === null ?
                                <div class="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalViewInMonth)}</p>
                                    <p>{formatter.format((totalViewInMonth / totalViewInYear) * 100)}% / Year</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Sold in Month ( {currentMonthName} )</h4>
                                    {totalSoldByDay ? <ChartSoldOrdersOfMonth totalSoldByDay={totalSoldByDay} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Category</h4>
                                    {countGoodsByCategory ? <ChartCategory countGoodsByCategory={countGoodsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                {changeChart ?
                                    <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                        <h4>Chart Sold Goods on Category in Month ( {currentMonthName} )
                                            <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>View</p>
                                        </h4>
                                        {soldProductsByCategory ? <ChartSoldGoodsInMonth soldProductsByCategory={soldProductsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
                                    </div>
                                    :
                                    <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                        <h4>Chart View Goods on Category in Month ( {currentMonthName} )
                                            <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>Sold</p>
                                        </h4>
                                        {soldProductsByCategory ? <ChartViewGoodsOnCategory soldProductsByCategory={soldProductsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart View Goods in Month ( {currentMonthName} )</h4>
                                    {totalViewByDay ? <ChartViewGoods totalViewByDay={totalViewByDay} /> : <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 Best Selling Products This Month ( {currentMonthName} )</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Name</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Category</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Sold Order</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Price</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topSoldProducts ? topSoldProducts.map(item => {
                                                    return <tr className="odd ">
                                                        <td className="sorting_1" style={{maxWidth: 120, whiteSpace:"nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                            {item.nameProduct}</td>
                                                        <td>
                                                            {item.category[0]}</td>
                                                        <td>
                                                            {item.totalSold}</td>
                                                        <td>
                                                            {formatter.format(item.nowPrice)} VND</td>
                                                        <td>
                                                            {item.quantity > 0 ? "Active" : "Deactivate"}
                                                        </td>
                                                    </tr>
                                                }) : <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                                        <div className="lds-dual-ring" style={{ display: 'inline-block'}}></div>
                                                    </td>
                                                </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Top 10 Most Viewed Products This Month ( {currentMonthName} )</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Name</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Category</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        View</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        Price</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Status</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topViewProducts ? topViewProducts.map(item => {
                                                    return <tr className="odd ">
                                                        <td className="sorting_1" style={{maxWidth: 120, whiteSpace:"nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                            {item.nameProduct}</td>
                                                        <td>
                                                            {item.category[0]}</td>
                                                        <td>
                                                            {item.totalView}</td>
                                                        <td>
                                                            {formatter.format(item.nowPrice)} VND</td>
                                                        <td>
                                                            {item.quantity > 0 ? "Active" : "Deactivate"}
                                                        </td>
                                                    </tr>
                                                }) : <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                                        <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                                    </td>
                                                </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index)