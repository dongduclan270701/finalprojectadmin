import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { fetchLoginAdmin } from 'Apis'
import 'assets/scss/v2/login.scss'
const Index = () => {
    const navigate = useNavigate()
    const [inputLogin, setInputLogin] = useState({ email: "", password: "" })
    const [focusedInput, setFocusedInput] = useState(null)
    const handleInputFocus = (inputName) => {
        setFocusedInput(inputName)
    }

    const handleInputBlur = () => {
        setFocusedInput(null)
    }
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
        <div className='page-login'>
            <div className='form-login'>
                <div className='form-login-title play-bold'>Ktech's Website Dashboard</div>
                <div className='form-login-title play-bold'>Login</div>
                <div className='section-input-form-login'>
                    <div className='section-input-form-login-left'>
                        <div className='section-input-form-login-left-box'>
                            <div className={`section-input-form-login-left-title ${focusedInput === 'email' ? 'input-focused' : ''}`}>
                                Email
                            </div>
                            <input
                                type="email"
                                name='email'
                                className='section-input-form-login-left-input'
                                onFocus={() => handleInputFocus('email')}
                                onBlur={handleInputBlur}
                                onKeyDown={handleOnKeyDown}
                                onChange={handleInputChange}
                                defaultValue={inputLogin.email}
                            />
                        </div>
                        <div className='section-input-form-login-left-box'>
                            <div className={`section-input-form-login-left-title ${focusedInput === 'password' ? 'input-focused' : ''}`}>
                                Password
                            </div>
                            <input
                                type='password'
                                className='section-input-form-login-left-input'
                                onFocus={() => handleInputFocus('password')}
                                onBlur={handleInputBlur}
                                onChange={handleInputChange}
                                name='password'
                                onKeyDown={handleOnKeyDown}
                                defaultValue={inputLogin.password}
                            />
                        </div>
                        <button className="btn-53" onClick={handleLogin}>
                            <div className="original">LOGIN</div>
                            <div className="letters">
                                <span>L</span>
                                <span>O</span>
                                <span>G</span>
                                <span>I</span>
                                <span>N</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Index;
