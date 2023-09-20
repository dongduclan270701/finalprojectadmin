import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import CreateForm from 'components/Utils/Create-Form'
import axios from 'axios'
import { uploadUrlProduct, apiKeyProduct } from 'Apis/utils'
import { fetchCreatePcCreatorCollecting, fetchCollectingByName } from 'Apis'
import Footer from "components/Footer"

const Index = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
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
        category: ['','','','',''],
        specifications: [
            ["", ""]
        ]
    })

    const [listImage, setListImage] = useState([])
    const [options, setOptions] = useState([])
    const [collecting, setCollecting] = useState()
    const [CPU, setCPU] = useState([])
    const [GPU, setGPU] = useState([])
    const [category, setCategory] = useState([])
    useEffect(() => {
        fetchCollectingByName("Pc Creator")
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
    }, []);
    const handleGetData = (data) => {
        setProduct(data)

    }
    const handleGetImage = (files) => {
        setListImage(files)
    }
    const handleChangeCategoryForGoods = (e) => {
        // const { name, value } = e.target
        // const index = collecting.findIndex(item => item.name === value)
    }
    const handleSubmitCreate = () => {
        const formData = new FormData();
        if (listImage.length === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product image, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (!product.src) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product product code, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.gift.length === 1 && product.gift[0] === "") {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product gift, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.gift_buy.length === 1 && product.gift_buy[0] === "") {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product offers, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (!product.nameProduct) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product name, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.description_table.length === 1 && (product.description_table[0][0] === "" || product.description_table[0][1] === "")) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product details, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.description.length === 1 && (product.description[0][0] === "" || product.description[0][1] === "")) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product description, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.category.length === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product category, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.realPrice === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product main price, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.nowPrice === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product reduced price, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.percent === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product discount percent, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.quantity === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product quantity, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
        } else if (product.category[0] === '') {
            Swal.fire({
                title: 'Warning!',
                text: 'You have not entered product brand, please try again!',
                icon: 'warning',
                confirmButtonText: 'OK!'
            });
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
                                    fetchCreatePcCreatorCollecting({...updatedProduct, category: updatedProduct.category = updatedProduct.category.filter(category => category !== "")})
                                        .then(result => {
                                            Swal.close()
                                            Swal.fire({
                                                title: 'Add new successful product!',
                                                text: 'You have successfully add new product information',
                                                icon: 'success',
                                                confirmButtonText: 'OK!'
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

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Add new product details Pc Creator</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitCreate} className="col-lg-2 btn btn-outline-secondary btn-fw">Create</button>
                </div>
                <CreateForm
                    product={product}
                    options={options}
                    handleGetImage={handleGetImage}
                    handleGetData={handleGetData}
                    collecting={collecting}
                    CPU={CPU}
                    GPU={GPU}
                    category={category}
                />
            </div>
            <Footer />
        </div>
    );
}

export default Index;
