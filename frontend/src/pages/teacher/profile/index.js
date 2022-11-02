import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";

import { CONFIG } from "../../../config/index";
import { updateMyProfile } from "../../../store/slices/userSlice";
import ChangePasswordDialog from "../../../components/ChangePasswordDialog";

const Profile = props => {
    const dispatch = useDispatch();
    const { userInfo, userLocale } = useSelector(state => state.user);

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

    const saveProfile = e => {
        e.preventDefault();

        const params = {
            firstName, lastName, phoneNumber: phoneNumber ?? ""
        };
        const formData = new FormData();
        if(avatar)
            formData.append("avatar", avatar);
        formData.append("params", JSON.stringify(params));

        dispatch(updateMyProfile(formData));

    }
    return (
        <>
            <form onSubmit={e => saveProfile(e)} className="p-student-profile">
                <div className="profile-content">
                    <div className="avatar-container" onClick={() => selFile.current.click()}>
                        { avatarPreview? <Avatar src={avatarPreview} />
                            : <FontAwesomeIcon icon="fas fa-user-tie" /> }
                        <input type="file" ref={selFile} onChange={e => avatarChangeEvent(e)} accept="image/jpeg, image/png" hidden />
                    </div>
                    <div className="form-group">
                        <div className="name-container">
                            <label className="d-block">First Name</label>
                            <TextField
                                className="text-input"
                                variant="outlined"
                                size="small"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                            <label className="d-block">Last Name</label>
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
                            <label className="d-block">Email Address</label>
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
                <div className="ctrl-container">
                    <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => setIsPassDialogOpen(true)}>Change Password</button>
                    <button type="submit" className="btn-ctrl btn-ctrl-purple">Save</button>
                </div>
            </form>
            <ChangePasswordDialog isOpen={isPassDialogOpen} setIsOpen={setIsPassDialogOpen} />
        </>
    )
}

export default Profile;