import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

import SittingGirlImage from "../assets/images/ads/sitting_girl.png";
import DancingGirlImage from "../assets/images/ads/dancing_girl.png";
import CheckBox from "../assets/images/ads/checkbox.svg";
import WomanTeacherImage from "../assets/images/ads/woman_teacher.png";
import ManTeacherImage from "../assets/images/ads/man_teacher.png";
import Avatar1 from "../assets/images/avatars/avatar1.png";
import Avatar2 from "../assets/images/avatars/avatar2.png";
import Avatar3 from "../assets/images/avatars/avatar3.png";
import Avatar4 from "../assets/images/avatars/avatar4.png";
import Avatar5 from "../assets/images/avatars/avatar5.png";
import Avatar6 from "../assets/images/avatars/avatar6.png";
import Avatar7 from "../assets/images/avatars/teacher.png";
import TrialClassImage from "../assets/images/ads/trial_class.png";
import MusicClassImage from "../assets/images/ads/music_class.png";
import ClassWithFearImage from "../assets/images/ads/class_with_fear.png";
import ClassAudienceImage from "../assets/images/ads/class_audience.png";
import StagePresenceClassImage from "../assets/images/ads/stage_presence_class.png";
import BasicDanceClassImage from "../assets/images/ads/basic_dance_class.png";
import LectureImage from "../assets/images/ads/lecture.png";

