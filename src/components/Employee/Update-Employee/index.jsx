import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadUrlUser, apiKeyUser } from 'Apis/utils'
import { fetchUpdateEmployee, fetchInformationEmployee } from 'Apis'
import axios from 'axios';
import Swal from 'sweetalert2'
import Footer from "components/Footer"
const Index = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        image: "",
        curriculumVitae: "",
        username: "",
        email: "",
        identity: "",
        address: "",
        phoneNumber: 0,
        reasonUpdate: "",
    })
    const [imageChoose, setImageChoose] = useState()
    const [image, setImage] = useState()
    const [cvChoose, setCvChoose] = useState()
    const [cv, setCv] = useState()
    const [changeForm, setChangeForm] = useState(false)
    useEffect(() => {
        fetchInformationEmployee(params.id)
            .then(result => {
                setEmployee(result)
                setImageChoose(result.image)
                setCvChoose(result.curriculumVitae)
            })
            .catch(err => {
                console.log(err)
            })

    }, [params])
    const handleGetImg = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const file = e.target.files;

        if (file.length > 0) {
            setImageChoose(fileArray)
            setImage(file)
            setChangeForm(true)
        } else {
            setImageChoose(employee.image)
            setImage()
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    const handleGetCV = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const file = e.target.files;

        if (file.length > 0) {
            setCvChoose(fileArray)
            setCv(file)
            setChangeForm(true)
        } else {
            setCvChoose(employee.curriculumVitae)
            setCv()
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    const handleSubmitUpdate = () => {
        if (changeForm === true) {
            if (!employee.username) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee username, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else if (!employee.salary) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee salary, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else if (!employee.identity) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee identity, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else if (!employee.address) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee address, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else if (!employee.reasonUpdate) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee reason update, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else if (!employee.email) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'You have not entered employee email, please try again!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else {
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
                        if (image && !cv) {
                            const formDataImage = new FormData();
                            formDataImage.append('file', image[0]);
                            formDataImage.append('upload_preset', apiKeyUser);
                            axios.post(uploadUrlUser, formDataImage, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(resultImage => {
                                    const newData = { ...employee, image: resultImage.data.secure_url }
                                    fetchUpdateEmployee(params.id, newData)
                                        .then(result => {
                                            console.log(result)
                                            Swal.fire({
                                                title: 'Successfully!',
                                                text: 'You have successfully updated your staff!',
                                                icon: 'success',
                                                confirmButtonText: 'OK!'
                                            })
                                                .then((result) => {
                                                    if (result.isConfirmed) {
                                                        navigate(-1)
                                                    }
                                                })
                                                .catch(error => {
                                                    console.log(error)
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
                        } else if (cv && !image) {
                            const formDataCV = new FormData();
                            formDataCV.append('file', cv[0]);
                            formDataCV.append('upload_preset', apiKeyUser);
                            axios.post(uploadUrlUser, formDataCV, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(resultCV => {
                                    const newData = { ...employee, curriculumVitae: resultCV.data.secure_url }
                                    fetchUpdateEmployee(params.id, newData)
                                        .then(result => {
                                            Swal.fire({
                                                title: 'Successfully!',
                                                text: 'You have successfully updated your staff!',
                                                icon: 'success',
                                                confirmButtonText: 'OK!'
                                            })
                                                .then((result) => {
                                                    if (result.isConfirmed) {
                                                        navigate(-1)
                                                    }
                                                })
                                                .catch(error => {
                                                    console.log(error)
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
                        } else {
                            fetchUpdateEmployee(params.id, employee)
                                .then(result => {
                                    console.log(result)
                                    Swal.fire({
                                        title: 'Successfully!',
                                        text: 'You have successfully updated your staff!',
                                        icon: 'success',
                                        confirmButtonText: 'OK!'
                                    })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                navigate(-1)
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error)
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
                    }
                })
            }
        } else {
            Swal.fire({
                title: 'Notice!',
                text: 'No information needs to be changed!',
                confirmButtonText: 'OK!'
            })
        }
    }

    const handleChangeInformation = (e) => {
        setChangeForm(true)
        const { name, value } = e.target
        setEmployee({ ...employee, [name]: value })
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Update Employee</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button className="col-lg-2 btn btn-outline-secondary btn-fw" onClick={handleSubmitUpdate}>Save</button>
                </div>
                {employee ?
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="col-md-12" style={{ "padding": 0 }}>
                                <div className="card" style={{ "marginBottom": "25px", height: "100%" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Information</h4>
                                        <div className='row' style={{ paddingTop: "0" }}>
                                            <div className="col-lg-6 form-group">
                                                <img src={imageChoose} className="img-fluid" alt="" style={{ width: "inherit", margin: "0 auto", padding: "10px", borderRadius: "50%" }} />
                                                <div className={image ? "file-upload active" : "file-upload"} style={{ margin: "20px 10px" }}>
                                                    <div className="file-select">
                                                        <div className="file-select-button" id="fileName">Choose Avatar</div>
                                                        <div className="file-select-name" id="noFile">{image ? image[0].name : "No file chosen..."}</div>
                                                        <input type="file" onChange={handleGetImg} name="chooseFile" id="chooseFile" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <div className='form-group'>
                                                    <label>Username</label>
                                                    <input type="text" name='username' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Username" aria-label="Username" value={employee.username} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Email</label>
                                                    <input type="text" name='email' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Email" aria-label="Email" value={employee.email} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Phone Number</label>
                                                    <input type="number" name='phoneNumber' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Phone Number" aria-label="Phone Number" value={employee.phoneNumber} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Identity</label>
                                                    <input type="number" name='identity' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Identity" aria-label="Identity" value={employee.identity} />
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
                                                <input type="text" name='address' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Address" aria-label="Address" value={employee.address} />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Role</label>
                                                <select value={employee.role} name='role' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Role" aria-label="Role" require>
                                                    <option value="CEO">CEO</option>
                                                    <option value="DEVELOPER">DEVELOPER</option>
                                                    <option value="PRODUCT">PRODUCT</option>
                                                    <option value="ORDER">ORDER</option>
                                                    <option value="SALES">SALES</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Date of Birth</label>
                                                <input type="date" name='dateOfBirth' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Salary" aria-label="Salary" value={employee.dateOfBirth} />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Reason Update</label>
                                                <input type="text" name='reasonUpdate' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Reason Update" aria-label="Reason Update" />
                                            </div>
                                            <div className="col-lg-6 form-group">
                                                <label>Salary</label>
                                                <input type="text" name='salary' onChange={e => handleChangeInformation(e)} className="form-control form-control-sm" placeholder="Salary" aria-label="Salary" value={employee.salary} />
                                            </div>
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
                                            <div className={cv ? "file-upload active" : "file-upload"}>
                                                <div className="file-select">
                                                    <div className="file-select-button" id="fileName">Choose CV</div>
                                                    <div className="file-select-name" id="noFile">{cv ? cv[0].name : "No file chosen..."}</div>
                                                    <input type="file" onChange={handleGetCV} name="chooseFile" id="chooseFile" />
                                                </div>
                                            </div>
                                            <img src={cvChoose} className="img-fluid " alt="" style={{ width: "inherit", margin: "0 auto", padding: "10px" }} />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
            <Footer />
        </div>
    );
}

export default Index;
