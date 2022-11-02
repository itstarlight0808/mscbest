import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import { changeMyPassword } from "../store/slices/userSlice";

const useStyles = makeStyles(theme => ({
    dialog: {
        width: 315
    }
}))

const ChangePasswordDialog = ({ isOpen, setIsOpen }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errText, setErrText] = useState("");

    const clearErrText = () => {
        setTimeout(() => {
            setErrText("");
        }, 4000)
    }
    const changePassword = () => {
        if(!newPassword || !oldPassword) {
            setErrText("Please type correct information.");
            clearErrText();
            return;
        }
        if(newPassword !== confirmPassword) {
            setErrText("New password and Confirm password are not equal.");
            clearErrText();
            return;
        }

        dispatch(changeMyPassword({ oldPassword, password: newPassword }));
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent className={classes.dialog}>
                <label className="d-block">Old Password</label>
                <TextField
                    className="m-2"
                    variant="outlined"
                    size="small"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    type="password"
                    required
                />
                <label className="d-block">New Password</label>
                <TextField
                    className="m-2"
                    variant="outlined"
                    size="small"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    type="password"
                    required
                />
                <label className="d-block">Confirm Password</label>
                <TextField
                    className="m-2"
                    variant="outlined"
                    size="small"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    type="password"
                    required
                />
                { errText && <Alert severity="error">{ errText }</Alert> }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => changePassword()} variant="contained" color="primary">
                    Save
                </Button>
                <Button onClick={() => setIsOpen(false)} variant="contained" color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChangePasswordDialog;