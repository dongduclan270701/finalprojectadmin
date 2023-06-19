import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import UpdateForm from 'components/Utils/Update-Form'
import { uploadUrlProduct, apiKeyProduct } from 'Apis/utils'
import { fetchUpdateLaptopCollecting, fetchListOfLaptopCollectingByName, fetchCollectingByName } from 'Apis'
import axios from 'axios'
import Footer from "components/Footer"

const Index = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState()
    const [listImage, setListImage] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        fetchListOfLaptopCollectingByName(params.src)
            .then(result => {
                setProduct(result)
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
    }, [params]);

    const handleGetData = (data) => {
        setProduct(data)
    }
    const handleGetImage = (files) => {
        setListImage(files)
    }
    // console.log(product)
    const handleSubmitUpdated = () => {
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
                    const { _id, ...newData } = product;
                    const updatedProduct = {
                        ...newData,
                        specifications: newData.specifications.filter(([key, value]) => key !== "" && value !== ""),
                        description: newData.description.filter(([key, value]) => key !== "" && value !== ""),
                        description_table: newData.description_table.filter(([key, value]) => key !== "" && value !== ""),
                        gift: newData.gift.filter((gift) => gift !== ""),
                        gift_buy: newData.gift_buy.filter((gift_buy) => gift_buy !== "")
                    };
                    fetchUpdateLaptopCollecting(params.src, updatedProduct)
                        .then(result => {
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
                                title: 'Failed!',
                                text: 'You have failed to update the product',
                                icon: 'error',
                                confirmButtonText: 'OK!'
                            })
                        })
                }
                else {
                    const formData = new FormData();
                    product.img.splice(0, product.img.length)
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
                                    const { _id, ...newData } = product;
                                    const updatedProduct = {
                                        ...newData,
                                        specifications: newData.specifications.filter(([key, value]) => key !== "" && value !== ""),
                                        description: newData.description.filter(([key, value]) => key !== "" && value !== ""),
                                        description_table: newData.description_table.filter(([key, value]) => key !== "" && value !== ""),
                                        gift: newData.gift.filter((gift) => gift !== ""),
                                        gift_buy: newData.gift_buy.filter((gift_buy) => gift_buy !== "")
                                    };
                                    //Post axios
                                    fetchUpdateLaptopCollecting(params.src, updatedProduct)
                                        .then(result => {
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
                                                title: 'Failed!',
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

        
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Change laptop product details</h3>
                    </div>
                </div>
                <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                    <button onClick={handleSubmitUpdated} className="col-lg-2 btn btn-outline-secondary btn-fw">Save</button>
                </div>
                {product ?
                    <UpdateForm product={product} handleGetImage={handleGetImage} options={options} handleGetData={handleGetData} />
                    :
                    <>
                        <style dangerouslySetInnerHTML={{
                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                        }} />
                        <div className="loader" />
                    </>}

            </div>
            <Footer />
        </div>
    );
}

export default Index;
