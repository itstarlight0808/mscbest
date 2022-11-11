import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import countries from "../../../utils/countries.json";
import timezoneList from "../../../utils/timezone.json";
import { updateStudioSettingAPI } from "../../../store/slices/settingSlice";

const flagIconPath = "https://img.mobiscroll.com/demos/flags";
const getCountryFromJSON = name => {
    const country = countries.find(one => one.name === name);

    return country;
}
const getTimezoneFromJSON = name => {
    const timezone = timezoneList.find(one => one.text === name);

    return timezone;
}
const DefaultSetting = props => {
    const dispatch = useDispatch();
    const { userLocale } = useSelector(state => state.user);
    const studioSettings = useSelector(state => state.setting.studio);

    const [studioName, setStudioName] = useState("");
    const [studioAddress, setStudioAddress] = useState("");
    const [studioPhone, setStudioPhone] = useState("");
    const [studioEmail, setStudioEmail] = useState("");
    const [studioCountry, setStudioCountry] = useState(null);
    const [studioTimezone, setStudioTimezone] = useState(null);
    
    useEffect(() => {
        setStudioName(studioSettings.name ?? "");
        setStudioAddress(studioSettings.address ?? "");
        setStudioPhone(studioSettings.phone ?? "");
        setStudioEmail(studioSettings.email ?? "");
        setStudioCountry(studioSettings.country? getCountryFromJSON(studioSettings.country): null);
        setStudioTimezone(studioSettings.timezone? getTimezoneFromJSON(studioSettings.timezone): null);
    }, [ studioSettings ])

    const saveOptions = e => {
        e.preventDefault();

        const params = {
            name: studioName,
            address: studioAddress,
            phone: studioPhone,
            email: studioEmail,
            country: studioCountry?.name ?? "",
            timezone: studioTimezone?.text ?? ""
        };

        dispatch(updateStudioSettingAPI(params));
    }
    return (
        <form onSubmit={e => saveOptions(e)} className="p-studio-default-setting">
            <div className="setting-content">
                <div className="form-group">
                    <h4>Studio Setup</h4>
                    <label className="d-block required mt-2">Studio Name</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        value={studioName}
                        onChange={e => setStudioName(e.target.value)}
                        required
                    />
                    <label className="d-block required">Studio Address</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        multiline
                        minRows={5}
                        value={studioAddress}
                        onChange={e => setStudioAddress(e.target.value)}
                        required
                    />
                    <label className="d-block required">Studio Phone</label>
                    <PhoneInput
                        id="mobile-number"
                        className="text-input phone-input"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry={userLocale.country_code}
                        value={studioPhone}
                        onChange={setStudioPhone}
                    />
                    <label className="d-block required">Studio Contact Email</label>
                    <TextField
                        className="text-input"
                        variant="outlined"
                        size="small"
                        type="email"
                        value={studioEmail}
                        onChange={e => setStudioEmail(e.target.value)}
                        required
                    />
                    <label className="d-block required">Country</label>
                    <Autocomplete
                        className="autocomplete-ctrl"
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(option) => (
                            <>
                                <img width="21px" height="15px" className="me-2" src={`${flagIconPath}/${option.code}.png`}/>
                                {option.name}
                            </>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                        value={studioCountry}
                        onChange={(e, newVal) => setStudioCountry(newVal)}
                    />
                    <label className="d-block required">Timezone</label>
                    <Autocomplete
                        className="autocomplete-ctrl"
                        options={timezoneList}
                        autoHighlight
                        getOptionLabel={(option) => option.text}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                        value={studioTimezone}
                        onChange={(e, newVal) => setStudioTimezone(newVal)}
                    />
                </div>
            </div>
            <div className="ctrl-container">
                <button type="submit" className="btn-ctrl btn-ctrl-purple">Save Options</button>
            </div>
        </form>
    )
}

export default DefaultSetting;