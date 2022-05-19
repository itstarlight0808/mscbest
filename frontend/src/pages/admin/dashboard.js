import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventList, addEvent, deleteEvent, toggleEventStatus } from "../../store/actions/eventActions";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userEvent = useSelector(state => state.userEvent);
    useEffect(() => {
        dispatch(fetchEventList());
    }, [dispatch]);
    const [eventName, setEventName] = useState('');

    const addEventClicked = e => {
        dispatch(addEvent(eventName));
    }

    const [selected, setSelected] = useState(null);
    const deleteEventClicked = e => {
        if(selected)
            dispatch(deleteEvent(selected));
    }

    const selectedEvent = selected? userEvent.event.find(one => one._id === selected): '';
    const toggleEventStatusClicked = () => {
        dispatch(toggleEventStatus(selected));
    }

    return (
        <>
            <div className="ctrl-container d-flex justify-content-center mt-3">
                <input type="text" placeholder="Type Event Name" value={eventName} onChange={e => setEventName(e.target.value)}/>
                <button className="btn btn-primary ms-3" onClick={addEventClicked}>Add Event</button>
                <button className="btn btn-danger ms-3" onClick={deleteEventClicked}>Delete Event</button>
                {selected && 
                    <button className={`btn-toggle ms-3 ${selectedEvent?.status? "active": ""}`} onClick={toggleEventStatusClicked}>
                        <div className="w-50">Off</div>
                        <div className="w-50">On</div>
                        <div className="selected">
                            <div className="slide"></div>
                        </div>
                    </button>
                }
            </div>
            <div className="event-wrapper mt-5 d-flex justify-content-center">
                <div className="event-container">
                {
                    userEvent.event && userEvent.event.map((one, index) => {
                        return (
                            <div
                                className={`d-flex align-items-center ${selected === one._id? "active": ""}`}
                                key={one._id} 
                                onClick={() => setSelected(one._id)}>
                                    <span>{one.name}</span>
                                    <span className="ms-auto text-success">{one.followers.length}</span>
                            </div>
                        )
                    })
                }
                </div>
                <div className="follower-container">
                    { selectedEvent &&
                        selectedEvent.followers.map(one => {
                            return (
                                <div className="p-3 border border-bottom">{one.name}</div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Dashboard;