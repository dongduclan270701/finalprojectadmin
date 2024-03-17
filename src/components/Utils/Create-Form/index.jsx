import React, { useState, useEffect } from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated"


const Index = (props) => {
    const {
        product,
        options,
        handleGetData,
        handleGetImage,
        collecting,
        CPU,
        GPU,
        category
    } = props
    const [listImageChoose, setListImageChoose] = useState([])
    const [image, setImage] = useState()
    const [newProduct, setNewProduct] = useState({
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
    const [lineBrand, setLineBrand] = useState()
    const compareObjects = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    useEffect(() => {
        setNewProduct(product)
        const isEqual = compareObjects(product, {
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
        });
        if (isEqual) {
            setListImageChoose([])
            setImage(null)
        }
    }, [product])

    const getImg = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const file = e.target.files;
        const files = Array.from(e.target.files)
        setListImageChoose([...fileArray])
        handleGetImage(file)
        setImage(files)
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    const renderImages = (source) => {
        return source.map((image, index) => {
            return <img src={image} key={index} className="img-fluid" alt="" style={{ padding: "0px 15px 15px 0px", width: "250px" }} />
        })
    }

    const handleChangeInput = (event, indexInput) => {
        const { name, value } = event.target
        if (name === "NameDescriptionTable" || name === "ContentDescriptionTable") {
            handleGetData(newProduct => ({
                ...newProduct,
                description_table: newProduct.description_table.map((row, index) => {
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
            handleGetData(newProduct => ({
                ...newProduct,
                description: newProduct.description.map((row, index) => {
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
            handleGetData(newProduct => ({
                ...newProduct,
                specifications: newProduct.specifications.map((row, index) => {
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
            handleGetData(newProduct => ({
                ...newProduct,
                [name]: value
            }));
        }
        else if (indexInput === "nullNumber") {
            handleGetData(newProduct => ({
                ...newProduct,
                [name]: parseInt(value)
            }));
        }
        else {
            handleGetData(newProduct => ({
                ...newProduct,
                [name]: newProduct[name].map((row, index) => {
                    if (index === indexInput) {
                        return value
                    }
                    return row;
                })
            }));
        }
    }
    const handleAddDescriptionAndDescriptionTable = (name) => {
        handleGetData(newProduct => ({
            ...newProduct,
            [name]: [...newProduct[name], ["", ""]]
        }));
    }
    const handleRemoveDescriptionAndDescriptionTable = (name, removeIndex) => {
        const updatedDescription = newProduct[name].filter((item, index) => index !== removeIndex);
        handleGetData({ ...newProduct, [name]: updatedDescription });
    };

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

    const handleSelectedOptionsChange = (selectedCategory) => {
        handleGetData(prevState => ({
            ...prevState,
            category: selectedCategory.map(option => option.value)
        }));
    }

    const handleChooseBrand = (name) => {
        const index = collecting.findIndex(item => item.name === name)
        if (index !== -1) {
            setLineBrand(collecting[index].category)
            setNewProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
            handleGetData((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
        } else {
            setLineBrand()
            setNewProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
            handleGetData((prevFilter) => ({
                ...prevFilter,
                category: [
                    name,
                    ...prevFilter.category.slice(1),
                ],
            }))
        }
        // setNewProduct((prevFilter) => ({
        //     ...prevFilter,
        //     category: [
        //         prevFilter.category[0],
        //         prevFilter.category[1],
        //         prevFilter.category[2],
        //         prevFilter.category[3],
        //         name,
        //         ...prevFilter.category.slice(5),
        //     ],
        // }));
    }
    const handleChangeCategory = (e) => {
        const { name, value } = e.target
        if (name === 'line-brand') {
            setNewProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    value,
                    ...prevFilter.category.slice(2),
                ],
            }));
            handleGetData((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    value,
                    ...prevFilter.category.slice(2),
                ],
            }));
        } else if (name === 'cpu') {
            setNewProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    value,
                    ...prevFilter.category.slice(3),
                ],
            }));
            handleGetData((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    value,
                    ...prevFilter.category.slice(3),
                ],
            }));
        } else if (name === 'gpu') {
            setNewProduct((prevFilter) => ({
                ...prevFilter,
                category: [
                    prevFilter.category[0] ? prevFilter.category[0] : '',
                    prevFilter.category[1] ? prevFilter.category[1] : '',
                    prevFilter.category[2] ? prevFilter.category[2] : '',
                    value,
                    ...prevFilter.category.slice(4),
                ],
            }));
            handleGetData((prevFilter) => ({
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
            setNewProduct((prevFilter) => ({
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
            handleGetData((prevFilter) => ({
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
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Image Product</h4>
                        <div className="table-responsive">
                            <div className="form-group">
                                <label>File upload</label>
                                <input name="img[]" className="file-upload-default" />
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
            {newProduct &&
                <>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Product Details</h4>
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="form-control form-control-sm" placeholder="Product Code" aria-label="Product Code" value={newProduct.src} />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="nameProduct" type="text" className="form-control form-control-sm" placeholder="Product Name" aria-label="Product Name" value={newProduct.nameProduct} />
                                    </div>
                                    <div className="form-group">
                                        <label>Main Price</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="realPrice" type="number" className="form-control form-control-sm" placeholder="Main Price" aria-label="Main Price" value={newProduct.realPrice} />
                                    </div>
                                    <div className="form-group">
                                        <label>Reduces Price</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="nowPrice" type="number" className="form-control form-control-sm" placeholder="Reduces Price" aria-label="Reduces Price" value={newProduct.nowPrice} />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Percent</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="percent" type="number" className="form-control form-control-sm" placeholder="Discount Percent" aria-label="Discount Percent" value={newProduct.percent} />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="quantity" type="number" className="form-control form-control-sm" placeholder="Quantity" aria-label="Quantity" value={newProduct.quantity} />
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Category</label>
                                        <Select onChange={handleSelectedOptionsChange} value={newProduct.category.map((item) => ({ value: item, label: item }))} options={options} components={makeAnimated()} isMulti placeholder="Select category" />
                                    </div> */}
                                    <div className="row form-group">
                                        <div className='col-4'>
                                            <label>Brand</label>
                                            <select name='brand' onChange={e => handleChooseBrand(e.target.value)} className="form-control">
                                                <option value=''>Select brand</option>
                                                {collecting ? collecting.map((item, index) => {
                                                    return <option key={index} value={item.name}>{item.name}</option>
                                                }) : null}
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                            <label>Line Brand</label>
                                            <select onChange={e => handleChangeCategory(e)} name='line-brand' className="form-control">
                                                <option value=''>Select line brand</option>
                                                {lineBrand && lineBrand.map((item, index) => {
                                                    return <option key={index} value={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                            <label>CPU</label>
                                            <select onChange={e => handleChangeCategory(e)} name='cpu' className="form-control">
                                                <option value=''>Select CPU</option>
                                                {CPU && CPU.map((item, index) => {
                                                    return <option key={index} value={item.value}>{item.value}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                            <label>GPU</label>
                                            <select onChange={e => handleChangeCategory(e)} name='gpu' className="form-control">
                                                <option value=''>Select GPU</option>
                                                {GPU && GPU.map((item, index) => {
                                                    return <option key={index} value={item.value}>{item.value}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                            <label>Category</label>
                                            <select onChange={e => handleChangeCategory(e)} name='category' className="form-control">
                                                <option value=''>Select category</option>
                                                {category && category.map((item, index) => {
                                                    return <option key={index} value={item.value}>{item.value}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Gift</h4>
                                    <div className="form-group">
                                        <label>Gift</label>
                                        {newProduct.gift.length > 1 ? newProduct.gift.map((item, index) => {
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
                                            newProduct.gift.map((item, index) => {
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
                                        {newProduct.gift_buy.length > 1 ? newProduct.gift_buy.map((item, index) => {
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
                                            newProduct.gift_buy.map((item, index) => {
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
                                <h4 className="card-title">Details</h4>
                                <div className="form-group">
                                    {newProduct.description_table.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-3' style={{ paddingLeft: "0" }}>
                                            <label>Title:</label>
                                        </div>
                                        <div className='col-7' style={{ padding: "0" }}>
                                            <label>Content:</label>
                                        </div>
                                        <div className='col-2' style={{ padding: "0" }}>
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
                                    {newProduct.description_table.length > 1 ? newProduct.description_table.map((item, index) => {
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
                                    }) : newProduct.description_table.map((item, index) => {
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
                        <div className="card" style={{ marginBottom: "25px" }}>
                            <div className="card-body">
                                <h4 className="card-title">Specifications</h4>
                                <div className="form-group">
                                    {newProduct.specifications.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-3' style={{ paddingLeft: "0" }}>
                                            <label>Title:</label>
                                        </div>
                                        <div className='col-7' style={{ padding: "0" }}>
                                            <label>Content:</label>
                                        </div>
                                        <div className='col-2' style={{ padding: "0" }}>
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
                                    {newProduct.specifications.length > 1 ? newProduct.specifications.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-3' style={{ paddingLeft: "0" }}>
                                                <input name='NameSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                            </div>
                                            <div className='col-7' style={{ paddingLeft: "0" }}>
                                                <input name='ContentSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                            </div>
                                            <div className='col-2' style={{ paddingLeft: "0" }}>
                                                <button onClick={() => handleRemoveDescriptionAndDescriptionTable("specifications", index)} type="text" className="btn btn-outline-secondary btn-fw">x</button>
                                            </div>
                                        </div>
                                    }) : newProduct.specifications.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-3' style={{ paddingLeft: "0" }}>
                                                <input name='NameSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                            </div>
                                            <div className='col-9' style={{ paddingLeft: "0" }}>
                                                <input name='ContentSpecifications' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                            </div>
                                        </div>
                                    })}
                                    <button onClick={() => handleAddDescriptionAndDescriptionTable("specifications")} type="button" className="btn btn-outline-secondary btn-fw">Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Description</h4>
                                <div className="form-group">
                                    {newProduct.description.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-3' style={{ paddingLeft: "0" }}>
                                            <label>Title:</label>
                                        </div>
                                        <div className='col-7' style={{ padding: "0" }}>
                                            <label>Content:</label>
                                        </div>
                                        <div className='col-2' style={{ padding: "0" }}>
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
                                    {newProduct.description.length > 1 ? newProduct.description.map((item, index) => {
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
                                    }) : newProduct.description.map((item, index) => {
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
                </>}
        </div>
    );
}

export default Index;
