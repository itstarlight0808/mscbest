import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Checkbox, TextField, InputAdornment } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { CONFIG } from "../../../config/index";

import NoImage from "../../../assets/images/no_image1x1.png";
import { getTeacherBioSettingAPI, updateTeacherBioSettingAPI } from "../../../store/slices/settingSlice";
import { getClassListAPI } from "../../../store/slices/classSlice";

const socialLinks = [
    { label: "Facebook", checkbox: "hasFacebook", input: "facebook" },
    { label: "Instagram", checkbox: "hasInstagram", input: "instagram" },
    { label: "Linkedin", checkbox: "hasLinkedin", input: "linkedin" },
    { label: "Webpage", checkbox: "hasWebpage", input: "webpage" },
]
const TeacherBio = props => {
    const dispatch = useDispatch();
    const { classList } = useSelector(state => state.classes);

    const selFile = useRef();
    const [headshotPreview, setHeadshotPreview] = useState(null);
    const [headshot, setHeadshot] = useState(null);
    const [data, setData] = useState({});

    const changeHeadshotEvent = e => {
        const files = e.target.files;
        if(!files.length)
            return;
        setHeadshot(files[0]);

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setHeadshotPreview(reader.result);
        })

        reader.readAsDataURL(files[0]);
    }
    const resetHeadshotEvent = () => {
        setHeadshotPreview(null);
        setHeadshot(null);
    }

    useEffect(() => {
        dispatch(getTeacherBioSettingAPI(res => {
            const { headshot, ...data } = res.data;
            headshot && setHeadshotPreview(`${CONFIG.serverPath}${headshot}`);
            setData(data);
        }))
        dispatch(getClassListAPI);
    }, [])

    const handleInputChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleCheckChange = e => {
        setData({ ...data, [e.target.name]: e.target.checked? 1: 0 });
    }
    const saveOptions = e => {
        e.preventDefault();

        console.log(data);
        const params = { ...data };
        const formdata = new FormData();
        if(headshot)
            formdata.append("headshot", headshot);
        if(!headshotPreview)
            params.headshot = "";
        formdata.append("params", JSON.stringify(params));

        dispatch(updateTeacherBioSettingAPI(formdata));
    }
    return (
        <form className="p-teacher-bio" onSubmit={(e) => saveOptions(e)}>
            <div className="teacher-info-container">
                <div className="headshot-container">
                    <label className="d-block">Headshot</label>
                    <div className="img-container mb-2" onClick={() => selFile.current.click()}>
                        <input ref={selFile} type="file" hidden onChange={e => changeHeadshotEvent(e)} accept="image/png, image/jpeg" />
                        <img src={headshotPreview? headshotPreview: NoImage} />
                    </div>
                    <p className="hint">1920x1080 is required by default.</p>
                    <div className="ctrl-container">
                        <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => selFile.current.click()}>Change</button>
                        <button type="button" className="btn-ctrl btn-ctrl-red" onClick={() => resetHeadshotEvent()}>Reset</button>
                    </div>
                </div>
                <div className="bio-container">
                    <label className="d-block required">Bio</label>
                    <TextField
                        multiline
                        minRows={5}
                        variant="outlined"
                        className="text-input"
                        name="bio"
                        value={data.bio ?? ""}
                        onChange={e => handleInputChange(e)}
                        required
                    />
                </div>
            </div>
            <div className="class-list-container">
                <div className="title">
                    <label>Classes</label>
                    <span className="d-block">(represent a short summary of all classes you offering, this information will be presented on Classes page.)</span>
                </div>
                <div className="class-list">
                    <Accordion className="common-accordion" defaultActiveKey={0}>
                        {
                            classList.map((one, index) => {
                                return (
                                    <Accordion.Item key={`class_item_${index}`} eventKey={index}>
                                        <Accordion.Header>{ one.name }</Accordion.Header>
                                        <Accordion.Body>
                                            { one.description }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
            <div className="social-link-container">
                <label className="d-block">Social</label>
                <div className="social-link-list">
                    {
                        socialLinks.map((one, index) => {
                            return (
                                <div className="social-link" key={`social_link_${index}`}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name={one.checkbox}
                                                color="primary"
                                                checked={data[one.checkbox] === 1}
                                                onChange={e => handleCheckChange(e)}
                                            />
                                        }
                                        label={one.label}
                                    />
                                    <TextField
                                        className="text-input"
                                        variant="outlined"
                                        size="small"
                                        placeholder="(Not Specified)"
                                        name={one.input}
                                        value={data[one.input] ?? ""}
                                        onChange={e => handleInputChange(e)}
                                        disabled={!data[one.checkbox]}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn-ctrl btn-ctrl-purple"><FontAwesomeIcon icon="fas fa-save"/>Save</button>
            </div>
        </form>
    )
}

export default TeacherBio;