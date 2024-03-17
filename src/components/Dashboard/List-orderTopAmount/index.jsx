import React, { memo } from 'react';

const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { totalTopOrder } = props;
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title" style={{ textAlign: "center" }}>Top order</p>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table id="example" className="display expandable-table" style={{ width: '100%' }}>
                                <thead>
                                    <tr role="row">
                                        <th className="select-checkbox sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "128px" }} aria-label="Quote#">
                                            ID</th>
                                        <th className="sorting_desc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "146px" }} aria-label="Product: activate to sort column ascending" aria-sort="descending">
                                            Username</th>
                                        <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "174px" }} aria-label="Business type: activate to sort column ascending">
                                            Date Order</th>
                                        <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                            Total Goods</th>
                                        <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "166px" }} aria-label="Policy holder: activate to sort column ascending">
                                            Total Amount</th>
                                        <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" style={{ "width": "122px" }} aria-label="Premium: activate to sort column ascending">
                                            Status</th>
                                        <th className="details-control sorting_disabled" rowSpan="1" colSpan="1" style={{ "width": "49px" }} aria-label="">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalTopOrder ? totalTopOrder.map((item, index) => {
                                        return <tr className="odd " key={index}>
                                            <td className="sorting_1" style={{ maxWidth: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {item.order._id}</td>
                                            <td>
                                                {item.order.username + ' - ' + item.order.email}</td>
                                            <td>
                                                {item.order.createDate}
                                            </td>
                                            <td>
                                                {item.order.product.length}
                                            </td>
                                            <td>
                                                {formatter.format(item.order.sumOrder)} VNĐ
                                            </td>
                                            <td>
                                                <label className={
                                                    item.order.status === "Cancel" ? "badge badge-danger" : item.order.status === "Delivery failed" ? "badge badge-danger" : item.order.status === "Delivery successful" ? "badge badge-success" : item.order.status === "Being transported" ? "badge badge-primary" : item.order.status === "Delivered to the carrier" ? "badge badge-primary" : "badge badge-warning"
                                                }>
                                                    {item.order.status}
                                                </label>
                                            </td>
                                        </tr>
                                    }) : <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <div className="lds-dual-ring" style={{ display: 'inline-block' }}></div>
                                        </td>
                                    </tr>
                                    }</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);
