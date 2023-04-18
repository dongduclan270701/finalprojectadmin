import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import UpdateForm from 'components/Utils/Update-Form'

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
            ["", ""]
        ],
        quantity: 12,
        category: [
            "1",
            "2",
            "3",
        ],
        sold: 12,
        view: 42
    })
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

    const hanldGetData = (data) => {
        setInputElement(data)
    }
    console.log(inputElement)
    const handleSubmitUpdated = () => {
        Swal.fire({
            title: 'Lưu thành công!',
            text: 'Bạn đã chỉnh sửa thành công thông tin sản phẩm',
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Tai Nghe</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Lưu</button>
                </div>
                <UpdateForm inputElement={inputElement} options={options} hanldGetData={hanldGetData}/>
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
