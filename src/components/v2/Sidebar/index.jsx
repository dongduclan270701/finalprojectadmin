import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import logoMini from 'assets/images/logo-brand1.png'
import 'assets/scss/v2/sidebar.scss'
import faceUser from "assets/images/signature.png"
import {
    fetchNotice,
    fetchUpdateNotice,
    fetchListOfAppleCollectingByName,
    fetchListOfLaptopCollectingByName,
    fetchListOfLaptopGamingCollectingByName,
    fetchListOfPcGamingCollectingByName,
    fetchListOfPcCompanyCollectingByName,
    fetchListOfPcCreatorCollectingByName,
    fetchOrderInformation,
} from 'Apis'
import { StateContext } from 'components/Context'
import Order from 'components/v2/Order/Order'
import Loading from 'components/v2/Loading'
import Product from 'components/v2/Product/Product'
const Index = () => {
    const state = useContext(StateContext)
    const [order, setOrder] = useState(null)
    const [isIcon, setIsIcon] = useState(false)
    const [listNotice, setListNotice] = useState(null)
    const [isShowOrder, setIsShowOrder] = useState(false)
    const [isInfoOrder, setIsInfoOrder] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [isInfoProduct, setIsInfoProduct] = useState(false)
    const [isShowProduct, setIsShowProduct] = useState(false)
    const [product, setProduct] = useState(null)
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [options, setOptions] = useState([])
    const [selectState, setSelectState] = useState({
        hasValue: false,
        isDisabled: false,
        isFocused: false
    });
    const [isMenu, setIsMenu] = useState(false)
    useEffect(() => {
        fetchNotice()
            .then(result => {
                result.sort((a, b) => {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);
                    return dateB - dateA;
                });
                setListNotice(result)
            })
            .catch(error => {

                console.log(error)
            })
    }, []);
    useEffect(() => {
        const noticeHover = document.querySelector('.notice-hover');
        const notificationList = document.querySelector('.notification-list');

        noticeHover.addEventListener('mouseenter', () => {
            notificationList.classList.add('show');
        });

        noticeHover.addEventListener('mouseleave', () => {
            notificationList.classList.remove('show');
        });

    }, []);
    const handleLogout = () => {
        localStorage.removeItem("auth-token-admin");
        window.location.reload();
    }
    const handleShowOrder = (orderId) => {
        setIsShowOrder(true)
        setIsInfoOrder(true)
        setSteps([
            "Ordered",
            "Payment information confirmed",
            "Delivered to the carrier",
            "Being transported",
            "Delivery successful",
        ])
        fetchOrderInformation(orderId)
            .then(result => {
                setOrder(result)
                if (result.status === "Cancel") {
                    setSteps([
                        "Ordered",
                        "Cancel"
                    ])
                    setCurrentStep(1)
                } else if (result.status === "Delivery failed") {
                    setSteps([
                        "Ordered",
                        "Payment information confirmed",
                        "Delivered to the carrier",
                        "Being transported",
                        "Delivery failed"
                    ])
                    setCurrentStep(4)
                }
                else if (result.status === 'Ordered') {
                    setCurrentStep(0)
                    setOptions([
                        {
                            label: 'Payment information confirmed',
                            value: 'Payment information confirmed',
                        },
                        {
                            label: 'Delivered to the carrier',
                            value: 'Delivered to the carrier',
                        },
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Payment information confirmed') {
                    setCurrentStep(1)
                    setOptions([
                        {
                            label: 'Delivered to the carrier',
                            value: 'Delivered to the carrier',
                        },
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Delivered to the carrier') {
                    setCurrentStep(2)
                    setOptions([
                        {
                            label: 'Being transported',
                            value: 'Being transported',
                        },
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Being transported') {
                    setCurrentStep(3)
                    setOptions([
                        {
                            label: 'Delivery successful',
                            value: 'Delivery successful',
                        }
                    ])
                }
                else if (result.status === 'Delivery successful') {
                    setCurrentStep(4)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
            stars.push(
                <i key={i} data-rating={i} className={starClass} style={{ color: '#dfe232', padding: '0 3px' }} />
            );
        }
        return stars;
    };
    const fetchListFunctionsMap = {
        'apple': fetchListOfAppleCollectingByName,
        'laptop': fetchListOfLaptopCollectingByName,
        'laptop-gaming': fetchListOfLaptopGamingCollectingByName,
        'pc-gaming': fetchListOfPcGamingCollectingByName,
        'pc-company': fetchListOfPcCompanyCollectingByName,
        'pc-creator': fetchListOfPcCreatorCollectingByName,
    };
    const handleShowProduct = (item, type) => {
        if (type === 'product') {
            setIsShowProduct(true)
        } else {
            setIsInfoProduct(true)
            setIsInfoOrder(false)
        }
        const fetchFunction = fetchListFunctionsMap[item.collection];
        if (fetchFunction) {
            fetchFunction(item.src)
                .then(result => {
                    setProduct(result)
                    result.category.length > 0 && setSelectState({
                        ...selectState,
                        hasValue: true
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const handleReadNotice = (id, isReadAdmin) => {
        if (!isReadAdmin) {
            fetchUpdateNotice({ id: id })
                .then(result => {
                    const updatedArray = listNotice.map(item => {
                        if (item._id === result._id) {

                            return { ...item, isReadAdmin: true };
                        }

                        return item;
                    });
                    setListNotice(updatedArray)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <>
            <div className={isIcon ? 'section-sidebar active' : 'section-sidebar'}>
                <div className='section-sidebar-logo'>
                    <img src={logoMini} alt='' />
                    <span className='section-sidebar-logo-title play-bold'>KTECH</span>
                    <div className="notification-container">
                        <label className="label-notification" onClick={() => setIsIcon(!isIcon)}><i className="fa-solid fa-less-than"></i></label>
                    </div>
                </div>
                <div className='section-sidebar-menu'>
                    <div className='section-sidebar-menu-content play-regular'>
                        <NavLink to="/v2" className="nav-link">
                            <i className="fa-solid fa-house"></i>
                            <span className="menu-title">Dashboard</span>
                        </NavLink>
                        <NavLink to="/v2/product" className="nav-link">
                            <i className="fa-solid fa-laptop"></i>
                            <span className="menu-title">Product</span>
                        </NavLink>
                        <NavLink to="/v2/order" className="nav-link">
                            <i className="fa-solid fa-file-lines"></i>
                            <span className="menu-title">Order</span>
                        </NavLink>
                        <NavLink to="/v2/user" className="nav-link">
                            <i className="fa-solid fa-users"></i>
                            <span className="menu-title">User</span>
                        </NavLink>
                        <NavLink to="/v2/employee" className="nav-link">
                            <i className="fa-solid fa-user-tie"></i>
                            <span className="menu-title">Employee</span>
                        </NavLink>
                        <NavLink to="/v2/discount" className="nav-link">
                            <i className="fa-solid fa-tag"></i>
                            <span className="menu-title">Discount</span>
                        </NavLink>
                        <NavLink to="/v2/ads" className="nav-link">
                            <i className="fa-solid fa-pager"></i>
                            <span className="menu-title">Ads</span>
                        </NavLink>
                    </div>
                </div>
                <div className='section-sidebar-control'>
                    <div className='section-sidebar-menu-content play-regular'>
                        <a className="notice-hover nav-link" href style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-bell"></i>
                            <span className='notification-container'>
                                <label className="label-notification">{listNotice ? listNotice.length : 0}</label>
                            </span>
                            <span className="menu-title">Notification</span>
                        </a>
                        <NavLink to="/v2" className="nav-link">
                            <i className="fa-solid fa-gear"></i>
                            <span className="menu-title">Setting</span>
                        </NavLink>
                        <NavLink to="/v2" className="nav-link">
                            <i className="fa-solid fa-circle-question"></i>
                            <span className="menu-title">Help</span>
                        </NavLink>
                    </div>
                </div>
                <div className='section-sidebar-infor'>
                    <div className='section-sidebar-infor-content play-regular'>
                        <div className='section-sidebar-infor-content-item'>
                            <img src={faceUser} alt='' />
                            <div className='section-sidebar-infor-item'>
                                <div className='section-sidebar-infor-item-name play-bold'>{state.authentication}</div>
                                <div className='section-sidebar-infor-item-role'>Administrator</div>
                            </div>
                        </div>
                        <button onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" style={{ color: 'rgb(238 84 84)' }}></i></button>
                    </div>
                </div>
            </div>
            <div className='container-header-mobile'>
                <div className='logo'>
                    <img src={logoMini} className='svg-logo' alt="Logo" />
                    <span className='section-sidebar-logo-title play-bold'>KTECH</span>
                </div>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center', paddingRight: 15 }}>
                    <div id="checkbox2" className={isMenu ? 'checked' : ''}></div>
                    <label class="toggle toggle2" for="checkbox2" onClick={() => { setIsMenu(!isMenu) }}>
                        <div id="bar4" class="bars"></div>
                        <div id="bar5" class="bars"></div>
                        <div id="bar6" class="bars"></div>
                    </label>
                </div>
            </div>
            <div className={isMenu ? 'section-nav-mobile-box active' : 'section-nav-mobile-box deactivate'} >
                <div className='section-nav-mobile'>
                <div className='section-sidebar-menu'>
                    <div className='section-sidebar-menu-content play-regular'>
                        <NavLink to="/v2" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-house"></i>
                            <span className="menu-title">Dashboard</span>
                        </NavLink>
                        <NavLink to="/v2/product" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-laptop"></i>
                            <span className="menu-title">Product</span>
                        </NavLink>
                        <NavLink to="/v2/order" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-file-lines"></i>
                            <span className="menu-title">Order</span>
                        </NavLink>
                        <NavLink to="/v2/user" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-users"></i>
                            <span className="menu-title">User</span>
                        </NavLink>
                        <NavLink to="/v2/employee" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-user-tie"></i>
                            <span className="menu-title">Employee</span>
                        </NavLink>
                        <NavLink to="/v2/discount" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-tag"></i>
                            <span className="menu-title">Discount</span>
                        </NavLink>
                        <NavLink to="/v2/ads" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-pager"></i>
                            <span className="menu-title">Ads</span>
                        </NavLink>
                    </div>
                </div>
                <div className='section-sidebar-control'>
                    <div className='section-sidebar-menu-content play-regular'>
                        <a className="notice-hover nav-link" href style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-bell"></i>
                            <span className='notification-container'>
                                <label className="label-notification">{listNotice ? listNotice.length : 0}</label>
                            </span>
                            <span className="menu-title">Notification</span>
                        </a>
                        <NavLink to="/v2" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-gear"></i>
                            <span className="menu-title">Setting</span>
                        </NavLink>
                        <NavLink to="/v2" onClick={() => setIsMenu(false)} className="nav-link">
                            <i className="fa-solid fa-circle-question"></i>
                            <span className="menu-title">Help</span>
                        </NavLink>
                    </div>
                </div>
                    <div className='section-sidebar-infor'>
                        <div className='section-sidebar-infor-content play-regular'>
                            <div className='section-sidebar-infor-content-item'>
                                <img src={faceUser} alt='' />
                                <div className='section-sidebar-infor-item'>
                                    <div className='section-sidebar-infor-item-name play-bold'>{state.authentication}</div>
                                    <div className='section-sidebar-infor-item-role'>Administrator</div>
                                </div>
                            </div>
                            <button onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" style={{ color: 'rgb(238 84 84)' }}></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="notification-list">
                {listNotice && listNotice.map((item, index) => {
                    return <NavLink key={index} onClick={() => (handleShowOrder(item.orderId), handleReadNotice(item._id, item.isReadAdmin))} style={{ textDecoration: 'none' }}>
                        <span className={item.isReadAdmin ? 'notification-list-content' : 'notification-list-content active-read'}>
                            <div className="preview-thumbnail">
                                <img src={item.product.img[0]} alt='' />
                            </div>
                            <div className="preview-item-content">
                                <span className="play-bold">{item.status}</span>
                                <p className="">
                                    {item.content}
                                </p>
                                <p className="">
                                    {item.time} {item.date}
                                </p>
                            </div>
                        </span>
                    </NavLink>
                })
                }
            </div>
            <div className='section-order' style={{ width: 'unset' }}>
                <div className={isShowOrder ? 'col-12 section-info-order active' : 'col-12 section-info-order'}>
                    <div className={isInfoOrder ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'><span>Information Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setOrder(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        {order ? <Order steps={steps} currentStep={currentStep} order={order} options={options} setIsReview={setIsReview} setIsInfoOrder={setIsInfoOrder} handleShowProduct={handleShowProduct} />
                            :
                            <Loading />
                        }
                    </div>
                    <div className={isReview ? 'second-form section-form-info-order show-review' : 'second-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'><i className='fa-solid fa-arrow-left' onClick={() => (setIsReview(false), setIsInfoOrder(true))} style={{ cursor: 'pointer', fontSize: 26 }} /><span>Review Goods Order</span><i className='fa-solid fa-xmark' onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setOrder(null), setIsReview(false), setProduct(null))} style={{ cursor: 'pointer', fontSize: 26 }} /></div>
                        {order ?
                            <div className='section-form-info-review-content'>
                                <div className='box-info-purchaser-review'>
                                    {order.statusReview.product.map((item, index) => {
                                        return <React.Fragment key={index}>
                                            <div className='info-product-review'>
                                                <div className='info-product-img'><img src={item.img} alt='' /></div>
                                                <div className='info-product-content'>
                                                    <div className='play-bold'>{item.nameProduct}</div>
                                                    <div>{renderStars(item.star)}</div>
                                                    <label className='play-bold'>Content rated: {item.content}</label>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    })}
                                </div>
                            </div>
                            :
                            <Loading />
                        }
                    </div>
                    <div className={isInfoProduct ? 'first-form section-form-info-order show-order' : 'first-form section-form-info-order'}>
                        <div className='section-form-info-order-title play-bold'>
                            <i
                                className='fa-solid fa-arrow-left'
                                onClick={() => (setIsInfoProduct(false), setIsInfoOrder(true), setProduct(null))}
                                style={{ cursor: 'pointer', fontSize: 26 }} />
                            <span>Information Product</span>
                            <i
                                className='fa-solid fa-xmark'
                                onClick={() => (setIsShowOrder(false), setIsInfoOrder(false), setIsInfoProduct(false), setOrder(null), setProduct(null))}
                                style={{ cursor: 'pointer', fontSize: 26 }} />
                        </div>
                        {product ?
                            <Product product={product} />
                            :
                            <Loading />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
