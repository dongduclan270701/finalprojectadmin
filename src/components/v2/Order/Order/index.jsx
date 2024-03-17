import React, {useState} from 'react';

const Index = (props) => {
    const {toggleReason, handleToggleReason, steps, currentStep, order, options, handleSelectedOptionsChange, setIsReview, setIsInfoOrder, handleShowProduct} = props
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
    return (
        <div className='section-form-info-order-content'>
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
                            <div className='play-bold'>Update order status</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {order.status === "Delivery successful" || order.status === 'Delivery failed' ?
                                    <select value={order.status} disabled={true} name='status' style={{ borderRadius: "15px" }} type="text" className="col-md-12 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value={order.status} selected>{order.status}</option>
                                        {options.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.label}</option>
                                        })}
                                    </select>
                                    :
                                    <select value={order.status} name='status' onChange={(e) => handleSelectedOptionsChange({ value: e.target.value })} style={{ borderRadius: "15px" }} type="text" className="col-md-12 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value={order.status} selected>{order.status}</option>
                                        {options.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.label}</option>
                                        })}
                                    </select>
                                }
                                {order.statusReview.status === true && <div className='page-button'>
                                    <button className='animated-button' type="button" onClick={() => (setIsReview(true), setIsInfoOrder(false))} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                        <span>Review</span>
                                        <span></span>
                                    </button>
                                </div>}
                                {order.status === 'Being transported' && <div className='page-button'>
                                    <button className='animated-button' type="button" onClick={() => (handleToggleReason())} style={{ border: '1px solid #2196f3', width: '150px' }}>
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
    );
}

export default Index;
