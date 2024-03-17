import React from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import Loading from 'components/v2/Loading'
const Index = (props) => {
    const {
        isShowUser,
        isInfoUser,
        setIsShowUser,
        setUser,
        user,
        handleDeactivateAccount,
        handleSearchOrder,
        setInputFocused,
        optionSelect,
        countPageOrder,
        handleSetPageOrder,
        countMaxPageOrder,
        setOrder,
        searchOrder,
        order,
        product,
        startIndex,
        isReview,
        setIsReview,
        currentStep,
        steps,
        setIsInfoOrder,
        setProduct,
        setIsInfoUser,
        orderSearch,
        endIndex,
        handleShowOrder,
        isInfoOrder,
        handleShowProduct,
        isInfoProduct,
        setIsInfoProduct,
        hasValue
    } = props
    const formatter = new Intl.NumberFormat('en-US')
    const sumPriceListProduct = () => {
        let sumPriceListProduct = 0
        order && order.product.map((item) => {
            sumPriceListProduct += item.nowPrice * item.quantity
        })
        return sumPriceListProduct
    }
    const sumDiscountListProduct = () => {
        let sumDiscountListProduct = 0
        order && order.discountCode.map((item) => {
            sumDiscountListProduct += item.amount
        })
        return sumDiscountListProduct
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
        <div className={isShowUser ? 'col-12 section-info-user active' : 'col-12 section-info-user'}>
            <div className={isInfoUser ? 'first-form section-form-info-user show-user' : 'first-form section-form-info-user'}>
                <div className='section-form-info-user-title play-bold'>
                    <span>Information User</span>
                    <i
                        className='fa-solid fa-xmark'
                        onClick={() => (setIsShowUser(false), setUser(null))}
                        style={{ cursor: 'pointer', fontSize: 26 }} />
                </div>
                {user ? <div className='section-form-info-user-content'>
                    <div className='box-info-purchaser-user'>
                        <div className='list-info-purchaser-user'>
                            <div className='row info-user'>
                                <div className='col-md-7 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={user.image} style={{ width: "300px", borderRadius: "50%" }} alt="avatar" />
                                </div>
                                <div className='col-md-5 list-info-user'>
                                    <div className='play-bold'>Delivery address:</div>
                                    <div className="wave-group">
                                        <input required type="text" className="input" value={user.username} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>U</span>
                                            <span className="label-char" style={{ '--index': '1' }}>s</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e</span>
                                            <span className="label-char" style={{ '--index': '3' }}>r</span>
                                            <span className="label-char" style={{ '--index': '4' }}>n</span>
                                            <span className="label-char" style={{ '--index': '5' }}>a</span>
                                            <span className="label-char" style={{ '--index': '6' }}>m</span>
                                            <span className="label-char" style={{ '--index': '7' }}>e:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" className="input" value={user.email} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>E</span>
                                            <span className="label-char" style={{ '--index': '1' }}>m</span>
                                            <span className="label-char" style={{ '--index': '2' }}>a</span>
                                            <span className="label-char" style={{ '--index': '3' }}>i</span>
                                            <span className="label-char" style={{ '--index': '4' }}>l:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" className="input" value={user.address} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>A</span>
                                            <span className="label-char" style={{ '--index': '1' }}>d</span>
                                            <span className="label-char" style={{ '--index': '2' }}>d</span>
                                            <span className="label-char" style={{ '--index': '3' }}>r</span>
                                            <span className="label-char" style={{ '--index': '4' }}>e</span>
                                            <span className="label-char" style={{ '--index': '5' }}>s</span>
                                            <span className="label-char" style={{ '--index': '6' }}>s:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" className="input" value={user.phoneNumber} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>P</span>
                                            <span className="label-char" style={{ '--index': '1' }}>h</span>
                                            <span className="label-char" style={{ '--index': '2' }}>o</span>
                                            <span className="label-char" style={{ '--index': '3' }}>n</span>
                                            <span className="label-char" style={{ '--index': '4' }}>e</span>
                                            <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                            <span className="label-char" style={{ '--index': '6' }}>n</span>
                                            <span className="label-char" style={{ '--index': '7' }}>u</span>
                                            <span className="label-char" style={{ '--index': '8' }}>m</span>
                                            <span className="label-char" style={{ '--index': '9' }}>b</span>
                                            <span className="label-char" style={{ '--index': '10' }}>e</span>
                                            <span className="label-char" style={{ '--index': '11' }}>r</span>
                                        </label>
                                    </div>
                                    <div className='page-button' role="group" aria-label="Basic example">
                                        <button className='animated-button' type="button" onClick={handleDeactivateAccount} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                            <span>{user.status ? 'Active' : 'Deactivate'}</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='section-order-table-goods-title-search'>
                            <div className='col-md-1 title-search'>Search:</div>
                            <div className='row col-md-11 content-search'>
                                <input type='text' name='orderId' onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Order ID' />
                                <select name='status' onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                    <option value=''>All</option>\
                                    {optionSelect.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                                <input type='date' className='col-md-2 input-form-search' name="firstDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} min="1900-01-01" />
                                <input type='date' className='col-md-2 input-form-search' name="endDate" onChange={e => handleSearchOrder(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} value={searchOrder.endDate} min="1900-01-01" />
                            </div>
                        </div>
                        <div className="table-responsive list-goods-user-table">
                            <div className='play-bold'>Total: ( {user.orders.length} Orders purchased )</div>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>OrderId</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Order date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {orderSearch.slice(startIndex, endIndex).map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowOrder(item.orderId)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.orderId}</div> <i className='fa-solid fa-arrow-up-right-from-square' /></div></td>
                                            <td><img src={item.product[0].img[0]} alt='' /></td>
                                            <td>{item.product[0].quantity}</td>
                                            <td>{formatter.format(item.product[0].nowPrice)} VND</td>
                                            <td>{formatter.format(item.sumOrder + item.ship)} VND</td>
                                            <td>{item.shipping_process[0].date}</td>
                                            <td><label className={
                                                item.status === "Cancel" ? "badge badge-danger" : item.status === "Delivery failed" ? "badge badge-danger" : item.status === "Delivery successful" ? "badge badge-success" : item.status === "Being transported" ? "badge badge-primary" : item.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                            }>
                                                {item.status}
                                            </label></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='page-button' role="group" aria-label="Basic example">
                            {countPageOrder > 1 && <button className='animated-button' type="button" onClick={() => handleSetPageOrder(1)}><span>1</span>
                                <span></span></button>}
                            {countPageOrder > 3 && <button type="text" className='animated-button' >...</button>}
                            {countPageOrder - 1 > 1 && <button className='animated-button' type="button" onClick={() => handleSetPageOrder(countPageOrder - 1)}><span>{countPageOrder - 1}</span>
                                <span></span></button>}
                            <button type="button" className="animated-button active">{countPageOrder}</button>
                            {countPageOrder + 1 < countMaxPageOrder && <button className='animated-button' type="button" onClick={() => handleSetPageOrder(countPageOrder + 1)}><span>{countPageOrder + 1}</span>
                                <span></span></button>}
                            {countMaxPageOrder - countPageOrder > 2 && <button type="text" className='animated-button'  >...</button>}
                            {countPageOrder !== countMaxPageOrder && <button className='animated-button' type="button" onClick={() => handleSetPageOrder(countMaxPageOrder)}><span>{countMaxPageOrder}</span>
                                <span></span></button>}
                        </div>
                    </div>
                </div>
                    :
                    <Loading/>
                }
            </div>
            <div className={isInfoOrder ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                <div className='section-form-info-order-title play-bold'>
                    <i
                        className='fa-solid fa-arrow-left'
                        onClick={() => (setIsInfoUser(true), setIsInfoOrder(false), setOrder(null))}
                        style={{ cursor: 'pointer', fontSize: 26 }} />
                    <span>Information Order</span>
                    <i
                        className='fa-solid fa-xmark'
                        onClick={() => (setIsShowUser(false), setIsInfoUser(false), setIsInfoOrder(false), setUser(null), setOrder(null))}
                        style={{ cursor: 'pointer', fontSize: 26 }} />
                </div>
                {order ? <div className='section-form-info-order-content'>
                    <div className='list-step-process-order'>
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className='step-process-order'>
                                    <i className="fa-solid fa-arrow-right" />
                                </div>
                                <div className={currentStep === index ? 'step-process-order active' : 'step-process-order'}>
                                    <i className={`fa-solid ${'fa-' + (index + 1)}`} />
                                    <span className='play-bold'>{step}</span>
                                </div>
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <div className='box-info-purchaser-order'>
                        <div className='list-info-purchaser-order'>
                            <div className='row info-id-order play-bold'>Order ID: {order.orderId.toUpperCase()}</div>
                            <div className='row info-order'>
                                <div className='col-md-4 list-info-order'>
                                    <div className='play-bold'>Delivery address:</div>
                                    <div>- Purchaser: {order.username}</div>
                                    <div>- {order.email}</div>
                                    <div>- (+84) {order.phoneNumber}</div>
                                    <div>- {order.address}</div>
                                </div>
                                <div className='col-md-5 list-info-delivery-order'>
                                    {order.shipping_process.map((item, index) => {
                                        return <div className='info-delivery-order' key={index}>{
                                            item.content === "Ordered" ? <i className="fa-solid fa-box" style={{ color: '#6b8fec' }} /> :
                                                item.content === "Payment information confirmed" ? <i className="fa-solid fa-box" style={{ color: '#6b8fec' }} /> :
                                                    item.content === "Being transported" ? <i className="fa-solid fa-truck-fast" style={{ color: '#6b8fec' }} /> :
                                                        item.content === "Delivered to the carrier" ? <i className="fa-solid fa-truck-fast" style={{ color: '#6b8fec' }} /> : item.content === 'Delivery failed' ? <i className="fa-regular fa-circle-check" /> : <i className="fa-regular fa-circle-check" style={{ color: '#6b8fec' }} />}<span style={{ maxWidth: '90%', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.time} - {item.date} - {item.content}</span></div>
                                    })}
                                </div>
                                <div className='col-md-3 list-update-delivery-order'>
                                    <div className='play-bold'>Status</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {order.statusReview.status === true && <div className='page-button'>
                                            <button className='animated-button' type="button" onClick={() => (setIsReview(true), setIsInfoOrder(false))}>
                                                <span>Review</span>
                                                <span></span>
                                            </button>
                                        </div>}
                                        {order.status === 'Being transported' && <div className='page-button'>
                                            <button className='animated-button' type="button">
                                                <span>Delivery failed</span>
                                                <span></span>
                                            </button>
                                        </div>
                                        }
                                        {order.status === "Cancel" || order.status === 'Delivery failed' ?
                                            <div className="form-group">
                                                <div className='play-bold'>Reason for order cancellation</div>
                                                <input disabled className='col-md-12 input-form-search' placeholder='Order ID' value={order.reasonCancel} />
                                            </div>
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive list-goods-order-table">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {order.product.map((item, index) => {
                                        return <tr key={index}>
                                            <td><div onClick={() => handleShowProduct(item)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><div style={{ maxWidth: '250px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</div> <i className='fa-solid fa-arrow-up-right-from-square' /></div></td>
                                            <td><img src={item.img[0]} alt='' /></td>
                                            <td>{item.quantity}</td>
                                            <td>{formatter.format(item.nowPrice)} VND</td>
                                            <td>{formatter.format(item.nowPrice * item.quantity)} VND</td>
                                        </tr>
                                    })}
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className='play-bold'>Total</td>
                                        <td className='play-bold'>{formatter.format(sumPriceListProduct())} VND</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className='play-bold'>Fee</td>
                                        <td className='play-bold'>{formatter.format(order.ship)} VND</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className='play-bold'>Discount</td>
                                        <td className='play-bold'>- {formatter.format(sumDiscountListProduct())} VND</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className='play-bold'>Pay</td>
                                        <td className='play-bold' style={{ color: 'red' }}>{formatter.format(order.sumOrder + order.ship - sumDiscountListProduct())} VND</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td className='play-bold'>Payment methods</td>
                                        <td className='play-bold'>Payment on delivery</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                    :
                    <Loading/>
                }
            </div>
            <div className={isReview ? 'second-form section-form-info-order show-reviewOrder' : 'second-form section-form-info-order'}>
                <div className='section-form-info-order-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(!isReview), setIsInfoOrder(true))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Review Goods Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowUser(false), setOrder(null), setUser(null), setIsReview(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
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
                    <Loading/>
                }
            </div>
            <div className={isInfoProduct ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                <div className='section-form-info-order-title play-bold'>
                    <i
                        className='fa-solid fa-arrow-left'
                        onClick={() => (setIsInfoProduct(false), setIsInfoOrder(true), setProduct(null))}
                        style={{ cursor: 'pointer', fontSize: 26 }} />
                    <span>Information Product</span>
                    <i
                        className='fa-solid fa-xmark'
                        onClick={() => (setIsShowUser(false), setIsInfoUser(false), setIsInfoOrder(false), setIsInfoProduct(false), setUser(null), setOrder(null), setProduct(null))}
                        style={{ cursor: 'pointer', fontSize: 26 }} />
                </div>
                {product ?
                    <div className='section-form-info-product-content'>
                        <div className='box-info-purchaser-product'>
                            <div className='list-info-purchaser-product'>
                                <div className='row info-product'>
                                    <div className='col-md-6 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* <img src={product.img[0]} style={{ width: "200px", borderRadius: "50%" }} alt="avatar" /> */}
                                        <Carousel>
                                            {product.img.map((item, index) => {
                                                return <img src={item} key={index} alt='' />
                                            })}
                                        </Carousel>
                                    </div>
                                    <div className='col-md-6 list-info-product'>
                                        <div className='play-bold'>Product Details</div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={product.src} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '9' }}>o</span>
                                                <span className="label-char" style={{ '--index': '10' }}>d</span>
                                                <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={product.nameProduct} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>n</span>
                                                <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                <span className="label-char" style={{ '--index': '10' }}>m</span>
                                                <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={formatter.format(product.realPrice)} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>M</span>
                                                <span className="label-char" style={{ '--index': '1' }}>a</span>
                                                <span className="label-char" style={{ '--index': '2' }}>i</span>
                                                <span className="label-char" style={{ '--index': '3' }}>n</span>
                                                <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '5' }}>p</span>
                                                <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                <span className="label-char" style={{ '--index': '7' }}>i</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '9' }}>e (VNĐ):</span>
                                            </label>
                                        </div>
                                        <div className="wave-group">
                                            <input required type="text" className="input" value={formatter.format(product.nowPrice)} disabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                <span className="label-char" style={{ '--index': '1' }}>e</span>
                                                <span className="label-char" style={{ '--index': '2' }}>d</span>
                                                <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                <span className="label-char" style={{ '--index': '6' }}>e</span>
                                                <span className="label-char" style={{ '--index': '7' }}>d</span>
                                                <span className="label-char" style={{ '--index': '8' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>p</span>
                                                <span className="label-char" style={{ '--index': '8' }}>r</span>
                                                <span className="label-char" style={{ '--index': '8' }}>i</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '8' }}>e (VNĐ):</span>
                                            </label>
                                        </div>
                                        <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                            <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                <input required type="text" className="input" value={product.percent} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>D</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>c</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>t (%):</span>
                                                </label>
                                            </div>
                                            <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                <input required type="text" className="input" value={product.quantity} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>Q</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                                </label>
                                            </div>
                                            <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                <input required type="text" className="input" value={product.view} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>w:</span>
                                                </label>
                                            </div>
                                            <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                                <input required type="text" className="input" value={product.sold} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>S</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>l</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>d:</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="wave-group-product">
                                            <Select className={`select ${hasValue ? 'is-active' : ''}`} value={product.category.map((item) => ({ value: item, label: item }))} components={makeAnimated()} isMulti placeholder="Select category" isDisabled />
                                            <span className="bar"></span>
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                <span className="label-char" style={{ '--index': '3' }}>d</span>
                                                <span className="label-char" style={{ '--index': '4' }}>u</span>
                                                <span className="label-char" style={{ '--index': '5' }}>c</span>
                                                <span className="label-char" style={{ '--index': '6' }}>t</span>
                                                <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                <span className="label-char" style={{ '--index': '8' }}>c</span>
                                                <span className="label-char" style={{ '--index': '9' }}>a</span>
                                                <span className="label-char" style={{ '--index': '10' }}>t</span>
                                                <span className="label-char" style={{ '--index': '11' }}>e</span>
                                                <span className="label-char" style={{ '--index': '11' }}>g</span>
                                                <span className="label-char" style={{ '--index': '11' }}>o</span>
                                                <span className="label-char" style={{ '--index': '11' }}>r</span>
                                                <span className="label-char" style={{ '--index': '11' }}>y:</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='col-md-6 list-info-product'>
                                        <div className='play-bold'>Details</div>
                                        {product.description_table.map((item, index) => {
                                            return <div className="wave-group" key={index}>
                                                <input required type="text" className="input" value={item[1]} disabled />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>{item[0]}:</span>
                                                </label>
                                            </div>
                                        })}

                                        <div className='play-bold'>Specifications</div>
                                        <div className="wave-group">
                                            {product.specifications.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                                        <input required type="text" className="input" value={item[0]} disabled />
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                        </label>
                                                    </div>
                                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                                        <input required type="text" className="input" value={item[1]} disabled />
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className='col-md-6 list-info-product'>
                                        <div className='play-bold'>Description</div>
                                        <div className="wave-group">
                                            {product.description.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                                        <input required type="text" className="input" value={item[0]} disabled />
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                        </label>
                                                    </div>
                                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                                        <input required type="text" className="input" value={item[1]} disabled />
                                                        <label className="label">
                                                            <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                            <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                            <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                            <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                            <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                            <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                        <div className='play-bold'>Offers</div>
                                        <div className="wave-group">
                                            {product.gift_buy.map((item, index) => {
                                                return <div key={index} className="wave-group">
                                                    <input required type="text" className="input" value={item} disabled />
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>O</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>f</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>{index + 1}:</span>
                                                    </label>
                                                </div>
                                            })}
                                        </div>
                                        <div className='play-bold'>Gift</div>
                                        {product.gift.map((item, index) => {
                                            return <div key={index} className="wave-group">
                                                <input required type="text" className="input" value={item} disabled />
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>G</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>{index + 1}:</span>
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Loading/>
                }
            </div>
        </div>
    );
}

export default Index;
