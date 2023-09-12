import React from 'react';

const Index = () => {
    return (
        <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title mb-0" style={{ textAlign: "center" }}>Best - selling product</p>
                        <div className="table-responsive">
                            <table className="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Search Engine Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                    <tr>
                                        <td>Search Engine Optimization</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                    <tr>
                                        <td>Display Advertising</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Pay Per Click Advertising</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>E-Mail Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-danger">Cancelled</div></td>
                                    </tr>
                                    <tr>
                                        <td>Referral Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Social media marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title mb-0" style={{ textAlign: "center" }}>Most viewed products</p>
                        <div className="table-responsive">
                            <table className="table table-striped table-borderless">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Search Engine Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                    <tr>
                                        <td>Search Engine Optimization</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                    <tr>
                                        <td>Display Advertising</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Pay Per Click Advertising</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>E-Mail Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-danger">Cancelled</div></td>
                                    </tr>
                                    <tr>
                                        <td>Referral Marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-warning">Pending</div></td>
                                    </tr>
                                    <tr>
                                        <td>Social media marketing</td>
                                        <td>ACER</td>
                                        <td className="font-weight-bold">200000</td>
                                        <td>2</td>
                                        <td className="font-weight-medium"><div className="badge badge-success">Completed</div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
