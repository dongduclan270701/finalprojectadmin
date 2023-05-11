import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import UpdateForm from 'components/Utils/Update-Form'
import { uploadUrl, apiKey } from 'Apis/utils'
import { fetchUpdateLaptopCollecting, fetchLaptopCollectingByName, fetchCollectingByName } from 'Apis'
import axios from 'axios'

const Index = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [inputElement, setInputElement] = useState()
    const [listImage, setListImage] = useState([])
    const [options, setOptions] = useState([])
    // useEffect(() => {
    //     inputElement.category.map((item) => {
    //         setOptions(options => [...options, { label: item, value: item }])
    //     })
    // }, []);
    useEffect(() => {
        fetchLaptopCollectingByName(params.src)
            .then(result => {
                setInputElement(result)
                result.category.map((item) => {
                    setOptions(options => [...options, { label: item, value: item }])
                })
            })
            .catch(error => {
                console.log(error)
            })
        fetchCollectingByName("Laptop")
            .then(result => {
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
    // console.log(inputElement)
    const handleSubmitUpdated = () => {
        if (listImage.length === 0) {
            const { _id, ...newData } = inputElement;
            fetchUpdateLaptopCollecting(params.src, newData)
                .then(result => {
                    console.log(result)
                    Swal.fire({
                        title: 'Cập nhật sản phẩm thành công!',
                        text: 'Bạn đã cập nhật thành công thông tin sản phẩm',
                        icon: 'success',
                        confirmButtonText: 'OK!'
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
        else {
            const formData = new FormData();
            inputElement.img.splice(0, inputElement.img.length)
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
                        console.log(inputElement.img)
                        if (i === listImage.length - 1) {
                            const { _id, ...newData } = inputElement;
                            //Post axios
                            fetchUpdateLaptopCollecting(params.src, newData)
                                .then(result => {
                                    Swal.fire({
                                        title: 'Cập nhật sản phẩm thành công!',
                                        text: 'Bạn đã cập nhật thành công thông tin sản phẩm',
                                        icon: 'success',
                                        confirmButtonText: 'OK!'
                                    })
                                    setInputElement(inputElement)
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
            Swal.fire({
                title: 'Lưu thành công!',
                text: 'Bạn đã chỉnh sửa thành công thông tin sản phẩm',
                icon: 'success',
            })
        }
    }
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Quay lại</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Thông tin chi tiết sản phẩm Laptop</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Lưu</button>
                </div>
                {inputElement ?
                    <UpdateForm inputElement={inputElement} hanldGetImage={hanldGetImage} options={options} hanldGetData={hanldGetData} />
                    :
                    <>
                        <style dangerouslySetInnerHTML={{
                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                        }} />
                        <div className="loader" />
                    </>}

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
