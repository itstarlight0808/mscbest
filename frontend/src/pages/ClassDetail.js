import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ClassDetailComponent from "../components/ClassDetail";
import { getClassByIdAPI } from "../store/slices/classSlice";

const ClassDetail = props => {
    const dispatch = useDispatch();

    const classId = props.match.params.id;
    const [curClass, setCurClass] = useState({});

    useEffect(() => {
        dispatch(getClassByIdAPI({ classId }, res => {
            setCurClass(res.data);
            console.log("current Class", res.data)
        }));
    }, [])
    return (
        <>
            <ClassDetailComponent curClass={curClass}/>
        </>
    );
}

export default ClassDetail;