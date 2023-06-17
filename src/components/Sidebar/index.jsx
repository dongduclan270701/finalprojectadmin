import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';

const Index = (props) => {
    const {isChooseShowIcons, onHandleGetSettingChooseShowIconOnly, isShowSideBarRes} = props
    const [bannerAds, setBannerAds] = useState(false)
    const [products, setProducts] = useState(false)
    const [orders, setOrders] = useState(false)
    const [users, setUsers] = useState(false)
    const [employee, setEmployee] = useState(false)
    const [recruitment, setRecruitment] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [charts, setCharts] = useState(false)

    const handleSetActive = (index) => {
        if (index === 1) {
            if (bannerAds === false) {
                setBannerAds(true);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 2) {
            if (products === false) {
                setBannerAds(false);setProducts(true);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 3) {
            if (orders === false) {
                setBannerAds(false);setProducts(false);setOrders(true);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 4) {
            if (users === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(true);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 5) {
            if (employee === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(true);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 6) {
            if (recruitment === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(true);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 7) {
            if (discount === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(true);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 8) {
            if (charts === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(true)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setEmployee(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowIcons === true) {
                    onHandleGetSettingChooseShowIconOnly(false)
                }
            }
        }
    }
    return (
        <nav className={isShowSideBarRes ? "sidebar sidebar-offcanvas active" : "sidebar sidebar-offcanvas"} id="sidebar">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                <i className="icon-grid menu-icon" />
                                <span className="menu-title">Dashboard</span>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item" onClick={() => handleSetActive(1)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={bannerAds} aria-controls="ui-basic">
                                <i className="mdi mdi-image-area-close menu-icon" />
                                <span className="menu-title">Banner Ads</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={bannerAds ? "collapse show" : "collapse"} id="ui-basic">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/banner-slide" className="nav-link">Slide Banner</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-ads" className="nav-link">Banner Ads</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-head" className="nav-link">Top Ads</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-content" className="nav-link">Content Ads</NavLink></li>
                                </ul>
                            </div>
                        </li> */}
                        <li className="nav-item" onClick={() => handleSetActive(2)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={products} aria-controls="products-elements">
                                <i className="mdi mdi-laptop menu-icon"/>
                                <span className="menu-title">Products</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={products ? "collapse show" : "collapse"} id="products-elements">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"><NavLink to="/laptop" className="nav-link" >Laptop</NavLink></li>
                                    <li className="nav-item"><NavLink to="/laptop-gaming" className="nav-link" >Laptop Gaming</NavLink></li>
                                    <li className="nav-item"><NavLink to="/pc-km" className="nav-link" >PC KM Đặc Biệt</NavLink></li>
                                    <li className="nav-item"><NavLink to="/pc-gaming" className="nav-link" >PC Gaming</NavLink></li>
                                    <li className="nav-item"><NavLink to="/pc-creator" className="nav-link" >PC Đồ Hoạ</NavLink></li>
                                    <li className="nav-item"><NavLink to="/pc-company" className="nav-link" >PC Doanh Nghiệp</NavLink></li>
                                    <li className="nav-item"><NavLink to="/apple" className="nav-link" >Apple</NavLink></li>
                                    <li className="nav-item"><NavLink to="/monitor" className="nav-link" >Màn Hình</NavLink></li>
                                    <li className="nav-item"><NavLink to="/keyboard" className="nav-link" >Bàn Phím</NavLink></li>
                                    <li className="nav-item"><NavLink to="/mouse-tabpad" className="nav-link" >Chuột</NavLink></li>
                                    <li className="nav-item"><NavLink to="/speaker" className="nav-link" >Tai Nghe - Loa</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => handleSetActive(3)}>
                            <a href className="nav-link" data-toggle="collapse" aria-expanded={orders} aria-controls="users">
                                <i className="mdi mdi-cart menu-icon" />
                                <span className="menu-title">Orders</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className={orders ? "collapse show" : "collapse"} id="users">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/orders" className="nav-link" >List of Orders</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => handleSetActive(4)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={users} aria-controls="icons">
                                <i className="mdi mdi-account menu-icon" />
                                <span className="menu-title">User</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={users ? "collapse show" : "collapse"} id="icons">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/users" className="nav-link">List of Users</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => handleSetActive(5)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={employee} aria-controls="icons">
                                <i className="mdi mdi-account-box menu-icon" />
                                <span className="menu-title">Employee</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={employee ? "collapse show" : "collapse"} id="icons">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/employee" className="nav-link">Employees</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        {/* <li className="nav-item" onClick={() => handleSetActive(6)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={recruitment} aria-controls="auth">
                                <i className="mdi mdi-calendar-text menu-icon" />
                                <span className="menu-title">Recruitment</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={recruitment ? "collapse show" : "collapse"} id="auth">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/recruitment" className="nav-link">Danh sách tuyển dụng</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/recruitment-apply" className="nav-link">Ứng viên ứng tuyển</NavLink></li>
                                </ul>
                            </div>
                        </li> */}
                        <li className="nav-item" onClick={() => handleSetActive(7)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={discount} aria-controls="error">
                                <i className="mdi mdi-division menu-icon" />
                                <span className="menu-title">Discount</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={discount ? "collapse show" : "collapse"} id="error">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/discount" className="nav-link">List of discount</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        {/* <li className="nav-item" onClick={() => handleSetActive(8)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={charts} aria-controls="error">
                                <i className="mdi mdi-timetable menu-icon" />
                                <span className="menu-title">Statistical tables</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={charts ? "collapse show" : "collapse"} id="error">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/charts-orders" className="nav-link">Orders</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/charts-products" className="nav-link">Products</NavLink></li>
                                </ul>
                            </div>
                        </li> */}
                        <li className="nav-item">
                            <NavLink to="/website" className="nav-link">
                                <i className="mdi mdi-web menu-icon" />
                                <span className="menu-title">Website</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
    );
}

export default Index;
