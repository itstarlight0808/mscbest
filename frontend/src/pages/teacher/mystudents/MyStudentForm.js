import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem, MenuItem, Select, TextField } from "@material-ui/core";
import { studentStatus } from "../../../utils/common";
import { searchStudentAPI } from "../../../store/slices/studentSlice";
import { addMyStudent, getAllClassGroupsAPI, updateMyStudent } from "../../../store/slices/teacherSlice";
import { addNewError } from "../../../store/slices/errorSlice";

const MyStudentForm = ({ mode, setMode, selected }) => {
    const dispatch = useDispatch();
    const { studentList } = useSelector(state => state.student);
    const { classGroups } = useSelector(state => state.teacher);

    const [email, setEmail] = useState(selected?.email ?? "");
    const [selStudent, setSelStudent] = useState(selected?.studentId ?? null);
    const [selGroup, setSelGroup] = useState(selected?.groupId ?? null);
    const [status, setStatus] = useState(selected?.status ?? 1);

    const searchStudentEvent = () => {
        dispatch(searchStudentAPI(email));
    }

    useEffect(() => {
        dispatch(getAllClassGroupsAPI);
    }, []);

    const saveStudentEvent = () => {
        if(!selStudent || !selGroup) {
            dispatch(addNewError({
                status: false,
                title: "Add Student",
                msg: "Please select Student Email & Price Group."
            }));
            return;
        }

        if(mode === "add")
            dispatch(addMyStudent({ studentId: selStudent, groupId: selGroup, status }, res => {
                setMode("view");
            }));
        else 
            dispatch(updateMyStudent({ id: selected.id, studentId: selStudent, groupId: selGroup, status }, res => {
                setMode("view");
            }));
    }

    return (
        <div className="c-mystudents-form">
            <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => setMode("view")}>
                <FontAwesomeIcon icon="fas fa-arrow-left" />
            </button>
            <div className="d-flex justify-content-center flex-fill">
                <div className="form-content">
                    <div className="student-sel-container">
                        <div className="student-search-container">
                            <TextField
                                variant="outlined"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                size="small"
                            />
                            <button className="btn-ctrl btn-ctrl-purple ms-2" onClick={() => searchStudentEvent()}>
                                <FontAwesomeIcon icon="fas fa-search" />
                            </button>
                        </div>
                        <List className="student-list-container">
                            {
                                studentList.map((one, index) => {
                                    return (
                                        <ListItem
                                            key={`stuent_${index}`}
                                            className={`student-item ${one.id === selStudent? "active": ""}`}
                                            onClick={() => setSelStudent(one.id)}
                                            button
                                        >
                                            { one.email }
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </div>
                    <div className="group-container">
                        <label>Select Price Group.</label>
                        <List className="group-list">
                            {
                                classGroups.map((one, index) => {
                                    return (
                                        <ListItem
                                            key={`group_${index}`}
                                            className={`group-item mt-2 ${selGroup === one.id? "active": ""}`}
                                            onClick={() => setSelGroup(one.id)}
                                            button
                                        >
                                            <span className="group-name">{ one.name }</span>
                                            <span className="group-price">{ one.price }€</span>
                                            { selGroup === one.id && <FontAwesomeIcon icon="fas fa-check" /> }
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                        <div className="student-status">
                            <label className="d-block">Status</label>
                            <Select
                                className="w-100 mt-1"
                                variant="outlined"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                {
                                    studentStatus.map((one, index) => {
                                        return (
                                            <MenuItem key={`status-item_${index}`} value={index}>
                                                { one.name }
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="ctrl-container">
                        <button className="btn-ctrl btn-ctrl-purple" onClick={() => saveStudentEvent()}>Save</button>
                        <button className="btn-ctrl btn-ctrl-red" onClick={() => setMode("view")}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyStudentForm;