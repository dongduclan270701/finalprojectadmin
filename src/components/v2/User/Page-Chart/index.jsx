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
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(totalUser)} users</div>
                            <div className='text-pie-title play-bold' >Total User</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalUserLoginLastMonth / totalUser * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalUserLoginLastMonth / totalUser * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalUserLoginLastMonth)} user</div>
                            <div className='text-pie-title play-bold' >User Active (1 Month)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalUserLoginOverMonth / totalUser * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalUserLoginOverMonth / totalUser * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalUserLoginOverMonth)} user</div>
                            <div className='text-pie-title play-bold' >Users Stopped Active (1 Month)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalUserJoinIn / totalUser * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalUserJoinIn / totalUser * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalUserJoinIn)} user</div>
                            <div className='text-pie-title play-bold' >Users Join In (1 Month)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalUserPurchased / totalUser * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalUserPurchased / totalUser * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalUserPurchased)} user</div>
                            <div className='text-pie-title play-bold' >Users Join In (1 Month)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(totalUserAddGoodsToWishlist / totalUser * 100)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(totalUserAddGoodsToWishlist / totalUser * 100)))}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(totalUserAddGoodsToWishlist)} user</div>
                            <div className='text-pie-title play-bold' >Users add goods to wishlist</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Number of Subscribers / Month</h4>
                                    {/* <ChartUsersRegisterOfMonth /> */}
                                    {totalChartUserJoinIn ? <ChartUsersRegisterOfMonth totalChartUserJoinIn={totalChartUserJoinIn} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart User Age </h4>
                                    {/* <ChartUsersAge /> */}
                                    {totalAgeUser ? <ChartUsersAge totalAgeUser={totalAgeUser} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart Status User</h4>
                                    {/* <ChartStatusUsers /> */}
                                    {totalStatusUser ? <ChartStatusUsers totalStatusUser={totalStatusUser} /> : <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-user-table-goods">
                            <div className="col-lg-12">
                                <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 users with the highest Number of Goods this month</p>
                                <table className='table table-striped section-table-goods '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Image</th>
                                            <th>Phone Number</th>
                                            <th>Status User</th>
                                            <th>Total Goods</th>
                                            <th>Total Amount</th>
                                            <th>Status Order</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                        {totalTopUser && totalTopUser.map((item, index) => {
                                            return <tr key={index}>
                                                <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {item._id}
                                                </div></div></td>
                                                <td>{item.email}</td>
                                                <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                                <td>{item.phoneNumber ? item.phoneNumber : ''}</td>
                                                <td><label className={
                                                    item.status === false ? "badge badge-danger" : "badge badge-success"
                                                }>
                                                    {item.status === false ? "Deactivate" : "Active"}
                                                </label></td>
                                                <td>{item.orders.product.length}</td>
                                                <td className='play-bold'>{formatter.format(item.orders.sumOrder)} VNĐ</td>
                                                <td><label className={
                                                    item.orders.status === "Cancel" ? "badge badge-danger" : item.orders.status === "Delivery failed" ? "badge badge-danger" : item.orders.status === "Delivery successful" ? "badge badge-success" : item.orders.status === "Being transported" ? "badge badge-primary" : item.orders.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                }>
                                                    {item.orders.status}
                                                </label></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 grid-margin stretch-card">
                    <div className=" " style={{ width: '100%', padding: 20, border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="section-user-table-goods">
                            <div className="col-lg-12">
                                <p className="play-bold" style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Top 10 users with the highest Number of Order this month</p>
                                <table className='table table-striped section-table-goods '>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>Image</th>
                                                <th>Phone Number</th>
                                                <th>Status User</th>
                                                <th>Order</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider" style={{ overflowX: 'auto' }}>
                                            {totalTopUserOrder && totalTopUserOrder.map((item, index) => {
                                                return <tr key={index}>
                                                    <td><div style={{ width: 130, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                        {item._id}
                                                    </div></div></td>
                                                    <td>{item.email}</td>
                                                    <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                                    <td>{item.phoneNumber ? item.phoneNumber : ''}</td>
                                                    <td><label className={
                                                        item.status === false ? "badge badge-danger" : "badge badge-success"
                                                    }>
                                                        {item.status === false ? "Deactivate" : "Active"}
                                                    </label></td>
                                                    <td>{item.orders.length}</td>
                                                    <td className='play-bold'>{formatter.format(item.totalSumOrder)} VNĐ</td>

                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default memo(Index);