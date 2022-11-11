import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getMyTeachersAPI } from "../../../store/slices/studentSlice";

const ContactInfo = props => {
    const dispatch = useDispatch();

    const [teacherList, setTeacherList] = useState([]);
console.log(teacherList)
    useEffect(() => {
        dispatch(getMyTeachersAPI(res => {
            setTeacherList(res.data);
        }))
    }, []);

    return (
        <div className="p-contact-info">
            <Accordion defaultActiveKey={0}>
                {
                    teacherList.map((one, index) => {
                        let className = one.classes.map(cl => cl.className).join(", ")
                        return (
                            <Accordion.Item key={`teacher_${index}`} eventKey={index}>
                                <Accordion.Header>{ `${one.firstName} ${one.lastName}` }</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <label className="me-2">Class Name: </label><span>{ className }</span>
                                    </div>
                                    <div>
                                        <label className="me-2">Email: </label><span>{ one.email }</span>
                                    </div>
                                    <div>
                                        <label className="me-2">Phone Number: </label><span>{ one.phoneNumber }</span>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default ContactInfo;