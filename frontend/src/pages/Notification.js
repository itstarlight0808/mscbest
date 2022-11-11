import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Card, CardContent, CardHeader, IconButton, Tab, Tabs } from "@material-ui/core";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabPanel from "../components/TabPanel";
import { deleteNotificationAPI, markAsReadAPI } from "../store/slices/notificationSlice";

const NotificationDetail = props => {
    const { notification, setMode } = props;
    const createdAt = moment(notification.createdAt).format("YYYY-MM-DD HH:mm:ss");

    return (
        <Card>
            <CardHeader
                title={ notification.title }
                subheader={ createdAt }
                action={
                    <IconButton onClick={() => setMode("view")}>
                        <FontAwesomeIcon icon="fas fa-xmark" />
                    </IconButton>
                }
            ></CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: notification.content }}></div>
            </CardContent>
        </Card>
    )
}

const NotificationItemList = props => {
    const dispatch = useDispatch();
    const { data } = props;

    const [mode, setMode] = useState("view");
    const [selNotification, setSelNotification] = useState({});

    const deleteNotification = (event, { id, isSystem }) => {
        event.stopPropagation();
        dispatch(deleteNotificationAPI({ notificationId: id, isSystem }));
    }
    const showDetailNotification = notification => {
        setMode("detail");
        setSelNotification(notification);

        !notification.isRead && dispatch(markAsReadAPI({ notificationId: notification.id, isSystem: notification.isSystem }));
    }

    return (
        <>
            { mode === "view" && 
                <div className="notification-list-container">
                    {
                        data.map((one, index) => {
                            let createdAt = moment(one.createdAt).format("YYYY-MM-DD HH:mm:ss");
                            return (
                                <div className={`notification-item ${one.isRead? "read": ""}`} key={`notification_item_${index}`} onClick={() => showDetailNotification(one)}>
                                    <h3 className="title">{ one.title }</h3>
                                    <div className="d-flex justify-content-between mt-1">
                                        <div className="content" dangerouslySetInnerHTML={{ __html: one.content }}></div>
                                        <div>{ createdAt }</div>
                                    </div>
                                    <IconButton size="small" className="del-btn" color="default" component="span" onClick={(event) => deleteNotification(event, { id: one.id, isSystem: one.isSystem })}>
                                        <FontAwesomeIcon icon="fas fa-trash" />
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </div>
            }
            { mode === "detail" && <NotificationDetail notification={selNotification} setMode={setMode} /> }
        </>
    )
}

const Notification = props => {
    const { systemNotificationList, personalNotificationList } = useSelector(state => state.notification);

    const [selTab, setSelTab] = useState(0);

    return (
        <div className="p-notification">
            <AppBar position="static" color="default">
                <Tabs
                    value={selTab}
                    onChange={(event, newVal) => setSelTab(newVal)}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Personal" icon={<FontAwesomeIcon icon="fas fa-user" />} />
                    <Tab label="System" icon={<FontAwesomeIcon icon="fab fa-windows" />} />
                </Tabs>
            </AppBar>
            <TabPanel value={selTab} index={0}>
                <NotificationItemList data={personalNotificationList} />
            </TabPanel>
            <TabPanel value={selTab} index={1}>
                <NotificationItemList data={systemNotificationList} />
            </TabPanel>
        </div>
    )
}

export default Notification;