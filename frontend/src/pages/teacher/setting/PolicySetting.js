import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, TextField, Typography } from "@material-ui/core";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateStudioSettingAPI } from "../../../store/slices/settingSlice";

const PolicySetting = props => {
    const dispatch = useDispatch();
    const studioSetting = useSelector(state => state.setting.studio);

    const [cancelPolicy, setCancelPolicy] = useState(studioSetting.cancelPolicy ?? "");
    const [hasClassSignupDeadline, setHasClassSignupDeadline] = useState(studioSetting.hasClassSignupDeadline);
    const [classSignupDeadline, setClassSignupDeadline] = useState(studioSetting.classSignupDeadline);
    const [hasClassCancelDeadline, setHasClassCancelDeadline] = useState(studioSetting.hasClassCancelDeadline);
    const [classCancelDeadline, setClassCancelDeadline] = useState(studioSetting.classCancelDeadline);

    const [notifyStudentSignupForEvent, setNotifyStudentSignupForEvent] = useState(studioSetting.notifyStudentSignupForEvent);
    const [notifyStudentCancelForEvent, setNotifyStudentCancelForEvent] = useState(studioSetting.notifyStudentCancelForEvent);

    const cancelActionsBeforeDeadline = useMemo(() => [
        { label: "Remove Student from Attendee List", value: 0 },
        { label: "Absent, Notice Given", value: 1 },
        { label: "Absent, Give Make-Up Credit (€)", value: 2 },
    ], [])
    const cancelActionsAfterDeadline = useMemo(() => [
        { label: "Remove Student from Attendee List", value: 0 },
        { label: "Absent, Notice Given", value: 1 },
        { label: "Absent, Give Make-Up Credit (€)", value: 2 },
    ], [])

    const [cancelActionBeforeDeadline, setCancelActionBeforeDeadline] = useState(studioSetting.cancelActionBeforeDeadline);
    const [cancelActionAfterDeadline, setCancelActionAfterDeadline] = useState(studioSetting.cancelActionAfterDeadline);
    const [makeCancelCreditBeforeDeadline, setMakeCancelCreditBeforeDeadline] = useState(studioSetting.makeCancelCreditBeforeDeadline);
    const [makeCancelCreditAfterDeadline, setMakeCancelCreditAfterDeadline] = useState(studioSetting.makeCancelCreditAfterDeadline);

    const [hasMakeupCreditLimit, setHasMakeupCreditLimit] = useState(studioSetting.hasMakeupCreditLimit);
    const [makeupCreditLimit, setMakeupCreditLimit] = useState(studioSetting.makeupCreditLimit);
    const [hasCreditExpire, setHasCreditExpire] = useState(studioSetting.hasCreditExpire);
    const [creditExpireDeadline, setCreditExpireDeadline] = useState(studioSetting.creditExpireDeadline);

    const getCancelActionBeforeOption = value => {
        return cancelActionsBeforeDeadline.find(one => one.value === value);
    }
    const getCancelActionAfterOption = value => {
        return cancelActionsBeforeDeadline.find(one => one.value === value);
    }
    const saveOptions = e => {
        e.preventDefault();

        const params = {
            cancelPolicy,
            hasClassSignupDeadline,
            classSignupDeadline,
            hasClassCancelDeadline,
            classCancelDeadline,
            cancelActionBeforeDeadline: cancelActionBeforeDeadline.value,
            makeCancelCreditBeforeDeadline,
            cancelActionAfterDeadline: cancelActionAfterDeadline.value,
            makeCancelCreditAfterDeadline,
            hasMakeupCreditLimit,
            makeupCreditLimit,
            hasCreditExpire,
            creditExpireDeadline,
            notifyStudentSignupForEvent,
            notifyStudentCancelForEvent
        }

        dispatch(updateStudioSettingAPI(params));
    }
    return (
        <form className="p-policy-setting-container" onSubmit={e => saveOptions(e)}>
            <h4>Policy Settings</h4>
            <div className="cancellation-policy-container">
                <div>
                    <label className="d-block">Cancellation Policy</label>
                    <Typography className="hint-description">
                        Use this page to define your personal studio cancellation policy. The settings below allow you to specify 
                        the default action that MusicalBEST platform will take if your students cancel lessons through the Student Portal.
                        As the teacher, you can always change the student's attendance at your discretion.
                    </Typography>
                </div>
                <div>
                    <label className="d-block">Cancellation Policy Text(Optional)</label>
                    <TextField 
                        multiline
                        minRows={5}
                        variant="outlined"
                        className="text-input"
                        name="cancelPolicy"
                        value={cancelPolicy ?? ""}
                        onChange={e => setCancelPolicy(e.target.value)}
                    />
                </div>
            </div>
            <label className="mt-2"><b>Studio Deadline Settings</b> (This applies to all of your classes. You can also add specific settings for individual classes under “Class Deadline Settings.” Specific Class settings will override the Studio settings.)</label>
            <div className="deadline-setting-container">
                <div>
                    <label className="d-block">Sign Up Deadline</label>
                    <div className="policy-custom-card">
                        <FormControlLabel
                            label="Allow Class Sign Up"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="hasClassSignupDeadline"
                                    checked={hasClassSignupDeadline === 1}
                                    onChange={e => setHasClassSignupDeadline(e.target.checked? 1: 0)}
                                />
                            }
                        />
                        <div>
                            <label>up to</label>
                            <TextField
                                className="number-input"
                                size="small"
                                variant="outlined"
                                name="classSignupDeadline"
                                value={classSignupDeadline}
                                onChange={e => setClassSignupDeadline(e.target.value)}
                                disabled={!hasClassSignupDeadline}
                            />
                            <label>hours before class start</label>
                        </div>
                        <FormControlLabel
                            label="In-App Notification when a Sign-Up occurs"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="notifyStudentSignupForEvent"
                                    checked={notifyStudentSignupForEvent === 1}
                                    onChange={e => setNotifyStudentSignupForEvent(e.target.checked? 1: 0)}
                                />
                            }
                        />
                    </div>
                </div>
                <div>
                    <label className="d-block">Cancellation Deadline</label>
                    <div className="policy-custom-card">
                        <FormControlLabel
                            label="Allow Class Cancellation"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="hasClassCancelDeadline"
                                    checked={hasClassCancelDeadline === 1}
                                    onChange={e => setHasClassCancelDeadline(e.target.checked? 1: 0)}
                                />
                            }
                        />
                        <div>
                            <label>up to</label>
                            <TextField
                                className="number-input"
                                size="small"
                                variant="outlined"
                                name="classCancelDeadline"
                                value={classCancelDeadline}
                                onChange={e => setClassCancelDeadline(e.target.value)}
                                disabled={!hasClassCancelDeadline}
                            />
                            <label>hours before class start</label>
                        </div>
                        <FormControlLabel
                            label="In-App Notification when a Cancellation occurs"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="notifyStudentCancelForEvent"
                                    checked={notifyStudentCancelForEvent === 1}
                                    onChange={e => setNotifyStudentCancelForEvent(e.target.checked? 1: 0)}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="deadline-action-container">
                <div>
                    <label className="d-block">Before Deadline</label>
                    <Typography className="hint-description">
                        This is what happens if an attendee cancels an event (such as a lesson) BEFORE the deadline has passed.
                    </Typography>
                </div>
                <div>
                    <label className="d-block">Action</label>
                    <Select
                        isSearchable={false}
                        options={cancelActionsBeforeDeadline}
                        value={getCancelActionBeforeOption(cancelActionBeforeDeadline)}
                        onChange={option => setCancelActionBeforeDeadline(option)}
                    />
                    <FormControlLabel
                        label="Create make-up Credit"
                        control={
                            <Checkbox
                                color="primary"
                                name="makeCancelCreditBeforeDeadline"
                                checked={makeCancelCreditBeforeDeadline === 1}
                                onChange={e => setMakeCancelCreditBeforeDeadline(e.target.checked? 1: 0)}
                            />
                        }
                    />
                </div>
            </div>
            <div className="deadline-action-container">
                <div>
                    <label className="d-block">After Deadline</label>
                    <Typography className="hint-description">
                        This is what happens if an attendee cancels an event (such as a lesson) AFTER the deadline has passed.
                    </Typography>
                </div>
                <div>
                    <label className="d-block">Action</label>
                    <Select
                        isSearchable={false}
                        options={cancelActionsAfterDeadline}
                        value={getCancelActionAfterOption(cancelActionAfterDeadline)}
                        onChange={option => setCancelActionAfterDeadline(option)}
                    />
                    <FormControlLabel
                        label="Create make-up Credit"
                        control={
                            <Checkbox
                                color="primary"
                                name="makeCancelCreditAfterDeadline"
                                checked={makeCancelCreditAfterDeadline === 1}
                                onChange={e => setMakeCancelCreditAfterDeadline(e.target.checked? 1: 0)}
                            />
                        }
                    />
                </div>
            </div>
            <label className="d-block">Make-Up Credits</label>
            <div className="make-up-credit-container">
                <div>
                    <label className="d-block">Limitation</label>
                    <div className="policy-custom-card">
                        <FormControlLabel
                            label="Limit Max. Number of Make-Up Credits"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="hasMakeupCreditLimit"
                                    checked={hasMakeupCreditLimit === 1}
                                    onChange={e => setHasMakeupCreditLimit(e.target.checked? 1: 0)}
                                />
                            }
                        />
                        <div>
                            <label>up to</label>
                            <TextField
                                className="number-input"
                                size="small"
                                variant="outlined"
                                name="makeupCreditLimit"
                                value={makeupCreditLimit}
                                onChange={e => setMakeupCreditLimit(e.target.value)}
                                disabled={!hasMakeupCreditLimit}
                            />
                            <label>max number of credits</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="d-block">Expiration</label>
                    <div className="policy-custom-card">
                        <FormControlLabel
                            label="Expire Unused Make-Up Credits"
                            control={
                                <Checkbox
                                    color="primary"
                                    name="hasCreditExpire"
                                    checked={hasCreditExpire === 1}
                                    onChange={e => setHasCreditExpire(e.target.checked? 1: 0)}
                                />
                            }
                        />
                        <div>
                            <label>after</label>
                            <TextField
                                className="number-input"
                                size="small"
                                variant="outlined"
                                name="creditExpireDeadline"
                                value={creditExpireDeadline}
                                onChange={e => setCreditExpireDeadline(e.target.value)}
                                disabled={!hasCreditExpire}
                            />
                            <label>days</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn-ctrl btn-ctrl-purple"><FontAwesomeIcon icon="fas fa-save"/>Save Options</button>
            </div>
        </form>
    )
}

export default PolicySetting;