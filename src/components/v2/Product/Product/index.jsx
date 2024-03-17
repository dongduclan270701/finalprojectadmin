import React, {useState, useEffect} from 'react';
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Carousel } from 'react-responsive-carousel';
const Index = (props) => {
    const { product } = props
    const formatter = new Intl.NumberFormat('en-US')
    const [selectState, setSelectState] = useState({
        hasValue: false,
        isDisabled: false,
        isFocused: false
    });
    const { hasValue, isDisabled, isFocused } = selectState
    
    const handleSelectFocus = () => {
        setSelectState({
            ...selectState,
            isFocused: true
        });
    };
    const handleSelectBlur = () => {
        setSelectState({
            ...selectState,
            isFocused: false
        });
    };
    useEffect(() => {
        product.category.length > 0 && setSelectState({
            ...selectState,
            hasValue: true
        });

    }, [product]);
    return (
        <div className='section-form-info-product-content'>
            <div className='box-info-purchaser-product'>
                <div className='list-info-purchaser-product'>
                    <div className='row info-product'>
                        <div className='col-md-6 list-info-delivery-user' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* <img src={product.img[0]} style={{ width: "200px", borderRadius: "50%" }} alt="avatar" /> */}
                            <Carousel>
                                {product.img.map((item, index) => {
                                    return <img src={item} key={index} alt='' />
                                })}
                            </Carousel>
                        </div>
                        <div className='col-md-6 list-info-product'>
                            <div className='play-bold'>Product Details</div>
                            <div className="wave-group">
                                <input required type="text" className="input" value={product.src} disabled />
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
                                <input required type="text" className="input" value={product.nameProduct} disabled />
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
                                <input required type="text" className="input" value={formatter.format(product.realPrice)} disabled />
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
                                <input required type="text" className="input" value={formatter.format(product.nowPrice)} disabled />
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
                                    <input required type="text" className="input" value={product.percent} disabled />
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
                                    <input required type="text" className="input" value={product.quantity} disabled />
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
                            <div className="wave-group-product info-category">
                                <Select className={`select ${hasValue || isDisabled || isFocused ? 'is-active' : ''}`} defaultValue={product.category.map((item) => ({ value: item, label: item }))}  isMulti isDisabled />
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
                            {product.description_table.map((item, index) => {
                                return <div className="wave-group" key={index}>
                                    <input required type="text" className="input" value={item[1]} disabled />
                                    <span className="bar"></span>
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>{item[0]}:</span>
                                    </label>
                                </div>
                            })}

                            <div className='play-bold'>Specifications</div>
                            <div className="wave-group">
                                {product.specifications.map((item, index) => {
                                    return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <input required type="text" className="input" value={item[0]} disabled />
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <input required type="text" className="input" value={item[1]} disabled />
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
                                })}
                            </div>
                        </div>
                        <div className='col-md-6 list-info-product'>
                            <div className='play-bold'>Description</div>
                            <div className="wave-group">
                                {product.description.map((item, index) => {
                                    return <div key={index} className='row' style={{ margin: "0 0 25px 0" }}>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <input required type="text" className="input" value={item[0]} disabled />
                                            <label className="label">
                                                <span className="label-char" style={{ '--index': '0' }}>T</span>
                                                <span className="label-char" style={{ '--index': '1' }}>i</span>
                                                <span className="label-char" style={{ '--index': '2' }}>t</span>
                                                <span className="label-char" style={{ '--index': '3' }}>l</span>
                                                <span className="label-char" style={{ '--index': '4' }}>e:</span>
                                            </label>
                                        </div>
                                        <div className='col-6' style={{ paddingLeft: "0" }}>
                                            <input required type="text" className="input" value={item[1]} disabled />
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
                                })}
                            </div>
                            <div className='play-bold'>Offers</div>
                            <div className="wave-group">
                                {product.gift_buy.map((item, index) => {
                                    return <div key={index} className="wave-group">
                                        <input required type="text" className="input" value={item} disabled />
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
                                })}
                            </div>
                            <div className='play-bold'>Gift</div>
                            {product.gift.map((item, index) => {
                                return <div key={index} className="wave-group">
                                    <input required type="text" className="input" value={item} disabled />
                                    <label className="label">
                                        <span className="label-char" style={{ '--index': '0' }}>G</span>
                                        <span className="label-char" style={{ '--index': '1' }}>i</span>
                                        <span className="label-char" style={{ '--index': '2' }}>f</span>
                                        <span className="label-char" style={{ '--index': '3' }}>t</span>
                                        <span className="label-char" style={{ '--index': '4' }}>&#160;</span>
                                        <span className="label-char" style={{ '--index': '5' }}>{index + 1}:</span>
                                    </label>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
