import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Footer from "components/Footer"
import { fetchVoucher, fetchUpdateVoucher } from 'Apis'
const Index = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [voucher, setVoucher] = useState()

    useEffect(() => {
        fetchVoucher(params.id)
            .then(result => {
                setVoucher(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [params])

    const handleDeactivateAccount = () => {
        Swal.fire({
            title: 'Do you agree to make corrections??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Updating...',
                        html: 'Please wait...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    });
                    fetchUpdateVoucher(params.id, { ...voucher, status: !voucher.status, reasonUpdate: 'Update status' })
                        .then(result => {
                            setVoucher(result)
                            Swal.fire({
                                title: 'Successfully saved information!',
                                text: 'You have successfully edited the discount code information',
                                icon: 'success',
                                confirmButtonText: 'OK!'
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire({
                                title: `Error ${error.response.status}`,
                                text: 'There seems to be a problem with the connection to the server, please try again later',
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                        })

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Discount Code Details</h3>
                    </div>
                </div>
                {voucher ? <>
                    <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                        <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/discount/update/" + voucher.discountId}>Update</NavLink>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="col-md-12" style={{ "padding": 0 }}>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Details</h4>
                                        <div className="form-group">
                                            <label>Discount Id:</label>
                                            <input name="discountCode" type="text" className="form-control form-control-sm" placeholder="Discount Id" aria-label="Discount Id" value={voucher.discountId} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Code:</label>
                                            <input name="code" type="text" className="form-control form-control-sm" placeholder="Code" aria-label="Code" value={voucher.code} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Discount Name:</label>
                                            <input name="discountName" type="text" className="form-control form-control-sm" placeholder="Discount Name" aria-label="Discount Name" value={voucher.discountName} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label>Description:</label>
                                            <input name="description" type="text" className="form-control form-control-sm" placeholder="Description" aria-label="Description" value={voucher.description} disabled />
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
                                                <label>Date Created</label>
                                                <input name="dateCreated" type="date" className="form-control form-control-sm" placeholder="" aria-label="" value={voucher.dateCreated} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Usage</label>
                                                <input type="number" className="form-control form-control-sm" placeholder="Usage" aria-label="Usage" value={voucher.usage} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Start Date</label>
                                                <input type="date" className="form-control form-control-sm" placeholder="Start Date" aria-label="Start Date" value={voucher.startDate} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>End Date</label>
                                                <input type="date" className="form-control form-control-sm" placeholder="End Date" aria-label="End Date" value={voucher.endDate} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Cost:</label>
                                                <input type="number" className="form-control form-control-sm" placeholder="Cost" aria-label="Cost" value={voucher.cost} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Created By:</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="createdBy" aria-label="createdBy" value={voucher.createdBy.username + " ( " + voucher.createdBy.email + ' - ' + voucher.createdBy.role + " )"} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Updated By:</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="updatedBy" aria-label="updatedBy" value={voucher.updatedBy.length > 0 ? voucher.updatedBy[voucher.updatedBy.length - 1].username + " ( " + voucher.updatedBy[voucher.updatedBy.length - 1].email + ' - ' + voucher.updatedBy[voucher.updatedBy.length - 1].role + " )" : "None"} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Reason Update:</label>
                                                <input type="text" className="form-control form-control-sm" placeholder="reasonUpdate" aria-label="createdBy" value={voucher.updatedBy.length > 0 ? voucher.updatedBy[voucher.updatedBy.length - 1].reasonUpdate : "None"} disabled />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Status</label>
                                                {voucher.status ?
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                            Active
                                                        </label>
                                                        <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Deactivate the discount code</button>
                                                    </div>
                                                    :
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                            Deactivate
                                                        </label>
                                                        <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Recover discount code</button>
                                                    </div>
                                                }
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                    :
                    <>
                        <style dangerouslySetInnerHTML={{
                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                        }} />
                        <div className="loader" />
                    </>
                }

            </div>
            <Footer />
        </div>
    );
}

export default Index;
