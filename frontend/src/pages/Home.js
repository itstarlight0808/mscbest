import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventList, followEvent, unfollowEvent } from "../store/actions/eventActions";
import Flickity from "react-flickity-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UpcomingEvent from "../components/UpcomingEvent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

import WomanImage from "../assets/images/home/sitting_woman.png";
import TeacherImage from "../assets/images/home/teacher.png";
import RightArrowBtn from "../assets/images/home/right-arrow.svg";
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
    prevNextButtons: true,
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
            <h1 className="main-title">
              <i>Musical</i>BEST
            </h1>
            <h2 className="sub-title">
              <i>B</i>ootcamp <i>E</i>xploring <i>S</i>kills &amp; <i>T</i>alents
            </h2>
          </div>
          <div className="description">
            <span>
              Learn from the BEST - Experience live online masterclasses with the professionals from musical Industry
            </span>
          </div>
          <div className="ctrl-container">
            <button className="btn btn-orange">Get Started</button>
            <button className="btn btn-play"><FontAwesomeIcon icon="far fa-play-circle"/>Watch Video</button>
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="about-img-container">
          <img src={TeacherImage} alt=""/>
        </div>
        <div className="about-section-content">
          <h2 className="title">
            About <span className="sub-title"><i>Musical</i>Best</span>
          </h2>
          <div className="description">
            <span>
              MusicalBest is the international network of educational professionals from around the world 
               from musical theater industry. With MusicalBest you learn live from the best and 
               at the comfort of your own home.
              <br/>
              Whether it be work on your acting skills, extension and enhancement of your audition material, 
               getting under control your stage fright and more, 
               MusicalBEST delivers a world class live online learning experience to enhance 
               your profecional skill and talents.
            </span>
          </div>
          <div className="ctrl-container">
            <button className="btn btn-purple">Learn More <img src={RightArrowBtn}/></button>
          </div>
        </div>
      </div>
      <UpcomingEvent />
      <div className="students-saying-section">
        <h2 className="title">
          <span>What our <i>Students saying</i></span>
        </h2>
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
      <FrequentlyQuestion />
    </div>
  );
}
export default Home;
