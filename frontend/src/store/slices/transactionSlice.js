import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactionList: []
    },
    reducers: {
        setTransactionList: (state, action) => {
            state.transactionList = action.payload;
        },
        addTransaction: (state, action) => {
            state.transactionList.push(action.payload);
        },
        updateTransaction: (state, action) => {
            const { id, data } = action.payload;
            const idx = state.transactionList.findIndex(one => one.id === id);
            state.transactionList[idx] = data;
        },
        removeTransaction: (state, action) => {
            const ids = action.payload;
            state.transactionList = state.transactionList.filter(one => ids.indexOf(one.id) < 0);
        }
    }
});

export const { setTransactionList, addTransaction, updateTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

export const getTransactionListAPI = dispatch => {
    httpClient.get("/transactions").then(res => {
        dispatch(setTransactionList(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "fetch transaction list",
            msg: err.response.data.msg
        }))
    })
}

export const addTransactionAPI = (params, cb) => dispatch => {
    httpClient.post("/transactions", params).then(res => {
        dispatch(addTransaction(res.data));
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "add transaction",
            msg: err.response.data.msg
        }))
    })
}

export const updateTransactionAPI = (params, cb) => dispatch => {
    httpClient.put(`/transactions/${params.id}`, params).then(res => {
        dispatch(updateTransaction({ id: params.id, data: res.data }));
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "update transaction",
            msg: err.response.data.msg
        }))
    })
}

export const deleteTransactionAPI = ids => dispatch => {
    httpClient.delete("/transactions", { params: { ids } }).then(res => {
        dispatch(removeTransaction(ids));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "delete transaction",
            msg: err.response.data.msg
        }))
    })
}