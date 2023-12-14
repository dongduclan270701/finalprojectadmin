import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { StateContext } from 'components/Context'
const Index = (props) => {
    const state = useContext(StateContext)
    const { isChooseShowIcons, onHandleGetSettingChooseShowIconOnly, isShowSideBarRes } = props
    const [products, setProducts] = useState(false)
    const [orders, setOrders] = useState(false)
    const [users, setUsers] = useState(false)
    const [employee, setEmployee] = useState(false)
    const [discount, setDiscount] = useState(false)
    const handleSetActive = (index) => {
        const sections = ['products', 'orders', 'users', 'employee', 'discount']
        const newStatus = {}
        sections.forEach(section => newStatus[section] = false)
        newStatus[sections[index - 1]] = !newStatus[sections[index - 1]]
        setProducts(newStatus.products);
        setOrders(newStatus.orders);
        setUsers(newStatus.users);
        setEmployee(newStatus.employee);
        setDiscount(newStatus.discount);
        if (newStatus[sections[index - 1]] && isChooseShowIcons) {
            onHandleGetSettingChooseShowIconOnly(false);
        }
    };
    return (
        <nav className={isShowSideBarRes ? "sidebar sidebar-offcanvas active" : "sidebar sidebar-offcanvas"} id="sidebar">
            <ul className="nav">
                <li className="nav-item" >
                    {state.authentication === 'CEO' || state.authentication === 'MANAGEMENT' ?
                        <NavLink to="/" className="nav-link">
                            <i className="icon-grid menu-icon" />
                            <span className="menu-title">Dashboard</span>
                        </NavLink>
                        :
                        <p to="/" className="nav-link">
                            <i className="icon-grid menu-icon" />
                            <span className="menu-title">Dashboard</span>
                        </p>}
                </li>
                <li className="nav-item" onClick={() => handleSetActive(1)}>
                    
                    <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={products} aria-controls="products-elements">
                        <i className="mdi mdi-laptop menu-icon" />
                        <span className="menu-title">Products</span>
                        <i className="menu-arrow" />
                    </NavLink>
                    <div className={products ? "collapse show" : "collapse"} id="products-elements">
                        <ul className="nav flex-column sub-menu" style={{ padding: "0.25rem 0 0.75rem 1.25rem" }}>
                            <li className="nav-item"><NavLink to="/laptop" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1_5068_8551" fill="currentcolor">
                                        <path d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z"></path>
                                    </mask>
                                    <path d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z" fill="currentcolor"></path>
                                    <path d="M1 12L19 12" stroke="currentcolor" strokeLinecap="round"></path>
                                </svg>
                                Laptop
                            </NavLink>
                            </li>
                            <li className="nav-item"><NavLink to="/laptop-gaming" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1_5068_8558" fill="white">
                                        <path d="M3.96432 4C3.41203 4 2.96432 4.44772 2.96432 5V11.5C2.96432 12.0523 3.41203 12.5 3.96432 12.5H15.9643C16.5166 12.5 16.9643 12.0523 16.9643 11.5V4H3.96432ZM3.66432 3H9.96432H16.2643C16.7417 3 17.1995 3.18437 17.5371 3.51256C17.8747 3.84075 18.0643 4.28587 18.0643 4.75V11.75C18.0643 12.2141 17.8747 12.6592 17.5371 12.9874C17.1995 13.3156 16.7417 13.5 16.2643 13.5H3.66432C3.18693 13.5 2.72909 13.3156 2.39153 12.9874C2.05396 12.6592 1.86432 12.2141 1.86432 11.75V4.75C1.86432 4.28587 2.05396 3.84075 2.39153 3.51256C2.72909 3.18437 3.18693 3 3.66432 3Z"></path>
                                    </mask>
                                    <path d="M3.96432 4C3.41203 4 2.96432 4.44772 2.96432 5V11.5C2.96432 12.0523 3.41203 12.5 3.96432 12.5H15.9643C16.5166 12.5 16.9643 12.0523 16.9643 11.5V4H3.96432ZM3.66432 3H9.96432H16.2643C16.7417 3 17.1995 3.18437 17.5371 3.51256C17.8747 3.84075 18.0643 4.28587 18.0643 4.75V11.75C18.0643 12.2141 17.8747 12.6592 17.5371 12.9874C17.1995 13.3156 16.7417 13.5 16.2643 13.5H3.66432C3.18693 13.5 2.72909 13.3156 2.39153 12.9874C2.05396 12.6592 1.86432 12.2141 1.86432 11.75V4.75C1.86432 4.28587 2.05396 3.84075 2.39153 3.51256C2.72909 3.18437 3.18693 3 3.66432 3Z" fill="currentcolor"></path>
                                    <path d="M0.964294 15L18.9643 15" stroke="currentcolor" strokeLinecap="round"></path>
                                    <path d="M10.9754 1.87868C11.5771 1.31607 12.3931 1 13.244 1H17.8274C18.2487 1 18.6659 1.0776 19.0551 1.22836C19.4444 1.37913 19.7981 1.6001 20.096 1.87868C20.3939 2.15726 20.6303 2.48797 20.7915 2.85195C20.9527 3.21593 21.0357 3.60603 21.0357 4C21.0357 4.39397 20.9527 4.78407 20.7915 5.14805C20.6303 5.51203 20.3939 5.84274 20.096 6.12132C19.7981 6.3999 19.4444 6.62087 19.0551 6.77164C18.6659 6.9224 18.2487 7 17.8274 7H13.244C12.3931 7 11.5771 6.68393 10.9754 6.12132C10.3737 5.55871 10.0357 4.79565 10.0357 4C10.0357 3.20435 10.3737 2.44129 10.9754 1.87868Z" fill="white" stroke="white" strokeWidth="2"></path>
                                    <path d="M10.9754 1.87868C11.5771 1.31607 12.3931 1 13.244 1H17.8274C18.2487 1 18.6659 1.0776 19.0551 1.22836C19.4444 1.37913 19.7981 1.6001 20.096 1.87868C20.3939 2.15726 20.6303 2.48797 20.7915 2.85195C20.9527 3.21593 21.0357 3.60603 21.0357 4C21.0357 4.39397 20.9527 4.78407 20.7915 5.14805C20.6303 5.51203 20.3939 5.84274 20.096 6.12132C19.7981 6.3999 19.4444 6.62087 19.0551 6.77164C18.6659 6.9224 18.2487 7 17.8274 7H13.244C12.3931 7 11.5771 6.68393 10.9754 6.12132C10.3737 5.55871 10.0357 4.79565 10.0357 4C10.0357 3.20435 10.3737 2.44129 10.9754 1.87868Z" stroke="currentcolor"></path>
                                    <path d="M17.625 3.79696C17.5852 3.75567 17.5379 3.72292 17.486 3.70056C17.434 3.67821 17.3782 3.66669 17.322 3.66667C17.2657 3.66665 17.2099 3.67813 17.1579 3.70044C17.1059 3.72276 17.0587 3.75548 17.0189 3.79674C16.9791 3.83799 16.9475 3.88698 16.9259 3.94089C16.9044 3.9948 16.8933 4.05259 16.8932 4.11096C16.8932 4.16932 16.9043 4.22712 16.9258 4.28105C16.9473 4.33498 16.9789 4.38399 17.0187 4.42527C17.099 4.50865 17.208 4.55552 17.3217 4.55556C17.4353 4.5556 17.5443 4.50882 17.6247 4.4255C17.7051 4.34218 17.7503 4.22915 17.7504 4.11127C17.7504 3.9934 17.7053 3.88034 17.625 3.79696Z" fill="currentcolor"></path>
                                    <path d="M17.871 2.91345C17.9105 2.87101 17.9578 2.83715 18.0101 2.81385C18.0624 2.79056 18.1186 2.7783 18.1755 2.77779C18.2324 2.77727 18.2888 2.78852 18.3415 2.81087C18.3942 2.83321 18.442 2.86622 18.4823 2.90795C18.5225 2.94968 18.5543 2.9993 18.5759 3.05392C18.5974 3.10854 18.6083 3.16706 18.6078 3.22608C18.6073 3.28509 18.5955 3.34341 18.573 3.39763C18.5505 3.45186 18.5179 3.5009 18.477 3.5419C18.3961 3.62286 18.2879 3.66766 18.1755 3.66664C18.0631 3.66563 17.9556 3.61889 17.8762 3.53648C17.7967 3.45408 17.7516 3.34261 17.7507 3.22608C17.7497 3.10955 17.7929 2.99728 17.871 2.91345Z" fill="currentcolor"></path>
                                    <path d="M19.343 3.80236C19.3034 3.75991 19.2561 3.72605 19.2039 3.70275C19.1516 3.67946 19.0953 3.6672 19.0384 3.66669C18.9815 3.66618 18.9251 3.67742 18.8724 3.69977C18.8197 3.72212 18.7719 3.75512 18.7317 3.79685C18.6914 3.83858 18.6596 3.8882 18.638 3.94282C18.6165 3.99744 18.6056 4.05597 18.6061 4.11498C18.6066 4.17399 18.6185 4.23231 18.6409 4.28654C18.6634 4.34076 18.696 4.3898 18.737 4.4308C18.8178 4.51176 18.9261 4.55656 19.0384 4.55554C19.1508 4.55453 19.2583 4.50779 19.3377 4.42539C19.4172 4.34298 19.4623 4.23151 19.4633 4.11498C19.4642 3.99845 19.421 3.88618 19.343 3.80236Z" fill="currentcolor"></path>
                                    <path d="M17.8763 4.68562C17.9161 4.64436 17.9634 4.61164 18.0154 4.58933C18.0674 4.56701 18.1231 4.55554 18.1794 4.55556C18.2357 4.55558 18.2914 4.56709 18.3434 4.58945C18.3954 4.6118 18.4426 4.64456 18.4824 4.68584C18.5222 4.72713 18.5537 4.77614 18.5752 4.83007C18.5968 4.884 18.6078 4.94179 18.6078 5.00016C18.6078 5.05852 18.5967 5.11631 18.5751 5.17023C18.5536 5.22414 18.522 5.27313 18.4822 5.31438C18.4018 5.3977 18.2927 5.44449 18.1791 5.44445C18.0654 5.4444 17.9564 5.39754 17.8761 5.31416C17.7957 5.23078 17.7506 5.11772 17.7507 4.99984C17.7507 4.88197 17.7959 4.76894 17.8763 4.68562Z" fill="currentcolor"></path>
                                    <path d="M12.6058 4.55555H11.7487V3.66666H12.6058V2.77777H13.463V3.66666H14.3201V4.55555H13.463V5.44444H12.6058V4.55555Z" fill="currentcolor"></path>
                                </svg>
                                Laptop Gaming
                            </NavLink>
                            </li>

                            <li className="nav-item"><NavLink to="/pc-gaming" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="19" width="18" height="10" rx="1" transform="rotate(-90 1 19)" stroke="currentcolor"></rect>
                                    <path d="M13 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H13" stroke="currentcolor"></path>
                                    <path d="M16.5 18.5C16.7761 18.5 17 18.2761 17 18C17 17.7239 16.7761 17.5 16.5 17.5V18.5ZM13 18.5H16.5V17.5H13V18.5Z" fill="currentcolor"></path>
                                    <circle cx="6" cy="5" r="1" fill="currentcolor"></circle>
                                    <circle cx="6" cy="9" r="1" fill="currentcolor"></circle>
                                </svg>
                                PC Gaming
                            </NavLink>
                            </li>
                            <li className="nav-item"><NavLink to="/pc-creator" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="19" width="18" height="10" rx="1" transform="rotate(-90 1 19)" stroke="currentcolor"></rect>
                                    <path d="M13 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H13" stroke="currentcolor"></path>
                                    <path d="M16.5 18.5C16.7761 18.5 17 18.2761 17 18C17 17.7239 16.7761 17.5 16.5 17.5V18.5ZM13 18.5H16.5V17.5H13V18.5Z" fill="currentcolor"></path>
                                    <circle cx="6" cy="5" r="1" fill="currentcolor"></circle>
                                    <circle cx="6" cy="9" r="1" fill="currentcolor"></circle>
                                </svg>
                                PC Creator
                            </NavLink>
                            </li>
                            <li className="nav-item"><NavLink to="/pc-company" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="19" width="18" height="10" rx="1" transform="rotate(-90 1 19)" stroke="currentcolor"></rect>
                                    <path d="M13 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H13" stroke="currentcolor"></path>
                                    <path d="M16.5 18.5C16.7761 18.5 17 18.2761 17 18C17 17.7239 16.7761 17.5 16.5 17.5V18.5ZM13 18.5H16.5V17.5H13V18.5Z" fill="currentcolor"></path>
                                    <circle cx="6" cy="5" r="1" fill="currentcolor"></circle>
                                    <circle cx="6" cy="9" r="1" fill="currentcolor"></circle>
                                </svg>
                                PC Company
                            </NavLink>
                            </li>
                            <li className="nav-item"><NavLink to="/apple" className="nav-link" style={{ listStyleType: "none" }} >
                                <svg width="18" height="18" style={{ marginRight: "10px" }} viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.0964 8.76235C11.9359 9.46803 11.3612 10.4251 11.3687 11.6949C11.3687 11.7601 11.2478 13.8101 13.5 14.8733C13.0797 16.1469 11.6365 18.9752 9.95708 18.9994C8.98627 18.9994 8.41717 18.3812 7.31803 18.3812C6.18541 18.3812 5.56981 18.9789 4.69943 18.9994C3.03491 19.0497 1.4392 15.9383 0.996566 14.6685C0.665522 13.704 0.5 12.7674 0.5 11.8606C0.5 8.79214 2.54764 7.28395 4.47439 7.25416C5.40801 7.25416 6.59456 7.93564 7.11345 7.93564C7.60443 7.93564 8.94535 7.12382 10.171 7.22065C11.4654 7.31933 12.4474 7.83137 13.0964 8.76235Z" stroke="currentcolor"></path>
                                    <path d="M11.0011 1.00838C11.0296 1.38214 11.1068 2.39558 10.171 3.50806C9.49399 4.29939 8.67196 4.76302 7.77182 4.69413C7.69557 3.73894 8.05079 2.89175 8.65522 2.20655C9.20386 1.5679 10.1672 1.04841 11.0004 1L11.0011 1.00838Z" stroke="currentcolor"></path>
                                </svg>
                                Apple
                            </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item" onClick={() => handleSetActive(2)}>
                    <a href className="nav-link" data-toggle="collapse" aria-expanded={orders} aria-controls="users">
                        <i className="mdi mdi-cart menu-icon" />
                        <span className="menu-title">Orders</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className={orders ? "collapse show" : "collapse"} id="users">
                        <ul className="nav flex-column sub-menu" style={{ padding: "0.25rem 0 0.75rem 1.25rem" }}>
                            <li className="nav-item"> <NavLink to="/orders" className="nav-link" ><i className="mdi mdi-table" style={{ fontSize: "18px", marginRight: "10px" }} />Orders</NavLink></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item" onClick={() => handleSetActive(3)}>
                    <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={users} aria-controls="icons">
                        <i className="mdi mdi-account menu-icon" />
                        <span className="menu-title">User</span>
                        <i className="menu-arrow" />
                    </NavLink>
                    <div className={users ? "collapse show" : "collapse"} id="icons">
                        <ul className="nav flex-column sub-menu" style={{ padding: "0.25rem 0 0.75rem 1.25rem" }}>
                            <li className="nav-item"> <NavLink to="/users" className="nav-link"><i className="mdi mdi-table" style={{ fontSize: "18px", marginRight: "10px" }} />Users</NavLink></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item" onClick={() => handleSetActive(4)}>
                    <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={employee} aria-controls="icons">
                        <i className="mdi mdi-account-box menu-icon" />
                        <span className="menu-title">Employee</span>
                        <i className="menu-arrow" />
                    </NavLink>
                    <div className={employee ? "collapse show" : "collapse"} id="icons">
                        <ul className="nav flex-column sub-menu" style={{ padding: "0.25rem 0 0.75rem 1.25rem" }}>
                            <li className="nav-item"> <NavLink to="/employee" className="nav-link"><i className="mdi mdi-table" style={{ fontSize: "18px", marginRight: "10px" }} />Employees</NavLink></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item" onClick={() => handleSetActive(5)}>
                    <NavLink to={null} className="nav-link" data-toggle="collapse" aria-expanded={discount} aria-controls="error">
                        <i className="mdi mdi-division menu-icon" />
                        <span className="menu-title">Discount</span>
                        <i className="menu-arrow" />
                    </NavLink>
                    <div className={discount ? "collapse show" : "collapse"} id="error">
                        <ul className="nav flex-column sub-menu" style={{ padding: "0.25rem 0 0.75rem 1.25rem" }}>
                            <li className="nav-item"> <NavLink to="/discount" className="nav-link"><i className="mdi mdi-table" style={{ fontSize: "18px", marginRight: "10px" }} />Discount</NavLink></li>
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
