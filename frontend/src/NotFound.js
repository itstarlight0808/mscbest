import React from "react";
import NotFoundImage from "./assets/images/404.svg";

const NotFound = props => {
    return (
        <div className="p-not-found">
            <img src={ NotFoundImage } alt="404" className="not-found-404-img" />
        </div>
    );
}

export default NotFound;