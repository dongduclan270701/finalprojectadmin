import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from 'assets/images/faces/face1.jpg'
import Footer from "components/Footer"
const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        img: [],
        src: "1",
        gift: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
        gift_buy: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
        nameProduct: "1",
        realPrice: 123,
        nowPrice: 123123,
        percent: 23,
        description_table: [
            ["CPU", "Itel 13th"],
            ["RAM", "16GB"],
            ["Storage", '512GB'],
        ],
        description: [
            ["Đánh giá chi tiết laptop Asus Vivobook 15 X515EA BR2045W", "Asus Vivobook 15 X515EA BR2045W là chiếc laptop giá rẻ phù hợp cho việc học tập và làm việc hằng ngày. Cấu hình ổn định, thiết kế hoàn thiện hứa hẹn sẽ mang đến những trải nghiệm phù hợp với người dùng."]
        ],
        quantity: 12,
        category: [
            "1",
            "2",
            "3"
        ],
        sold: 12,
        view: 42
    },)
    const [options, setOptions] = useState([
        {
            label: 'Angular',
            value: 'Angular',
        },
        {
            label: 'Bootstrap',
            value: 'Bootstrap',
        },
        {
            label: 'React.js',
            value: 'React.js',
        },
        {
            label: 'Vue.js',
            value: 'Vue.js',
        },
        {
            label: 'Vue.js1',
            value: 'Vue.js1',
        },
        {
            label: 'Vue.js2',
            value: 'Vue.js2',
        },
        {
            label: 'Vue.js3',
            value: 'Vue.js3',
        },
    ])
    useEffect(() => {
        inputElement.category.map((item) => {
            setOptions(options => [...options, { label: item, value: item }])
        })
    }, []);
    
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Internet</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/internet/update/1"}>Chỉnh sửa</NavLink>
                </div>

                <div className="row">
                    <div className="col-lg-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <div className="col-sm-12 col-xs-12 ">
                                    <Carousel>
                                        <img src={logo} alt=''/>
                                        <img src={logo} alt=''/>
                                        <img src={logo} alt=''/>
                                        <img src={logo} alt=''/>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="card" style={{ "marginBottom": "25px" }}>
                            <div className="card-body">
                                <h4 className="card-title">Thông tin sản phẩm</h4>
                                <div className="form-group">
                                    <label>Mã sản phẩm</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Mã sản phẩm" aria-label="Mã sản phẩm" value={inputElement.src} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" value={inputElement.nameProduct} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Giá chính</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Giá chính" aria-label="Giá chính" value={inputElement.realPrice} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Giá giảm</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Giá giảm" aria-label="Giá giảm" value={inputElement.nowPrice} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Phần trăm giảm giá</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Phần trăm giảm giá" aria-label="Phần trăm giảm giá" value={inputElement.percent} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Số lượng</label>
                                    <input type="number" className="form-control form-control-sm" placeholder="Số lượng" aria-label="Số lượng" value={inputElement.quantity} disabled />
                                </div>
                                <div className='row' style={{ paddingTop: "0" }}>
                                    <div className="col-6 form-group">
                                        <label>Đã bán</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Đã bán" aria-label="Đã bán" value={inputElement.sold} disabled />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label>Lượt xem</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Lượt xem" aria-label="Lượt xem" value={inputElement.view} disabled />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Danh mục</label>
                                    <Select value={inputElement.category.map((item) => ({ value: item, label: item }))} components={makeAnimated()} isMulti placeholder="Chọn danh mục" isDisabled={true}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Thông số sản phẩm</h4>
                                    {inputElement.description_table.map((item, index) => {
                                        return <div className="form-group" key={index}>
                                            <label>{item[0]}</label>
                                            <input type="text" className="form-control form-control-sm" placeholder={item[0]} aria-label={item[0]} value={item[1]} disabled />
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Mô tả sản phẩm</h4>
                                    <div className='row' style={{ margin: "inherit" }}>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <label>Tiêu đề:</label>
                                        </div>
                                        <div className='col-6' style={{ padding: "0" }}>
                                            <label>Nội dung:</label>
                                        </div>
                                    </div>
                                    {inputElement.description.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='NameDescription' type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} disabled />
                                            </div>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='ContentDescription' type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} disabled />
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Ưu đãi</label>
                                        {inputElement.gift_buy.map((item, index) => {
                                            return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Quà tặng" aria-label="Quà tặng" disabled />
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Quà tặng</h4>
                                    <div className="form-group">
                                        <label>Quà tặng</label>
                                        {inputElement.gift.map((item, index) => {
                                            return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Quà tặng" aria-label="Quà tặng" disabled />
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
