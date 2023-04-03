import React from 'react';

const Index = () => {
    return (
        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-title">Số người truy cập website</p>
                                        <p className="font-weight-500">Tổng số lượt truy cập cả website với app mobile</p>
                                        <div className="d-flex flex-wrap mb-5">
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">Hiện đang truy cập</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">12.3k</h3>
                                            </div>
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">Tất cả lượt truy cập</p>
                                                <h3 className="text-primary fs-30 font-weight-medium">14k</h3>
                                            </div>
                                            <div className="mr-5 mt-3">
                                                <p className="text-muted">Người dùng tài khoản</p>
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
                                            <a href="#" className="text-info">View all</a>
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
