import React, { useRef, useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import { enUS } from "date-fns/locale";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { ColorPicker } from "material-ui-color";
import { CONFIG } from "../../../config";
import NoImage from "../../../assets/images/no_image1x1.png";
import { getInvoiceSettingAPI, updateInvoiceSettingAPI } from "../../../store/slices/settingSlice";
import { classType } from "../../../utils/common";

const InvoiceSetting = props => {
    const dispatch = useDispatch();

    const selFile = useRef();
    const [logoPreview, setLogoPreview] = useState(null);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState({});
    const numberFormatOptions = useMemo(() => ([
        { label: "4 Digit Year", value: "%YYYY%" },
        { label: "2 Digit Year", value: "%YY%" },
        { label: "2 Digit Month", value: "%MM%" },
        { label: "2 Digit Sequence Number", value: "%NN%" },
        { label: "4 Digit Sequence Number", value: "%NNNN%" },
        { label: "6 Digit Sequence Number", value: "%NNNNNN%" },
    ]), [])

    const changeLogoEvent = e => {
        const files = e.target.files;
        if(!files.length)
            return;
        setLogo(files[0]);

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setLogoPreview(reader.result);
        })

        reader.readAsDataURL(files[0]);
    }
    const resetLogoEvent = () => {
        setLogoPreview(null);
        setLogo(null);
    }

    useEffect(() => {
        dispatch(getInvoiceSettingAPI(res => {
            const { logo, ...data } = res.data;
            logo && setLogoPreview(`${CONFIG.serverPath}${logo}`);
            data.balanceDate = getBalanceDate(data.balanceDateType);
            setData(data);
            console.log(data)
        }))
    }, [])

    const handleInputChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleCheckChange = e => {
        setData({ ...data, [e.target.name]: e.target.checked? 1: 0 });
    }

    const handleRadioChange = e => {
        setData({ ...data, [e.target.name]: parseInt(e.target.value)});
    }

    const getBalanceDate = (balanceDateType) => {
        let balanceDate = data.balanceDate ?? moment();
        if(balanceDateType === 0)
            balanceDate = moment();
        if(balanceDateType === 1)
            balanceDate = moment().endOf("month");

        return balanceDate;
    }

    const handleBalanceDateTypeChange = e => {
        let balanceDate = getBalanceDate(parseInt(e.target.value)).format("YYYY-MM-DD");

        setData({ ...data, balanceDateType: parseInt(e.target.value), balanceDate })
    }

    const addNumberFormat = option => {
        setData({ ...data, numberFormat: data.numberFormat + option.value })
    }

    const saveOptions = e => {
        e.preventDefault();

        console.log(data);
        const params = { ...data };
        const formdata = new FormData();
        if(logo)
            formdata.append("logo", logo);
        if(!logoPreview)
            params.logo = "";
        formdata.append("params", JSON.stringify(params));

        dispatch(updateInvoiceSettingAPI(formdata));
    }
    
    return (
        <form className="p-invoice-setting-container" onSubmit={(e) => saveOptions(e)}>
            <h4>Invoice Settings</h4>
            <div className="mt-2">
                <label className="d-block required">Invoice Name</label>
                <TextField
                    size="small"
                    variant="outlined"
                    className="text-input"
                    name="name"
                    value={data.name ?? ""}
                    onChange={e => handleInputChange(e)}
                    required
                />
            </div>
            <div className="logo-container">
                <label className="d-block">Studio/Invoice Logo</label>
                <div className="img-container mb-3">
                    <input ref={selFile} type="file" hidden onChange={e => changeLogoEvent(e)} accept="image/png, image/jpeg" />
                    <Avatar src={logoPreview? logoPreview: NoImage} onClick={() => selFile.current.click()} />
                </div>
                <div className="ctrl-container">
                    <button type="button" className="btn-ctrl btn-ctrl-purple" onClick={() => selFile.current.click()}>Change</button>
                    <button type="button" className="btn-ctrl btn-ctrl-red ms-2" onClick={() => resetLogoEvent()}>Reset</button>
                </div>
            </div>
            <div className="mt-2">
                <label className="d-block required">Invoice Footer</label>
                <TextField
                    multiline
                    minRows={4}
                    variant="outlined"
                    className="text-input"
                    name="footer"
                    value={data.footer ?? ""}
                    onChange={e => handleInputChange(e)}
                    required
                />
            </div>
            <div className="invoice-accent-color">
                <label className="d-block">Invoice Accent Color</label>
                <ColorPicker
                    defaultValue="#000"
                    name="accentColor"
                    value={data.accentColor ?? ""}
                    onChange={color => setData({ ...data, accentColor: "#" + color.hex })}
                />
            </div>
            <div className="negative-invoice-container">
                <label className="d-block">Negative Invoices</label>
                <RadioGroup name="negativeInvoice" value={data.negativeInvoice ?? 1} onChange={e => handleRadioChange(e)}>
                    <FormControlLabel label="Show as '0.00 € due'" value={0} control={<Radio color="primary" />} />
                    <FormControlLabel label="Show as 'Balance Remaining'" value={1} control={<Radio color="primary" />} />
                </RadioGroup>
            </div>
            <div className="mt-2">
                <label className="d-block">Invoice Number</label>
                <FormControlLabel
                    label="Create Invoice Number"
                    control={
                        <Checkbox
                            color="primary"
                            name="hasInvoiceNumber"
                            checked={data.hasInvoiceNumber === 1}
                            onChange={e => handleCheckChange(e)} 
                        />
                    }
                />
            </div>
            <div className="mt-2">
                <label className="d-block">Next Sequence Number</label>
                <TextField
                    size="small"
                    variant="outlined"
                    className="text-input"
                    name="nextSequence"
                    value={data.nextSequence ?? ""}
                    onChange={e => handleInputChange(e)}
                    required
                />
            </div>
            <div className="number-format-container">
                <label className="d-block">Number Format</label>
                <div className="flex-div">
                    <TextField
                        size="small"
                        variant="outlined"
                        className="text-input"
                        name="numberFormat"
                        value={data.numberFormat ?? ""}
                        onChange={e => handleInputChange(e)}
                        required
                    />
                    <Select
                        className="sel-format-number"
                        isSearchable={false}
                        options={numberFormatOptions}
                        placeholder=""
                        noResultsText=""
                        onChange={option => addNumberFormat(option)}
                    />
                </div>
            </div>
            <div className="late-payment-fee-container">
                <label className="d-block">Automatic Late Payment Fee</label>
                <RadioGroup name="latePaymentFee" value={data.latePaymentFee ?? 2} onChange={e => handleRadioChange(e)}>
                    <FormControlLabel label="None" value={0} control={<Radio color="primary" />} />
                    <FormControlLabel label="Fixed Amount" value={1} control={<Radio color="primary" />} />
                    <FormControlLabel label="Percentage" value={2} control={<Radio color="primary" />} />
                </RadioGroup>
            </div>
            <div className="mt-2">
                <label className="d-block">Late Fee Category</label>
                <Select
                    className="text-input"
                    isSearchable={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option}
                    options={classType}
                    placeholder="(Not Specified)"
                    name="lateFeeCategory"
                    value={ data.lateFeeCategory !== -1? classType[data.lateFeeCategory]: "" }
                    onChange={newVal => setData({ ...data, lateFeeCategory: classType.indexOf(newVal) })}
                />
            </div>
            <div className="mt-2">
                <label className="d-block">Overdue Invoice Reminder</label>
                <Checkbox
                    color="primary"
                    name="hasInvoiceReminder"
                    checked={data.hasInvoiceReminder === 1}
                    onChange={e => handleCheckChange(e)} 
                />
                <TextField
                    size="small"
                    variant="outlined"
                    className="text-input"
                    name="reminderLimit"
                    value={data.reminderLimit ?? ""}
                    onChange={e => handleInputChange(e)}
                    required
                    disabled={!data.hasInvoiceReminder}
                />
            </div>
            <div className="mt-2">
                <label className="d-block">Sale Tax</label>
                <FormControlLabel
                    label="Include sales tax in line item amounts"
                    control={
                        <Checkbox
                            color="primary"
                            name="hasSaleTax"
                            checked={data.hasSaleTax === 1}
                            onChange={e => handleCheckChange(e)} 
                        />
                    }
                />
            </div>
            <div className="mt-2">
                <label className="d-block">Default Balance Date</label>
                <RadioGroup name="balanceDateType" value={data.balanceDateType ?? 1} onChange={e => handleBalanceDateTypeChange(e)}>
                    <FormControlLabel label="Today" value={0} control={<Radio color="primary" />} />
                    <FormControlLabel label="End of Month" value={1} control={<Radio color="primary" />} />
                    <FormControlLabel label="Specific Date" value={2} control={<Radio color="primary" />} />
                </RadioGroup>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                    <KeyboardDatePicker
                        className="date-picker"
                        margin="normal"
                        format="MM/dd/yyyy"
                        value={data.balanceDate}
                        onChange={date => setData({ ...data, balanceDate: moment(date).format("YYYY-MM-DD") })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        helperText={null}
                        disabled={data.balanceDateType < 2}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className="mt-2">
                <label className="d-block">Visible Billing Options</label>
                <FormControlLabel
                    label="Fixed Monthly Billing"
                    control={
                        <Checkbox
                            color="primary"
                            name="showFixedMonthlyBilling"
                            checked={data.showFixedMonthlyBilling === 1}
                            onChange={e => handleCheckChange(e)} 
                        />
                    }
                />
                <FormControlLabel
                    label="Per-Lesson Billing"
                    control={
                        <Checkbox
                            color="primary"
                            name="showPerLessonBilling"
                            checked={data.showPerLessonBilling === 1}
                            onChange={e => handleCheckChange(e)} 
                        />
                    }
                />
                <FormControlLabel
                    label="Hourly Billing"
                    control={
                        <Checkbox
                            color="primary"
                            name="showHourlyBilling"
                            checked={data.showHourlyBilling === 1}
                            onChange={e => handleCheckChange(e)} 
                        />
                    }
                />
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn-ctrl btn-ctrl-purple"><FontAwesomeIcon icon="fas fa-save"/>Save Options</button>
            </div>
        </form>
    )
}

export default InvoiceSetting;