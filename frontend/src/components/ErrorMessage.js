import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteError } from "../store/slices/errorSlice";

const ErrorMessage = props => {
    const dispatch = useDispatch();

    return (
        <div className="error-container">
            {
                props.errorList.map((one, index) => (
                    <div key={`error_${index}`} className={`error-item ${one.status? "success": "error"}`}>
                        <FontAwesomeIcon icon={`fas ${one.status? "fa-circle-check": "fa-circle-xmark"}`} className="prefix-icon" />
                        <div className="content">
                            <div className="header">
                                <h3>{one.title}</h3>
                                <FontAwesomeIcon icon="fas fa-xmark" className="float-right" onClick={() => dispatch(deleteError(index))} />
                            </div>
                            <div className="body">
                                <span>{one.msg}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ErrorMessage;