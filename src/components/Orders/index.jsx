import React from 'react';

const Index = () => {
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Danh sách Đơn hàng</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Table with contextual classes</h4>
                                <p className="card-description">
                                    Add class <code>.table-{'{'}color{'}'}</code>
                                </p>
                                <div className="table-responsive pt-3">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    First name
                                                </th>
                                                <th>
                                                    Product
                                                </th>
                                                <th>
                                                    Amount
                                                </th>
                                                <th>
                                                    Deadline
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-info">
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    Herman Beck
                                                </td>
                                                <td>
                                                    Photoshop
                                                </td>
                                                <td>
                                                    $ 77.99
                                                </td>
                                                <td>
                                                    May 15, 2015
                                                </td>
                                            </tr>
                                            <tr className="table-warning">
                                                <td>
                                                    2
                                                </td>
                                                <td>
                                                    Messsy Adam
                                                </td>
                                                <td>
                                                    Flash
                                                </td>
                                                <td>
                                                    $245.30
                                                </td>
                                                <td>
                                                    July 1, 2015
                                                </td>
                                            </tr>
                                            <tr className="table-danger">
                                                <td>
                                                    3
                                                </td>
                                                <td>
                                                    John Richards
                                                </td>
                                                <td>
                                                    Premeire
                                                </td>
                                                <td>
                                                    $138.00
                                                </td>
                                                <td>
                                                    Apr 12, 2015
                                                </td>
                                            </tr>
                                            <tr className="table-success">
                                                <td>
                                                    4
                                                </td>
                                                <td>
                                                    Peter Meggik
                                                </td>
                                                <td>
                                                    After effects
                                                </td>
                                                <td>
                                                    $ 77.99
                                                </td>
                                                <td>
                                                    May 15, 2015
                                                </td>
                                            </tr>
                                            <tr className="table-primary">
                                                <td>
                                                    5
                                                </td>
                                                <td>
                                                    Edward
                                                </td>
                                                <td>
                                                    Illustrator
                                                </td>
                                                <td>
                                                    $ 160.25
                                                </td>
                                                <td>
                                                    May 03, 2015
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
