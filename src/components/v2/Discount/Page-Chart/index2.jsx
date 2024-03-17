import React, { useState, useEffect } from 'react'
import ChartDiscountOfMonth from 'components/Discount/Page-Chart/ChartDiscountOfMonth'
import ChartTypeOfDiscount from 'components/Discount/Page-Chart/ChartTypeOfDiscount'
import ChartDiscountStatus from 'components/Discount/Page-Chart/ChartDiscountStatus'
import ChartOutDateDiscountOfMonth from 'components/Discount/Page-Chart/ChartOutDateDiscountOfMonth'

const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    return (
        <div>
            <div className="row">
                <div className="col-md-3 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">

                        </div>
                        <div className="card-body" style={{ paddingTop: '20px', justifyContent: 'center' }}>
                            <div className='text-pie-content' >{formatter.format(4006)}</div>
                            <div className='text-pie-title play-bold' >Discount Code</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(22)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(22)))} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(61344)}</div>
                            <div className='text-pie-title play-bold' >Discount Code (Active)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(22)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(22)))} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(47123)}</div>
                            <div className='text-pie-title play-bold' >Discount Code (Out Date)</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3 stretch-card">
                    <div className="card card-pie">
                        <div className="pie-st">
                            <div className={`c100 ${'p' + Math.floor(parseFloat(formatter.format(0.22)))} blue pie-st-1`}>
                                <span>{Math.floor(parseFloat(formatter.format(0.22)))} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='text-pie-content' >{formatter.format(47123)}</div>
                            <div className='text-pie-title play-bold' >Discount Code (Waiting Date)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 stretch-card">
                    <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-lg-12 form-group" style={{ textAlign: "center" }}>
                                    <h4 className='play-bold'>Chart discount code already used of Month</h4>
                                    <ChartDiscountOfMonth />
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
                                    <h4 className='play-bold'>Chart discount code status </h4>
                                    <ChartTypeOfDiscount />
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
                                    <h4 className='play-bold'>Chart type of discount</h4>
                                    <ChartDiscountStatus />
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
                                    <h4 className='play-bold'>Chart out date of Month</h4>
                                    <ChartOutDateDiscountOfMonth />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                <div className="card" style={{ "marginBottom": "25px", border: 'none', backgroundColor: '#a7cff290', borderRadius: 30 }}>
                        <div className="card-body">
                            <p className="card-title">Top 10 discount code popular this month</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: '100%', textAlign: "center" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                                        Code</th>
                                                    <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                                        Category</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                                        Start Date</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                                        End Date</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Usage</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                                        Percent</th>
                                                    <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd selected">
                                                    <td className="select-checkbox">
                                                        Incs234</td>
                                                    <td className="sorting_1">
                                                        Freeship</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Discount Order</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Freeship</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Discount Order</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Freeship</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Discount Order</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Freeship</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Freeship</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Discount Order</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
                                                <tr className="even">
                                                    <td className=" select-checkbox">
                                                        Incs235</td>
                                                    <td className="sorting_1">
                                                        Discount Order</td>
                                                    <td>
                                                        2023-07-12</td>
                                                    <td>
                                                        2023-06-12</td>
                                                    <td>1</td>
                                                    <td>
                                                        20%</td>
                                                </tr>
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

export default Index;