import React, { useState, memo } from 'react';
import peopleImage from 'assets/images/dashboard/people.png'

const Index = (props) => {
    const { 
        locationTemp, 
        totalOrder, 
        totalAmountOrder, 
        totalOrderSuccessful, 
        totalAmountOrderSuccessful, 
        totalProduct,
        topStaffNotLimit
    } = props
    const formatter = new Intl.NumberFormat('en-US')
    const totalProductInYear = topStaffNotLimit?topStaffNotLimit.reduce((accumulator, item) => accumulator + item.totalProduct, 0):0
    return (
        <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card tale-bg">
                    <div className="card-people mt-auto">
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
            <div className="col-md-6 grid-margin transparent stretch-card">
                <div className="row">
                    <div className="col-md-6 mb-3 stretch-card">
                        <div className="card card-tale">
                            <div className="card-body">
                                <p className="mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Orders successful of this Month </p>
                                {totalOrder === null ?
                                    <div className="lds-dual-ring" ></div>
                                    :
                                    <>
                                        <p className="fs-25 mb-2">{formatter.format(totalOrderSuccessful)}</p>
                                        <p>{formatter.format(totalOrderSuccessful / totalOrder * 100)}%/ Total Order In Year</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3  stretch-card">
                        <div className="card card-light-blue">
                            <div className="card-body">
                                <p className="mb-4">Number of Sold Goods of Month</p>
                                {totalProduct === null ?
                                    <div className="lds-dual-ring" ></div>
                                    :
                                    <>
                                        <p className="fs-25 mb-2">{formatter.format(totalProduct)}</p>
                                        <p>{formatter.format(totalProduct / totalProductInYear * 100)}%/ Total Product Sold In Year</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3 stretch-card">
                        <div className="card card-light-danger">
                            <div className="card-body">
                                <p className="mb-4">Profit of Month</p>
                                {totalAmountOrderSuccessful === null ?
                                    <div className="lds-dual-ring" ></div>
                                    :
                                    <>
                                        <p className="fs-25 mb-2">{formatter.format(totalAmountOrderSuccessful * 0.2)} VNĐ</p>
                                        <p>{formatter.format((totalAmountOrderSuccessful * 0.2) / (totalAmountOrder * 0.2) * 100)}%/ Total Order In Year</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3 stretch-card">
                        <div className="card card-light-danger">
                            <div className="card-body">
                                <p className="mb-4">Order value in the month</p>
                                {totalAmountOrder === null ?
                                    <div className="lds-dual-ring" ></div>
                                    :
                                    <>
                                        <p className="fs-25 mb-2">{formatter.format(totalAmountOrderSuccessful)} VNĐ</p>
                                        <p>{formatter.format((totalAmountOrderSuccessful) / (totalAmountOrder) * 100)}%/ Total Order In Year</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);
