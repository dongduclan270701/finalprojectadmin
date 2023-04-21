import React,{ useState, useRef, useEffect} from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated"

const Index = (props) => {
    const {inputElement, options, hanldGetData, hanldGetImage} = props
    const [listImageChoose, setListImageChoose] = useState([])
    const getImg = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        const file = e.target.files;
        setListImageChoose([...fileArray])
        if( file ){
            hanldGetImage(file)
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const renderImages = (source) => {
        return source.map((image, index) => {
            return <img src={image} key={index} style={{width:"250px", height:"250px"}} className="img-fluid" alt="" />
        })
    }
    // const cloudinaryRef = useRef()
    // const widgetRef = useRef()
    useEffect(() => {
        setListImageChoose(inputElement.img)
        
    }, [inputElement]);

    const handleChangeInput = (event, indexInput) => {
        const { name, value } = event.target
        if (name === "NameDescriptionTable" || name === "ContentDescriptionTable") {
            hanldGetData(inputElement => ({
                ...inputElement,
                description_table: inputElement.description_table.map((row, index) => {
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
            hanldGetData(inputElement => ({
                ...inputElement,
                description: inputElement.description.map((row, index) => {
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
            hanldGetData(inputElement => ({
                ...inputElement,
                [name]: value
            }));
        }
        else if (indexInput === "nullNumber") {
            hanldGetData(inputElement => ({
                ...inputElement,
                [name]: parseInt(value)
            }));
        }
        else {
            hanldGetData(inputElement => ({
                ...inputElement,
                [name]: inputElement[name].map((row, index) => {
                    if (index === indexInput) {
                        return value
                    }
                    return row;
                })
            }));
        }
    }
    const handleAddDescriptionAndDescriptionTable = (name) => {
        hanldGetData(inputElement => ({
            ...inputElement,
            [name]: [...inputElement[name], ["", ""]]
        }));
    }
    const handleRemoveDescriptionAndDescriptionTable = (name, removeIndex) => {
        const updatedDescription = inputElement[name].filter((item, index) => index !== removeIndex);
        hanldGetData({ ...inputElement, [name]: updatedDescription });
    };

    const handleAdd = (name) => {
        hanldGetData(inputElement => ({
            ...inputElement,
            [name]: [...inputElement[name], ""]
        }));
    }
    const handleRemove = (name, removeIndex) => {
        const updatedGift = inputElement[name].filter((item, index) => index !== removeIndex);
        hanldGetData({ ...inputElement, [name]: updatedGift });
    };

    const handleSelectedOptionsChange = (selectedCategory) => {
        hanldGetData(prevState => ({
            ...prevState,
            category: selectedCategory.map(option => option.value)
        }));
    }
    return (
        <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <div className="table-responsive">
                                    <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input onChange={getImg} type="file" className="form-control file-upload-info" placeholder="Upload Image" multiple />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span>
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
                                    <h4 className="card-title">Thông tin sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Mã sản phẩm</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="src" type="text" className="form-control form-control-sm" placeholder="Mã sản phẩm" aria-label="Mã sản phẩm" value={inputElement.src} />
                                    </div>
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input onChange={(e) => handleChangeInput(e, null)} name="nameProduct" type="text" className="form-control form-control-sm" placeholder="Tên sản phẩm" aria-label="Tên sản phẩm" value={inputElement.nameProduct} />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá chính</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="realPrice" type="number" className="form-control form-control-sm" placeholder="Giá chính" aria-label="Giá chính" value={inputElement.realPrice} />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá giảm</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="nowPrice" type="number" className="form-control form-control-sm" placeholder="Giá giảm" aria-label="Giá giảm" value={inputElement.nowPrice} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phần trăm giảm giá</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="percent" type="number" className="form-control form-control-sm" placeholder="Phần trăm giảm giá" aria-label="Phần trăm giảm giá" value={inputElement.percent} />
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input onChange={(e) => handleChangeInput(e, "nullNumber")} name="quantity" type="number" className="form-control form-control-sm" placeholder="Số lượng" aria-label="Số lượng" value={inputElement.quantity} />
                                    </div>
                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Đã bán</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Đã bán" aria-label="Đã bán" value={inputElement.sold} disabled />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Lượt xem</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Lượt xem" aria-label="Lượt xem" value={inputElement.view} disabled />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <Select onChange={handleSelectedOptionsChange} value={inputElement.category.map((item) => ({ value: item, label: item }))} options={options} components={makeAnimated()} isMulti placeholder="Chọn danh mục" />
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Quà tặng</h4>
                                    <div className="form-group">
                                        <label>Quà tặng</label>
                                        {inputElement.gift.length > 1 ? inputElement.gift.map((item, index) => {
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
                                            inputElement.gift.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                    <div className='col-12' style={{ paddingLeft: "0" }}>
                                                        <input name="gift" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <button onClick={() => handleAdd("gift")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ưu đãi khi mua sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Ưu đãi</label>
                                        {inputElement.gift_buy.length > 1 ? inputElement.gift_buy.map((item, index) => {
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
                                            inputElement.gift_buy.map((item, index) => {
                                                return <div key={index} className='row' style={{ margin: "0 auto" }}>
                                                    <div className='col-12' style={{ paddingLeft: "0" }}>
                                                        <input name="gift_buy" onChange={(e) => handleChangeInput(e, index)} style={{ marginBottom: "15px" }} value={item} type="text" className="form-control form-control-sm" placeholder={item} aria-label={item} />
                                                    </div>

                                                </div>
                                            })
                                        }
                                        <button onClick={() => handleAdd("gift_buy")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin">
                        <div className="card" style={{ marginBottom: "25px" }}>
                            <div className="card-body">
                                <h4 className="card-title">Thông số sản phẩm</h4>
                                <div className="form-group">

                                    {inputElement.description_table.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-3' style={{ paddingLeft: "0" }}>
                                            <label>Tên:</label>
                                        </div>
                                        <div className='col-7' style={{ padding: "0" }}>
                                            <label>Nội dung:</label>
                                        </div>
                                        <div className='col-2' style={{ paddingRight: "0" }}>
                                            <label>Xoá</label>
                                        </div>
                                    </div>
                                        :
                                        <div className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-3' style={{ paddingLeft: "0" }}>
                                                <label>Tên:</label>
                                            </div>
                                            <div className='col-9' style={{ padding: "0" }}>
                                                <label>Nội dung:</label>
                                            </div>
                                        </div>
                                    }
                                    {inputElement.description_table.length > 1 ? inputElement.description_table.map((item, index) => {
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
                                    }) : inputElement.description_table.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-3' style={{ paddingLeft: "0" }}>
                                                <input name='NameDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                            </div>
                                            <div className='col-9' style={{ paddingLeft: "0" }}>
                                                <input name='ContentDescriptionTable' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                            </div>
                                        </div>
                                    })}
                                    <button onClick={() => handleAddDescriptionAndDescriptionTable("description_table")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Thông số sản phẩm</h4>
                                <div className="form-group">

                                    {inputElement.description.length > 1 ? <div className='row' style={{ margin: "0 auto" }}>
                                        <div className='col-3' style={{ paddingLeft: "0" }}>
                                            <label>Tiêu đề:</label>
                                        </div>
                                        <div className='col-7' style={{ padding: "0" }}>
                                            <label>Nội dung:</label>
                                        </div>
                                        <div className='col-2' style={{ paddingRight: "0" }}>
                                            <label>Xoá</label>
                                        </div>
                                    </div>
                                        :
                                        <div className='row' style={{ margin: "0 auto" }}>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <label>Tiêu đề:</label>
                                            </div>
                                            <div className='col-6' style={{ padding: "0" }}>
                                                <label>Nội dung:</label>
                                            </div>
                                        </div>
                                    }
                                    {inputElement.description.length > 1 ? inputElement.description.map((item, index) => {
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
                                    }) : inputElement.description.map((item, index) => {
                                        return <div key={index} className='row' style={{ margin: "inherit" }}>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='NameDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[0]} placeholder={item[0]} aria-label={item[0]} />
                                            </div>
                                            <div className='col-6' style={{ paddingLeft: "0" }}>
                                                <textarea name='ContentDescription' onChange={(e) => handleChangeInput(e, index)} type="text" className="form-control form-control-sm" value={item[1]} placeholder={item[1]} aria-label={item[1]} />
                                            </div>
                                        </div>
                                    })}
                                    <button onClick={() => handleAddDescriptionAndDescriptionTable("description")} type="button" className="btn btn-outline-secondary btn-fw">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Index;
