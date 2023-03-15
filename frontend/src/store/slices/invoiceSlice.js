import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";
import moment from "moment";

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        invoiceList: []
    },
    reducers: {
        setInvoiceList: (state, action) => {
            state.invoiceList = action.payload;
        },
        addInvoice: (state, action) => {
            state.invoiceList.push(action.payload);
        },
        updateInvoice: (state, action) => {
            const { id, data } = action.payload;

            let idx = state.invoiceList.findIndex(one => one.id === id);
            state.invoiceList[idx] = data;
        },
        removeInvoice: (state, action) => {
            const ids = action.payload;

            state.invoiceList = state.invoiceList.filter(one => ids.indexOf(one.id) < 0);
        },
        setInvoiceStatus: (state, action) => {
            const { id, status } = action.payload;

            const idx = state.invoiceList.findIndex(one => one.id === id);
            state.invoiceList[idx].status = status;
        },
        markAsEmailed: (state, action) => {
            const idx = state.invoiceList.findIndex(one => one.id === id);
            state.invoiceList[idx].isEmailed = 1;
        }
    }
});

export const { setInvoiceList, addInvoice, updateInvoice, removeInvoice, setInvoiceStatus, markAsEmailed } = invoiceSlice.actions;
export default invoiceSlice.reducer;

export const getInvoiceListAPI = dispatch => {
    httpClient.get("/invoices").then(res => {
        dispatch(setInvoiceList(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "fetch invoice list",
            msg: err.response.data.msg
        }))
    })
}

export const addInvoiceAPI = (params, cb) => dispatch => {
    httpClient.post("/invoices", params).then(res => {
        dispatch(addInvoice(res.data));

        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "add invoice",
            msg: err.response.data.msg
        }))
    })
}

export const updateInvoiceAPI = (params, cb) => dispatch => {
    httpClient.put(`/invoices/${params.id}`, params).then(res => {
        dispatch(updateInvoice({ id: params.id, data: res.data }));

        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "add invoice",
            msg: err.response.data.msg
        }))
    })
}

export const deleteInvoiceAPI = ({ ids }) => dispatch => {
    httpClient.delete(`/invoices`, { params: { ids } }).then(res => {
        dispatch(removeInvoice(ids));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "add invoice",
            msg: err.response.data.msg
        }))
    })
}

export const setInvoiceStatusAPI = ({ id, status }) => dispatch => {
    httpClient.put(`/invoices/${id}/setStatus`, { status }).then(res => {
        dispatch(setInvoiceStatus({ id, status }));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "set invoice status",
            msg: err.response.data.msg
        }))
    })
}

export const sendInvoiceMailAPI = ({ invoiceId, ...params }, cb) => dispatch => {
    httpClient.post(`/invoices/${invoiceId}/sendInvoiceMail`, params).then(res => {
        dispatch(markAsEmailed(invoiceId));
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "send invoice mail",
            msg: err.response.data.msg
        }))
    })
}

export const downloadInvoiceAPI = invoice => dispatch => {
    httpClient.get(`/invoices/${invoice.id}/download`, { responseType: "blob" }).then(res => {
        console.log("download.. invoice....")
        console.log(res)
        const fileURL = window.URL.createObjectURL(new Blob([ res.data ]));

        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = `${invoice.number}_${moment(invoice.invoiceDate).format("YYYYMMDD")}.pdf`;
        alink.click();
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "download invoice",
            msg: err.response.data.msg
        }))
    })
}