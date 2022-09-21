import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Checkbox, TextField, Select, MenuItem, InputAdornment, OutlinedInput, Chip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addNewError } from "../../../store/slices/errorSlice";
import { classLevel } from "../../../utils/common";
import { CONFIG } from "../../../config/index";

import httpClient from "../../../utils/http-client";
import NoImage from "../../../assets/images/no_image1x1.png";

const ClassForm = props => {
    const dispatch = useDispatch();
    const selFile = useRef();

    const [name, setName] = useState(props.selected?.name ?? "");
    const [type, setType] = useState(props.selected?.type ?? 1);
    const [description, setDescription] = useState(props.selected?.description ?? "");
    const [shortDescription, setShortDescription] = useState(props.selected?.shortDescription ?? "");
    const [banner, setBanner] = useState("");
    const [bannerPreview, setBannerPreview] = useState((props.selected?.banner)? `${CONFIG.serverPath}${props.selected.banner}`:null);
    const changeBannerEvent = e => {
        let file = e.target.files;
        if(!file.length)
            return;
        setBanner(file[0]);

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setBannerPreview(reader.result);
        });
        reader.readAsDataURL(file[0]);
    }
    const resetBannerEvent = () => {
        setBanner("");
        setBannerPreview(null);
    }

    const [videolink1, setVideolink1] = useState(props.selected?.videolink1 ?? "");
    const [videolink2, setVideolink2] = useState(props.selected?.videolink2 ?? "");
    const [structure, setStructure] = useState(props.selected?.structure ?? []);
    const addStructureEvent = () => {
        setStructure([...structure, { name: "", description: "" }]);
    }
    const delStructureEvent = (index) => {
        let tmp = [...structure];
        tmp.splice(index, 1);
        setStructure(tmp);
    }
    const changeStructureNameEvent = (value, index) => {
        let tmp = [...structure];
        tmp[index].name = value;
        setStructure(tmp);
    }
    const changeStructureDescriptionEvent = (value, index) => {
        let tmp = [...structure];
        tmp[index].description = value;
        setStructure(tmp);
    }

    const [hasPolicy, setHasPolicy] = useState(props.selected?.hasPolicy ?? false);
    const [policy, setPolicy] = useState(props.selected?.policy ?? "");
    const [level, setLevel] = useState(props.selected?.level ?? []);
    const [groups, setGroups] = useState(props.selected?.groups ?? []);
    const addGroupEvent = () => {
        setGroups([...groups, { name: "", price: "" }]);
    }
    const delGroupEvent = (index) => {
        let tmp = [...groups];
        tmp.splice(index, 1);
        setGroups(tmp);
    }
    const changeGroupNameEvent = (value, index) => {
        let tmp = [...groups];
        tmp[index].name = value;
        setGroups(tmp);
    }
    const changeGroupPriceEvent = (value, index) => {
        let tmp = [...groups];
        tmp[index].price = value;
        setGroups(tmp);
    }

    const [numberOfParticipants, setNumberOfParticipants] = useState(props.selected?.numberOfParticipants ?? 1);
    const [lengthDescription, setLengthDescription] = useState(props.selected?.lengthDescription ?? "");
    const [participants, setParticipants] = useState(props.selected?.participants ?? "");
