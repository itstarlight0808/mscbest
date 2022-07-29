import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userEvent = useSelector(state => state.userEvent);
    useEffect(() => {
        // dispatch(fetchEventList());
    }, [dispatch]);
    
    return (
        <>
            ...Admin Dashboard...
        </>
    );
}

export default Dashboard;