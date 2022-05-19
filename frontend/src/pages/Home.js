import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventList, followEvent, unfollowEvent } from "../store/actions/eventActions";

function Home(props) {

  const userEvent = useSelector(state => state.userEvent);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventList());
  }, [dispatch]);

  const [selected, setSelected] = useState('');
  const selectedEvent = selected? userEvent.event.find(one => one._id === selected): '';

  const followEventClicked = () => {
    dispatch(followEvent(selected, userInfo));
  }
  const unfollowEventClicked = () => {
    dispatch(unfollowEvent(selected, userInfo._id));
  }
  return (
    <>
      {selected && <div className="ctrl-container d-flex justify-content-center mt-3">
        <button className="btn btn-primary ms-3" onClick={followEventClicked}>Get on Queue</button>
        <button className="btn btn-danger ms-3" onClick={unfollowEventClicked}>Remove from Queue</button>
      </div>}
      <div className="event-wrapper mt-5 d-flex justify-content-center flex-sm-column">
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
              { selected &&
                  selectedEvent.followers.map(one => {
                      return (
                          <div className='p-3'>{one.name}</div>
                      );
                  })
              }
          </div>
      </div>
    </>
  );
}
export default Home;
