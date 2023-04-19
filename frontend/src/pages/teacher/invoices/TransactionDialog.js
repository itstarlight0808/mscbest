import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
     FormControlLabel, Grid, TextField} from "@material-ui/core";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { enUS } from "date-fns/locale";
import { addTransactionAPI, updateTransactionAPI } from "../../../store/slices/transactionSlice";
import { addNewError } from "../../../store/slices/errorSlice";

const TransactionDialog = ({ open, setOpen, mode, selected }) => {
    const dispatch = useDispatch();

    const [type, setType] = useState(selected?.type ?? -1);
    const [date, setDate] = useState(selected?.date? moment(selected.date): moment());
    const [amount, setAmount] = useState(selected?.amount ?? 0);
    const [description, setDescription] = useState(selected?.description ?? "");

    const saveTransaction = () => {
        if(amount < 0) {
            dispatch(addNewError({
                status: false,
                title: "add transaction",
                msg: "Amount should be positive value."
            }))
            return;
        }
        if(type === -1) {
            dispatch(addNewError({
                status: false,
                title: "add transaction",
                msg: "Please select transaction type."
            }))
            return;
        }
        const params = {
            invoiceId: selected.invoiceId,
            type,
            date: date.format("YYYY-MM-DD"),
            amount,
            description
        }

        if(mode === "add") {
            dispatch(addTransactionAPI(params, res => {
                setOpen(false);
            }))
        }
        else {
            dispatch(updateTransactionAPI({ ...params, id: selected.id }, res => {
                setOpen(false);
            }))
        }
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                Transaction
            </DialogTitle>
            <DialogContent className="py-3">
                <div>
                    <label className="d-block fw-bold">Transaction Type</label>
                    <div className="ms-2">
                        <FormControlLabel
                            label="Payment - Record a payment from the student"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={type === 0}
                                    onChange={e => setType(e.target.checked? 0: -1)}   
                                />
                            }
                        />
                        <FormControlLabel
                            label="Refund - Record the return of money to student account"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={type === 1}
                                    onChange={e => setType(e.target.checked? 1: -1)}   
                                />
                            }
                        />
                        <FormControlLabel
                            label="Charge - Add a charge or fee to student account"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={type === 2}
                                    onChange={e => setType(e.target.checked? 2: -1)}   
                                />
                            }
                        />
                        <FormControlLabel
                            label="Discount - Waive a fee or reduce student balance"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={type === 3}
                                    onChange={e => setType(e.target.checked? 3: -1)}   
                                />
                            }
                        />
                    </div>
                </div>
                <Grid container className="mt-2">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Student</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        { selected?.studentName }
                    </Grid>
                </Grid>
                <Grid container className="mt-2" alignItems="center">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Date</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                            <KeyboardDatePicker
                                margin="normal"
                                format="MM/dd/yyyy"
                                className="date-input"
                                value={date}
                                onChange={e => setDate(moment(e))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Amount</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <TextField
                            size="small"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container className="mt-3">
                    <Grid item sm={3} xs={12}>
                        <label className="fw-bold">Description</label>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                        <TextField
                            multiline
                            minRows={4}
                            variant="outlined"
                            className="w-100"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => saveTransaction()} color="primary">
                    Save
                </Button>
                <Button autoFocus variant="contained" onClick={() => setOpen(false)} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TransactionDialog;