import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventList, followEvent, unfollowEvent } from "../store/actions/eventActions";
import Flickity from "react-flickity-component";
import { Accordion } from "react-bootstrap";
import WomanImage from "../assets/images/home/sitting_woman.png";
import PlayBtn from "../assets/images/home/play-btn.svg";
import TeacherImage from "../assets/images/home/teacher.png";
import RightArrowBtn from "../assets/images/home/right-arrow.svg";
import UpcomingEventImage from "../assets/images/home/upcoming-events.png";
import PinkRightArrowBtn from "../assets/images/home/pink-right-arrow.svg";
import StudentAvatar from "../assets/images/home/student-avatar.png";
import StartQuote from "../assets/images/home/start-double-quote.svg";
import EndQuote from "../assets/images/home/end-double-quote.svg";

const style = `
  nav.navbar {
    background-color: transparent !important;
  }
`;
const Home = props => {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventList());
  }, [dispatch]);

  const FlickityOption = {
    initialIndex: 1,
    prevNextButtons: false,
    pageDots: false
  }

  return (
    <div className="home">
      <style>
        { style }
      </style>
      <div className="introduction-section">
        <img src={WomanImage} alt="sitting_woman"/>
        <div className="introduction-content">
          <div className="title">
            <div className="main-title">
              <i>Musical</i>BEST
            </div>
            <div className="sub-title">
              <i>B</i>ootcamp <i>E</i>xploring <i>S</i>kills &amp; <i>T</i>alents
            </div>
          </div>
          <div className="description">
            <span>
              Learn from the BEST - Experience live online masterclasses with the professionals from musical Industry
            </span>
          </div>
          <div className="ctrl-container">
            <button className="btn btn-orange">Get Started</button>
            <button className="btn btn-play"><img src={PlayBtn} alt="play button"/>Watch Video</button>
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="about-img-container">
          <img src={TeacherImage} alt=""/>
        </div>
        <div className="about-section-content">
          <div className="title">
            About <span className="sub-title"><i>Musical</i>Best</span>
          </div>
          <div className="description">
            <span>
              MusicalBest is the international network of educational professionals from around the world from musical theater industry. With MusicalBest you learn live from the best and at the comfort of your own home.
            </span>
          </div>
          <div className="ctrl-container">
            <button className="btn btn-pink">Learn More <img src={RightArrowBtn}/></button>
          </div>
        </div>
      </div>
      <div className="event-section">
        <div className="event-section-content">
          <div className="title">
            Upcoming <i>Events</i>
          </div>
          <div className="description">
            <span>
              Overview of latest upcoming events. Discover our scheduled bootcamps, workshops, masterclasses and other relevant informations.
            </span>
          </div>
          <div className="ctrl-container">
            <button className="btn btn-white">View All Events <img src={PinkRightArrowBtn}/></button>
          </div>
        </div>
        <div className="event-img-container">
          <img src={UpcomingEventImage} alt="upcoming events"/>
        </div>
      </div>
      <div className="students-saying-section">
        <div className="title">
          <span>What our <i>Students saying</i></span>
        </div>
        <div className="carousel-container">
          <Flickity
            className={'carousel'} // default ''
            elementType={'div'} // default 'div'
            options={FlickityOption} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static // default false
          >
            <div className="_item">
              <div className="description">
                <img src={StartQuote} alt="start double quote"/>
                <div className="description-text">
                  I could say so much about these master classes, because I love them so much! I just love this technique.  Applying Meisner to the way I now prepare and interpret my songs just makes so much more sense. You feel really great after this class and more importantly, totally ready for your next audition.
                </div>
                <div className="d-flex justify-content-end"><img src={EndQuote} alt="end double quote"/></div>
              </div>
              <div className="student-avatar">
                <img src={StudentAvatar} alt="student avatar"/>
                <div className="student-name">
                  <span>Doerte Niedermeier</span>
                </div>
                <div className="student-description">
                  <span>
                    Professional Credits: <i>Catch Me if you Can, Love Never Dies, Rocky, Mamma Mia, Cats</i>
                  </span>
                </div>
              </div>
            </div>
            <div className="_item">
              <div className="description">
                <img src={StartQuote} alt="start double quote"/>
                <div className="description-text">
                  I could say so much about these master classes, because I love them so much! I just love this technique.  Applying Meisner to the way I now prepare and interpret my songs just makes so much more sense. You feel really great after this class and more importantly, totally ready for your next audition.
                </div>
                <div className="d-flex justify-content-end"><img src={EndQuote} alt="end double quote"/></div>
              </div>
              <div className="student-avatar">
                <img src={StudentAvatar} alt="student avatar"/>
                <div className="student-name">
                  <span>Doerte Niedermeier</span>
                </div>
                <div className="student-description">
                  <span>
                    Professional Credits: <i>Catch Me if you Can, Love Never Dies, Rocky, Mamma Mia, Cats</i>
                  </span>
                </div>
              </div>
            </div>
            <div className="_item">
              <div className="description">
                <img src={StartQuote} alt="start double quote"/>
                <div className="description-text">
                  I could say so much about these master classes, because I love them so much! I just love this technique.  Applying Meisner to the way I now prepare and interpret my songs just makes so much more sense. You feel really great after this class and more importantly, totally ready for your next audition.
                </div>
                <div className="d-flex justify-content-end"><img src={EndQuote} alt="end double quote"/></div>
              </div>
              <div className="student-avatar">
                <img src={StudentAvatar} alt="student avatar"/>
                <div className="student-name">
                  <span>Doerte Niedermeier</span>
                </div>
                <div className="student-description">
                  <span>
                    Professional Credits: <i>Catch Me if you Can, Love Never Dies, Rocky, Mamma Mia, Cats</i>
                  </span>
                </div>
              </div>
            </div>
          </Flickity>
        </div>
      </div>
      <div className="question-section">
        <div className="title">
          <span>Frequently <i>Asked Questions</i></span>
        </div>
        <div className="question-container">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Can I choose my meals?</Accordion.Header>
              <Accordion.Body>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>When will I receive my order?</Accordion.Header>
              <Accordion.Body>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can I skip a delivery?</Accordion.Header>
              <Accordion.Body>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Can I add Extras to my delivery?</Accordion.Header>
              <Accordion.Body>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took 
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default Home;
