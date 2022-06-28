import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Flickity from "react-flickity-component";

import UpcomingEvent from "../components/UpcomingEvent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

import TeacherImage from "../assets/images/home/teacher.png";
import NewsImage from "../assets/images/about/news.png";
import SlideWhiteIcon from "../assets/images/about/slide-white.svg";
import VideoLearningImage from "../assets/images/about/video_learning.png";
import StudentImage from "../assets/images/about/student.png";
import TeacherTalkingImage from "../assets/images/about/teacher-talking.png";

const About = props => {
    const FlickityOption = {
        initialIndex: 1,
        prevNextButtons: true,
        pageDots: false
    }
    const newsList = [
        {
            title: "meisner with music",
            description: `Bir topluma dışarıdan müdahalelerde bulunulduğuna inanılan komplo teorilerini ifade eder. 
                “Dış mihrak” olarak ifade edilen bu türe günümüzde çok sık rastlarız. Politikacılar, bunlara inanmasa 
                dahi, halka böyle bir imaj sunup onların inanmasını ve dışarıdaki bir düşmana karşı birlik olunması 
                gerektiğini söylerler.`
        },
        {
            title: "meisner with music",
            description: `Bir topluma dışarıdan müdahalelerde bulunulduğuna inanılan komplo teorilerini ifade eder. 
                “Dış mihrak” olarak ifade edilen bu türe günümüzde çok sık rastlarız. Politikacılar, bunlara inanmasa 
                dahi, halka böyle bir imaj sunup onların inanmasını ve dışarıdaki bir düşmana karşı birlik olunması 
                gerektiğini söylerler.`
        },
        {
            title: "meisner with music",
            description: `Bir topluma dışarıdan müdahalelerde bulunulduğuna inanılan komplo teorilerini ifade eder. 
                “Dış mihrak” olarak ifade edilen bu türe günümüzde çok sık rastlarız. Politikacılar, bunlara inanmasa 
                dahi, halka böyle bir imaj sunup onların inanmasını ve dışarıdaki bir düşmana karşı birlik olunması 
                gerektiğini söylerler.`
        },
        {
            title: "meisner with music",
            description: `Bir topluma dışarıdan müdahalelerde bulunulduğuna inanılan komplo teorilerini ifade eder. 
                “Dış mihrak” olarak ifade edilen bu türe günümüzde çok sık rastlarız. Politikacılar, bunlara inanmasa 
                dahi, halka böyle bir imaj sunup onların inanmasını ve dışarıdaki bir düşmana karşı birlik olunması 
                gerektiğini söylerler.`
        }
    ]

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
            <div className="news-section">
                <div className="img-container">
                    <img src={NewsImage} alt="news image" />
                </div>
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={FlickityOption} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    {
                        newsList.map((one, index) => {
                            return (
                                <div className="_item" key={`news_${index}`}>
                                    <img src={VideoLearningImage} alt="video learning image"/>
                                    <h2 className="title">
                                        {one.title}
                                    </h2>
                                    <p className="description">
                                        {one.description}
                                    </p>
                                    <div class="ctrl-container">
                                        <span>MORE INFO</span><img src={SlideWhiteIcon} alt="pointer icon" />
                                    </div>
                                </div>
                            );        
                        })
                    }
                </Flickity>
            </div>
            <div id="students" className="for-students-section">
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
                    <div className="ctrl-container"><button className="btn btn-orange">Get Started Today</button></div>
                </div>
            </div>
            <UpcomingEvent />
            <div id="teachers" className="for-teacher-section">
                <div className="img-container">
                    <img src={TeacherTalkingImage} alt="Student Image"/>
                    <div className="ctrl-container"><button className="btn btn-orange">Get Started Today</button></div>
                </div>
                <div className="for-teacher-content">
                    <h2 className="title">
                        for <span>Teachers</span>
                    </h2>
                    <div className="description">
                        <p>
                            Talented people are everywhere, but opportunities can be harder to find. Be your best at the next opportunity, MusicalBest have all the right tools for you.

                            MusicalBest teachers are real professionals coming from the heart
                            of the industry and passionate about share they experience and knowledge. We are always on lookout for the right fit. If you feel passionate about our Industry, has experience, would love to share your knowledge with others and feel you are the right person to work with us, we would love to hear from you.
                            What we can offer you:
                        </p>
                        <p>
                            <span>Dedication </span> - work with people, teachers and students who passionate about what they do.
                        </p>
                        <p>
                            <span>Network</span> - excellent Networking of industry professionals.
                        </p>
                        <p>
                            <span>Flexibility</span> - teach in the comfort of your own home, at your own schedule.
                        </p>
                        <p>
                            <span>Tools</span> -  variety of tools to enhance your teaching.
                        </p>
                        <p>
                            <span>Personalization</span> - personalization of you teaching stile and material.
                        </p>
                    </div>
                </div>
            </div>
            <FrequentlyQuestion />
        </div>
    );
}

export default About;