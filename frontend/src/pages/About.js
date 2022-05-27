import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UpcomingEvent from "../components/UpcomingEvent";
import TeacherImage from "../assets/images/home/teacher.png";
import StudentImage from "../assets/images/about/student.png";

const About = props => {
    return (
        <div className="about-us">
            <div className="about-section">
                <div className="img-container">
                    <img src={TeacherImage} alt="teacher image"/>
                </div>
                <div className="about-content">
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
                </div>
            </div>
            <div className="for-students-section">
                <div className="for-students-content">
                    <h2 className="title">
                        for <span>Students</span>
                    </h2>
                    <div className="description">
                        <p>
                            The Musical Industry is becoming more and more competitive. We all know, to be at your best you constantly need to polish on your skills and talents. Though many actors or actors to be want to further their education, deepen they stage skills, prepare for new opportunities or upcoming auditions, work on specific techniques, combat they stage fright and and and. it can be difficult. Difficult to find the right professional to study with, specially difficult to find at the right location and also difficult to find the precious time and commit. 
                            We at the MusicalBest providing our students with desired framework.
                            MusicalBest can offer you:
                        </p>
                        <p>
                            <span>High  Quality</span> - all our classes are done by highly talented professionals who are very involved within the industry
                        </p>
                        <p>
                            <span>Flexibility</span> - study in the comfort of your own home, also our courses are recurring
                        </p>
                        <p>
                            <span>Co-operation</span> - In traditional classrooms, most of the teaching is done by one individual. This isn’t the case with the MusicalBest. The set up makes it easy for a variety of tutors and experts to come together to share their knowledge, and this can be done regardless of where those experts are based geographically.
                        </p>
                        <p>
                            <span>Personalization</span> -  take charge over your own educational journey  choose what to study, whit whom, when to revisit and in which order.
                        </p>
                        <p>
                            <span>Network</span> - MusicalBest offer they students a excellent Networking opportunity with hin the industry.
                        </p>
                    </div>
                </div>
                <div className="img-container">
                    <img src={StudentImage} alt="Student Image"/>
                </div>
            </div>
            <UpcomingEvent />
        </div>
    );
}

export default About;