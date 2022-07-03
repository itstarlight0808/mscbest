import React, {useState, useEffect} from "react";

import ClassAd from "../components/ClassAd";
import ClassComponent from "../components/ClassComponent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

const Classes = props => {
    const classInfo = {
        name: 'Holly Hylton',
        subtitle: "Meisner with Music",
        type: "Master Class",
        description: "You will learn to apply the Meisner Technique in your storytelling through song and Holly will help you develop a set of tools to approach your material.",
        date: "01 June 2020"
    }
    return (
        <div className="classes">
            <ClassAd />
            <div className="class-list-container">
                <ClassComponent classInfo={classInfo} />
                <ClassComponent classInfo={classInfo} />
                <ClassComponent classInfo={classInfo} />
                <ClassComponent classInfo={classInfo} />
                <ClassComponent classInfo={classInfo} />
            </div>
            <FrequentlyQuestion />
        </div>
    );
}

export default Classes;