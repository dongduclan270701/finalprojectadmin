import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import Footer from "components/Footer"
import { fetchCreateVoucher } from 'Apis'
const Index = () => {
    const navigate = useNavigate();
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    const [voucher, setVoucher] = useState({
        discountId: "",
        code: "",
        discountName: "",
        description: "",
        dateCreated: today,
        startDate: "",
        endDate: "",
        cost: 0,
        status: true,
        usage: 0
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setVoucher(voucher => ({
            ...voucher,
            [name]: value
        }));
    }

    const handleSubmitCreate = () => {
        Swal.fire({
            title: 'Do you agree to make corrections??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                if (!voucher.discountId) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount id information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.code) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount code information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.discountName) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount name information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.description) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount description information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.startDate) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount start date information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.endDate) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount end date information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else if (!voucher.cost) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You have not entered discount cost information',
                        icon: 'warning',
                        confirmButtonText: 'OK!'
                    })
                } else {
                    Swal.fire({
                        title: 'Updating...',
                        html: 'Please wait...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    });
                    fetchCreateVoucher(voucher)
                        .then(result => {
                            if (result.message === 'Discount code already exists') {
                                Swal.fire({
                                    title: 'Warning!',
                                    text: 'Discount code already exists, you need to create new discount code',
                                    icon: 'warning',
                                    confirmButtonText: 'OK!'
                                })
                            } else {
                                setVoucher({
                                    discountId: "",
                                    code: "",
                                    discountName: "",
                                    description: "",
                                    dateCreated: today,
                                    startDate: "",
                                    endDate: "",
                                    cost: 0,
                                    status: true,
                                    usage: 0
                                })
                                Swal.fire({
                                    title: 'Successfully created new discount code!',
                                    text: 'You have successfully created a new discount code information',
                                    icon: 'success',
                                    confirmButtonText: 'OK!'
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire({
                                title: 'Unable to connect to server!',
                                text: 'There seems to be a problem with the connection to the server, please try again later',
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                        })
                }
            }
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Create New Discount Code Details</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitCreate} className="col-lg-2 btn btn-outline-secondary btn-fw">Save</button>
                </div>
                <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Details</h4>
                                    <div className="form-group">
                                        <label>Discount Id:</label>
                                        <input onChange={handleChangeInput} name="discountId" type="text" className="form-control form-control-sm" placeholder="Discount Id" aria-label="Discount Id" value={voucher.discountId} />
                                    </div>
                                    <div className="form-group">
                                        <label>Code:</label>
                                        <input onChange={handleChangeInput} name="code" type="text" className="form-control form-control-sm" placeholder="Code" aria-label="Code" value={voucher.code} />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Name:</label>
                                        <input onChange={handleChangeInput} name="discountName" type="text" className="form-control form-control-sm" placeholder="Discount Name" aria-label="Discount Name" value={voucher.discountName} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <input onChange={handleChangeInput} name="description" type="text" className="form-control form-control-sm" placeholder="Description" aria-label="Description" value={voucher.description} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Date & Cost</h4>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Start Date</label>
                                            <input type="date" name="startDate" onChange={handleChangeInput} className="form-control form-control-sm" placeholder="Start Date" aria-label="Start Date" value={voucher.startDate} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>End Date</label>
                                            <input type="date" name="endDate" onChange={handleChangeInput} className="form-control form-control-sm" placeholder="End Date" aria-label="End Date" value={voucher.endDate} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Usage</label>
                                            <input type="number" name="" className="form-control form-control-sm" placeholder="Usage" aria-label="Usage" value={voucher.usage} disabled />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Cost:</label>
                                            <input type="number" name="cost" onChange={handleChangeInput} className="form-control form-control-sm" placeholder="Cost" aria-label="Cost" value={voucher.cost} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Status</label>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                {voucher.status ? (
                                                    <>
                                                        <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                            Active
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                            Deactivate
                                                        </label>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
