import React from 'react';

const Index = () => {
    return (
        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-title">Number of website visitors</p>
                                        <p className="font-weight-500">Total number of visits to both website and mobile app</p>
                                        <div className="d-flex flex-wrap mb-5">
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">Currently accessing</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">12.3k</h3>
                                            </div>
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">All access</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">14k</h3>
                                            </div>
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">Account User</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">71.56%</h3>
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-muted">Downloads app</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">34040</h3>
                                            </div>
                                        </div>
                                        <canvas id="order-chart" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="card-title">...</p>
                                            <a href="/" className="text-info">View all</a>
                                        </div>
                                        <p className="font-weight-500">...</p>
                                        <div id="sales-legend" className="chartjs-legend mt-4 mb-2" />
                                        <canvas id="sales-chart" />
                                    </div>
                                </div>
                            </div>
                        </div>
    );
}

export default Index;
