import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Index = () => {
    const navigate = useNavigate()
    const [optionSelectLaptop, setOptionSelectLaptop] = useState(["ASUS", "ACER", "MSI", "LENOVO", "HP", "DELL", "GIGABYTE", "LG", "HUAWEI"])
    const [product, setProduct] = useState([
        {
            img: [],
            src: "1",
            gift: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
            offer_buy: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
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
            type:"tabpad"
        },
        {
            img: [],
            src: "1",
            gift: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
            offer_buy: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
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
            type:"mouse"
        },
        {
            img: [],
            src: "1",
            gift: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
            offer_buy: ["Quà 1", "Quà 2", "Quà 3", "Quà 4"],
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
            type:"mouse"
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
                '<button id="toggleMouse" class="btn btn-primary" style="margin-right:10px"> ' +
                'Mouse' +
                '</button>' +
                '<button id="toggleTabpad" class="btn btn-primary" style="margin-left:10px">' +
                'Lót Chuột' +
                '</button>'),
            showConfirmButton: false,
            didOpen: () => {
                const content = Swal.getHtmlContainer()
                const $ = content.querySelector.bind(content)
                const toggleMouse = $('#toggleMouse')
                toggleMouse.addEventListener('click', () => {
                    navigate("/mouse/create")
                    Swal.close();
                })
                const toggleTabpad = $('#toggleTabpad')
                toggleTabpad.addEventListener('click', () => {
                    navigate("/tabpad/create")
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
                                <h4 className="card-title">Danh sách sản phẩm Chuột - Lót Chuột</h4>
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
            {/* content-wrapper ends */}
            {/* partial:../../partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <i className="ti-heart text-danger ml-1" /></span>
                </div>
            </footer>
            {/* partial */}
        </div>
    );
}

export default Index;
