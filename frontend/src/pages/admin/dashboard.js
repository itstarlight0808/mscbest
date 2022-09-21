import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { userLogOut } from "../../store/slices/userSlice";
const Dashboard = () => {
    const dispatch = useDispatch();

    const userEvent = useSelector(state => state.userEvent);
    useEffect(() => {
        // dispatch(fetchEventList());
    }, [dispatch]);
    
    return (
        <>
            ...Admin Dashboard...
            <button onClick={() => dispatch(userLogOut())}>Log out</button>
        </>
    );
}

export default Dashboard;