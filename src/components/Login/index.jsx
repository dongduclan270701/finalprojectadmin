import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { fetchAdminDetails } from 'Apis'
const Index = () => {
    const navigate = useNavigate()
    const [inputLogin, setInputLogin] = useState({ email: "", password: "" })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputLogin({ ...inputLogin, [name]: value });
    };

    const hanldLogin = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(inputLogin.email) === true && inputLogin.password.length >= 8 && /[A-Z]/.test(inputLogin.password)) {
            let countdown = 5;

            fetchAdminDetails(inputLogin.email, inputLogin.password)
                .then(result => {
                    console.log(result)
                    if (result === 'Email không tồn tại') {
                        Swal.fire({
                            title: 'Email không đúng!',
                            text: 'Email này không đúng yêu cầu thử lại email khác!',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    } else if (result === 'Mật khẩu không chính xác') {
                        Swal.fire({
                            title: 'Mật khẩu không đúng!',
                            text: 'Mật khẩu này chưa đúng vậy lòng thử lại',
                            icon: 'error',
                            confirmButtonText: 'OK!'
                        })
                    } else {
                        localStorage.setItem("auth-token-admin", JSON.stringify(result.token));
                        Swal.fire({
                            title: 'Đăng nhập thành công!',
                            html: `Bạn sẽ được chuyển đến trang quản lý trong <span></span> giây`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 5000,
                            didOpen: () => {
                                const timerId = setInterval(() => {
                                    countdown--;
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
                })
        }
        if (re.test(inputLogin.email) === false) {
            Swal.fire({
                title: 'Không đúng dạng Email!',
                text: 'Yêu cầu nhập đúng dạng Email',
                icon: 'error',
                confirmButtonText: 'OK!'
            })
        }
        if (inputLogin.password.length < 8 || /[A-Z]/.test(inputLogin.password) === false) {
            Swal.fire({
                title: 'Mật khẩu chưa đúng dạng!',
                text: 'Yêu cầu nhập đúng dạng mật khẩu tối thiểu 8 ký tự và có ký tự in hoa',
                icon: 'error',
                confirmButtonText: 'OK!'
            })
        }
    }
    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            hanldLogin()
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
                                <h4>Chào mừng đến website dành cho quản lý của gearvn</h4>
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
                                        <button type='button' onClick={hanldLogin} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Đăng nhập</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* content-wrapper ends */}
            </div>
            {/* page-body-wrapper ends */}
        </div>
    );
}

export default Index;
