import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import TableView from "../../../components/TableView";
import ClassForm from "./ClassForm";

import httpClient from "../../../utils/http-client";
import { classType, classLevel } from "../../../utils/common";
import { RootContext } from "../../../App";
import { addNewError } from "../../../store/slices/errorSlice";

const MyClasses = props => {
    const rootContext = useContext(RootContext);
    const dispatch = useDispatch();
    
    const [mode, setMode] = useState("view");
    const [selected, setSelected] = useState(rootContext.context.table? rootContext.context.table.selected: []);
    const [classList, setClassList] = useState([]);
    const [columns, setColumns] = useState([
        {
            label: "id",
            name: "id",
            hidden: true
        },
        {
            label: "Name",
            name: "name"
        },
        {
            label: "Type",
            name: "type"
        },
        {
            label: "Short Description",
            name: "shortDescription",
        },
        {
            label: "Video Link1",
            name: "videolink1"
        },
        {
            label: "Video Link2",
            name: "videolink2"
        },
        {
            label: "Level",
            name: "level"
        },
        {
            label: "",
            name: "detail"
        }
    ])

    const detailClassEvent = classId => {
        setSelected([classId]);
        setMode("edit");
    }

    const processedClassList = () => {
        let tmp = classList.map((one, index) => {
            let newOne = {...one};
            newOne.type = classType[newOne.type];
            newOne.level = newOne.level.map(lv => classLevel[lv]).join(", ");

            newOne.detail = <FontAwesomeIcon icon="far fa-file-lines" className="detail-view" onClick={() => detailClassEvent(one.id)}/>;
            return newOne;
        })

        return tmp;
    }

    const getClassById = classId => {
        return classList.find(one => one.id === classId);
    }

    const fetchClassList = () => {
        httpClient.get("/classes/").then(res => {
            let data = res.data;
            
            setClassList(data);
            console.log(data)
        })
    }

    useEffect(() => {
        fetchClassList();
    }, [])
    
    const editClassEvent = () => {
        if(!rootContext.context.table || (rootContext.context.table && !rootContext.context.table.selected.length)) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "No Selected Rows!"
            }));
            return;
        }
        if(rootContext.context.table.selected.length > 1) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "Select only one row to edit!"
            }));
            return;
        }
        setSelected(rootContext.context.table.selected);
        setMode("edit");
    }
    const deleteClassEvent = () => {
        let selected = rootContext.context?.table?.selected ?? [];

        if(!selected.length) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "No Selected Rows!"
            }));
            return;
        }
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to delete?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        httpClient.post("/classes/delete", {ids: selected}).then(res => {
                            if(res.status === 200)
                                fetchClassList();
                        }, err => {
                            dispatch(addNewError({
                                status: false,
                                title: "Error",
                                msg: "Error Occurs!"
                            }));
                        })
                    }
                },
                {
                    label: "No",
                    onClick: () => {
                        console.log("delete confirm was cancelled..")
                    }
                }
            ]
        })
    }
    return (
        <div>
            { mode === "view" && 
                <>
                    <div className="d-flex justify-content-end me-2 mb-2">
                        <button
                            className="btn-ctrl btn-ctrl-purple"
                            onClick={() => setMode("add")}
                        >
                            <FontAwesomeIcon icon="fas fa-plus" />Add
                        </button>
                        <button
                            className="btn-ctrl btn-ctrl-purple mx-2"
                            onClick={() => editClassEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-pen-to-square" />Edit
                        </button>
                        <button
                            className="btn-ctrl btn-ctrl-red"
                            onClick={() => deleteClassEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-trash" />Delete
                        </button>
                    </div>
                    <TableView columns={columns} rowData={processedClassList()} />
                </>    
            }
            { mode === "add" && 
                <ClassForm mode={mode} setMode={setMode} fetchClassList={fetchClassList} />
            }
            { mode === "edit" && 
                <ClassForm mode={mode} setMode={setMode} selected={getClassById(selected[0])} fetchClassList={fetchClassList} />
            }
        </div>
    );
}

export default MyClasses;