console.log(props)
    const saveClass = (e) => {
        e.preventDefault();

        if(!level.length) {
            dispatch(addNewError({
                status: false,
                title: "Adding Class",
                msg: "Class Level Required!"
            }))
            return;
        }
        const postData = {
            name,
            type,
            description,
            shortDescription,
            videolink1,
            videolink2,
            structure,
            hasPolicy,
            policy,
            level: level.join(","),
            groups,
            numberOfParticipants,
            lengthDescription,
            participants
        }
        if(!bannerPreview)
            postData.banner = "";
        const formData = new FormData();
        if(banner)
            formData.append("banner", banner);
        formData.append("params", JSON.stringify(postData));

        if(props.mode === "add")
            httpClient.post("/classes", formData).then(res => {
                if(res.status === 200) {
                    props.fetchClassList();
                    props.setMode("view");
                    dispatch(addNewError({
                        status: true,
                        title: "Adding Class",
                        msg: "Success!"
                    }))
                }
            }, error => {
                dispatch(addNewError({
                    status: false,
                    title: "Adding Class",
                    msg: "Error Occurs!"
                }))
            })
        else {
            httpClient.put(`/classes/${props.selected.id}`, formData).then(res => {
                if(res.status === 200) {
                    props.fetchClassList();
                    props.setMode("view");
                    dispatch(addNewError({
                        status: true,
                        title: "Updating Class",
                        msg: "Success!"
                    }))
                }
            }, error => {
                dispatch(addNewError({
                    status: false,
                    title: "Updating Class",
                    msg: "Error Occurs!"
                }))
            })
        }
    }
    return (
        <form className="class-form-container" onSubmit={(e) => saveClass(e)}>
            <div className="c-sec-1">
                <button type="button" className="btn-ctrl btn-ctrl-purple back-btn" onClick={() => props.setMode("view")}>
                    <FontAwesomeIcon icon="fas fa-arrow-left" />
                </button>
                <div className="name-form-ctrl">
                    <label className="d-block required">Class Name</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="type-form-ctrl">
                    <label className="d-block required">Class Type</label>
                    <Select
                        className="sel-input"
                        variant="outlined"
                        size="small"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <MenuItem value={0}>Private Class</MenuItem>
                        <MenuItem value={1}>Normal Class</MenuItem>
                        <MenuItem value={2}>Master Class</MenuItem>
                        <MenuItem value={3}>Bootcamp</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="c-sec-2">
                <div className="banner-container">
                    <label className="d-block required">Class Banner</label>
                    <div className="img-container mb-3" onClick={() => selFile.current.click()}>
                        <input ref={selFile} type="file" hidden onChange={e => changeBannerEvent(e)} accept="image/png, image/jpeg" />
                        <img src={bannerPreview? bannerPreview: NoImage} />
                    </div>
                    <div className="ctrl-container">
                        <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => selFile.current.click()}>Change</button>
                        <button type="button" className="btn-ctrl btn-ctrl-red" onClick={() => resetBannerEvent()}>Reset</button>
                    </div>
                </div>
                <div className="description-container">
                    <label className="d-block required">Class Full Description</label>
                    <TextField
                        multiline
                        minRows={4}
                        variant="outlined"
                        className="text-input"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <label className="d-block required">Class Short Description</label>
                    <TextField
                        multiline
                        minRows={4}
                        variant="outlined"
                        className="text-input"
                        value={shortDescription}
                        onChange={e => setShortDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="c-sec-3">
                <div className="video-link">
                    <label className="d-block">Class Video Link 1</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        placeholder="https://www.yourvideo.com/link"
                        value={videolink1}
                        onChange={e => setVideolink1(e.target.value)}
                    />
                </div>
                <div className="video-link">
                    <label className="d-block">Class Video Link 2</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        placeholder="https://www.yourvideo.com/link"
                        value={videolink2}
                        onChange={e => setVideolink2(e.target.value)}
                    />
                </div>
            </div>
            <div className="structure-container">
                <div className="title">
                    <label>Class Structure</label>
                </div>
                <div className="content">
                    {
                        structure.map((one, index) => {
                            return (
                                <div className="d-flex gap-3 mt-3" key={`structure_${index}`}>
                                    <button type="button" className="btn-ctrl btn-ctrl-red del-btn" onClick={() => delStructureEvent(index)}>
                                        <FontAwesomeIcon icon="fas fa-xmark" />
                                    </button>
                                    <div className="flex-grow-1">
                                        <TextField
                                            className="text-input"
                                            variant="outlined"
                                            placeholder="Name Here"
                                            value={one.name}
                                            onChange={e => changeStructureNameEvent(e.target.value, index)}
                                        />
                                        <TextField
                                            className="text-input mt-1"
                                            variant="outlined"
                                            placeholder="Description Here"
                                            multiline
                                            minRows={4}
                                            value={one.description}
                                            onChange={e => changeStructureDescriptionEvent(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button type="button" className="btn-ctrl btn-ctrl-purple mt-2" onClick={() => addStructureEvent()}><FontAwesomeIcon icon="fas fa-plus"/></button>
                </div>
            </div>
            <div className="c-sec-4">
                <div className="ctrl-container">
                    <FormControlLabel
                        label="Class Specific Policy"
                        control={
                            <Checkbox
                                color="primary"
                                checked={hasPolicy}
                                onChange={e => setHasPolicy(e.target.checked)}
                            />
                        }
                    />
                    <p>
                        Use this page to define your class specific policies. This policies will only be valid for this specific class. 
                        if class policies are not activated then your studio policies will be in place.
                    </p>
                </div>
                <div className="description">
                    <label className="d-block">Class Specific Policy Text (Optional)</label>
                    <TextField
                        className="text-input"
                        variant={!hasPolicy? "filled": "outlined"}
                        multiline
                        minRows={5}
                        value={policy}
                        onChange={e => setPolicy(e.target.value)}
                        disabled={!hasPolicy}
                    />
                </div>
            </div>
            <div className="c-sec-5">
                <div className="level-ctrl">
                    <label className="d-block required">Class Level</label>
                    <Select
                        className="sel-level"
                        variant="outlined"
                        multiple
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        renderValue={selItems => (
                            <div className="d-flex flex-wrap">
                                {
                                    selItems.map((value) => (
                                        <Chip key={classLevel[value]} label={classLevel[value]} className="m-2" color="primary" />
                                    ))
                                }
                            </div>
                        )}
                    >
                        <MenuItem value="0">Beginner</MenuItem>
                        <MenuItem value="1">College Prep</MenuItem>
                        <MenuItem value="2">College Student</MenuItem>
                        <MenuItem value="3">Advanced</MenuItem>
                        <MenuItem value="4">Professional</MenuItem>
                    </Select>
                </div>
                <div className="group-container">
                    {
                        groups.map((group, index) => (
                            <div key={`group_`+index} className="mt-2">
                                <label className="d-block">{`Price ${index + 1}`}</label>
                                <div className="group-item mt-2">
                                    <button type="button" className="btn-ctrl btn-ctrl-red del-btn" onClick={() => delGroupEvent(index)}>
                                        <FontAwesomeIcon icon="fas fa-xmark" />
                                    </button>
                                    <TextField
                                        className="group-name"
                                        variant="outlined"
                                        size="small"
                                        placeholder="Name"
                                        value={group.name}
                                        onChange={e => changeGroupNameEvent(e.target.value, index)}
                                    />
                                    <OutlinedInput
                                        className="group-price"
                                        variant="outlined"
                                        placeholder="Price"
                                        endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                        aria-describedby="group price"
                                        inputProps={{
                                            'aria-label': 'group-price',
                                        }}
                                        type="number"
                                        value={group.price}
                                        onChange={e => changeGroupPriceEvent(e.target.value, index)}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <button type="button" className="btn-ctrl btn-ctrl-purple ms-2 mt-2" onClick={addGroupEvent}><FontAwesomeIcon icon="fas fa-plus"/></button>
                </div>
            </div>
            <div className="number-of-participants">
                <label className="d-block">Number of Participants</label>
                <TextField
                    className="text-input"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={numberOfParticipants}
                    onChange={e => setNumberOfParticipants(e.target.value)}
                />
            </div>
            <div className="c-sec-6">
                <div className="length-ctrl">
                    <label className="d-block">Class Length</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        multiline
                        minRows={4}
                        value={lengthDescription}
                        onChange={e => setLengthDescription(e.target.value)}
                    />
                </div>
                <div className="participants-ctrl">
                    <label className="d-block">Class Participants</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        multiline
                        minRows={4}
                        value={participants}
                        onChange={e => setParticipants(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn-ctrl btn-ctrl-purple"><FontAwesomeIcon icon="fas fa-save"/>Save</button>
                <button type="button" className="btn-ctrl btn-ctrl-red ms-3" onClick={() => props.setMode("view")}><FontAwesomeIcon icon="fas fa-xmark" />Cancel</button>
            </div>
        </form>
    )
}

export default ClassForm;