import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import ClassAd from "../components/ClassAd";
import ClassCardView from "../components/ClassCardView";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

import { getClassListAPI } from "../store/slices/classSlice";

const Classes = props => {
    const dispatch = useDispatch();
    const { classList } = useSelector(state => state.classes);

    useEffect(() => {
        dispatch(getClassListAPI);
    }, [])
    
    return (
        <div className="classes">
            <ClassAd />
            <div className="class-list-container">
                {
                    classList.map((one, index) => {
                        return (
                            <ClassCardView key={`card_${index}`} selClass={one} />
                        )
                    })
                }
            </div>
            <FrequentlyQuestion />
        </div>
    );
}

export default Classes;