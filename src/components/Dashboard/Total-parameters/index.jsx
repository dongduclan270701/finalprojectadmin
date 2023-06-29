import React from 'react';
import peopleImage from 'assets/images/dashboard/people.png'

const Index = () => {
    return (
        <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card tale-bg">
                    <div className="card-people mt-auto">
                        <img src={peopleImage} alt="people" />
                        <div className="weather-info">
                            <div className="d-flex">
                                <div>
                                    <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2" />21<sup>C</sup></h2>
                                </div>
                                <div className="ml-2">
                                    <h4 className="location font-weight-normal">Ha Noi</h4>
                                    <h6 className="font-weight-normal">VietNam</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 grid-margin transparent">
                <div className="row">
                    <div className="col-md-6 mb-4 stretch-card transparent">
                        <div className="card card-tale">
                            <div className="card-body">
                                <p className="mb-4">Orders of the day</p>
                                <p className="fs-25 mb-2">4006</p>
                                <p>10.00% (30 days)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 stretch-card transparent">
                        <div className="card card-dark-blue">
                            <div className="card-body">
                                <p className="mb-4">Total of all orders for the month</p>
                                <p className="fs-25 mb-2">61344</p>
                                <p>22.00% (30 days)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                        <div className="card card-light-blue">
                            <div className="card-body">
                                <p className="mb-4">Orders are being processed</p>
                                <p className="fs-25 mb-2">34040</p>
                                <p>2.00% (30 days)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 stretch-card transparent">
                        <div className="card card-light-danger">
                            <div className="card-body">
                                <p className="mb-4">Total order value in the month</p>
                                <p className="fs-25 mb-2">47033</p>
                                <p>0.22% (30 days)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
