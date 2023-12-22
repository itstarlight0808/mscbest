import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptInvitationToDBAPI, getInvitationToDBInfoAPI } from "../store/slices/studentSlice";

const InvitationToDB = props => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const id = props.match.params.id;

    const [info, setInfo] = useState("");

    useEffect(() => {
        dispatch(getInvitationToDBInfoAPI(id, res => {
            const data = res.data;
            if(!Object.keys(data).length)
                props.history.push("/404");
            else if(!data.isUserExist)
                props.history.push(`/register?redirect=${props.location.pathname}`)
            else if(!userInfo)
                props.history.push(`/signin?redirect=${props.location.pathname}`);
            else
                setInfo(data)
        }))
    }, [])

    const acceptInvitationToDBEvent = () => {
        dispatch(acceptInvitationToDBAPI(id), res => {
            props.history.push("/");
        });
    }
    return (
        <div className="p-invitation-to-db">
            { info && 
                <div className="content">
                    <h3>Invitation Received.</h3>
                    <p>
                        { info?.teacherName } added you to his/her database.
                        Please accept him if you would like.
                    </p>
                    <div className="ctrl-container">
                        <button className="btn-ctrl btn-ctrl-purple" onClick={() => acceptInvitationToDBEvent()}>Accept</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default InvitationToDB;