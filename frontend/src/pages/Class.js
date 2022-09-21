import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ClassAd from "../components/ClassAd";
import Quote from "../components/QuoteComponent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";
import ClassDetailComponent from "../components/ClassDetail";

import { getClassByIdAPI } from "../store/slices/classSlice";

const Class = props => {
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
        <div className="class-detailed">
            <ClassAd />
            <div className="main-container">
                <Quote 
                    writer="Vince Lombardi"
                    quote="There's no such thing as Perfection. But, in striving for perfection, we can achieve excellence."
                />
                <ClassDetailComponent curClass={curClass} />
            </div>
            <FrequentlyQuestion />
        </div>
    );
}

export default Class;