import React, {useState} from 'react';
import logo from 'assets/images/logo.svg'
import logomini from 'assets/images/logo-mini.svg'
import faceUser from "assets/images/faces/face28.jpg"

const Index = (props) => {
    const {getChooseSettingThemePages, isChooseShowicons, getSettingChooseShowIconOnly, isShowSideBarRes, getShowSideBarRes} = props
    const [chooseNotifications, setChooseNotifications] = useState(false)
    const [chooseSettingUser, setChooseSettingUser] = useState(false)
    return (
        <nav className={"navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row " + getChooseSettingThemePages}>
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg" className="mr-2" alt="logo" /></a>
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button  onClick={() => getSettingChooseShowIconOnly(!isChooseShowicons)} className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu" />
                    </button>
                    
                    <ul className="navbar-nav navbar-nav-right">
                        <li className={chooseNotifications ? "nav-item dropdown show" : "nav-item dropdown"}>
                            <a onClick={() => setChooseNotifications(!chooseNotifications)} className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-expanded={chooseNotifications}>
                                <i className="icon-bell mx-0" />
                                <span className="count" />
                            </a>
                            <div className={chooseNotifications ? "dropdown-menu dropdown-menu-right navbar-dropdown preview-list show" : "dropdown-menu dropdown-menu-right navbar-dropdown preview-list"} aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                <a className="dropdown-item preview-item">
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
                                </a>
                                <a className="dropdown-item preview-item">
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
                                </a>
                                <a className="dropdown-item preview-item">
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
                                </a>
                            </div>
                        </li>
                        <li className={chooseSettingUser ? "nav-item nav-profile dropdown show" : "nav-item nav-profile dropdown" }>
                            <a onClick={() => setChooseSettingUser(!chooseSettingUser)} className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown">
                                <img src={faceUser} alt="profile" />
                            </a>
                            <div className={chooseSettingUser ? "dropdown-menu dropdown-menu-right navbar-dropdown show" : "dropdown-menu dropdown-menu-right navbar-dropdown"} aria-labelledby="profileDropdown">
                                <a className="dropdown-item">
                                    <i className="ti-settings text-primary" />
                                    Settings
                                </a>
                                <a className="dropdown-item">
                                    <i className="ti-power-off text-primary" />
                                    Logout
                                </a>
                            </div>
                        </li>
                        <li className="nav-item nav-settings d-none d-lg-flex">
                            <a className="nav-link" href="#">
                                <i className="icon-ellipsis" />
                            </a>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu" onClick={() => getShowSideBarRes(!isShowSideBarRes)} />
                    </button>
                </div>
            </nav>
    );
}

export default Index;
