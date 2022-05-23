import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventList, followEvent, unfollowEvent } from "../store/actions/eventActions";
import WomanImage from "../assets/images/home/sitting_woman.png";

const Home = props => {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventList());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="introduction-section">
        <img src={WomanImage} alt="sitting_woman"/>
      </div>
    </div>
  );
}
export default Home;
