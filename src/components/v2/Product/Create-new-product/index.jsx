import React, { useState, useEffect } from 'react';
import Select from "react-select"
import { Carousel } from 'react-responsive-carousel';
import Swal from 'sweetalert2'
import { uploadUrlProduct, apiKeyProduct }
    from 'Apis/utils'
import axios from 'axios'
import {
    fetchCreateAppleCollecting,
    fetchCreateLaptopCollecting,
    fetchCreateLaptopGamingCollecting,
    fetchCreatePcCompanyCollecting,
    fetchCreatePcCreatorCollecting,
    fetchCreatePcGamingCollecting,
    fetchCollectingByName
} from 'Apis'
const Index = (props) => {
    const { collectingTable, isShowCreateProduct } = props
    const [product, setProduct] = useState({img: [], src: "", gift: [""], gift_buy: [""], percent: 0, quantity: 0, nameProduct: "", realPrice: 0, nowPrice: 0, description_table: [["", ""]], description: [["", ""]], category: ['', '', '', '', ''], specifications: [["", ""]]})
    const [listImage, setListImage] = useState([])
    const [options, setOptions] = useState([])
    const [collecting, setCollecting] = useState()
    const [CPU, setCPU] = useState([])
    const [GPU, setGPU] = useState([])
    const [category, setCategory] = useState([])
    const [lineBrand, setLineBrand] = useState()
    const fetchListFunctionsMap = {
        Apple: fetchCreateAppleCollecting,
        Laptop: fetchCreateLaptopCollecting,
        'Laptop Gaming': fetchCreateLaptopGamingCollecting,
        'Pc Gaming': fetchCreatePcGamingCollecting,
        'Pc Company': fetchCreatePcCompanyCollecting,
        'Pc Creator': fetchCreatePcCreatorCollecting,
    };

    useEffect(() => {
        if (isShowCreateProduct === false) {
            setCollecting()
            setCategory([])
            setCPU([])
            setGPU([])
            setLineBrand()
            setProduct({img: [], src: "", gift: [""], gift_buy: [""], percent: 0, quantity: 0, nameProduct: "", realPrice: 0, nowPrice: 0, description_table: [["", ""]], description: [["", ""]], category: ['', '', '', '', ''], specifications: [["", ""]]})
        }
        else {
            fetchCollectingByName(collectingTable)
            .then(result => {
                // console.log(result.category)
                setCollecting(result.category[0].collecting)
                result.category.map((item, index) => {
                    if (item.name === "Brand Name") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                        item.collecting.map((item, index) => {
                            const categoryInCollecting = item.category.map((i, index) => {
                                return { label: i.name, value: i.name }
                            })
                            setOptions(options => [...options, ...categoryInCollecting])
                            // setBrandType(options => [...options, ...categoryInCollecting])
                        })
                    }
                    if (item.name === "Category") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                        setCategory([...category])
                    }
                    else if (item.name === "GPU") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                        setGPU([...category])
                    } else if (item.name === "CPU") {
                        const category = item.collecting.map((item, index) => {
                            return { label: item.name, value: item.name }
                        })
                        setOptions(options => [...options, ...category])
                        setCPU([...category])
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [collectingTable, isShowCreateProduct]);

    const handleGetImage = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const files = Array.from(e.target.files)
        const file = e.target.files;
        setListImage(file)
        if (files.length > 0) {
            setProduct(product => ({
                ...product,
                img: [...fileArray]
            }));
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const handleChangeInput = (event, indexInput) => {
        const { name, value } = event.target
        if (name === "NameDescriptionTable" || name === "ContentDescriptionTable") {
            setProduct(product => ({
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
            setProduct(product => ({
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
            setProduct(product => ({
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
            setProduct(product => ({
                ...product,
                [name]: value
            }));
        }
        else if (indexInput === "nullNumber") {
            setProduct(product => ({
                ...product,
                [name]: value === '' ? 0 : parseInt(value) * 1
            }));
        }
        else {
            setProduct(product => ({
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
        const updatedDescription = product[name].filter((item, index) => index !== removeIndex);
        setProduct({ ...product, [name]: updatedDescription });
    };
    const handleAddDescriptionAndDescriptionTable = (name) => {
        setProduct(product => ({
            ...product,
            [name]: [...product[name], ["", ""]]
        }));
    }
    const handleAdd = (name) => {
        setProduct(product => ({
            ...product,
            [name]: [...product[name], ""]
        }));
    }
    const handleRemove = (name, removeIndex) => {
        const updatedGift = product[name].filter((item, index) => index !== removeIndex);
        setProduct({ ...product, [name]: updatedGift });
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
            const formData = new FormData();
            if (listImage.length === 0) {
                showAlert('Wait!', 'You have not entered product image, please try again!');
            } else if (!product.src) {
                showAlert('Wait!', 'You have not entered product product code, please try again!');
            } else if (product.gift.length === 1 && product.gift[0] === "") {
                showAlert('Wait!', 'You have not entered product gift, please try again!');
            } else if (product.gift_buy.length === 1 && product.gift_buy[0] === "") {
                showAlert('Wait!', 'You have not entered product offers, please try again!');
            } else if (!product.nameProduct) {
                showAlert('Wait!', 'You have not entered product name, please try again!');
            } else if (product.description_table.length === 1 && (product.description_table[0][0] === "" || product.description_table[0][1] === "")) {
                showAlert('Wait!', 'You have not entered product details, please try again!');
            } else if (product.description.length === 1 && (product.description[0][0] === "" || product.description[0][1] === "")) {
                showAlert('Wait!', 'You have not entered product description, please try again!');
            } else if (product.category.length === 0) {
                showAlert('Wait!', 'You have not entered product category, please try again!');
            } else if (product.realPrice <= 0) {
                showAlert('Wait!', 'You have not entered product main price, please try again!');
            } else if (product.nowPrice === 0) {
                showAlert('Wait!', 'You have not entered product reduced price, please try again!');
            } else if (product.percent >= 100 || product.percent < 0) {
                showAlert('Wait!', 'You have not entered product discount percent, please try again');
            } else if (product.quantity < 0) {
                showAlert('Wait!', 'You have not entered product quantity, please try again!');
            } else if (product.category[0] === '') {
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
                        const updatedProduct = {
                            ...product,
                            specifications: product.specifications.filter(([key, value]) => key !== "" && value !== ""),
                            description: product.description.filter(([key, value]) => key !== "" && value !== ""),
                            description_table: product.description_table.filter(([key, value]) => key !== "" && value !== ""),
                            gift: product.gift.filter((gift) => gift !== ""),
                            gift_buy: product.gift_buy.filter((gift_buy) => gift_buy !== "")
                        };
                        Swal.fire({
                            title: 'Creating...',
                            html: 'Please wait...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        });
                        for (let i = 0; i < listImage.length; i++) {
                            formData.append('file', listImage[i]);
                            formData.append('upload_preset', apiKeyProduct);
                            axios.post(uploadUrlProduct, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then((response) => {
                                    product.img.push(response.data.secure_url);
                                    if (i === listImage.length - 1) {
                                        //Post axios
                                        fetchFunction({ ...updatedProduct, category: updatedProduct.category = updatedProduct.category.filter(category => category !== "") })
                                            .then(result => {
                                                
                                                Swal.close()
                                                Swal.fire({
                                                    title: 'Add new successful product!',
                                                    text: 'You have successfully add new product information',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK!'
                                                })
                                                    .then(result => {
                                                        // navigate(-1)
                                                    })
                                                setProduct({
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
                                                    specifications: [
                                                        ["", ""]
                                                    ]
                                                })
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                Swal.close()
                                                Swal.fire({
                                                    title: `Error ${error.response.status}`,
                                                    text: 'There seems to be a problem with the connection to the server, please try again later',
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
                })
            }
        }
    }
    const handleChooseBrand = (name) => {
        const index = collecting.findIndex(item => item.name === name)
        if (index !== -1) {
            setLineBrand(collecting[index].category)
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
        } else {
            setLineBrand()
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
        }
    }
    const handleChangeCategory = (e) => {
        const { name, value } = e.target
        if (name === 'line-brand') {
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    value,
                    ...prevFilter.category.slice(2),
                ],
            }));
        } else if (name === 'cpu') {
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    value,
                    ...prevFilter.category.slice(3),
                ],
            }));
        } else if (name === 'gpu') {
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    prevFilter.category[2] ? prevFilter.category[2] : '',
                    value,
                    ...prevFilter.category.slice(4),
                ],
            }));
        } else if (name === 'category') {
            setProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    prevFilter.category[2] ? prevFilter.category[2] : '',
                    prevFilter.category[3] ? prevFilter.category[3] : '',
                    value,
                    ...prevFilter.category.slice(5),
                ],
            }));
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
                                    {product.img.map((item, index) => {
                                        return <img src={item} key={index} alt='' />
                                    })}
                                </Carousel>
                            </div>
                            <div className='col-md-6 list-info-product'>
                                <div className='play-bold'>Product Details</div>
                                <div className="wave-group">
                                    <input required onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="input" value={product.src} />
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
                                    <input required onChange={(e) => handleChangeInput(e, null)} name="nameProduct" type="text" className="input" value={product.nameProduct} />
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
                                    <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="realPrice" className="input" value={product.realPrice} />
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
                                    <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="nowPrice" className="input" value={product.nowPrice} />
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
                                        <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="percent" className="input" value={product.percent} />
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
                                        <input required onChange={(e) => handleChangeInput(e, "nullNumber")} name="quantity" className="input" value={product.quantity} />
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
                                        <input required type="text" className="input" value={product.view} disabled />
                                        <span className="bar"></span>
                                        <label className="label">
                                            <span className="label-char" style={{ '--index': '0' }}>V</span>
                                            <span className="label-char" style={{ '--index': '1' }}>i</span>
                                            <span className="label-char" style={{ '--index': '2' }}>e</span>
                                            <span className="label-char" style={{ '--index': '4' }}>w:</span>
                                        </label>
                                    </div>
                                    <div className="col-md-3 wave-group" style={{ padding: 0 }}>
                                        <input required type="text" className="input" value={product.sold} disabled />
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
                                    {/* <Select onChange={handleSelectedOptionsChange} options={options} className={`select ${hasValueEdit || isDisabledEdit || isFocusedEdit ? 'is-active' : ''}`} onFocus={handleSelectFocusEdit} onBlur={handleSelectBlurEdit} value={product.category.map((item) => ({ value: item, label: item }))} isMulti placeholder="Select category" /> */}
                                    <select name='brand' onChange={e => handleChooseBrand(e.target.value)} style={{ borderRadius: "15px" }} type="text" className="col-md-4 input-form-search" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" >
                                        <option value='' selected>Select brand</option>
                                        {collecting ? collecting.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        }) : null}
                                    </select>
                                    <select onChange={e => handleChangeCategory(e)} name='line-brand' className="col-md-4 input-form-search">
                                        <option value='' selected>Select line brand</option>
                                        {lineBrand && lineBrand.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.name}</option>
                                        })}
                                    </select>
                                    <select onChange={e => handleChangeCategory(e)} name='cpu' className="col-md-4 input-form-search">
                                        <option value='' selected>Select CPU</option>
                                        {CPU && CPU.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.value}</option>
                                        })}
                                    </select>
                                    <select onChange={e => handleChangeCategory(e)} name='gpu' className="col-md-4 input-form-search">
                                        <option value='' selected>Select GPU</option>
                                        {GPU && GPU.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.value}</option>
                                        })}
                                    </select>
                                    <select onChange={e => handleChangeCategory(e)} name='category' className="col-md-4 input-form-search">
                                        <option value='' selected>Select category</option>
                                        {category && category.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.value}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-6 list-info-product'>
                                <div className='play-bold'>Details</div>
                                <div className="wave-group-detail-product">
                                    {product.description_table.length > 1 ? product.description_table.map((item, index) => {
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
                                        product.description_table.map((item, index) => {
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
                                    {product.specifications.length > 1 ? product.specifications.map((item, index) => {
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
                                        product.specifications.map((item, index) => {
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
                                    {product.description.length > 1 ? product.description.map((item, index) => {
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
                                        product.description.map((item, index) => {
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
                                    {product.gift_buy.length > 1 ? product.gift_buy.map((item, index) => {
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
                                        product.gift_buy.map((item, index) => {
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

                                    {product.gift.length > 1 ? product.gift.map((item, index) => {
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
                                        product.gift.map((item, index) => {
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
