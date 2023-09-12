import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Footer from "components/Footer"

const Index = () => {
    const navigate = useNavigate()
    const [optionSelectLaptop, setOptionSelectLaptop] = useState(["ASUS", "ACER", "MSI", "LENOVO", "HP", "DELL", "GIGABYTE", "LG", "HUAWEI"])
    const [product, setProduct] = useState([
        {
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
            quantity: 0,
            category: [
                "1",
                "2",
                "3"
            ],
            sold: 12,
            view: 42,
            type:"headphone"
        },
        {
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
            quantity: 5,
            category: [
                "1",
                "2",
                "3"
            ],
            sold: 12,
            view: 42,
            type:"speaker"
        },
        {
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
            view: 42,
            type:"speaker"
        }
    ])
    const [optionSelected, setOptionSelected] = useState("")
    const handleOptionSelected = (e) => {
        if (e.target.value !== null) {
            setOptionSelected(e.target.value)
        }
    }

    const handleOpenSelectToggle = () => {
        Swal.fire({
            title: 'Bạn muốn tạo mới sản phẩm loại nào?',
            html:(
                '<button id="toggleSpeaker" className="btn btn-primary" style="margin-right:10px"> ' +
                'Loa' +
                '</button>' +
                '<button id="toggleHeadPhone" className="btn btn-primary" style="margin-left:10px">' +
                'Tai Nghe' +
                '</button>'),
            showConfirmButton: false,
            didOpen: () => {
                const content = Swal.getHtmlContainer()
                const $ = content.querySelector.bind(content)
                const toggleSpeaker = $('#toggleSpeaker')
                toggleSpeaker.addEventListener('click', () => {
                    navigate("/speaker/create")
                    Swal.close();
                })
                const toggleHeadPhone = $('#toggleHeadPhone')
                toggleHeadPhone.addEventListener('click', () => {
                    navigate("/headphone/create")
                    Swal.close();
                })
            },
        });
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Danh sách sản phẩm Loa - Tai Nghe</h4>
                                <a onClick={handleOpenSelectToggle} className="card-description" style={{ textDecoration: "none" }}>
                                    <code><i className="mdi mdi-plus-circle-outline" />  Thêm sản phẩm mới</code>
                                </a>
                                <div className='row' style={{ display: "flex", "justifyContent": "flex-end" }}>
                                    <div className='col-lg-2' style={{ display: "flex", "flexDirection": "row", "alignItems": "center", "paddingBottom": "15px", "justifyContent": "end" }}>
                                        <p className="card-description" style={{ margin: "0" }}>
                                            Tìm kiếm sản phẩm:
                                        </p>
                                    </div>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <input style={{ borderRadius: "15px" }} type="text" className="form-control" placeholder="Tên sản phẩm" aria-label="Giá chính" />
                                    </ul>
                                    <ul className="col-lg-3 navbar-nav" style={{ "paddingBottom": "15px", "paddingLeft": "15px" }}>
                                        <li className="nav-item nav-search d-lg-block">
                                            <div className="input-group">
                                                <select style={{ borderRadius: "15px" }} onChange={handleOptionSelected} type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                                    <option value={null}>Chọn danh mục</option>\
                                                    {optionSelectLaptop.map((item, index) => {
                                                        return <option key={index} value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Danh mục</th>
                                                <th>Số lượng</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nameProduct}</td>
                                                    <td>
                                                        {item.category}
                                                    </td>
                                                    <td>
                                                        {item.quantity}
                                                    </td>
                                                    <td>

                                                        <label className={
                                                            item.quantity === 0 ? "badge badge-danger" : item.quantity >= 10 ? "badge badge-success" : 0 < item.quantity < 10 ? "badge badge-warning" : null
                                                        }>
                                                            {item.quantity === 0 ? "Hết hàng" : item.quantity >= 10 ? "Còn hàng" : 0 < item.quantity < 10 ? "Sắp hết" : null}
                                                        </label>

                                                    </td>
                                                    <td>
                                                        <NavLink to={"/" + item.type + "/" + item.src} ><button type="button" className="btn btn-outline-secondary btn-fw">Xem</button></NavLink>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-group" style={{ "display": "flex", "justify-content": "center", "width": "fit-content", "margin": "auto" }} role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-secondary active">1</button>
                                    <button type="button" className="btn btn-outline-secondary">2</button>
                                    <button type="button" className="btn btn-outline-secondary">...</button>
                                    <button type="button" className="btn btn-outline-secondary">5</button>
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
