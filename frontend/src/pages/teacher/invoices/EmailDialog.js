import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
     Grid, TextField} from "@material-ui/core";
import Select from "react-select";
import moment from "moment";
import { sendInvoiceMailAPI } from "../../../store/slices/invoiceSlice";

const EmailDialog = ({ open, setOpen, selected }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const { studio } = useSelector(state => state.setting);

    const [fromOptions, setFromOptions] = useState([]);
    const [from, setFrom] = useState(null);
    const typeOptions = useMemo(() => {
        return [{ label: "Invoice", value: 0 }, { label: "Reminder", value: 1 }];
    }, [])
    const [type, setType] = useState(typeOptions[0]);
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("");

    useEffect(() => {
        const userOption = { label: `${userInfo.firstName} ${userInfo.lastName} <${userInfo.email}>`, value: userInfo.email };
        setFromOptions([
            userOption,
            { label: `${studio.name} <${studio.email}>`, value: studio.email }
        ])
        setFrom(userOption);
    }, [ userInfo, studio ])

    useEffect(() => {
        if(type.value === 0) {
            setSubject("Your Invoice");
            setBody(`Dear ${selected.studentName},\n\nAttached, you will find a copy of your invoice.\nSincerely,\n\n${userInfo.firstName}\n${studio.name}`);
        }
        else {
            setSubject("Invoice Reminder");
            setBody(`Dear ${selected.studentName},\n\nThis is a reminder that your invoice dated ${moment(selected.invoiceDate).format("MM.DD.YYYY")} for ${selected.amount}€ is now overdue; a copy is attached. Please provide payment at your earliest convenience.\nIf you've already sent payment, please disregard this message.\nSincerely,\n\n${userInfo.firstName}\n${studio.name}`);
        }
    }, [ selected, type ])
    
    
    const sendEmailEvent = () => {
        const params = {
            invoiceId: selected.id,
            from: from.value,
            to: selected.email,
            subject,
            body
        }
        dispatch(sendInvoiceMailAPI(params, res => {
            setOpen(false);
        }))
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Transaction
            </DialogTitle>
            <DialogContent className="py-3" style={{ width: "600px" }}>
                <Grid container>
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">From</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <Select
                            isSearchable={false}
                            options={fromOptions}
                            value={from}
                            onChange={option => setFrom(option)}
                        />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Student</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <Select
                            isSearchable={false}
                            options={[ { label: `${selected.studentName} <${selected.email}>`, value: selected.email } ]}
                            value={{ label: `${selected.studentName} <${selected.email}>`, value: selected.email }}
                        />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Type</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <Select
                            isSearchable={false}
                            options={typeOptions}
                            value={type}
                            onChange={option => setType(option)}
                        />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Message Preview</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <TextField
                            multiline
                            minRows={5}
                            className="w-100"
                            variant="outlined"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => sendEmailEvent()} color="primary">
                    Save
                </Button>
                <Button autoFocus variant="contained" onClick={() => setOpen(false)} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EmailDialog;