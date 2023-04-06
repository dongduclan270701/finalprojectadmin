import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';

const Index = (props) => {
    const {isChooseShowicons, getSettingChooseShowIconOnly, isShowSideBarRes} = props
    const [bannerAds, setBannerAds] = useState(false)
    const [products, setProducts] = useState(false)
    const [orders, setOrders] = useState(false)
    const [users, setUsers] = useState(false)
    const [employer, setIcons] = useState(false)
    const [recruitment, setRecruitment] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [charts, setCharts] = useState(false)
    const setActive = (index) => {
        if (index === 1) {
            if (bannerAds === false) {
                setBannerAds(true);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    console.log(isChooseShowicons)
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 2) {
            if (products === false) {
                setBannerAds(false);setProducts(true);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 3) {
            if (orders === false) {
                setBannerAds(false);setProducts(false);setOrders(true);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 4) {
            if (users === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(true);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 5) {
            if (employer === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(true);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 6) {
            if (recruitment === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(true);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 7) {
            if (discount === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(true);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            }
        }
        if (index === 8) {
            if (charts === false) {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(true)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
                }
            } else {
                setBannerAds(false);setProducts(false);setOrders(false);setUsers(false);setIcons(false);setRecruitment(false);setDiscount(false);setCharts(false)
                if (isChooseShowicons === true) {
                    getSettingChooseShowIconOnly(false)
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
                                <span className="menu-title">Trang Chủ</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={() => setActive(1)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={bannerAds} aria-controls="ui-basic">
                                <i className="mdi mdi-image-area-close menu-icon" />
                                <span className="menu-title">Banner Ads</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={bannerAds ? "collapse show" : "collapse"} id="ui-basic">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/banner-slide" className="nav-link">Slide Banner</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-ads" className="nav-link">Banner Ads</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-head" className="nav-link">Ads Đầu</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/banner-content" className="nav-link">Ads Nội dung</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(2)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={products} aria-controls="products-elements">
                                <i className="mdi mdi-laptop menu-icon"/>
                                <span className="menu-title">Sản Phẩm</span>
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
                                    <li className="nav-item"><NavLink to="/pc-accessory" className="nav-link" >Linh Kiện PC</NavLink></li>
                                    <li className="nav-item"><NavLink to="/apple" className="nav-link" >Apple</NavLink></li>
                                    <li className="nav-item"><NavLink to="/monitor" className="nav-link" >Màn Hình</NavLink></li>
                                    <li className="nav-item"><NavLink to="/keyboard" className="nav-link" >Bàn Phím</NavLink></li>
                                    <li className="nav-item"><NavLink to="/mouse-tabpad" className="nav-link" >Chuột + Lót Chuột</NavLink></li>
                                    <li className="nav-item"><NavLink to="/speaker" className="nav-link" >Tai Nghe - Loa</NavLink></li>
                                    <li className="nav-item"><NavLink to="/chair-tables" className="nav-link" >Ghế - Bàn</NavLink></li>
                                    <li className="nav-item"><NavLink to="/app-internet" className="nav-link" >Phần Mềm & Mạng</NavLink></li>
                                    <li className="nav-item"><NavLink to="/accessory" className="nav-link" >Phụ Kiện</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(3)}>
                            <a className="nav-link" data-toggle="collapse" aria-expanded={orders} aria-controls="users">
                                <i className="mdi mdi-cart menu-icon" />
                                <span className="menu-title">Đơn Hàng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className={orders ? "collapse show" : "collapse"} id="users">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/orders" className="nav-link" >Danh sách đơn hàng</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(4)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={users} aria-controls="icons">
                                <i className="mdi mdi-account menu-icon" />
                                <span className="menu-title">Người Dùng</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={users ? "collapse show" : "collapse"} id="icons">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/users" className="nav-link">Danh sách người dùng</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(5)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={employer} aria-controls="icons">
                                <i className="mdi mdi-account-box menu-icon" />
                                <span className="menu-title">Nhân Viên</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={employer ? "collapse show" : "collapse"} id="icons">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/employers" className="nav-link">Danh sách nhân viên</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(6)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={recruitment} aria-controls="auth">
                                <i className="mdi mdi-calendar-text menu-icon" />
                                <span className="menu-title">Tuyển Dụng</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={recruitment ? "collapse show" : "collapse"} id="auth">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/recruitment" className="nav-link">Danh sách tuyển dụng</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/recruitment-apply" className="nav-link">Ứng viên ứng tuyển</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(7)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={discount} aria-controls="error">
                                <i className="mdi mdi-division menu-icon" />
                                <span className="menu-title">Mã giảm giá</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={discount ? "collapse show" : "collapse"} id="error">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/discount" className="nav-link">Danh sách mã</NavLink></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => setActive(8)}>
                            <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={charts} aria-controls="error">
                                <i className="mdi mdi-timetable menu-icon" />
                                <span className="menu-title">Bảng Thống Kê</span>
                                <i className="menu-arrow" />
                            </NavLink>
                            <div className={charts ? "collapse show" : "collapse"} id="error">
                                <ul className="nav flex-column sub-menu" style={{padding: "0.25rem 0 0.75rem 1.25rem"}}>
                                    <li className="nav-item"> <NavLink to="/charts-orders" className="nav-link">Đơn hàng</NavLink></li>
                                    <li className="nav-item"> <NavLink to="/charts-products" className="nav-link">Sản phẩm</NavLink></li>
                                </ul>
                            </div>
                        </li>
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
