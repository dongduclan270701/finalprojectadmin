import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import CreateForm from 'components/Utils/Create-Form'
import axios from 'axios'
import { uploadUrl, apiKey } from 'Apis/utils'
import { fetchCreateLaptopCollecting, fetchCollectingByName } from 'Apis'

const Index = () => {
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState({
        img: [],
        src: "",
        gift: [""],
        gift_buy: [""],
        percent: 0,
        quantity: 0,
        nameProduct: "",
        realPrice: 0,
        nowPrice: 0,
        description_table: [
            ["", ""]
        ],
        description: [
            ["", ""]
        ],
        category: [],
    })

    const [listImage, setListImage] = useState()

    const [options, setOptions] = useState([])
    useEffect(() => {
        fetchCollectingByName("Laptop")
            .then(result => {
                console.log(result.category)
                // setCollecting(result.category)
                result.category.map((item, index) => {
                    if (item.name === "Brand Name" ) {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    }
                    if (item.name === "Brand Name" ) {
                        item.collecting.map((item, index) => {
                            const categoryInCollecting = item.category.map((i, index) => {
                                
                                return { label: i.name, value: i.name }
                            })
                            setOptions(options => [...options, ...categoryInCollecting])
                            return categoryInCollecting
                        })
                        
                    }
                    if (item.name === "Laptop needs" || item.name === "Laptop Components & Accessories") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    }
                    else if (item.name === "Laptop by price") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    } else if (item.name === "Laptop by CPU") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    const hanldGetData = (data) => {
        setInputElement(data)

    }
    const hanldGetImage = (files) => {
        setListImage(files)
    }
    const handleSubmitCreate = () => {
        const formData = new FormData();
        if (!inputElement.img || !inputElement.src || !inputElement.gift || !inputElement.gift_buy || !inputElement.nameProduct || !inputElement.description_table || !inputElement.description || !inputElement.category) {

            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Bạn chưa nhập đủ thông tin sản phẩm, vui lòng thử lại!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        }
        else {
            for (let i = 0; i < listImage.length; i++) {
                formData.append('file', listImage[i]);
                formData.append('upload_preset', apiKey);
                axios.post(uploadUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        inputElement.img.push(response.data.secure_url);
                        if (i === listImage.length - 1) {
                            //Post axios
                            fetchCreateLaptopCollecting(inputElement)
                                .then(result => {
                                    Swal.fire({
                                        title: 'Tạo sản phẩm thành công!',
                                        text: 'Bạn đã tạo mới thành công thông tin sản phẩm',
                                        icon: 'success',
                                        confirmButtonText: 'OK!'
                                    })
                                    setInputElement({
                                        img: [],
                                        src: "",
                                        gift: [""],
                                        gift_buy: [""],
                                        percent: 0,
                                        quantity: 0,
                                        nameProduct: "",
                                        realPrice: 0,
                                        nowPrice: 0,
                                        sold: 0,
                                        view: 0,
                                        description_table: [
                                            ["", ""]
                                        ],
                                        description: [
                                            ["", ""]
                                        ],
                                        category: [],
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    Swal.fire({
                                        title: 'Tạo sản phẩm thất bại!',
                                        text: 'Bạn tạo mới sản phẩm thất bại',
                                        icon: 'error',
                                        confirmButtonText: 'OK!'
                                    })
                                })

                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Tạo mới thông tin chi tiết sản phẩm Laptop</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitCreate} className="col-lg-2 btn btn-outline-secondary btn-fw">Tạo</button>
                </div>
                <CreateForm inputElement={inputElement} options={options} hanldGetImage={hanldGetImage} hanldGetData={hanldGetData} />
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
