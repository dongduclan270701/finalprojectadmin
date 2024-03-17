import React, { useState, useEffect, memo } from 'react'
import ChartStatusUsers from 'components/Users/Page-Chart/ChartStatusUsers'
import ChartUsersAge from 'components/Users/Page-Chart/ChartUsersAge'
import ChartUsersRegisterOfMonth from 'components/Users/Page-Chart/ChartUsersRegisterOfMonth'
import {
    fetchTotalUsers,
    fetchTotalUserLoginLastMonth,
    fetchTotalUserLoginOverMonth,
    fetchTotalUserAddGoodsToWishlist,
    fetchTotalUserPurchased,
    fetchTotalUserJoinInMonth,
    fetchTotalAgeUser,
    fetchTotalStatusUser,
    fetchTopUserHighestValue,
    fetchTopUserHighestOrder
} from 'Apis'
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const [totalUser, setTotalUser] = useState(null)
    const [totalUserLoginLastMonth, setTotalUserLoginLastMonth] = useState(null)
    const [totalUserLoginOverMonth, setTotalUserLoginOverMonth] = useState(null)
    const [totalUserAddGoodsToWishlist, setTotalUserAddGoodsToWishlist] = useState(null)
    const [totalUserPurchased, setTotalUserPurchased] = useState(null)
    const [totalUserJoinIn, setTotalUserJoinIn] = useState(null)
    const [totalChartUserJoinIn, setTotalChartUserJoinIn] = useState(null)
    const [totalAgeUser, setTotalAgeUser] = useState(null)
    const [totalStatusUser, setTotalStatusUser] = useState(null)
    const [totalTopUser, setTotalTopUser] = useState(null)
    const [totalTopUserOrder, setTotalTopUserOrder] = useState(null)
    const fetchTotalUser = () => {
        fetchTotalUsers()
            .then(result => {
                setTotalUser(result.total)
            })
            .catch(error => {
                setTotalUser(0)
                console.log(error)
            })
    }
    const fetchUserLoginLastMonth = () => {
        fetchTotalUserLoginLastMonth()
            .then(result => {
                setTotalUserLoginLastMonth(result.resultTotalUser)
            })
            .catch(error => {
                setTotalUserLoginLastMonth(0)
                console.log(error)
            })
    }
    const fetchUserLoginOverMonth = () => {
        fetchTotalUserLoginOverMonth()
            .then(result => {
                setTotalUserLoginOverMonth(result.resultTotalUser)
            })
            .catch(error => {
                setTotalUserLoginOverMonth(0)
                console.log(error)
            })
    }
    const fetchUserAddGoodsToWishlist = () => {
        fetchTotalUserAddGoodsToWishlist()
            .then(result => {
                setTotalUserAddGoodsToWishlist(result.resultTotalUser)
            })
            .catch(error => {
                setTotalUserAddGoodsToWishlist(0)
                console.log(error)
            })
    }
    const fetchUserPurchased = () => {
        fetchTotalUserPurchased()
            .then(result => {
                setTotalUserPurchased(result.resultTotalUser)
            })
            .catch(error => {
                setTotalUserPurchased(0)
                console.log(error)
            })
    }
    const fetchUserJoinInMonth = () => {
        fetchTotalUserJoinInMonth()
            .then(result => {
                const totalUserCount = result.resultTotalUser.reduce((total, item) => total + item.countUser, 0);
                setTotalChartUserJoinIn(result.resultTotalUser)
                setTotalUserJoinIn(totalUserCount)
            })
            .catch(error => {
                setTotalUserJoinIn(0)
                console.log(error)
            })
    }
    const fetchAgeUser = () => {
        fetchTotalAgeUser()
            .then(result => {
                setTotalAgeUser(result.totalAgeUser)
            })
            .catch(error => {
                setTotalAgeUser(0)
                console.log(error)
            })
    }
    const fetchStatusUser = () => {
        fetchTotalStatusUser()
            .then(result => {
                setTotalStatusUser(result)
            })
            .catch(error => {
                setTotalStatusUser(0)
                console.log(error)
            })
    }
    const fetchTopHighestValue = () => {
        fetchTopUserHighestValue()
            .then(result => {
                setTotalTopUser(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopUser(0)
                console.log(error)
            })
    }
    const fetchTopHighestOrder = () => {
        fetchTopUserHighestOrder()
            .then(result => {
                result.resultTopUser.sort((a, b) => {
                    const ordersALength = a.orders.length;
                    const ordersBLength = b.orders.length;
                    const sumOrderA = a.orders.reduce((total, order) => total + order.sumOrder, 0);
                    const sumOrderB = b.orders.reduce((total, order) => total + order.sumOrder, 0);
                
                    // Đầu tiên, so sánh theo độ dài của mảng orders giảm dần
                    if (ordersALength > ordersBLength) return -1;
                    if (ordersALength < ordersBLength) return 1;
                
                    // Nếu có cùng độ dài mảng orders, thì so sánh theo tổng sumOrder giảm dần
                    if (sumOrderA > sumOrderB) return -1;
                    if (sumOrderA < sumOrderB) return 1;
                
                    return 0; // Nếu cả hai tiêu chí trên bằng nhau
                });
                result.resultTopUser.forEach((item) => {
                    const totalSumOrder = item.orders.reduce((total, order) => total + order.sumOrder, 0);
                    item.totalSumOrder = totalSumOrder;
                });
                setTotalTopUserOrder(result.resultTopUser)
            })
            .catch(error => {
                setTotalTopUserOrder(0)
                console.log(error)
            })
    }
    useEffect(() => {
        fetchTotalUser()
        fetchUserLoginLastMonth()
        fetchUserLoginOverMonth()
        fetchUserAddGoodsToWishlist()
        fetchUserPurchased()
        fetchUserJoinInMonth()
        fetchAgeUser()
        fetchStatusUser()
        fetchTopHighestValue()
        fetchTopHighestOrder()
    }, [])
    const handleResetData = (event, name) => {
        switch (name) {
            case "totalUsers":
                setTotalUser(null)
                fetchTotalUser()
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
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total user </p>
                            {totalUser === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUser)}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total user active (1 Month) </p>
                            {totalUserLoginLastMonth === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUserLoginLastMonth)}</p>
                                    <p>{formatter.format(totalUserLoginLastMonth / totalUser * 100)}% / Total User</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total users stopped working (1 Month) </p>
                            {totalUserLoginOverMonth === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUserLoginOverMonth)}</p>
                                    <p>{formatter.format(totalUserLoginOverMonth / totalUser * 100)}% / Total User</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total users join in (1 Month) </p>
                            {totalUserJoinIn === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUserJoinIn)}</p>
                                    <p>{formatter.format(totalUserJoinIn / totalUser * 100)}% / Total User</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-light-blue">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total users have purchased </p>
                            {totalUserPurchased === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUserPurchased)}</p>
                                    <p>{formatter.format(totalUserPurchased / totalUser * 100)}% / Total User</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                        <div className="card-body">
                            <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Total users add goods to wishlist </p>
                            {totalUserAddGoodsToWishlist === null ?
                                <div className="lds-dual-ring" ></div>
                                :
                                <>
                                    <p className="fs-25 mb-2">{formatter.format(totalUserAddGoodsToWishlist)}</p>
                                    <p>{formatter.format(totalUserAddGoodsToWishlist / totalUser * 100)}% / Total User</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart Number of Subscribers / Month</h4>
                                    {/* <ChartUsersRegisterOfMonth /> */}
                                    {totalChartUserJoinIn ? <ChartUsersRegisterOfMonth totalChartUserJoinIn={totalChartUserJoinIn} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4>Chart User Age </h4>
                                    {/* <ChartUsersAge /> */}
                                    {totalAgeUser ? <ChartUsersAge totalAgeUser={totalAgeUser} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
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
                                    <h4>Chart Status User</h4>
                                    {/* <ChartStatusUsers /> */}
                                    {totalStatusUser ? <ChartStatusUsers totalStatusUser={totalStatusUser} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 " style={{ textAlign: "center" }}>
                                    <h4>Top 10 users with the highest Amount of Order this month</h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="table-responsive">
                                                                <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                                                                ID</th>
                                                                            <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                                                Username</th>
                                                                                <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                                                Image</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                                                Phone Number</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                                                Status User</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                                                Total Goods</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                                                Total Amount</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                                                Status Order</th>
                                                                            <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {totalTopUser ? totalTopUser.map(item => {
                                                                            return <tr className="odd selected">
                                                                                <td className="sorting_1">
                                                                                    {item._id}</td>
                                                                                <td>
                                                                                    {item.username + " - " + item.email}</td>
                                                                                    <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%", width:50 }} /></td>
                                                                                <td>
                                                                                    {item.phoneNumber ? item.phoneNumber : ''}</td>
                                                                                <td>
                                                                                    <label className={
                                                                                        item.status === false ? "badge badge-danger" : "badge badge-success"
                                                                                    }>
                                                                                        {item.status === false ? "Deactivate" : "Active"}
                                                                                    </label></td>
                                                                                <td>
                                                                                    {item.orders.product.length}</td>
                                                                                <td>
                                                                                    {formatter.format(item.orders.sumOrder)} VNĐ</td>
                                                                                <td>
                                                                                    <label className={
                                                                                        item.orders.status === "Cancel" ? "badge badge-danger" : item.orders.status === "Delivery failed" ? "badge badge-danger" : item.orders.status === "Delivery successful" ? "badge badge-success" : item.orders.status === "Being transported" ? "badge badge-primary" : item.orders.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                                                    }>
                                                                                        {item.orders.status}
                                                                                    </label></td>
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 " style={{ textAlign: "center" }}>
                                    <h4>Top 10 users with the highest Number of Order this month</h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="table-responsive">
                                                                <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                                                                ID</th>
                                                                            <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                                                Username</th>
                                                                                <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                                                Image</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                                                Phone Number</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                                                Status User</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                                                Total Order</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                                                Total Amount</th>
                                                                            <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {totalTopUserOrder ? totalTopUserOrder.slice(0, 10).map(item => {
                                                                            return <tr className="odd selected">
                                                                                <td className="sorting_1">
                                                                                    {item._id}</td>
                                                                                <td>
                                                                                    {item.username + " - " + item.email}</td>
                                                                                <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%", width:50 }} /></td>
                                                                                <td>
                                                                                    {item.phoneNumber ? item.phoneNumber : ''}</td>
                                                                                <td>
                                                                                    <label className={
                                                                                        item.status === false ? "badge badge-danger" : "badge badge-success"
                                                                                    }>
                                                                                        {item.status === false ? "Deactivate" : "Active"}
                                                                                    </label></td>
                                                                                <td>
                                                                                    {item.orders.length}</td>
                                                                                <td>
                                                                                    {formatter.format(item.totalSumOrder)} VNĐ</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default memo(Index);