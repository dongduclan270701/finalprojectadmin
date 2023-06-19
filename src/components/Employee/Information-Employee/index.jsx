import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { fetchInformationEmployee, fetchUpdateStatusEmployee } from 'Apis'
import Swal from 'sweetalert2'
import Footer from "components/Footer"
const Index = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        fetchInformationEmployee(params.id)
            .then(result => {
                setEmployee(result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [params])

    const handleDeactivateAccount = () => {
        Swal.fire({
            title: 'Do you agree to update your staff??',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Decline',
        }).then((result) => {
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
                fetchUpdateStatusEmployee(employee._id, { status: !employee.status })
                .then(result => {
                    Swal.fire({
                        title: 'Successfully!',
                        text: 'You have successfully updated your staff!',
                        icon: 'success',
                        confirmButtonText: 'OK!'
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                setEmployee({ ...employee, status: !employee.status })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
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
            
        })
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Information Employee</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/employee/update/" + employee._id}>Update</NavLink>
                </div>
                {employee ? <div className="row">
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px", height: "100%" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Information</h4>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-lg-6 form-group">
                                            <img src={employee.image} className="img-fluid " alt="" style={{ width: "inherit", margin: "0 auto", padding: "10px", borderRadius: "50%" }} />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <div className='form-group'>
                                                <label>Username</label>
                                                <input type="text" name='username' className="form-control form-control-sm" placeholder="Username" aria-label="Username" value={employee.username} disabled />
                                            </div>
                                            <div className='form-group'>
                                                <label>Email</label>
                                                <input type="text" name='email' className="form-control form-control-sm" placeholder="Email" aria-label="Email" value={employee.email} disabled />
                                            </div>
                                            <div className='form-group'>
                                                <label>Phone Number</label>
                                                <input type="number" name='phoneNumber' className="form-control form-control-sm" placeholder="Phone Number" aria-label="Phone Number" value={employee.phoneNumber} disabled />
                                            </div>
                                            <div className='form-group'>
                                                <label>Identity</label>
                                                <input type="number" name='identity' className="form-control form-control-sm" placeholder="Identity" aria-label="Identity" value={employee.identity} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px", height: "100%" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Details</h4>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-lg-6 form-group">
                                            <label>Address</label>
                                            <input type="text" name='address' className="form-control form-control-sm" placeholder="Address" aria-label="Address" value={employee.address} disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Salary</label>
                                            <input type="number" name='salary' className="form-control form-control-sm" placeholder="Salary" aria-label="Salary" value={employee.salary} disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" name='dateOfBirth' className="form-control form-control-sm" placeholder="Salary" aria-label="Salary" value={employee.dateOfBirth} disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Role</label>
                                            <input value={employee.role} className="form-control form-control-sm" placeholder="Role" aria-label="Role" disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Last update by</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Last update by" aria-label="Last update by" value={employee.updatedBy ? (employee.updatedBy[employee.updatedBy.length - 1].username + " ( " + employee.updatedBy[employee.updatedBy.length - 1].email + " - " + employee.updatedBy[employee.updatedBy.length - 1].role + " )") : "None"} disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Created by</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Created by" aria-label="Created by" value={employee.createdBy ? (employee.createdBy.username + " ( " + employee.createdBy.email + " - " + employee.createdBy.role + " )") : "null"} disabled />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <label>Reason update</label>
                                            <input type="text" className="form-control form-control-sm" placeholder="Reason update" aria-label="Reason update" value={employee.reasonUpdate ? employee.reasonUpdate : "None"} disabled />
                                        </div>
                                        {employee.status ? (
                                            <>
                                                <div className="col-lg-6 form-group">
                                                    <label>Status</label>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                            Active
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 form-group">
                                                    <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Deactivate the account</button>
                                                </div>
                                            </>
                                        )
                                            :
                                            (<>
                                                <div className="col-lg-6 form-group">
                                                    <label>Status</label>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                            Deactivate
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 form-group">
                                                    <button onClick={handleDeactivateAccount} className="btn btn-outline-secondary btn-fw">Recover account</button>
                                                </div>
                                            </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px", height: "100%" }}>
                                <div className="card-body">
                                    <h4 className="card-title">CV</h4>
                                    <div className="col-lg-12 form-group">
                                        {employee.curriculumVitae ?
                                            <img src={employee.curriculumVitae} className="img-fluid " alt="" style={{ width: "inherit", margin: "0 auto", padding: "10px" }} />
                                            :
                                            "User has not updated CV"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                    null
                }
            </div>
            <Footer />
        </div>
    );
}

export default Index;
