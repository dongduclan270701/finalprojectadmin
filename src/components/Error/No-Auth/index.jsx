import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import NoAuth from 'assets/images/no.png'
const Index = (props) => {
    const { error } = props
    return (
        <div className="card-body">
            <div className="row flex-grow">
                <div className="col-lg-7 mx-auto">
                    <div className="row align-items-center d-flex flex-row">
                        <div className="col-lg-6 text-lg-right pr-lg-4">
                            <h1 className="display-1 mb-0">
                                <img src={NoAuth} style={{ width: "150px" }} alt='' />
                            </h1>
                        </div>
                        <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                            <h2>SORRY, Error {error}!</h2>
                            <h3 className="font-weight">You do not have permission to access this site!</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 text-center mt-xl-2">
                            <NavLink className="font-weight-medium" to="/">Back to home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Index);
