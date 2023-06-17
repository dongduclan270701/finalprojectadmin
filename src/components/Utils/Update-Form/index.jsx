import React, { useState, useRef, useEffect } from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated"

const Index = (props) => {
    const { product, options, handleGetData, handleGetImage } = props
    const [listImageChoose, setListImageChoose] = useState([])
    const [image, setImage] = useState()
    const getImg = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const file = e.target.files;
        const files = Array.from(e.target.files)
        setListImageChoose([...fileArray])
        if (file) {
            handleGetImage(file)
            setImage(files)
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const renderImages = (source) => {
        return source.map((image, index) => {
            return <img src={image} key={index} style={{ padding: "0px 15px 15px 0px", width: "250px" }} className="img-fluid" alt="" />
        })
    }

    useEffect(() => {
        setListImageChoose(product.img)

    }, [product]);

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
        else if (indexInput === null) {
            handleGetData(product => ({
                ...product,
                [name]: value
            }));
        }
        else if (indexInput === "nullNumber") {
            handleGetData(product => ({
                ...product,
                [name]: parseInt(value)
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
    const handleAddDescriptionAndDescriptionTable = (name) => {
        handleGetData(product => ({
            ...product,
            [name]: [...product[name], ["", ""]]
        }));
    }
    const handleRemoveDescriptionAndDescriptionTable = (name, removeIndex) => {
        const updatedDescription = product[name].filter((item, index) => index !== removeIndex);
        handleGetData({ ...product, [name]: updatedDescription });
    };

    const handleAdd = (name) => {
        handleGetData(product => ({
            ...product,
            [name]: [...product[name], ""]
        }));
    }
    const handleRemove = (name, removeIndex) => {
        const updatedGift = product[name].filter((item, index) => index !== removeIndex);
        handleGetData({ ...product, [name]: updatedGift });
    };

    const handleSelectedOptionsChange = (selectedCategory) => {
        handleGetData(prevState => ({
            ...prevState,
            category: selectedCategory.map(option => option.value)
        }));
    }
    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Image</h4>
                        <div className="table-responsive">
                            <div className="form-group">
                                <label>File upload</label>
                                <input type="file" name="img[]" className="file-upload-default" />
                                <div className={image ? "file-upload active" : "file-upload"}>
                                    <div className="file-select">
                                        <div className="file-select-button" id="fileName">Choose Image Product</div>
                                        <div className="file-select-name" id="noFile">{image ? image.map((i) => i.name).join(", ") : "No file chosen..."}</div>
                                        <input type="file" onChange={getImg} name="chooseFile" id="chooseFile" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {renderImages(listImageChoose)}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
                <div className="col-md-12" style={{ "padding": 0 }}>
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <h4 className="card-title">Product Details</h4>
                            <div className="form-group">
                                <label>Product Code</label>
                                <input onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="form-control form-control-sm" placeholder="Product Code" aria-label="Product Code" value={product.src} />
                            </div>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input onChange={(e) => handleChangeInput(e, null)} name="nameProduct" type="text" className="form-control form-control-sm" placeholder="Product Name" aria-label="Product Name" value={product.nameProduct} />
                            </div>
                            <div className="form-group">
                                <label>Main Price</label>
                                <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="realPrice" type="number" className="form-control form-control-sm" placeholder="Main Price" aria-label="Main Price" value={product.realPrice} />
                            </div>
                            <div className="form-group">
                                <label>Reduced Price</label>
                                <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="nowPrice" type="number" className="form-control form-control-sm" placeholder="Reduced Price" aria-label="Reduced Price" value={product.nowPrice} />
                            </div>
                            <div className="form-group">
                                <label>Discount Percent</label>
                                <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="percent" type="number" className="form-control form-control-sm" placeholder="Discount Percent" aria-label="Discount Percent" value={product.percent} />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="quantity" type="number" className="form-control form-control-sm" placeholder="Quantity" aria-label="Quantity" value={product.quantity} />
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
                                <Select onChange={handleSelectedOptionsChange} value={product.category.map((item) => ({ value: item, label: item }))} options={options} components={makeAnimated()} isMulti placeholder="Chọn danh mục" />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ "marginBottom": "25px" }}>
                        <div className="card-body">
                            <h4 className="card-title">Gift</h4>
                            <div className="form-group">
                                <label>Gift</label>
                                {product.gift.length > 1 ? product.gift.map((item, index) => {
                                    return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-10' style={{ paddingLeft: "0" }}>
                                            <input name="gift" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                        </div>
                                        <div className='col-2' style={{ paddingLeft: "0" }}>
                                            <button onClick={() => handleRemove("gift", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                        </div>
                                    </div>
                                })
                                    :
                                    product.gift.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-12' style={{ paddingLeft: "0" }}>
                                                <input name="gift" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                            </div>
                                        </div>
                                    })
                                }
                                <button onClick={() => handleAdd("gift")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Offers</h4>
                            <div className="form-group">
                                <label>Offers</label>
                                {product.gift_buy.length > 1 ? product.gift_buy.map((item, index) => {
                                    return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-10' style={{ paddingLeft: "0" }}>
                                            <input name="gift_buy" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                        </div>
                                        <div className='col-2' style={{ paddingLeft: "0" }}>
                                            <button onClick={() => handleRemove("gift_buy", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                        </div>
                                    </div>
                                })
                                    :
                                    product.gift_buy.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-12' style={{ paddingLeft: "0" }}>
                                                <input name="gift_buy" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                            </div>

                                        </div>
                                    })
                                }
                                <button onClick={() => handleAdd("gift_buy")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 grid-margin">
                <div className="card" style={{ marginBottom: "25px" }}>
                    <div className="card-body">
                        <h4 className="card-title">Detais</h4>
                        <div className="form-group">

                            {product.description_table.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                <div className='col-3' style={{ paddingLeft: "0" }}>
                                    <label>Title:</label>
                                </div>
                                <div className='col-7' style={{ padding: "0" }}>
                                    <label>Content:</label>
                                </div>
                                <div className='col-2' style={{ padding: "0 0" }}>
                                    <label>Remove</label>
                                </div>
                            </div>
                                :
                                <div className='row' style={{ margin: "0 auto" }}>
                                    <div className='col-3' style={{ paddingLeft: "0" }}>
                                        <label>Title:</label>
                                    </div>
                                    <div className='col-9' style={{ padding: "0" }}>
                                        <label>Content:</label>
                                    </div>
                                </div>
                            }
                            {product.description_table.length > 1 ? product.description_table.map((item, index) => {
                                return <div key={index} className='row' style={{ margin: "inherit" }}>
                                    <div className='col-3' style={{ paddingLeft: "0" }}>
                                        <input name='NameDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                    </div>
                                    <div className='col-7' style={{ paddingLeft: "0" }}>
                                        <input name='ContentDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                    </div>
                                    <div className='col-2' style={{ paddingLeft: "0" }}>
                                        <button onClick={() => handleRemoveDescriptionAndDescriptionTable("description_table", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                    </div>
                                </div>
                            }) : product.description_table.map((item, index) => {
                                return <div key={index} className='row' style={{ margin: "inherit" }}>
                                    <div className='col-3' style={{ paddingLeft: "0" }}>
                                        <input name='NameDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                    </div>
                                    <div className='col-9' style={{ paddingLeft: "0" }}>
                                        <input name='ContentDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                    </div>
                                </div>
                            })}
                            <button onClick={() => handleAddDescriptionAndDescriptionTable("description_table")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Description</h4>
                        <div className="form-group">

                            {product.description.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                <div className='col-3' style={{ paddingLeft: "0" }}>
                                    <label>Title:</label>
                                </div>
                                <div className='col-7' style={{ padding: "0" }}>
                                    <label>Content:</label>
                                </div>
                                <div className='col-2' style={{ padding: "0 0" }}>
                                    <label>Remove</label>
                                </div>
                            </div>
                                :
                                <div className='row' style={{ margin: "0 auto" }}>
                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                        <label>Title:</label>
                                    </div>
                                    <div className='col-6' style={{ padding: "0" }}>
                                        <label>Content:</label>
                                    </div>
                                </div>
                            }
                            {product.description.length > 1 ? product.description.map((item, index) => {
                                return <div key={index} className='row' style={{ margin: "inherit" }}>
                                    <div className='col-3' style={{ paddingLeft: "0" }}>
                                        <textarea name='NameDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                    </div>
                                    <div className='col-7' style={{ paddingLeft: "0" }}>
                                        <textarea name='ContentDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                    </div>
                                    <div className='col-2' style={{ paddingLeft: "0" }}>
                                        <button onClick={() => handleRemoveDescriptionAndDescriptionTable("description", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                    </div>
                                </div>
                            }) : product.description.map((item, index) => {
                                return <div key={index} className='row' style={{ margin: "inherit" }}>
                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                        <textarea name='NameDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                    </div>
                                    <div className='col-6' style={{ paddingLeft: "0" }}>
                                        <textarea name='ContentDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                    </div>
                                </div>
                            })}
                            <button onClick={() => handleAddDescriptionAndDescriptionTable("description")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
