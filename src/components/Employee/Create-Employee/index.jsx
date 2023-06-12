import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { fetchCreateEmployee } from 'Apis'
import Swal from 'sweetalert2'
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        role: "",
        password: "",
        dateOfBirth: ""
    })
    const [checkedPassword, setCheckedPassword] = useState(null)
    const [rePassword, setRePassword] = useState("")
    
    const handleSubmitCreate = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!employee.username || !employee.email || !employee.phoneNumber || !employee.role || !employee.password || !employee.dateOfBirth) {
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Bạn chưa nhập đủ thông tin sản phẩm, vui lòng thử lại!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if(re.test(employee.email) === false) {
            Swal.fire({
                title: 'Incorrect email format!',
                text: 'Requires to enter the correct email format',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (employee.password.length < 8 || /[A-Z]/.test(employee.password) === false) {
            Swal.fire({
                title: 'Incorrect password format!',
                text: 'Requires to enter the correct password form at least 8 characters and with uppercase characters',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else {
            if (checkedPassword === false || checkedPassword === null) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Re password not correct!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            } else {
                fetchCreateEmployee(employee)
                .then(result => {
                    if (result === "Email already exists") {
                        Swal.fire({
                            title: 'Registration failed!',
                            text: 'This email already exists, please try again!',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    } else {
                        Swal.fire({
                            title: 'Registration successfully!',
                            text: 'You have successfully added a new employee!',
                            icon: 'success',
                            confirmButtonText: 'OK!'
                        })
                        setEmployee({
                            username: "",
                            email: "",
                            phoneNumber: "",
                            role: "",
                            password: "",
                            dateOfBirth: ""
                        })
                        setRePassword("")
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
    }

    const handleCheckRePassword = (e) => {
        setRePassword(e.target.value)
        if (e.target.value === employee.password ) {
            setCheckedPassword(true)
        } else {
            setCheckedPassword(false)
        }
    }

    const handleChangeInformation = (e) => {
        const { name, value } = e.target
        setEmployee({ ...employee, [name]: value })
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Create New Employee</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button className="col-lg-2 btn btn-outline-secondary btn-fw" onClick={handleSubmitCreate}>Create</button>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-lg-6 form-group">
                                            <div className='form-group'>
                                                <input
                                                    onChange={e => handleChangeInformation(e)}
                                                    type="text"
                                                    name='username'
                                                    className="form-control form-control-lg"
                                                    placeholder="Username"
                                                    value={employee.username}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <input
                                                    onChange={e => handleChangeInformation(e)}
                                                    type="email"
                                                    name='email'
                                                    className="form-control form-control-lg"
                                                    placeholder="Email"
                                                    value={employee.email}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <input
                                                    onChange={e => handleChangeInformation(e)}
                                                    type="password"
                                                    name='password'
                                                    className="form-control form-control-lg"
                                                    placeholder="Password"
                                                    value={employee.password}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group' style={{border: checkedPassword === false && "1px solid #ff4747"}}>
                                                <input
                                                    onChange={e => handleCheckRePassword(e)}
                                                    type="password"
                                                    name='rePassword'
                                                    className="form-control form-control-lg"
                                                    placeholder="RePassword"
                                                    value={rePassword}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <input
                                                    onChange={e => handleChangeInformation(e)}
                                                    type="number"
                                                    name='phoneNumber'
                                                    className="form-control form-control-lg"
                                                    placeholder="Phone Number"
                                                    value={employee.phoneNumber}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <input
                                                    onChange={e => handleChangeInformation(e)}
                                                    type="date"
                                                    name='dateOfBirth'
                                                    className="form-control form-control-lg"
                                                    placeholder="Date of Birth"
                                                    value={employee.dateOfBirth}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <select value={employee.role} name='role' style={{padding:"0.94rem 1.94rem"}} onChange={e => handleChangeInformation(e)} className="form-control form-control-lg" placeholder="Role" aria-label="Role" required>
                                                    <option value={null}>Role</option>
                                                    <option value="CEO">CEO</option>
                                                    <option value="DEVELOPER">DEVELOPER</option>
                                                    <option value="PRODUCT">PRODUCT</option>
                                                    <option value="ORDER">ORDER</option>
                                                    <option value="SALES">SALES</option>
                                                </select>
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
