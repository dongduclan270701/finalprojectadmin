import React, { useState, useEffect, memo } from 'react'
import ChartSoldOrdersOfMonth from 'components/v2/Product/Page-Chart/ChartSoldOrderOfMonth'
import ChartCategory from 'components/v2/Product/Page-Chart/ChartCategory'
import ChartSoldGoodsInMonth from 'components/v2/Product/Page-Chart/ChartSoldGoodsInMonth'
import ChartViewGoodsOnCategory from 'components/v2/Product/Page-Chart/ChartViewGoodsInMonth'
import ChartViewGoods from 'components/v2/Product/Page-Chart/ChartViewGoods'
import {
    fetchTotalGoodsCollecting,
    fetchTotalOutOfStockCollecting,
    fetchTotalAInStockCollecting,
    fetchTotalSoldOfMonthCollecting,
    fetchTotalViewInMonthCollecting,
    fetchTotalSoldInYearCollecting,
    fetchTotalViewInYearCollecting,
    fetchTotalSoldByDayCollecting,
    fetchTotalViewByDayCollecting,
    fetchCountGoodsByCategoryCollecting,
    fetchSoldProductsByCategoryCollecting,
    fetchTopSoldProductsCollecting,
    fetchTopViewProductsCollecting
} from 'Apis'

