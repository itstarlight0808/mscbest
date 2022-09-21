import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";

import TableView from "../../../components/TableView";
import { getMyStudents } from "../../../store/slices/teacherSlice";
import { addNewError } from "../../../store/slices/errorSlice";
import { studentStatus } from "../../../utils/common";
import httpClient from "../../../utils/http-client";
import { RootContext } from "../../../App";

const MyStudents = props => {
    const rootContext = useContext(RootContext);
    const dispatch = useDispatch();
    const { myStudents } = useSelector(state => state.teacher);

    const [mode, setMode] = useState("view");
    const [selected, setSelected] = useState([]);
    const columns = useMemo(() => ([
        {
            label: "id",
            name: "id",
            hidden: true
        },
        {
            label: "Student Name",
            name: "name"
        },
        {
            label: "E-mail",
            name: "email"
        },
        {
            label: "Price/Class",
            name: "price"
        },
        {
            label: "Student Since",
            name: "createdAt"
        },
        {
            label: "Class Group",
            name: "groupName"
        },
        {
            label: "Status",
            name: "status"
        },
        {
            label: "Profile",
            name: "profile"
        }
    ]), []);

    useEffect(() => {
        dispatch(getMyStudents);
    }, [])

    const processMyStudentsData = useCallback(() => {
        let result = myStudents.map(one => {
            return {
                ...one,
                price: one.price + "€",
                createdAt: moment(one.createdAt).format("YYYY-MM-DD"),
                status: studentStatus[one.status].name,
                profile: <FontAwesomeIcon icon="far fa-file-lines" className="detail-view" />
            }
        });

        return result;
    }, [myStudents]);

    const editStudentEvent = () => {
        if(!rootContext.context["students"] || (rootContext.context["students"] && !rootContext.context["students"].selected.length)) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "No Selected Rows!"
            }));
            return;
        }
        if(rootContext.context["students"].selected.length > 1) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "Select only one row to edit!"
            }));
            return;
        }
        setSelected(rootContext.context["students"].selected);
        setMode("edit");
    }
    const deleteStudentEvent = () => {
        let selected = rootContext.context["students"]?.selected ?? [];

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
                        httpClient.post("/teachers/deleteMyStudents", {ids: selected}).then(res => {
                            dispatch(getMyStudents);
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
                        {/* <button
                            className="btn-ctrl btn-ctrl-purple"
                            onClick={() => setMode("add")}
                        >
                            <FontAwesomeIcon icon="fas fa-plus" />Add
                        </button>
                        <button
                            className="btn-ctrl btn-ctrl-purple mx-2"
                            onClick={() => editStudentEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-pen-to-square" />Edit
                        </button> */}
                        <button
                            className="btn-ctrl btn-ctrl-red"
                            onClick={() => deleteStudentEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-trash" />Delete
                        </button>
                    </div>
                    <TableView id="students" editable={true} columns={columns} rowData={processMyStudentsData()} />
                </>
            }
        </div>
    )
}

export default MyStudents;