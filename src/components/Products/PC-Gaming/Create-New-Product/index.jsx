import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import CreateForm from 'components/Utils/Create-Form'
import Footer from "components/Footer"

const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        img: [],
        src: "",
        gift: [""],
        gift_buy: [""],
        nameProduct: "",
        realPrice: 0,
        nowPrice: 0,
        percent: 0,
        description_table: [
            ["", ""]
        ],
        description: [
            ["", ""]
        ],
        quantity: 0,
        category: [],
        sold: 0,
        view: 0
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
    const handleGetData = (data) => {
        setInputElement(data)
    }
    const handleSubmitUpdated = () => {
        Swal.fire({
            title: 'Tạo sản phẩm thành công!',
            text: 'Bạn đã tạo mới thành công thông tin sản phẩm',
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Tạo mới thông tin chi tiết sản phẩm PC Gaming</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Tạo</button>
                </div>
                <CreateForm inputElement={inputElement} options={options} handleGetData={handleGetData}/>
            </div>
            <Footer />
        </div>
    );
}

export default Index;
