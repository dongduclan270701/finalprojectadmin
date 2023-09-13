import React, { useState, useEffect, memo } from 'react';

const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { totalTopViewProduct, totalTopSoldProduct, handleChangeCategoryTopSoldProduct, handleChangeCategoryTopViewProduct } = props
    return (
        <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title mb-3" style={{ textAlign: 'center' }}>Best - selling product</p>
                        <select name='categoryViewed' onChange={e => handleChangeCategoryTopSoldProduct(e.target.value)} className="form-control" style={{ width: 'max-content', borderRadius: 30, margin: 'auto' }}>
                            <option value='laptop' selected>Laptop</option>
                            <option value='laptopGaming' >Laptop Gaming</option>
                            <option value='pcSpecial' >Pc Special (Pro)</option>
                            <option value='pcGaming' >PC Gaming</option>
                            <option value='pcCreator' >Pc Creator</option>
                            <option value='pcCompany' >Pc Company</option>
                            <option value='apple' >Apple</option>
                            <option value='monitor' >Monitor</option>
                            <option value='keyboard' >Keyboard</option>
                            <option value='mouse' >Mouse</option>
                            <option value='speaker' >Speaker</option>
                        </select>
                        <div className="table-responsive">
                            <table className="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Total Sold</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalTopSoldProduct ? totalTopSoldProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td style={{ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</td>
                                            <td>{item.category[0]}</td>
                                            <td className="font-weight-bold">{item.totalSold}</td>
                                            <td>{formatter.format(item.nowPrice)} VND</td>
                                            <td className="font-weight-medium"><label className={
                                                item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                            }>
                                                {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
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
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title mb-3" style={{ textAlign: "center" }}>Most viewed products</p>
                        <select name='categorySelling' onChange={e => handleChangeCategoryTopViewProduct(e.target.value)} className="form-control" style={{ width: 'max-content', borderRadius: 30, margin: 'auto' }}>
                            <option value='laptop' selected>Laptop</option>
                            <option value='laptopGaming' >Laptop Gaming</option>
                            <option value='pcSpecial' >Pc Special (Pro)</option>
                            <option value='pcGaming' >PC Gaming</option>
                            <option value='pcCreator' >Pc Creator</option>
                            <option value='pcCompany' >Pc Company</option>
                            <option value='apple' >Apple</option>
                            <option value='monitor' >Monitor</option>
                            <option value='keyboard' >Keyboard</option>
                            <option value='mouse' >Mouse</option>
                            <option value='speaker' >Speaker</option>
                        </select>
                        <div className="table-responsive">
                            <table className="table table-striped table-borderless">
                            <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Total View</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalTopViewProduct ? totalTopViewProduct.map((item, index) => {
                                        return <tr key={index}>
                                            <td style={{ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nameProduct}</td>
                                            <td>{item.category[0]}</td>
                                            <td className="font-weight-bold">{item.totalView}</td>
                                            <td>{formatter.format(item.nowPrice)} VND</td>
                                            <td className="font-weight-medium"><label className={
                                                item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                            }>
                                                {item.quantity === 0 ? "Out of stock" : item.quantity >= 10 ? "Stocking" : 0 < item.quantity < 10 ? "Coming to an end" : null}
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
    );
}

export default memo(Index);
