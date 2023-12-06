import React, { useState, useEffect, memo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchListOfPcCompanyCollectingByName } from 'Apis'
import Footer from "components/Footer"
const Index = () => {
    const formatter = new Intl.NumberFormat('en-US')
    const params = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState()

    useEffect(() => {
        fetchListOfPcCompanyCollectingByName(params.src)
            .then(result => {
                console.log(result)
                setProduct(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [params]);

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-lg-12 grid-margin">
                    <div className="row" style={{ display: "flex", "flexDirection": "row", "alignItems": "center" }}>
                        <button onClick={() => navigate(-1)} type="button" className="col-lg-1 btn btn-outline-secondary btn-fw" style={{ "marginTop": 15 }}>Back</button>
                        <h3 className="col-lg-10 font-weight-bold" style={{ "marginTop": 15 }}>Product details PC Company</h3>
                    </div>
                </div>{product ? <>
                    <div className="grid-margin" style={{ display: "flex", "justifyContent": "center" }}>
                        <NavLink className="col-lg-2 btn btn-outline-secondary btn-fw" to={"/pc-company/update/" + product.src}>Update</NavLink>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Image</h4>
                                    <div className="col-sm-12 col-xs-12 ">
                                        <Carousel>
                                            {product.img.map((item, index) => {
                                                return <img src={item} key={index} alt=''/>
                                            })}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Product Details</h4>
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Product Code" aria-label="Product Code" value={product.src} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Product Name" aria-label="Product Name" value={product.nameProduct} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Main Price</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Main Price" aria-label="Main Price" value={formatter.format(product.realPrice)} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Reduced Price</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="Reduced Price" aria-label="Reduced Price" value={formatter.format(product.nowPrice)} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Percent</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Discount Percent" aria-label="Discount Percent" value={product.percent} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input type="number" className="form-control form-control-sm" placeholder="Quantity" aria-label="Quantity" value={product.quantity} disabled />
                                    </div>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Sold</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Sold" aria-label="Sold" value={product.sold} disabled />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>View</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="View" aria-label="View" value={product.view} disabled />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <Select value={product.category.map((item) => ({ value: item, label: item }))} components={makeAnimated()} isMulti placeholder="Select category" isDisabled={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="col-md-12" style={{ "padding": 0 }}>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Details</h4>
                                        {product.description_table.map((item, index) => {
                                            return <div className="form-group" key={index}>
                                                <label>{item[0]}</label>
                                                <input type="text" className="form-control form-control-sm" placeholder={item[0]} aria-label={item[0]} value={item[1]} disabled />
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Specifications</h4>
                                        <div className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-6' style={{ padding: "0" }}>
                                                <label>Title:</label>
                                            </div>
                                            <div className='col-6' style={{ padding: "0" }}>
                                                <label>Content:</label>
                                            </div>
                                        </div>
                                        {product.specifications.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                    <input name='NameDescription' type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} disabled />
                                                </div>
                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                    <input name='ContentDescription' type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} disabled />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="col-md-12" style={{ "padding": 0 }}>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Description</h4>
                                        <div className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-6' style={{ padding: "0" }}>
                                                <label>Title:</label>
                                            </div>
                                            <div className='col-6' style={{ padding: "0" }}>
                                                <label>Content:</label>
                                            </div>
                                        </div>
                                        {product.description.map((item, index) => {
                                            return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                    <textarea name='NameDescription' type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} disabled />
                                                </div>
                                                <div className='col-6' style={{ paddingLeft: "0" }}>
                                                    <textarea name='ContentDescription' type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} disabled />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Offers</h4>
                                        <div className="form-group">
                                            <label>Offers</label>
                                            {product.gift_buy.map((item, index) => {
                                                return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Offers" aria-label="Offers" disabled />
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="card" style={{ "marginBottom": "25px" }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Gift</h4>
                                        <div className="form-group">
                                            <label>Gift</label>
                                            {product.gift.map((item, index) => {
                                                return <input style={{ marginBottom: "15px" }} key={index} type="text" value={item} className="form-control form-control-sm" placeholder="Gift" aria-label="Gift" disabled />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                    :
                    <>
                        <style dangerouslySetInnerHTML={{
                            __html: "\n.loader {\n  border: 16px solid #f3f3f3;\n  border-radius: 50%;\n  border-top: 16px solid #3498db;\n  margin: 0 auto;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite; /* Safari */\n  animation: spin 2s linear infinite;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n"
                        }} />
                        <div className="loader" />
                    </>
                }
                {/*  */}

            </div>
            <Footer />
        </div>
    );
}

export default memo(Index);
