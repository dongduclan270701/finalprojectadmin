import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { fetchListOfEmployee, fetchSearchEmployee, fetchInformationEmployee, fetchUpdateEmployee, fetchCreateEmployee } from 'Apis'
import NoAuth from 'components/Error/No-Auth'
import Footer from "components/v2/Footer"
import Chart from 'components/v2/Employee/Page-Chart'
import Swal from 'sweetalert2'
import { StateContext } from 'components/Context'
import 'assets/scss/v2/employee.scss'
import { uploadUrlUser, apiKeyUser } from 'Apis/utils'
import axios from 'axios';
import Loading from 'components/v2/Loading'
const Index = () => {
    const state = useContext(StateContext)
    const [employeeList, setEmployeeList] = useState()
    const [loading, setLoading] = useState(true)
    const role = ['CEO', 'PRODUCT', 'ORDER', 'EMPLOYEE', 'DEVELOPER', 'MANAGEMENT']
    const [countPage, setCountPage] = useState(1)
    const [countMaxPage, setCountMaxPage] = useState(1)
    const [search, setSearch] = useState({ email: "", role: "", status: "" })
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [inputFocused, setInputFocused] = useState(false)
    const [error, setError] = useState(null)
    const [isShowEmployee, setIsShowEmployee] = useState(false)
    const [isShowCreateEmployee, setIsShowCreateEmployee] = useState(false)
    const [employee, setEmployee] = useState(null)
    const [isReview, setIsReview] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        role: "",
        password: "",
        age: ""
    })
    const [imageChoose, setImageChoose] = useState()
    const [image, setImage] = useState()
    const [cvChoose, setCvChoose] = useState()
    const [cv, setCv] = useState()
    const [changeForm, setChangeForm] = useState(false)

    useEffect(() => {
        fetchListOfEmployee(1)
            .then(result => {
                state.setAuthentication(result.role)
                setLoading(false)
                setEmployeeList(result.data)
                if (0 < result.total % 10 && result.total % 10 < 10) {
                    setCountMaxPage(Math.floor(result.total / 10) + 1)
                } else if (result.total === 0) {
                    setCountMaxPage(1)
                }
                else {
                    setCountMaxPage(Math.floor(result.total / 10))
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.data.message === "You do not have sufficient permissions to perform this function") {
                    state.setAuthentication(state.authentication !== null ? state.authentication : null)
                }
                setError(error.response.status)
                setLoading(false)
            })
    }, [state])
    const handleSetPage = (count) => {
        setEmployeeList()
        setCountPage(count)
        fetchSearchEmployee(search, count)
            .then(result => {
                setEmployeeList(result.data)
            })
            .catch(error => {
                Swal.fire({
                    title: "Ops!",
                    text: "Error connect to server!",
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
                console.log(error)
            })
    }
    const handleSearchEmployee = (e) => {
        setEmployeeList()
        const { name, value } = e.target
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        if (inputFocused) {
            const timeoutId = setTimeout(() => {
                setSearch({ ...search, [name]: value })
                fetchSearchEmployee({ ...search, [name]: value }, 1)
                    .then((result) => {
                        setEmployeeList(result.data);
                        if (0 < result.total % 10 && result.total % 10 < 10) {
                            setCountMaxPage(Math.floor(result.total / 10) + 1)
                        } else if (result.total === 0) {
                            setCountMaxPage(1)
                        } else {
                            setCountMaxPage(Math.floor(result.total / 10))
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        Swal.fire({
                            title: "Ops!",
                            text: "Error connect to server!",
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    })
            }, 1000)
            setSearchTimeout(timeoutId)
        }
    }

    const handleShowEmployee = (orderId) => {
        setIsShowEmployee(true)
        fetchInformationEmployee(orderId)
            .then(result => {
                setEmployee(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
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
                                    fetchUpdateEmployee(employee._id, newData)
                                        .then(result => {
                                            let updatedEmployeeList = employeeList.map(item => {
                                                if (item._id === employee._id) {
                                                    return result;
                                                } else {
                                                    return item;
                                                }
                                            });
                                            setEmployeeList(updatedEmployeeList)

                                            Swal.fire({
                                                title: 'Successfully!',
                                                text: 'You have successfully updated your staff!',
                                                icon: 'success',
                                                confirmButtonText: 'OK!'
                                            })
                                                .then((result) => {
                                                    if (result.isConfirmed) {
                                                        setIsReview(false)
                                                        setIsShowEmployee(true)
                                                    }
                                                })
                                                .catch(error => {
                                                    Swal.fire({
                                                        title: "Ops!",
                                                        text: "Error connect to server!",
                                                        icon: 'error',
                                                        confirmButtonText: 'OK!'
                                                    })
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
                                    fetchUpdateEmployee(employee._id, newData)
                                        .then(result => {
                                            let updatedEmployeeList = employeeList.map(item => {
                                                if (item._id === employee._id) {
                                                    return result;
                                                } else {
                                                    return item;
                                                }
                                            });
                                            setEmployeeList(updatedEmployeeList)
                                            Swal.fire({
                                                title: 'Successfully!',
                                                text: 'You have successfully updated your staff!',
                                                icon: 'success',
                                                confirmButtonText: 'OK!'
                                            })
                                                .then((result) => {
                                                    if (result.isConfirmed) {
                                                        setIsReview(false)
                                                        setIsShowEmployee(true)
                                                    }
                                                })
                                                .catch(error => {
                                                    Swal.fire({
                                                        title: "Ops!",
                                                        text: "Error connect to server!",
                                                        icon: 'error',
                                                        confirmButtonText: 'OK!'
                                                    })
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
                            fetchUpdateEmployee(employee._id, employee)
                                .then(result => {
                                    let updatedEmployeeList = employeeList.map(item => {
                                        if (item._id === employee._id) {
                                            return result
                                        } else {
                                            return item;
                                        }
                                    });
                                    setEmployeeList(updatedEmployeeList)
                                    Swal.fire({
                                        title: 'Successfully!',
                                        text: 'You have successfully updated your staff!',
                                        icon: 'success',
                                        confirmButtonText: 'OK!'
                                    })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                setIsReview(false)
                                                setIsShowEmployee(true)
                                            }
                                        })
                                        .catch(error => {
                                            Swal.fire({
                                                title: "Ops!",
                                                text: "Error connect to server!",
                                                icon: 'error',
                                                confirmButtonText: 'OK!'
                                            })
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
    const handleDeactivateEmployee = () => {
        setEmployee({ ...employee, status: !employee.status, reasonUpdate: 'Update status' })
    }
    const [checkedPassword, setCheckedPassword] = useState(null)
    const [rePassword, setRePassword] = useState("")

    const handleSubmitCreate = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newEmployee.username) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff username information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (!newEmployee.email) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff email information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (!newEmployee.phoneNumber) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff phone number information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (!newEmployee.role) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff role information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (!newEmployee.password) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff password information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (!newEmployee.age) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered enough staff age information, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (re.test(newEmployee.email) === false) {
            Swal.fire({
                title: 'Incorrect email format!',
                text: 'Requires to enter the correct email format',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else if (newEmployee.password.length < 8 || /[A-Z]/.test(newEmployee.password) === false) {
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
                Swal.fire({
                    title: 'Updating...',
                    html: 'Please wait...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });
                fetchCreateEmployee(newEmployee)
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
                                age: ""
                            })
                            setRePassword("")
                        }
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
    }

    const handleCheckRePassword = (e) => {
        setRePassword(e.target.value)
        if (e.target.value === newEmployee.password) {
            setCheckedPassword(true)
        } else {
            setCheckedPassword(false)
        }
    }

    const handleChangeCreateInput = (e) => {
        const { name, value } = e.target
        setNewEmployee({ ...newEmployee, [name]: value })
    }
    return (
        <div className='section-employee play-regular'>
            {(state.authentication === 'MANAGEMENT' || state.authentication === 'DEVELOPER') ? <>
                <div className='col-12 section-employee-content' >
                    <div style={{ width: '100%', padding: 20, background: '#a7cff290', borderRadius: 30 }}>
                        <div className='section-employee-table-goods-title'>
                            <div className='section-employee-table-goods-title-name play-bold'>
                                <span>Employee List</span><p style={{ cursor: 'pointer' }} onClick={() => setIsShowCreateEmployee(true)}><i className="fa-solid fa-circle-plus" ></i>Add</p>
                            </div>
                        </div>
                        <div className='row section-employee-table-goods-title-search'>
                            <div className='col-md-1 title-search'>Search:</div>
                            <div className='row col-md-11 content-search'>
                                <input type='text' name='code' onChange={e => handleSearchEmployee(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='col-md-3 input-form-search' placeholder='Code ID' />
                                <select name='status' onChange={e => handleSearchEmployee(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                    <option value=''>All</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactivate</option>
                                </select>
                                <select name="role" onChange={e => handleSearchEmployee(e)} nBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} style={{ borderRadius: "15px" }} type="text" className="col-md-3 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                    <option value=''>All</option>
                                    {role.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {employeeList ?
                            <>
                                <div className="table-responsive section-employee-table-goods">
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {employeeList.map((item, index) => {
                                                return <tr key={index}>
                                                    <td >{item.username}</td>
                                                    <td>{item.email}</td>
                                                    <td className='play-bold'>{item.role}</td>
                                                    <td><img src={item.image} className="img-fluid" alt="" style={{ borderRadius: "50%" }} /></td>
                                                    <td><label className={
                                                        item.status ? "badge badge-success" : "badge badge-danger"
                                                    }>
                                                        {item.status ? 'Active' : 'Deactivate'}
                                                    </label></td>
                                                    <td><i className='fa-regular fa-eye' onClick={() => handleShowEmployee(item._id)} style={{ cursor: 'pointer' }} /></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='page-button' role="group" aria-label="Basic example">
                                    {countPage > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(1)}><span>1</span>
                                        <span></span></button>}
                                    {countPage > 3 && <button type="text" className='animated-button' >...</button>}
                                    {countPage - 1 > 1 && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage - 1)}><span>{countPage - 1}</span>
                                        <span></span></button>}
                                    <button type="button" className="animated-button active">{countPage}</button>
                                    {countPage + 1 < countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countPage + 1)}><span>{countPage + 1}</span>
                                        <span></span></button>}
                                    {countMaxPage - countPage > 2 && <button type="text" className='animated-button'  >...</button>}
                                    {countPage !== countMaxPage && <button className='animated-button' type="button" onClick={() => handleSetPage(countMaxPage)}><span>{countMaxPage}</span>
                                        <span></span></button>}
                                </div>
                            </>
                            :
                            <Loading />
                        }
                    </div>
                </div>
                <Footer />
                <div className={isShowEmployee ? 'col-12 section-info-employee active' : 'col-12 section-info-employee'}>
                    <div className={isReview ? 'first-form section-form-info-employee' : 'first-form section-form-info-employee show-employee'}>
                        <div className='section-form-info-employee-title play-bold'><span>Information employee</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowEmployee(false), setEmployee(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        <div className='section-form-info-employee-edit play-bold'><div className='page-button'>
                            <button className='animated-button' type="button" onClick={() => setIsReview(true)} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                <span>Edit <i className="fa-solid fa-pen-to-square"></i></span>
                                <span></span>
                            </button>
                        </div></div>
                        {employee ?
                            <div className='section-form-info-employee-content'>
                                <div className='box-info-purchaser-employee'>
                                    <div className='list-info-purchaser-employee'>
                                        {/* <div className='row info-id-employee play-bold'>DISCOUNT ID: {employee.discountId.toUpperCase()}</div> */}
                                        <div className='row info-employee'>
                                            <div className='col-md-3 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={employee.image} style={{ width: "200px", borderRadius: "50%" }} alt="avatar" />
                                            </div>
                                            <div className='col-md-3 list-info-employee'>
                                                <div className='play-bold'>Information</div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.username} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>U</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>s</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>m</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.email} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>E</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>m</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>l:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.phoneNumber} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>h</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>u</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>m</span>
                                                        <span className="label-char" style={{ '--index': '9' }}>b</span>
                                                        <span className="label-char" style={{ '--index': '10' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '11' }}>r:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.identity} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>I</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>d</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-md-3 list-info-employee'>
                                                <div className='play-bold'>DETAIL</div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.address} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>A</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>d</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>s</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>s:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.salary} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>S</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>l</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>y:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.age} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>A</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>g</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.role} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>l</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>e:</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-md-3 list-info-employee'>
                                                <div className='play-bold'>STATUS</div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.updatedBy && employee.updatedBy.length > 0 ? (employee.updatedBy[employee.updatedBy.length - 1].username + " ( " + employee.updatedBy[employee.updatedBy.length - 1].email + " - " + employee.updatedBy[employee.updatedBy.length - 1].role + " )") : "None"} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>U</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>p</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>d</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>b</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.createdBy ? (employee.createdBy.username + " ( " + employee.createdBy.email + " - " + employee.createdBy.role + " )") : "null"} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>d</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>b</span>
                                                        <span className="label-char" style={{ '--index': '9' }}>y:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.reasonUpdate ? employee.reasonUpdate : "None"} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>s</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>u</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>p</span>
                                                        <span className="label-char" style={{ '--index': '9' }}>d</span>
                                                        <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '11' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '12' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className="wave-group">
                                                    <input required type="text" className="input" value={employee.status ? 'Active' : 'Deactivate'} disabled />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>V</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>u</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>c</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>h</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '8' }}>s</span>
                                                        <span className="label-char" style={{ '--index': '9' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '10' }}>a</span>
                                                        <span className="label-char" style={{ '--index': '11' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '12' }}>u</span>
                                                        <span className="label-char" style={{ '--index': '13' }}>s:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Loading />
                        }
                    </div>
                    <div className={isReview ? 'second-form section-form-info-employee show-review' : 'second-form section-form-info-employee'}>
                        <div className='section-form-info-employee-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(!isReview))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Edit employee</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowEmployee(false), setEmployee(null), setIsReview(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        <div className='section-form-info-employee-edit play-bold'>
                            <div className='page-button'>
                                <button className='animated-button' type="button" onClick={() => (handleSubmitUpdate())} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                    <span>Save <i className="fa-regular fa-floppy-disk"></i></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                        {employee ?
                            <div className='row edit-info-employee'>
                                <div className='col-md-4 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={employee.image} style={{ width: "200px", borderRadius: "50%" }} alt="avatar" />
                                </div>
                                <div className='col-md-4 list-info-employee'>
                                    <div className='play-bold'>Information</div>
                                    <div className="wave-group">
                                        <input required type="text" name='username' onChange={e => handleChangeInformation(e)} className="input" value={employee.username} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>U</span>
                                            <span className="label-char" style={{ '--index': '1' }}>s</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e</span>
                                            <span className="label-char" style={{ '--index': '3' }}>r</span>
                                            <span className="label-char" style={{ '--index': '4' }}>n</span>
                                            <span className="label-char" style={{ '--index': '5' }}>a</span>
                                            <span className="label-char" style={{ '--index': '6' }}>m</span>
                                            <span className="label-char" style={{ '--index': '7' }}>e:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" name='email' onChange={e => handleChangeInformation(e)} className="input" value={employee.email} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>E</span>
                                            <span className="label-char" style={{ '--index': '1' }}>m</span>
                                            <span className="label-char" style={{ '--index': '2' }}>a</span>
                                            <span className="label-char" style={{ '--index': '3' }}>i</span>
                                            <span className="label-char" style={{ '--index': '4' }}>l:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="number" name='phoneNumber' onChange={e => handleChangeInformation(e)} className="input" value={employee.phoneNumber} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>P</span>
                                            <span className="label-char" style={{ '--index': '1' }}>h</span>
                                            <span className="label-char" style={{ '--index': '2' }}>o</span>
                                            <span className="label-char" style={{ '--index': '3' }}>n</span>
                                            <span className="label-char" style={{ '--index': '4' }}>e</span>
                                            <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                            <span className="label-char" style={{ '--index': '6' }}>n</span>
                                            <span className="label-char" style={{ '--index': '7' }}>u</span>
                                            <span className="label-char" style={{ '--index': '8' }}>m</span>
                                            <span className="label-char" style={{ '--index': '9' }}>b</span>
                                            <span className="label-char" style={{ '--index': '10' }}>e</span>
                                            <span className="label-char" style={{ '--index': '11' }}>r:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="number" name='identity' onChange={e => handleChangeInformation(e)} className="input" value={employee.identity} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>I</span>
                                            <span className="label-char" style={{ '--index': '1' }}>d</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e</span>
                                            <span className="label-char" style={{ '--index': '4' }}>n</span>
                                            <span className="label-char" style={{ '--index': '5' }}>t</span>
                                            <span className="label-char" style={{ '--index': '6' }}>i</span>
                                            <span className="label-char" style={{ '--index': '7' }}>t</span>
                                            <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" name='reasonUpdate' onChange={e => handleChangeInformation(e)} className="input" value={employee.reasonUpdate ? employee.reasonUpdate : "None"} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>R</span>
                                            <span className="label-char" style={{ '--index': '1' }}>e</span>
                                            <span className="label-char" style={{ '--index': '2' }}>a</span>
                                            <span className="label-char" style={{ '--index': '3' }}>s</span>
                                            <span className="label-char" style={{ '--index': '4' }}>o</span>
                                            <span className="label-char" style={{ '--index': '5' }}>n</span>
                                            <span className="label-char" style={{ '--index': '6' }}>&#160;</span>
                                            <span className="label-char" style={{ '--index': '7' }}>u</span>
                                            <span className="label-char" style={{ '--index': '8' }}>p</span>
                                            <span className="label-char" style={{ '--index': '9' }}>d</span>
                                            <span className="label-char" style={{ '--index': '10' }}>a</span>
                                            <span className="label-char" style={{ '--index': '11' }}>t</span>
                                            <span className="label-char" style={{ '--index': '12' }}>e:</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-4 list-info-employee'>
                                    <div className='play-bold'>DETAIL</div>
                                    <div className="wave-group">
                                        <input required type="text" name='address' onChange={e => handleChangeInformation(e)} className="input" value={employee.address} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>A</span>
                                            <span className="label-char" style={{ '--index': '1' }}>d</span>
                                            <span className="label-char" style={{ '--index': '2' }}>r</span>
                                            <span className="label-char" style={{ '--index': '3' }}>e</span>
                                            <span className="label-char" style={{ '--index': '4' }}>s</span>
                                            <span className="label-char" style={{ '--index': '5' }}>s:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" name='salary' onChange={e => handleChangeInformation(e)} className="input" value={employee.salary} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>S</span>
                                            <span className="label-char" style={{ '--index': '1' }}>a</span>
                                            <span className="label-char" style={{ '--index': '2' }}>l</span>
                                            <span className="label-char" style={{ '--index': '3' }}>a</span>
                                            <span className="label-char" style={{ '--index': '4' }}>r</span>
                                            <span className="label-char" style={{ '--index': '5' }}>y:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="number" name='age' onChange={e => handleChangeInformation(e)} className="input" value={employee.age} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>A</span>
                                            <span className="label-char" style={{ '--index': '1' }}>g</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e:</span>
                                        </label>
                                    </div>
                                    <div className="wave-group">
                                        <input required type="text" className="input" value={employee.role} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>R</span>
                                            <span className="label-char" style={{ '--index': '1' }}>o</span>
                                            <span className="label-char" style={{ '--index': '2' }}>l</span>
                                            <span className="label-char" style={{ '--index': '3' }}>e:</span>
                                        </label>
                                    </div>
                                    <div className='page-button'>
                                        <button className='animated-button' type="button" onClick={() => (handleDeactivateEmployee())} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                            <span>{employee.status ? 'Active' : 'Deactivate'}</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <Loading />
                        }
                    </div>
                </div>
                <div className={isShowCreateEmployee ? 'col-12 section-info-employee active' : 'col-12 section-info-employee'}>
                    <div className={isReview ? 'first-form section-form-info-employee' : 'first-form section-form-info-employee show-employee'}>
                        <div className='section-form-info-employee-title play-bold'><span>CREATE NEW DISCOUNT</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowCreateEmployee(false))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        <div className='section-form-info-employee-edit play-bold'><div className='page-button'>
                            <button className='animated-button' type="button" onClick={handleSubmitCreate} style={{ border: '1px solid #2196f3', width: '150px' }}>
                                <span>Add <i className="fa-solid fa-pen-to-square"></i></span>
                                <span></span>
                            </button>
                        </div></div>
                        <div className='section-form-info-employee-content'>
                            <div className='box-info-purchaser-employee'>
                                <div className='list-info-purchaser-employee'>
                                    <div className='row info-employee'>
                                        <div className='col-md-6 list-info-employee'>
                                            <div className='play-bold'>DETAIL EMPLOYEE</div>
                                            <div className="wave-group">
                                                <input required type="text" onChange={handleChangeCreateInput} name="username" className="input" value={newEmployee.username} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>U</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>m</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="text" onChange={handleChangeCreateInput} name="email" className="input" value={newEmployee.email} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>E</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>m</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>l:</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-6 list-info-employee'>
                                            <div className='play-bold'>CONTACT</div>
                                            <div className="wave-group">
                                                <input required type="text" onChange={handleChangeCreateInput} name="phoneNumber" className="input" value={newEmployee.phoneNumber} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>h</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>u</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>m</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>b</span>
                                                    <span className="label-char" style={{ '--index': '10' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '11' }}>r:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required type="number" onChange={handleChangeCreateInput} name="age" className="input" value={newEmployee.age} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>A</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>g</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>e:</span>
                                                </label>
                                            </div>

                                        </div>
                                        <div className='col-md-6 list-info-employee'>
                                            <div className='play-bold'>PASSWORD & ROLE</div>
                                            <div className="wave-group">
                                                <input required autoComplete='off' type="password" name="password" onChange={handleChangeCreateInput} className="input" value={newEmployee.password} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>P</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>w</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>d:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">
                                                <input required autoComplete='off' type="password" name="rePassword" onChange={e => handleCheckRePassword(e)} className="input" value={rePassword} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>P</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>a</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>s</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>w</span>
                                                    <span className="label-char" style={{ '--index': '7' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '8' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '9' }}>d:</span>
                                                </label>
                                            </div>
                                            <div className="wave-group">

                                                <select name='role' onChange={handleChangeCreateInput} value={newEmployee.role} className="input" >
                                                    <option value=''>Select role</option>
                                                    <option value="CEO">CEO</option>
                                                    <option value="DEVELOPER">DEVELOPER</option>
                                                    <option value="PRODUCT">PRODUCT</option>
                                                    <option value="ORDER">ORDER</option>
                                                    <option value="SALES">SALES</option>
                                                    <option value="MANAGEMENT">MANAGEMENT</option>
                                                </select>
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>R</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>l</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>e:</span>
                                                </label>{console.log(newEmployee)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
                :
                state.authentication === 'CEO' ?
                    <>
                        <div className="section-employee-content">
                            <Chart />
                        </div>
                        <Footer />
                    </>
                    :
                    <div style={{ height: '100vh' }}>
                        <div style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
                            <NoAuth error={error} />
                        </div>
                        <Footer />
                    </div>
            }
        </div>
    );
}

export default Index;
