import React, {useState} from 'react';
// import logo from 'assets/images/logo.svg'
// import logoMini from 'assets/images/logo-mini.svg'
import faceUser from "assets/images/faces/face28.jpg"

const Index = (props) => {
    const {getChooseSettingThemePages, isChooseShowIcons, onHandleGetSettingChooseShowIconOnly, isShowSideBarRes, onHandleGetShowSideBarRes} = props
    const [chooseNotifications, setChooseNotifications] = useState(false)
    const [chooseSettingUser, setChooseSettingUser] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("auth-token-admin");
        window.location.reload();
    }

    return (
        <nav className={"navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row " + getChooseSettingThemePages}>
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg" className="mr-2" alt="logo" /></a>
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button  onClick={() => onHandleGetSettingChooseShowIconOnly(!isChooseShowIcons)} className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu" />
                    </button>
                    
                    <ul className="navbar-nav navbar-nav-right">
                        <li className={chooseNotifications ? "nav-item dropdown show" : "nav-item dropdown"}>
                            <span onClick={() => setChooseNotifications(!chooseNotifications)} className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-expanded={chooseNotifications}>
                                <i className="icon-bell mx-0" />
                                <span className="count" />
                            </span>
                            <div className={chooseNotifications ? "dropdown-menu dropdown-menu-right navbar-dropdown preview-list show" : "dropdown-menu dropdown-menu-right navbar-dropdown preview-list"} aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                <span className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="ti-info-alt mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p>
                                    </div>
                                </span>
                                <span className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-warning">
                                            <i className="ti-settings mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Settings</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Private message
                                        </p>
                                    </div>
                                </span>
                                <span className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="ti-user mx-0" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            2 days ago
                                        </p>
                                    </div>
                                </span>
                            </div>
                        </li>
                        <li className={chooseSettingUser ? "nav-item nav-profile dropdown show" : "nav-item nav-profile dropdown" }>
                            <span onClick={() => setChooseSettingUser(!chooseSettingUser)} className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown">
                                <img src={faceUser} alt="profile" />
                            </span>
                            <div className={chooseSettingUser ? "dropdown-menu dropdown-menu-right navbar-dropdown show" : "dropdown-menu dropdown-menu-right navbar-dropdown"} aria-labelledby="profileDropdown">
                                <span className="dropdown-item">
                                    <i className="ti-settings text-primary" />
                                    Settings
                                </span>
                                <span onClick={handleLogout} className="dropdown-item">
                                    <i className="ti-power-off text-primary" />
                                    Logout
                                </span>
                            </div>
                        </li>
                        <li className="nav-item nav-settings d-none d-lg-flex">
                            <span className="nav-link" href="#">
                                <i className="icon-ellipsis" />
                            </span>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu" onClick={() => onHandleGetShowSideBarRes(!isShowSideBarRes)} />
                    </button>
                </div>
            </nav>
    );
}

export default Index;
