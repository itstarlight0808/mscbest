import socketClient from "socket.io-client";
import Cookie from "js-cookie";
import { CONFIG, COOKIE_KEY } from "../config";
import store from "../store/index";
import { addSystemNotification, addPersonalNotification } from "../store/slices/notificationSlice";

const socket = socketClient.io(CONFIG.serverPath, {
    autoConnect: false
});
socket.on("connect", () => {
    console.log("Main Socket Connected to Server... ", socket.id)
})

socket.on("disconnect", () => {
    console.log("Main Socket Disconnected from Server...")
})

socket.on("notification:add", (params) => {
    console.log("notification add", params)
    if(!params.isSystem)
        store.dispatch(addPersonalNotification(params));
    else
        store.dispatch(addSystemNotification(params));
})

export const connectSocket = ({ userId, token }) => {
    socket.auth = { userId, token };
    socket.connect();
}

export const disconnectSocket = () => {
    socket.disconnect();
}

/*** in the case of page reload ***/
const userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) ?? null;
if(userInfo)
    connectSocket({ userId: userInfo.id, token: userInfo.token })
