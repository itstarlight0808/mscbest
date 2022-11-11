import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setIsRegistered } from "../store/slices/userSlice";

const Welcome = props => {
    const dispatch = useDispatch();
    const { userInfo, isRegistered } = useSelector(state => state.user);

    useEffect(() => {
        if(isRegistered)
            dispatch(setIsRegistered({ registered: false }));
        else if(userInfo)
            props.history.push("/dashboard");
        else
            props.history.push("/");
    }, [])
    return (
        <div className="welcome-container">
            <div className="message-card">
                <h2>Thanks for signing up!</h2>
                <p>An email has been sent to your email with instruction for verifying your account</p>
            </div>
        </div>
    )
}

export default Welcome;