import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Grid, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { enUS } from "date-fns/locale";
import moment from "moment";
import { addInvoiceAPI, updateInvoiceAPI } from "../../../store/slices/invoiceSlice";
import { addNewError } from "../../../store/slices/errorSlice";

const InvoiceForm = ({ mode, setMode, selected }) => {
    const dispatch = useDispatch();
    const { myStudents } = useSelector(state => state.teacher);

    const filterOptions = createFilterOptions({
        stringify: (option) => `${option.email} ${option.firstName} ${option.lastName}`
    })
    const [open, setOpen] = useState(false);
    const [selStudent, setSelStudent] = useState(() => {
        console.log(selected, myStudents)
        if(selected) {
            return myStudents.find(one => one.studentId === selected.studentId);
        }
        else
            return null;
    })//selected?.studentId? {id: selected.studentId, email: selected.email, firstName: selected.firstName, lastName: selected.lastName}: null);
    const loading = open && !myStudents.length;
    const [invoiceDate, setInvoiceDate] = useState(selected?.invoiceDate ?? moment());
    const [invoiceFrom, setInvoiceFrom] = useState(selected?.invoiceFrom ?? moment());
    const [invoiceTo, setInvoiceTo] = useState(selected?.invoiceTo ?? moment());
    const [amount, setAmount] = useState(selected?.amount ?? 0);
    
    const saveInvoiceEvent = (e) => {
        e.preventDefault();

        if(!selStudent) {
            dispatch(addNewError({
                status: false,
                title: "add invoice",
                msg: "no student was selected."
            }));
            return;
        }
        const params = {
            studentId: selStudent?.studentId,
            invoiceDate: moment(invoiceDate).format("YYYY-MM-DD"),
            invoiceFrom: moment(invoiceFrom).format("YYYY-MM-DD"),
            invoiceTo: moment(invoiceTo).format("YYYY-MM-DD"),
            amount
        }

        console.log(params)
        if(mode === "add")
            dispatch(addInvoiceAPI(params, res => {
                setMode("view");
            }));
        else 
            dispatch(updateInvoiceAPI({ ...params, id: selected.id }, res => {
                setMode("view");
            }));
    }
    return (
        <form onSubmit={(e) => saveInvoiceEvent(e)} className="c-invoice-form">
            <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => setMode("view")}>
                <FontAwesomeIcon icon="fas fa-arrow-left" />
            </button>
            <div className="form-content">
                <Grid container className="gap-3">
                    <Grid item md={4} xs={12}>
                        <label className="d-block">Invoice Date</label>
                        <Autocomplete
                            freeSolo
                            className="mt-3"
                            open={open}
                            loading={loading}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            autoHighlight
                            disabled={mode === "edit"}
                            options={myStudents}
                            filterOptions={filterOptions}
                            getOptionSelected={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            value={selStudent}
                            onChange={(e, val) => setSelStudent(val)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="text-input"
                                    placeholder="Type student name"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        )
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <label className="d-block">Invoice Date</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                            <KeyboardDatePicker
                                margin="normal"
                                format="MM/dd/yyyy"
                                className="date-input"
                                value={invoiceDate}
                                onChange={e => setInvoiceDate(moment(e))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Grid container className="gap-3 mt-3">
                    <Grid item md={4} xs={12}>
                        <label>Invoice from</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                            <KeyboardDatePicker
                                margin="normal"
                                format="MM/dd/yyyy"
                                className="date-input"
                                value={invoiceFrom}
                                onChange={e => setInvoiceFrom(moment(e))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <label>Invoice to</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                            <KeyboardDatePicker
                                margin="normal"
                                format="MM/dd/yyyy"
                                className="date-input"
                                value={invoiceTo}
                                onChange={e => setInvoiceTo(moment(e))}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <div>
                    <label className="d-block">Invoice amount</label>
                    <TextField
                        className="text-input mt-2"
                        variant="outlined"
                        type="number"
                        size="small"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <div className="ctrl-container">
                    <button type="submit" className="btn-ctrl btn-ctrl-purple">Save</button>
                    <button type="button" className="btn-ctrl btn-ctrl-red" onClick={() => setMode("view")}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default InvoiceForm;