const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { optionSelectLaptop, collectingTable } = props
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
    const fetchTotalGoods = (collection) => {
        fetchTotalGoodsCollecting(collection)
            .then(result => {
                setTotalGoods(result.total)
            })
            .catch(error => {
                setTotalGoods(0)
                console.log(error)
            })
    }
    const fetchTotalOutOfStock = (collection) => {
        fetchTotalOutOfStockCollecting(collection)
            .then(result => {
                setTotalOutOfStock(result.totalOutStock)
            })
            .catch(error => {
                setTotalOutOfStock(0)
                console.log(error)
            })
    }
    const fetchTotalAInStock = (collection) => {
        fetchTotalAInStockCollecting(collection)
            .then(result => {
                setTotalAvailableInStock(result.totalAvailable)
                setTotalInStock(result.totalInStock)
            })
            .catch(error => {
                setTotalAvailableInStock(0)
                console.log(error)
            })
    }
    const fetchTotalSoldOfMonth = (collection) => {
        fetchTotalSoldOfMonthCollecting(collection)
            .then(result => {
                setTotalSoldOfMonth(result.totalSold)
                setTotalProfitOfMonth(result.totalProfit)
            })
            .catch(error => {
                setTotalSoldOfMonth(0)
                console.log(error)
            })
    }
    const fetchTotalViewInMonth = (collection) => {
        fetchTotalViewInMonthCollecting(collection)
            .then(result => {
                const sumProduct = result.totalView.reduce((total, item) => total + item.totalView, 0)
                setTotalViewInMonth(sumProduct)
            })
            .catch(error => {
                setTotalViewInMonth(0)
                console.log(error)
            })
    }
    const fetchTotalSoldInYear = (collection) => {
        fetchTotalSoldInYearCollecting(collection)
            .then(result => {
                setTotalSoldInYear(result.totalSoldInYear)
            })
            .catch(error => {
                setTotalSoldInYear(0)
                console.log(error)
            })
    }
    const fetchTotalViewInYear = (collection) => {
        fetchTotalViewInYearCollecting(collection)
            .then(result => {
                const sumProduct = result.totalViewInYear.reduce((total, item) => total + item.totalView, 0)
                setTotalViewInYear(sumProduct)
            })
            .catch(error => {
                setTotalViewInYear(0)
                console.log(error)
            })
    }
    const fetchTotalSoldByDay = (collection) => {
        fetchTotalSoldByDayCollecting(collection)
            .then(result => {
                setTotalSoldByDay(result.totalSoldByDay)
            })
            .catch(error => {
                setTotalSoldByDay(0)
                console.log(error)
            })
    }
    const fetchTotalViewByDay = (collection) => {
        fetchTotalViewByDayCollecting(collection)
            .then(result => {
                setTotalViewByDay(result.totalViewByDay)
            })
            .catch(error => {
                setTotalViewByDay(0)
                console.log(error)
            })
    }

    const fetchCountGoodsByCategory = (optionSelectLaptop, collection) => {
        fetchCountGoodsByCategoryCollecting(optionSelectLaptop, collection)
            .then(result => {
                setCountGoodsByCategory(result.total)
            })
            .catch(error => {
                setCountGoodsByCategory(0)
                console.log(error)
            })
    }
    const fetchSoldProductsByCategory = (optionSelectLaptop, collection) => {
        fetchSoldProductsByCategoryCollecting(optionSelectLaptop, collection)
            .then(result => {
                setSoldProductsByCategory(result.resultSold)
            })
            .catch(error => {
                setSoldProductsByCategory(0)
                console.log(error)
            })
    }

    const fetchTopSoldProducts = (collection) => {
        fetchTopSoldProductsCollecting(collection)
            .then(result => {
                setTopSoldProducts(result.topSoldProducts)
            })
            .catch(error => {
                setTopSoldProducts([])
                console.log(error)
            })
    }
    const fetchTopViewProducts = (collection) => {
        fetchTopViewProductsCollecting(collection)
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
            fetchTotalGoods(collectingTable)
            fetchTotalOutOfStock(collectingTable)
            fetchTotalAInStock(collectingTable)
            fetchTotalSoldOfMonth(collectingTable)
            fetchTotalViewInMonth(collectingTable)
            fetchTotalSoldInYear(collectingTable)
            fetchTotalViewInYear(collectingTable)
            fetchTotalSoldByDay(collectingTable)
            fetchTotalViewByDay(collectingTable)
            fetchTopSoldProducts(collectingTable)
            fetchTopViewProducts(collectingTable)

            fetchSoldProductsByCategory(optionSelectLaptop, collectingTable)
            fetchCountGoodsByCategory(optionSelectLaptop, collectingTable)
        }
    }, [optionSelectLaptop, collectingTable]);
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

                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(optionSelectLaptop.length)} categories</div>
                            <div className='text-pie-title play-bold' >Total Category</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(totalGoods)} goods</div>
                            <div className='text-pie-title play-bold' >Total Goods</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalOutOfStock / totalGoods) * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalOutOfStock / totalGoods) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalOutOfStock)} goods / Total Goods</div>
                            <div className='text-pie-title play-bold' >Out of Stock</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalInStock / totalGoods) * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalInStock / totalGoods) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalInStock)} goods - {formatter.format(totalAvailableInStock * 0.8)} VND</div>
                            <div className='text-pie-title play-bold' >Available in stock</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format((totalSoldOfMonth / totalSoldInYear) * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalSoldOfMonth / totalSoldInYear) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalSoldOfMonth)} goods - {formatter.format(totalProfitOfMonth * 0.2)} VND ( Profit )</div>
                            <div className='text-pie-title play-bold' >Sold this Month</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(((totalViewInMonth / totalViewInYear) * 100) > 100 ? 100 : ((totalViewInMonth / totalViewInYear) * 100))))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format((totalViewInMonth / totalViewInYear) * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalViewInMonth)} Views</div>
                            <div className='text-pie-title play-bold' >View this Month</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Sold in Month ( {currentMonthName} )</h4>
                                    {totalSoldByDay ? <ChartSoldOrdersOfMonth totalSoldByDay={totalSoldByDay} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Category</h4>
                                    {countGoodsByCategory ? <ChartCategory countGoodsByCategory={countGoodsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                {changeChart ?
                                    <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                        <h4 className='play-bold'>Chart Sold Goods on Category in Month ( {currentMonthName} )
                                            <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>View</p>
                                        </h4>
                                        {soldProductsByCategory ? <ChartSoldGoodsInMonth soldProductsByCategory={soldProductsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                    </div>
                                    :
                                    <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                        <h4 className='play-bold'>Chart View Goods on Category in Month ( {currentMonthName} )
                                            <p onClick={handleChangeChart} style={{ textAlign: "end", color: "blue", cursor: "pointer" }}>Sold</p>
                                        </h4>
                                        {soldProductsByCategory ? <ChartViewGoodsOnCategory soldProductsByCategory={soldProductsByCategory} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 stretch-card">
                    <div className="card" style={{ "marginBottom": "30px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart View Goods in Month ( {currentMonthName} )<p>&nbsp;</p></h4>
                                    {totalViewByDay ? <ChartViewGoods totalViewByDay={totalViewByDay} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-product-table-goods">
                            <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 Best Selling Products This Month ( {currentMonthName} )</p>
                            <table className='table table-striped section-table-goods '>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Sold</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                    {topSoldProducts && topSoldProducts.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</div></div></td>
                                            <td>{item.category[0]}</td>
                                            <td className='play-bold'>{item.totalSold}</td>
                                            <td className='play-bold'>{formatter.format(item.nowPrice)} VND</td>
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
                <div className="col-md-6 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-product-table-goods">
                            <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 Most Viewed Products This Month ( {currentMonthName} )</p>
                            <table className='table table-striped section-table-goods '>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>View</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                    {topViewProducts && topViewProducts.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</div></div></td>
                                            <td>{item.category[0]}</td>
                                            <td className='play-bold'>{item.totalView}</td>
                                            <td className='play-bold'>{formatter.format(item.nowPrice)} VND</td>
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
        </div>
    );
}

export default memo(Index)