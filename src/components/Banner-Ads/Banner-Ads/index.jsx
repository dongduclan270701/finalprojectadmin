import React from 'react';

const Index = () => {
    return (
        <div className="main-panel">
            <div className="content-wrapper">

                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách quảng cáo</h4>
                                <p className="card-description">
                                    <code><i class="mdi mdi-plus-circle-outline" />  Thêm danh sách mới</code>
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên danh sách</th>
                                                <th>Ngày bắt đầu</th>
                                                <th>Ngày kết thúc</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Photoshop</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    <label className="badge badge-danger">Pending</label>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Flash</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-warning">In progress</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Premier</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-info">Fixed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>After effects</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-success">Completed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>53275535</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-warning">In progress</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Premier</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-info">Fixed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>After effects</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-success">Completed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>53275535</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-warning">In progress</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>Premier</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-info">Fixed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>After effects</td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                                <td><label className="badge badge-success">Completed</label></td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-secondary btn-fw">Xem</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-group" style={{"display":"flex","justify-content": "center", "width": "fit-content", "margin": "auto"}} role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-secondary active">1</button>
                                    <button type="button" className="btn btn-outline-secondary">2</button>
                                    <button type="button" className="btn btn-outline-secondary">...</button>
                                    <button type="button" className="btn btn-outline-secondary">5</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:../../partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span>
                </div>
            </footer>
            {/* partial */}
        </div>
    );
}

export default Index;
