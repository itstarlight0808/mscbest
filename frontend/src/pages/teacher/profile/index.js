import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";

import { CONFIG } from "../../../config/index";
import { updateMyProfile } from "../../../store/slices/userSlice";
import { updateStudioSetting } from "../../../store/slices/settingSlice";
import ChangePasswordDialog from "../../../components/ChangePasswordDialog";

const Profile = props => {
    const dispatch = useDispatch();
    const { userInfo, userLocale } = useSelector(state => state.user);
    const studioSetting = useSelector(state => state.setting.studio);

    const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [email, setEmail] = useState(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(userInfo.avatar? `${CONFIG.serverPath}${userInfo.avatar}`: "");
    const selFile = useRef();
    const avatarChangeEvent = e => {
        const files = e.target.files;

        if(!files.length)
            return;
        setAvatar(files[0]);
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setAvatarPreview(reader.result);
        })

        reader.readAsDataURL(files[0]);
    }
    const [showActiveStudents, setShowActiveStudents] = useState(false);
    const [showMonthlyIncome, setShowMonthlyIncome] = useState(false);
    const [showPaymentsReceived, setShowPaymentsReceived] = useState(false);
    const [notifyStudentSignupForEvent, setNotifyStudentSignupForEvent] = useState(false);
    const [notifyStudentCancelForEvent, setNotifyStudentCancelForEvent] = useState(false);

    useEffect(() => {
        setShowActiveStudents(studioSetting.showActiveStudents);
        setShowMonthlyIncome(studioSetting.showMonthlyIncome);
        setShowPaymentsReceived(studioSetting.showPaymentsReceived);
        setNotifyStudentSignupForEvent(studioSetting.notifyStudentSignupForEvent);
        setNotifyStudentCancelForEvent(studioSetting.notifyStudentCancelForEvent);
    }, [ studioSetting ])

    const saveProfile = e => {
        e.preventDefault();

        const params = {
            firstName, lastName, phoneNumber: phoneNumber ?? "",
            setting: { showActiveStudents, showMonthlyIncome, showPaymentsReceived, notifyStudentSignupForEvent, notifyStudentCancelForEvent }
        };
        const formData = new FormData();
        if(avatar)
            formData.append("avatar", avatar);
        formData.append("params", JSON.stringify(params));

        dispatch(updateMyProfile(formData, res => {
            dispatch(updateStudioSetting(params.setting));
        }));

    }
    return (
        <>
            <form onSubmit={e => saveProfile(e)} className="p-user-profile">
                <div className="profile-content">
                    <div className="avatar-container" onClick={() => selFile.current.click()}>
                        { avatarPreview? <Avatar src={avatarPreview} />
                            : <FontAwesomeIcon icon="fas fa-user-tie" /> }
                        <input type="file" ref={selFile} onChange={e => avatarChangeEvent(e)} accept="image/jpeg, image/png" hidden />
                    </div>
                    <div className="form-group">
                        <div className="name-container">
                            <label className="d-block required">First Name</label>
                            <TextField
                                className="text-input"
                                variant="outlined"
                                size="small"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                            <label className="d-block required">Last Name</label>
                            <TextField
                                className="text-input"
                                variant="outlined"
                                size="small"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="contact-info">
                            <label className="d-block required">Email Address</label>
                            <TextField
                                className="text-input"
                                variant="outlined"
                                size="small"
                                value={email}
                            />
                            <label className="d-block">Phone Number</label>
                            <PhoneInput
                                id="mobile-number"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={userLocale.country_code}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                            />
                        </div>
                    </div>
                </div>
                <div className="settings-container">
                    <div>
                        <label className="d-block">Dashboard Setup</label>
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={showActiveStudents === 1} onChange={e => setShowActiveStudents(e.target.checked? 1: 0)} />}
                            label="Show Number of Active Students"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={showMonthlyIncome === 1} onChange={e => setShowMonthlyIncome(e.target.checked? 1: 0)} />}
                            label="Show Monthly Income (Projected)"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={showPaymentsReceived === 1} onChange={e => setShowPaymentsReceived(e.target.checked? 1: 0)} />}
                            label="Show Payments received this Month"
                        />
                    </div>
                    <div>
                        <label className="d-block">Notification Setup</label>
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={notifyStudentSignupForEvent === 1} onChange={e => setNotifyStudentSignupForEvent(e.target.checked? 1: 0)} />}
                            label="Notify when Student signup for an Event via the Student Portal"
                        />
                        <FormControlLabel 
                            control={<Checkbox color="primary" checked={notifyStudentCancelForEvent === 1} onChange={e => setNotifyStudentCancelForEvent(e.target.checked? 1: 0)} />}
                            label="Notify when Student Cancel an Event via the Student Portal"
                        />
                    </div>
                </div>
                <div className="ctrl-container">
                    <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => setIsPassDialogOpen(true)}>Change Password</button>
                    <button type="submit" className="btn-ctrl btn-ctrl-purple">Save Options</button>
                </div>
            </form>
            <ChangePasswordDialog isOpen={isPassDialogOpen} setIsOpen={setIsPassDialogOpen} />
        </>
    )
}

export default Profile;