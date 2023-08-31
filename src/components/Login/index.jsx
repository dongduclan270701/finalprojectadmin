import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { fetchLoginAdmin } from 'Apis'
const Index = () => {
    const navigate = useNavigate()
    const [inputLogin, setInputLogin] = useState({ email: "", password: "" })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputLogin({ ...inputLogin, [name]: value });
    };

    const handleLogin = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(inputLogin.email) === true && inputLogin.password.length >= 8 && /[A-Z]/.test(inputLogin.password)) {
            let countDown = 5;
            fetchLoginAdmin(inputLogin.email, inputLogin.password)
                .then(result => {
                    if (result === 'Email does not exist') {
                        Swal.fire({
                            title: 'Email is not correct!',
                            text: 'This email is incorrect, please try another email!',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    } else if (result === 'Incorrect password') {
                        Swal.fire({
                            title: 'Incorrect password!',
                            text: 'This password is not correct, please try again',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    } else {
                        localStorage.setItem("auth-token-admin", JSON.stringify(result.token));
                        localStorage.setItem("role", JSON.stringify(result.role));
                        Swal.fire({
                            title: 'Logged in successfully!',
                            html: `You will be redirected to the management page in <span></span> seconds`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 5000,
                            didOpen: () => {
                                const timerId = setInterval(() => {
                                    countDown--;
                                    Swal.getHtmlContainer().querySelector('span')
                                        .textContent = (Swal.getTimerLeft() / 1000)
                                            .toFixed(0)
                                }, 100);
                                setTimeout(() => {
                                    clearInterval(timerId);
                                    if (window.location.pathname !== '/login') {
                                        window.location.reload();
                                    } else {
                                        navigate(-1);
                                    }
                                }, 5000);
                            },
                        });
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
        if (re.test(inputLogin.email) === false) {
            Swal.fire({
                title: 'Incorrect email format!',
                text: 'Requires to enter the correct email format',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        }
        if (inputLogin.password.length < 8 || /[A-Z]/.test(inputLogin.password) === false) {
            Swal.fire({
                title: 'Incorrect password format!',
                text: 'Requires to enter the correct password form at least 8 characters and with uppercase characters',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        }
    }
    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin()
        }
    }
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo" style={{ display: "flex", justifyContent: "center" }}>
                                    <img src="https://theme.hstatic.net/1000026716/1000440777/14/logo.svg?v=35527" alt="logo" />
                                </div>
                                <h4>Welcome to Gearvn's management website</h4>
                                <form className="pt-3">
                                    <div className="form-group">
                                        <input
                                            onChange={handleInputChange}
                                            type="email"
                                            name='email'
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Email"
                                            defaultValue={inputLogin.email}
                                            required
                                            onKeyDown={handleOnKeyDown}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            onChange={handleInputChange}
                                            type="password"
                                            name='password'
                                            className="form-control form-control-lg"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            defaultValue={inputLogin.password}
                                            required
                                            onKeyDown={handleOnKeyDown}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <button type='button' onClick={handleLogin} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Index;
