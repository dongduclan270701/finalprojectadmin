import React, { useState, useEffect } from 'react';
import Select from "react-select"
import { Carousel } from 'react-responsive-carousel';
import Swal from 'sweetalert2'
import { uploadUrlProduct, apiKeyProduct }
    from 'Apis/utils'
import axios from 'axios'
import {
    fetchUpdateAppleCollecting,
    fetchUpdateLaptopCollecting,
    fetchUpdateLaptopGamingCollecting,
    fetchUpdatePcCompanyCollecting,
    fetchUpdatePcCreatorCollecting,
    fetchUpdatePcGamingCollecting
} from 'Apis'
const Index = (props) => {
    const formatter = new Intl.NumberFormat('en-US')
    const { newProduct, product, options, handleGetData, collectingTable, handleGetUpdateProduct } = props
    const [selectStateEdit, setSelectStateEdit] = useState({
        hasValueEdit: false,
        isDisabledEdit: false,
        isFocusedEdit: false
    });
    const fetchListFunctionsMap = {
        Apple: fetchUpdateAppleCollecting,
        Laptop: fetchUpdateLaptopCollecting,
        'Laptop Gaming': fetchUpdateLaptopGamingCollecting,
        'Pc Gaming': fetchUpdatePcGamingCollecting,
        'Pc Company': fetchUpdatePcCompanyCollecting,
        'Pc Creator': fetchUpdatePcCreatorCollecting,
    };
    const [listImage, setListImage] = useState([])

    const handleSelectFocusEdit = () => {
        setSelectStateEdit({
            ...selectStateEdit,
            isFocusedEdit: true
        });
    };
    const handleSelectBlurEdit = () => {
        setSelectStateEdit({
            ...selectStateEdit,
            isFocusedEdit: false
        });
    };
    const { hasValueEdit, isDisabledEdit, isFocusedEdit } = selectStateEdit
    useEffect(() => {
        newProduct.category.length > 0 && setSelectStateEdit({
            ...selectStateEdit,
            hasValueEdit: true
        });

    }, [newProduct]);
    const handleSelectedOptionsChange = (selectedCategory) => {
        handleGetData(prevState => ({
            ...prevState,
            category: selectedCategory.map(option => option.value)
        }));
    }

    const handleGetImage = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const files = Array.from(e.target.files)
        const file = e.target.files;
        setListImage(file)
        if (files.length > 0) {
            handleGetData(newProduct => ({
                ...newProduct,
                img: [...fileArray]
            }));
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const handleChangeInput = (event, indexInput) => {
        const { name, value } = event.target
        if (name === "NameDescriptionTable" || name === "ContentDescriptionTable") {
            handleGetData(product => ({
                ...product,
                description_table: product.description_table.map((row, index) => {
                    if (index === indexInput) {
                        if (name === "NameDescriptionTable") {
                            return [value, row[1]]
                        }
                        if (name === "ContentDescriptionTable") {
                            return [row[0], value]
                        }
                    }
                    return row;
                })
            }));
        }
        else if (name === "NameDescription" || name === "ContentDescription") {
            handleGetData(product => ({
                ...product,
                description: product.description.map((row, index) => {
                    if (index === indexInput) {
                        if (name === "NameDescription") {
                            return [value, row[1]]
                        }
                        if (name === "ContentDescription") {
                            return [row[0], value]
                        }
                    }
                    return row;
                })
            }));
        }
        else if (name === "NameSpecifications" || name === "ContentSpecifications") {
            handleGetData(product => ({
                ...product,
                specifications: product.specifications.map((row, index) => {
                    if (index === indexInput) {
                        if (name === "NameSpecifications") {
                            return [value, row[1]]
                        }
                        if (name === "ContentSpecifications") {
                            return [row[0], value]
                        }
                    }
                    return row;
                })
            }));
        }
        else if (indexInput === null) {
            handleGetData(product => ({
                ...product,
                [name]: value
            }));
        }
        else if (indexInput === "nullNumber") {
            handleGetData(product => ({
                ...product,
                [name]: value === '' ? 0 : parseInt(value) * 1
            }));
        }
        else {
            handleGetData(product => ({
                ...product,
                [name]: product[name].map((row, index) => {
                    if (index === indexInput) {
                        return value
                    }
                    return row;
                })
            }));
        }
    }

    const handleRemoveDescriptionAndDescriptionTable = (name, removeIndex) => {
        const updatedDescription = newProduct[name].filter((item, index) => index !== removeIndex);
        handleGetData({ ...newProduct, [name]: updatedDescription });
    };
    const handleAddDescriptionAndDescriptionTable = (name) => {
        handleGetData(newProduct => ({
            ...newProduct,
            [name]: [...newProduct[name], ["", ""]]
        }));
    }
    const handleAdd = (name) => {
        handleGetData(newProduct => ({
            ...newProduct,
            [name]: [...newProduct[name], ""]
        }));
    }
    const handleRemove = (name, removeIndex) => {
        const updatedGift = newProduct[name].filter((item, index) => index !== removeIndex);
        handleGetData({ ...newProduct, [name]: updatedGift });
    };
    const showAlert = (title, text) => {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            confirmButtonText: 'OK!'
        });
    };
    const handleSubmitUpdated = () => {
        const fetchFunction = fetchListFunctionsMap[collectingTable];
        if (fetchFunction) {
            if (!newProduct.src) {
                showAlert('Wait!', 'You have not entered product product code, please try again!');
            } else if (newProduct.gift.length === 1 && newProduct.gift[0] === "") {
                showAlert('Wait!', 'You have not entered product gift, please try again!');
            } else if (newProduct.gift_buy.length === 1 && newProduct.gift_buy[0] === "") {
                showAlert('Wait!', 'You have not entered product offers, please try again!');
            } else if (!newProduct.nameProduct) {
                showAlert('Wait!', 'You have not entered product name, please try again!');
            } else if (newProduct.description_table.length === 1 && (newProduct.description_table[0][0] === "" || newProduct.description_table[0][1] === "")) {
                showAlert('Wait!', 'You have not entered product details, please try again!');
            } else if (newProduct.description.length === 1 && (newProduct.description[0][0] === "" || newProduct.description[0][1] === "")) {
                showAlert('Wait!', 'You have not entered product description, please try again!');
            } else if (newProduct.category.length === 0) {
                showAlert('Wait!', 'You have not entered product category, please try again!');
            } else if (newProduct.realPrice <= 0) {
                showAlert('Wait!', 'You have not entered product main price, please try again!');
            } else if (newProduct.nowPrice === 0) {
                showAlert('Wait!', 'You have not entered product reduced price, please try again!');
            } else if (newProduct.percent >= 100 || newProduct.percent < 0) {
                showAlert('Wait!', 'You have not entered product discount percent, please try again');
            } else if (newProduct.quantity < 0) {
                showAlert('Wait!', 'You have not entered product quantity, please try again!');
            } else if (newProduct.category[0] === '') {
                showAlert('Wait!', 'You have not entered product brand, please try again!');
            }
            else {
                Swal.fire({
                    title: 'Do you agree to add new product??',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Accept',
                    cancelButtonText: 'Decline',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Updating...',
                            html: 'Please wait...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        });
                        if (listImage.length === 0) {
                            const { _id, ...newData } = newProduct;
                            const updatedProduct = {
                                ...newData,
                                specifications: newData.specifications.filter(([key, value]) => key !== "" && value !== ""),
                                description: newData.description.filter(([key, value]) => key !== "" && value !== ""),
                                description_table: newData.description_table.filter(([key, value]) => key !== "" && value !== ""),
                                gift: newData.gift.filter((gift) => gift !== ""),
                                gift_buy: newData.gift_buy.filter((gift_buy) => gift_buy !== "")
                            };
                            fetchFunction(product.src, updatedProduct)
                                .then(result => {
                                    setListImage([])
                                    handleGetUpdateProduct(result)
                                    Swal.fire({
                                        title: 'Product update successful!',
                                        text: 'You have successfully updated product information',
                                        icon: 'success',
                                        confirmButtonText: 'OK!'
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    Swal.fire({
                                        title: `Error ${error.response.status}`,
                                        text: 'You have failed to update the product',
                                        icon: 'error',
                                        confirmButtonText: 'OK!'
                                    })
                                })
                        }
                        else {
                            const formData = new FormData();
                            newProduct.img.splice(0, newProduct.img.length)
                            for (let i = 0; i < listImage.length; i++) {
                                formData.append('file', listImage[i]);
                                formData.append('upload_preset', apiKeyProduct);
                                axios.post(uploadUrlProduct, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                    .then((response) => {
                                        newProduct.img.push(response.data.secure_url);
                                        if (i === listImage.length - 1) {
                                            const { _id, ...newData } = newProduct;
                                            const updatedProduct = {
                                                ...newData,
                                                specifications: newData.specifications.filter(([key, value]) => key !== "" && value !== ""),
                                                description: newData.description.filter(([key, value]) => key !== "" && value !== ""),
                                                description_table: newData.description_table.filter(([key, value]) => key !== "" && value !== ""),
                                                gift: newData.gift.filter((gift) => gift !== ""),
                                                gift_buy: newData.gift_buy.filter((gift_buy) => gift_buy !== "")
                                            };
                                            //Post axios
                                            fetchFunction(product.src, updatedProduct)
                                                .then(result => {
                                                    setListImage([])
                                                    handleGetUpdateProduct(result)
                                                    Swal.close()
                                                    Swal.fire({
                                                        title: 'Product update successful!',
                                                        text: 'You have successfully updated product information',
                                                        icon: 'success',
                                                        confirmButtonText: 'OK!'
                                                    })
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                    Swal.fire({
                                                        title: `Error ${error.response.status}`,
                                                        text: 'You have failed to update the product',
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
                })
            }
        }
    }
    return (
        <>
            <div className='section-form-info-product-edit play-bold'>
                <div className='page-button'>
                    <button className='animated-button' type="button" onClick={() => (handleSubmitUpdated())} style={{ border: '1px solid #2196f3', width: '150px' }}>
                        <span>Save <i className="fa-regular fa-floppy-disk"></i></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div className='section-form-info-product-content'>
                <div className='box-info-purchaser-product'>
                    <div className='list-info-purchaser-product'>
                        <div className='row info-product'>
                            <div className='col-md-6 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <input type="file" onChange={handleGetImage} name="chooseFile" id="chooseFile" multiple />
                                <Carousel>
                                    {newProduct.img.map((item, index) => {
                                        return <img src={item} key={index} alt='' />
                                    })}
                                </Carousel>
                            </div>
                            <div className='col-md-6 list-info-product'>
                                <div className='play-bold'>Product Details</div>
                                <div className="wave-group">
                                    <input required onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="input" value={newProduct.src} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>P</span>
                                        <span className="label-char" style={{ '--index': '1' }}>r</span>
                                        <span className="label-char" style={{ '--index': '2' }}>o</span>
                                        <span className="label-char" style={{ '--index': '3' }}>d</span>
                                        <span className="label-char" style={{ '--index': '4' }}>u</span>
                                        <span className="label-char" style={{ '--index': '5' }}>c</span>
                                        <span className="label-char" style={{ '--index': '6' }}>t</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '9' }}>o</span>
                                        <span className="label-char" style={{ '--index': '10' }}>d</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required onChange={(e) => handleChangeInput(e, null)} name="nameProduct" type="text" className="input" value={newProduct.nameProduct} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>P</span>
                                        <span className="label-char" style={{ '--index': '1' }}>r</span>
                                        <span className="label-char" style={{ '--index': '2' }}>o</span>
                                        <span className="label-char" style={{ '--index': '3' }}>d</span>
                                        <span className="label-char" style={{ '--index': '4' }}>u</span>
                                        <span className="label-char" style={{ '--index': '5' }}>c</span>
                                        <span className="label-char" style={{ '--index': '6' }}>t</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>n</span>
                                        <span className="label-char" style={{ '--index': '9' }}>a</span>
                                        <span className="label-char" style={{ '--index': '10' }}>m</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e:</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="realPrice" className="input" value={newProduct.realPrice} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>M</span>
                                        <span className="label-char" style={{ '--index': '1' }}>a</span>
                                        <span className="label-char" style={{ '--index': '2' }}>i</span>
                                        <span className="label-char" style={{ '--index': '3' }}>n</span>
                                        <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '5' }}>p</span>
                                        <span className="label-char" style={{ '--index': '6' }}>r</span>
                                        <span className="label-char" style={{ '--index': '7' }}>i</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '9' }}>e (VNĐ):</span>
                                    </label>
                                </div>
                                <div className="wave-group">
                                    <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="nowPrice" className="input" value={newProduct.nowPrice} />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>R</span>
                                        <span className="label-char" style={{ '--index': '1' }}>e</span>
                                        <span className="label-char" style={{ '--index': '2' }}>d</span>
                                        <span className="label-char" style={{ '--index': '4' }}>u</span>
                                        <span className="label-char" style={{ '--index': '5' }}>c</span>
                                        <span className="label-char" style={{ '--index': '6' }}>e</span>
                                        <span className="label-char" style={{ '--index': '7' }}>d</span>
                                        <span className="label-char" style={{ '--index': '8' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>p</span>
                                        <span className="label-char" style={{ '--index': '8' }}>r</span>
                                        <span className="label-char" style={{ '--index': '8' }}>i</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '8' }}>e (VNĐ):</span>
                                    </label>
                                </div>
                                <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                                    <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                        <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="percent" className="input" value={newProduct.percent} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>D</span>
                                            <span className="label-char" style={{ '--index': '1' }}>i</span>
                                            <span className="label-char" style={{ '--index': '2' }}>s</span>
                                            <span className="label-char" style={{ '--index': '4' }}>c</span>
                                            <span className="label-char" style={{ '--index': '5' }}>o</span>
                                            <span className="label-char" style={{ '--index': '6' }}>u</span>
                                            <span className="label-char" style={{ '--index': '7' }}>n</span>
                                            <span className="label-char" style={{ '--index': '8' }}>t (%):</span>
                                        </label>
                                    </div>
                                    <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                        <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="quantity" className="input" value={newProduct.quantity} />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>Q</span>
                                            <span className="label-char" style={{ '--index': '1' }}>u</span>
                                            <span className="label-char" style={{ '--index': '2' }}>a</span>
                                            <span className="label-char" style={{ '--index': '4' }}>n</span>
                                            <span className="label-char" style={{ '--index': '5' }}>t</span>
                                            <span className="label-char" style={{ '--index': '6' }}>i</span>
                                            <span className="label-char" style={{ '--index': '7' }}>t</span>
                                            <span className="label-char" style={{ '--index': '8' }}>y:</span>
                                        </label>
                                    </div>
                                    <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                        <input required type="text" className="input" value={newProduct.view} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>V</span>
                                            <span className="label-char" style={{ '--index': '1' }}>i</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e</span>
                                            <span className="label-char" style={{ '--index': '4' }}>w:</span>
                                        </label>
                                    </div>
                                    <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                        <input required type="text" className="input" value={newProduct.sold} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>S</span>
                                            <span className="label-char" style={{ '--index': '1' }}>o</span>
                                            <span className="label-char" style={{ '--index': '2' }}>l</span>
                                            <span className="label-char" style={{ '--index': '4' }}>d:</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="wave-group-product">
                                    <Select onChange={handleSelectedOptionsChange} options={options} className={`select ${hasValueEdit || isDisabledEdit || isFocusedEdit ? 'is-active' : ''}`} onFocus={handleSelectFocusEdit} onBlur={handleSelectBlurEdit} value={newProduct.category.map((item) => ({ value: item, label: item }))} isMulti placeholder="Select category" />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>P</span>
                                        <span className="label-char" style={{ '--index': '1' }}>r</span>
                                        <span className="label-char" style={{ '--index': '2' }}>o</span>
                                        <span className="label-char" style={{ '--index': '3' }}>d</span>
                                        <span className="label-char" style={{ '--index': '4' }}>u</span>
                                        <span className="label-char" style={{ '--index': '5' }}>c</span>
                                        <span className="label-char" style={{ '--index': '6' }}>t</span>
                                        <span className="label-char" style={{ '--index': '7' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '8' }}>c</span>
                                        <span className="label-char" style={{ '--index': '9' }}>a</span>
                                        <span className="label-char" style={{ '--index': '10' }}>t</span>
                                        <span className="label-char" style={{ '--index': '11' }}>e</span>
                                        <span className="label-char" style={{ '--index': '11' }}>g</span>
                                        <span className="label-char" style={{ '--index': '11' }}>o</span>
                                        <span className="label-char" style={{ '--index': '11' }}>r</span>
                                        <span className="label-char" style={{ '--index': '11' }}>y:</span>
                                    </label>
                                </div>
                            </div>
                            <div className='col-md-6 list-info-product'>
                                <div className='play-bold'>Details</div>
                                <div className="wave-group-detail-product">
                                    {newProduct.description_table.length > 1 ? newProduct.description_table.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                            <div className='col-3' style={{ padding: "0" }}>
                                                <input required name='NameDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className='col-8' style={{ padding: "0" }}>
                                                <input required name='ContentDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                </label>
                                            </div>
                                            <div className='col-1' style={{ padding: "0" }}>
                                                <div className='page-button'>
                                                    <button className='animated-button' onClick={() => handleRemoveDescriptionAndDescriptionTable("description_table", index)} type="button" style={{ border: '1px solid #2196f3' }}>
                                                        <span>X</span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        newProduct.description_table.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-3' style={{ padding: "0" }}>
                                                    <input required name='NameDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className='col-9' style={{ padding: "0" }}>
                                                    <input required name='ContentDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        })
                                    }

                                    <div className='page-button'>
                                        <button className='animated-button' onClick={() => handleAddDescriptionAndDescriptionTable("description_table")} type="button" style={{ border: '1px solid #2196f3' }}>
                                            <span>ADD</span>
                                            <span></span>
                                        </button>
                                    </div>

                                </div>
                                <div className='play-bold'>Specifications</div>
                                <div className="wave-group-detail-product">
                                    {newProduct.specifications.length > 1 ? newProduct.specifications.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                            <div className='col-3' style={{ padding: "0" }}>
                                                <input required name='NameSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className='col-8' style={{ padding: "0" }}>
                                                <input required name='ContentSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                </label>
                                            </div>
                                            <div className='col-1' style={{ padding: "0" }}>
                                                <div className='page-button'>
                                                    <button className='animated-button' onClick={() => handleRemoveDescriptionAndDescriptionTable("specifications", index)} type="button" style={{ border: '1px solid #2196f3' }}>
                                                        <span>X</span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        newProduct.specifications.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-3' style={{ padding: "0" }}>
                                                    <input required name='NameSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className='col-9' style={{ padding: "0" }}>
                                                    <input required name='ContentSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className='page-button'>
                                        <button className='animated-button' onClick={() => handleAddDescriptionAndDescriptionTable("specifications")} type="button" style={{ border: '1px solid #2196f3' }}>
                                            <span>ADD</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 list-info-product'>
                                <div className='play-bold'>Description</div>
                                <div className="wave-group-detail-product">
                                    {newProduct.description.length > 1 ? newProduct.description.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                            <div className='col-3' style={{ padding: "0" }}>
                                                <input required name='NameDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                </label>
                                            </div>
                                            <div className='col-8' style={{ padding: "0" }}>
                                                <input required name='ContentDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                </label>
                                            </div>
                                            <div className='col-1' style={{ padding: "0" }}>
                                                <div className='page-button'>
                                                    <button className='animated-button' onClick={() => handleRemoveDescriptionAndDescriptionTable("description", index)} type="button" style={{ border: '1px solid #2196f3' }}>
                                                        <span>X</span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        newProduct.description.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-3' style={{ padding: "0" }}>
                                                    <input required name='NameDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[0]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                                    </label>
                                                </div>
                                                <div className='col-9' style={{ padding: "0" }}>
                                                    <input required name='ContentDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item[1]} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>C</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>o</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>n</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>t:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className='page-button'>
                                        <button className='animated-button' onClick={() => handleAddDescriptionAndDescriptionTable("description")} type="button" style={{ border: '1px solid #2196f3' }}>
                                            <span>ADD</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                                <div className='play-bold'>Offers</div>
                                <div className="wave-group-detail-product">
                                    {newProduct.gift_buy.length > 1 ? newProduct.gift_buy.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                            <div className='col-11' style={{ padding: "0" }}>
                                                <input required name="gift_buy" onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>O</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>f</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>e</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>r</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '6' }}>{index + 1}:</span>
                                                </label>
                                            </div>
                                            <div className='col-1' style={{ padding: "0" }}>
                                                <div className='page-button'>
                                                    <button onClick={() => handleRemove("gift_buy", index)} className='animated-button' type="button" style={{ border: '1px solid #2196f3' }}>
                                                        <span>X</span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        newProduct.gift_buy.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-12' style={{ padding: "0" }}>
                                                    <input required name="gift_buy" onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>O</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>f</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>e</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>r</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '6' }}>{index + 1}:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className='page-button'>
                                        <button className='animated-button' onClick={() => handleAdd("gift_buy")} type="button" style={{ border: '1px solid #2196f3' }}>
                                            <span>ADD</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                                <div className='play-bold'>Gift</div>
                                <div className="wave-group-detail-product">

                                    {newProduct.gift.length > 1 ? newProduct.gift.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                            <div className='col-11' style={{ padding: "0" }}>
                                                <input required name="gift" onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item} />
                                                <span className="bar"></span>
                                                <label className="label">
                                                    <span className="label-char" style={{ '--index': '0' }}>G</span>
                                                    <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                    <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                    <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                    <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                    <span className="label-char" style={{ '--index': '5' }}>{index + 1}:</span>
                                                </label>
                                            </div>
                                            <div className='col-1' style={{ padding: "0" }}>
                                                <div className='page-button'>
                                                    <button className='animated-button' onClick={() => handleRemove("gift", index)} type="button" style={{ border: '1px solid #2196f3' }}>
                                                        <span>X</span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        newProduct.gift.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-12' style={{ padding: "0" }}>
                                                    <input required name="gift" onChange={(e) => handleChangeInput(e, index)} type="text" className="input" value={item} />
                                                    <span className="bar"></span>
                                                    <label className="label">
                                                        <span className="label-char" style={{ '--index': '0' }}>G</span>
                                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                        <span className="label-char" style={{ '--index': '2' }}>f</span>
                                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                                        <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                                        <span className="label-char" style={{ '--index': '5' }}>{index + 1}:</span>
                                                    </label>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className='page-button'>
                                        <button className='animated-button' onClick={() => handleAdd("gift")} type="button" style={{ border: '1px solid #2196f3' }}>
                                            <span>ADD</span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