const useStyles = makeStyles(
    (theme) => ({
        avatarGroup: {
            margin: "-20px 0 0 20px",
        }
    })
);
const Ads = props => {
    const classes = useStyles();
    const classList = [
        {
            avatar: Avatar4,
            classImage: WomanTeacherImage,
            level: "All Levels",
            className: "Meisner with Dialoge",
            teacherName: "Holly Hylton"
        },
        {
            avatar: Avatar4,
            classImage: MusicClassImage,
            level: "All Levels",
            className: "Meisner with Music",
            teacherName: "Holly Hylton"
        },
        {
            avatar: Avatar5,
            classImage: ClassWithFearImage,
            level: "Level I",
            className: "Grip on Fear & Uncertanty",
            teacherName: "Sonia Farke"
        },
        {
            avatar: Avatar6,
            classImage: ClassAudienceImage,
            level: "Level II",
            className: "Audition Prep",
            teacherName: "Kristin Hölk"
        },
        {
            avatar: Avatar7,
            classImage: StagePresenceClassImage,
            level: "All Levels",
            className: "Stage Presence",
            teacherName: "Carrie Baker"
        },
    ];

    return (
        <div className="ads000-container">
           <div className="explore-section">
                <div className="section-1">
                    <h1 className="title">Exploring your Skills &amp; Talents to support you and <br/><span>your passion</span></h1>
                    <div className="description">
                        <span>You are welcome to visit our center where every person is treated with high attention</span>
                    </div>
                    <div className="ctrl-container">
                        <div className="dancing-img-container">
                            <img src={DancingGirlImage} alt="dancing girl" />
                        </div>
                        <div className="ctrl-group">
                            <button className="btn btn-pink">GIVE IT TRY</button>
                            <button className="btn btn-play">
                                <div>
                                    <FontAwesomeIcon icon="fas fa-circle-play" /><span>Watch Video</span>
                                </div>
                            </button>
                        </div>
                        <div className="sitting-img-container">
                            <img src={SittingGirlImage} alt="sitting girl" />
                        </div>
                    </div>
                </div>
                <div className="section-2">
                    <div className="subscription-plan-container">
                        <h3>membership plan</h3>

                        <div className="feature-item">
                            <img src={CheckBox} alt="checkbox" />
                            <span>All Featured</span>
                        </div>
                        <div className="feature-item">
                            <img src={CheckBox} alt="checkbox" />
                            <span>Unlimited Places</span>
                        </div>
                        <div className="feature-item">
                            <img src={CheckBox} alt="checkbox" />
                            <span>Free Yoga Shirt</span>
                        </div>
                        <div className="feature-item">
                            <img src={CheckBox} alt="checkbox" />
                            <span>Free Yoga Equipment</span>
                        </div>
                    </div>
                    <div className="class-item">
                        <div className="img-container">
                            <img src={WomanTeacherImage} alt="woman teacher image" />
                            <button className="btn btn-play"><FontAwesomeIcon icon="fas fa-circle-play" /></button>
                        </div>
                        <AvatarGroup className={classes.avatarGroup} max={3}>
                            <Avatar alt="Remy Shap" src={Avatar1} />
                            <Avatar alt="Cindy Baker" src={Avatar2} />
                        </AvatarGroup>
                        <h2 className="title">
                            Meisner with Dialoge Class Description
                        </h2>
                        <span>10-15 participants max</span>
                    </div>
                    <div className="class-item">
                        <div className="img-container">
                            <img src={ManTeacherImage} alt="man teacher image" />
                            <button className="btn btn-play"><FontAwesomeIcon icon="fas fa-circle-play" /></button>
                        </div>
                        <AvatarGroup className={classes.avatarGroup} max={3}>
                            <Avatar alt="Remy Shap" src={Avatar1} />
                        </AvatarGroup>
                        <h2 className="title">
                            (Online) Level II
                        </h2>
                        <span>Unlimited practicants</span>
                    </div>
                </div>
           </div>

           <div className="down-triangle"></div>
           <div className="master-class-section">
                <h2 className="title">Master Classes Everyday</h2>
                <p className="description">
                    Kula Annex offers both in-studio and online yoga &amp; meditation classes, as well as workshops, reiki, &amp; teacher 
                    trainings. Our classes , including restorative, yin, flow, hot, and (new) pilates classes with an emphasis on alignment 
                    and intention. Our teachers are unique, creative, and compassionate beings devoted to sharing the knowledge they have 
                    gathered on their journeys through life.
                </p>
           </div>
           <div className="up-triangle"></div>

           <div className="details-section">
                <div className="benefits-section">
                    <h2 className="title">30 days for <span>$55</span></h2>
                    <h4 className="description">
                        All students are eligible to try our <span>30 Day UNLIMITED</span> Intro Special once. 
                        Take as many classes as you want, either in studio or online, for 30 days straight.
                    </h4>
                    <div className="img-container">
                        <div className="img-wrapper">
                            <img src={TrialClassImage} alt="trial class" />
                            <h4>
                                If you are new to Kula, or if you’ve been here before but have yet to try our Intro Special, click on 
                                the button below to add it to your account. If for any reason you’re having issues, please email 
                                annex@mykula.ca
                            </h4>
                            <button className="btn btn-play"><FontAwesomeIcon icon="fas fa-circle-play" /></button>
                        </div>
                    </div>
                    <button className="btn btn-try">Try 30 Day Intro Special</button>
                </div>
                <div className="classes-section">
                    <span>Classes Organized For All Types</span>
                    <h2 className="title">Check Out Some Of Our Classes</h2>

                    <div className="class-list-container">
                        <div className="basic-class-item class-item">
                            <img src={BasicDanceClassImage} alt="basic dance class" />
                            <div className="teacher-info">
                                <div className="teacher-name">
                                    <FontAwesomeIcon icon="far fa-user"/>
                                    Julia
                                </div>
                                <Avatar src={Avatar3} alt="julia" />
                            </div>
                            <div className="details">
                                <span>All Levels</span>
                                <h3>Basic Dance Movements Class</h3>
                            </div>
                        </div>

                        {
                            classList.map((one, index) => {
                                return (
                                    <div className="class-item" key={`class_${index}`}>
                                        <img src={one.classImage} alt="class image" />
                                        <AvatarGroup className={classes.avatarGroup} max={3}>
                                            <Avatar alt={one.teacherName} src={one.avatar} />
                                        </AvatarGroup>
                                        <span className="class-level">{one.level}</span>
                                        <h2 className="class-name">
                                            {one.className}
                                        </h2>
                                        <div className="teacher-info">
                                            <FontAwesomeIcon icon="far fa-user"/>
                                            {one.teacherName}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
           </div>

           <div className="down-triangle"></div>      
           <div className="member-section">
                <div className="details">
                    <h3 className="title">Member Perks</h3>
                    <p className="description">
                        At Kula, we seek to support our members to live a healthy, whole-hearted yogic lifestyle everyday! 
                        To support our members to live their yoga, both on and off the mat, we offer the following member perks 
                        when you sign up for an ongoing membership (minimum 2 months).

                        From free yoga to special workshops to enhance your practice and provide ongoing education, to substantial 
                        discounts at local like-minded businesses, our members enjoy the additional support to lead a life joy!
                    </p>
                </div>
                <div className="img-container">
                    <img src={LectureImage} alt="lecture" />
                </div>
           </div>
           <div className="up-triangle"></div>

           <div className="price-plan-container">
                <h2 className="title">Online Pricing</h2>
                <div className="price-plan-list">
                    <div className="plan-item">
                        <div className="body">
                            <h2>One Class Online</h2>
                            <h4>anytime</h4>
                            <span className="price">$10</span>
                        </div>
                        <div className="footer">
                            <span>In-Studio</span>
                            <span>$99+hst</span>
                        </div>
                    </div>
                    <div className="plan-item active">
                        <div className="body">
                            <h2>5 Class Pack</h2>
                            <h4>$9 per class</h4>
                            <span className="price">$45</span>
                        </div>
                        <div className="footer">
                            <span>In-Studio</span>
                            <span>$99+hst</span>
                        </div>
                    </div>
                    <div className="plan-item">
                        <div className="body">
                            <h2>10 Class Pack</h2>
                            <h4>$8.5 per class</h4>
                            <span className="price">$85</span>
                        </div>
                        <div className="footer">
                            <span>In-Studio</span>
                            <span>$99+hst</span>
                        </div>
                    </div>
                </div>
                <p className="details"> 
                    Kula Annex also offers our Energy Exchange Program for individuals who requires assistance in class payments.
                    <br />
                    <a href="#">Learn More</a>
                </p>

                <div className="join-us-container">
                    <h2>Join Us for Class!</h2>
                    <button className="btn btn-pink">SEE CLASSES SCHEDULES</button>
                </div>
           </div>
        </div>
    );
}

export default Ads;