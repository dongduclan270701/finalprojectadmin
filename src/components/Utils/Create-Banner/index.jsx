import React from 'react';

const Index = (props) => {
    const { inputElement , handleGetData } = props;
    const getImg = (e) => {
        const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
        handleGetData(inputElement => ({
            ...inputElement,
            img: fileArray
        }))
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
    const renderImages = (source) => {
        return <img src={source} className="img-fluid" alt="" style={{ padding: "0px 15px 15px 0px" }} />
    }

    const handleChangeInput = (event, data) => {
        const { name, value } = event.target
        if (data !== "status") {
            handleGetData(inputElement => ({
                ...inputElement,
                [name]: value
            }));
        } else {
            handleGetData(inputElement => ({
                ...inputElement,
                [data]: !inputElement.status
            }));
        }
    }
    return (
        <div className="row">
                    <div className="col-lg-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hình ảnh</h4>
                                <div className="table-responsive">
                                    <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input onChange={getImg} type="file" className="form-control file-upload-info" placeholder="Upload Image" />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {renderImages(inputElement.img)}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 grid-margin stretch-card">
                        <div className="col-md-12" style={{ "padding": 0 }}>
                            <div className="card" style={{ "marginBottom": "25px" }}>
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin sản phẩm</h4>
                                    <div className="form-group">
                                        <label>Mã banner:</label>
                                        <input onChange={(e) => handleChangeInput(e,null)} name="src" type="text" className="form-control form-control-sm" placeholder="Mã banner" aria-label="Mã banner" value={inputElement.src} />
                                    </div>
                                    <div className="form-group">
                                        <label>Tên banner:</label>
                                        <input onChange={(e) => handleChangeInput(e,null)} name="nameBanner" type="text" className="form-control form-control-sm" placeholder="Tên banner" aria-label="Tên banner" value={inputElement.nameBanner} />
                                    </div>

                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Ngày tạo</label>
                                            <input onChange={(e) => handleChangeInput(e,null)} name="createAt" type="number" className="form-control form-control-sm" placeholder="Ngày tạo" aria-label="Ngày tạo" value={inputElement.createAt} />
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Lượt xem</label>
                                            <input type="number" className="form-control form-control-sm" placeholder="Lượt xem" aria-label="Lượt xem" value={inputElement.view} disabled />
                                        </div>
                                    </div>

                                    <div className='row' style={{ paddingTop: "0" }}>
                                        <div className="col-6 form-group">
                                            <label>Trạng thái</label>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                                {inputElement.status ? (
                                                    <>
                                                        <label className="badge badge-success" style={{ marginRight: "10px" }}>
                                                            Hoạt động
                                                        </label>
                                                        <button name="status" onClick={(e) => handleChangeInput(e,"status")} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                            <i className="mdi mdi-checkbox-marked-circle" style={{ fontSize: 20 }} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="badge badge-danger" style={{ marginRight: "10px" }}>
                                                            Ngừng hoạt động
                                                        </label>
                                                        <button name="status" onClick={(e) => handleChangeInput(e,"status")} style={{ background: "none", border: "none", padding: "0", margin: "0" }}>
                                                            <i className="mdi mdi-checkbox-blank-circle-outline" style={{ fontSize: 20 }} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Index;
