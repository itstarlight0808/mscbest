import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ClassAd from "../components/ClassAd";
import Quote from "../components/QuoteComponent";
import TeacherComponent from "../components/TeacherComponent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

import Teacher1 from "../assets/images/teachers/teacher1.png";
import Teacher2 from "../assets/images/teachers/teacher2.png";
import Teacher3 from "../assets/images/teachers/teacher3.png";
import Teacher4 from "../assets/images/teachers/teacher4.png";

const useDialogStyles = makeStyles(theme => {
    return {
        form: {
            
        },
        closeIcon: {
            float: "right",
            color: "#fff",
            cursor: "pointer"
        }
    }
});
const Teachers = props => {
    const dialogClasses = useDialogStyles();

    const teacherList = [
        {
            name: "Holly Hylton",
            photo: Teacher1,
            bio: `Holly Hylton came to Hamburg directly from New York. She studied acting in NYC according to the Sandford-Meisner
                method and has had the opportunity to perform on stages all over the world. She has appeared in the German Stage 
                Entertainment productions of Elisabeth, Sister Act, Phantom of the Opera, Love Never Dies and Kinky Boots. 
                Most recently she played the role of “Kathy Wigman” in the World premier of Ralph Siegel's musical, Zeppelin. 
                She's been on tour throughout America and Europe, appeared in off- and off-off-Broadway productions in NYC as well as 
                in regional theatre productions around the USA. Furthermore, she works in commercials, independent films, as a live 
                moderator and has experience in the field of on-camera industrial teleprompter work and voice overs.
                In addition to her work as an actress, she taught role work and song interpretation at the Joop van den Ende Academy in 
                Hamburg and currently teaches at the North German Musical Academy. Holly also teaches the professional child actors in 
                the German Broadway productions of “Tina”- Das Tina Turner Musical and Disney's, Frozen - The Musical. She is the 
                founder and teacher of her “Meisner with Music,” “Meisner with Monologues” and “Meisnering yourSELF” online and in-person 
                master classes. Holly is also one of the original co-founders of the EDUtainment Production Company, BitArt Productions as 
                well as Managing School Director at the Stagecoach Performing Arts Schools in Hamburg and Berlin.
                Holly's best role to date is being the mother of a little girl, who is her radiant Joie. Holly believes that we are best when 
                we are truly allowed to be who we are. `,
            classes: [
                {
                    title: "Meisner with Music",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisner With Monologues",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisnering Yourself",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Sneak Peak",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                }
            ]
        },
        {
            name: "Holly Hylton",
            photo: Teacher2,
            bio: `Holly Hylton came to Hamburg directly from New York. She studied acting in NYC according to the Sandford-Meisner
                method and has had the opportunity to perform on stages all over the world. She has appeared in the German Stage 
                Entertainment productions of Elisabeth, Sister Act, Phantom of the Opera, Love Never Dies and Kinky Boots. 
                Most recently she played the role of “Kathy Wigman” in the World premier of Ralph Siegel's musical, Zeppelin. 
                She's been on tour throughout America and Europe, appeared in off- and off-off-Broadway productions in NYC as well as 
                in regional theatre productions around the USA. Furthermore, she works in commercials, independent films, as a live 
                moderator and has experience in the field of on-camera industrial teleprompter work and voice overs.
                In addition to her work as an actress, she taught role work and song interpretation at the Joop van den Ende Academy in 
                Hamburg and currently teaches at the North German Musical Academy. Holly also teaches the professional child actors in 
                the German Broadway productions of “Tina”- Das Tina Turner Musical and Disney's, Frozen - The Musical. She is the 
                founder and teacher of her “Meisner with Music,” “Meisner with Monologues” and “Meisnering yourSELF” online and in-person 
                master classes. Holly is also one of the original co-founders of the EDUtainment Production Company, BitArt Productions as 
                well as Managing School Director at the Stagecoach Performing Arts Schools in Hamburg and Berlin.
                Holly's best role to date is being the mother of a little girl, who is her radiant Joie. Holly believes that we are best when 
                we are truly allowed to be who we are. `,
            classes: [
                {
                    title: "Meisner with Music",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisner With Monologues",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisnering Yourself",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Sneak Peak",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                }
            ]
        },
        {
            name: "Holly Hylton",
            photo: Teacher3,
            bio: `Holly Hylton came to Hamburg directly from New York. She studied acting in NYC according to the Sandford-Meisner
                method and has had the opportunity to perform on stages all over the world. She has appeared in the German Stage 
                Entertainment productions of Elisabeth, Sister Act, Phantom of the Opera, Love Never Dies and Kinky Boots. 
                Most recently she played the role of “Kathy Wigman” in the World premier of Ralph Siegel's musical, Zeppelin. 
                She's been on tour throughout America and Europe, appeared in off- and off-off-Broadway productions in NYC as well as 
                in regional theatre productions around the USA. Furthermore, she works in commercials, independent films, as a live 
                moderator and has experience in the field of on-camera industrial teleprompter work and voice overs.
                In addition to her work as an actress, she taught role work and song interpretation at the Joop van den Ende Academy in 
                Hamburg and currently teaches at the North German Musical Academy. Holly also teaches the professional child actors in 
                the German Broadway productions of “Tina”- Das Tina Turner Musical and Disney's, Frozen - The Musical. She is the 
                founder and teacher of her “Meisner with Music,” “Meisner with Monologues” and “Meisnering yourSELF” online and in-person 
                master classes. Holly is also one of the original co-founders of the EDUtainment Production Company, BitArt Productions as 
                well as Managing School Director at the Stagecoach Performing Arts Schools in Hamburg and Berlin.
                Holly's best role to date is being the mother of a little girl, who is her radiant Joie. Holly believes that we are best when 
                we are truly allowed to be who we are. `,
            classes: [
                {
                    title: "Meisner with Music",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisner With Monologues",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisnering Yourself",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Sneak Peak",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                }
            ]
        },
        {
            name: "Holly Hylton",
            photo: Teacher4,
            bio: `Holly Hylton came to Hamburg directly from New York. She studied acting in NYC according to the Sandford-Meisner
                method and has had the opportunity to perform on stages all over the world. She has appeared in the German Stage 
                Entertainment productions of Elisabeth, Sister Act, Phantom of the Opera, Love Never Dies and Kinky Boots. 
                Most recently she played the role of “Kathy Wigman” in the World premier of Ralph Siegel's musical, Zeppelin. 
                She's been on tour throughout America and Europe, appeared in off- and off-off-Broadway productions in NYC as well as 
                in regional theatre productions around the USA. Furthermore, she works in commercials, independent films, as a live 
                moderator and has experience in the field of on-camera industrial teleprompter work and voice overs.
                In addition to her work as an actress, she taught role work and song interpretation at the Joop van den Ende Academy in 
                Hamburg and currently teaches at the North German Musical Academy. Holly also teaches the professional child actors in 
                the German Broadway productions of “Tina”- Das Tina Turner Musical and Disney's, Frozen - The Musical. She is the 
                founder and teacher of her “Meisner with Music,” “Meisner with Monologues” and “Meisnering yourSELF” online and in-person 
                master classes. Holly is also one of the original co-founders of the EDUtainment Production Company, BitArt Productions as 
                well as Managing School Director at the Stagecoach Performing Arts Schools in Hamburg and Berlin.
                Holly's best role to date is being the mother of a little girl, who is her radiant Joie. Holly believes that we are best when 
                we are truly allowed to be who we are. `,
            classes: [
                {
                    title: "Meisner with Music",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisner With Monologues",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Meisnering Yourself",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                },
                {
                    title: "Sneak Peak",
                    description: `Musical BEST - Bootcamp exploring Skills & Talents is a educational network platform for professionals from around 
                        the world from musical theater industry. With MusicalBEST you learn live from the best and at the comfort of your own home. 
                        Whether it be work on your acting skills, extension and enhancement of your audition material, getting under control your stage 
                        fright and more, MusicalBEST delivers a world class live online learning experience to enhance your profecional skill and talents.`
                }
            ]
        },
    ];
    const [selected, setSelected] = useState(-1);

    const closeTeacherDialog = () => {
        setSelected(-1);
    }
    return (
        <div className="teachers-container">
            <ClassAd />
            <Quote
                quote="If you think it's expensive to hire a professional to do the job, wait until you hire an amateur."
                writer="Red Adair"
            />
            <div className="teacher-list">
                {
                    teacherList.map((teacher, index) => {
                        return (
                            <div className="teacher-photo" key={`teacher_${index}`} onClick={() => setSelected(index)}>
                                <img src={teacher.photo} alt="photo"/>
                                <div className="photo-tooltip">
                                    <h2>{teacher.name}</h2>
                                    <div>{(teacher.bio.length <= 350? teacher.bio: teacher.bio.substring(0, 350)) + "..."}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <FrequentlyQuestion />
            <Dialog
                open={selected >= 0} 
                className="teacher-modal"
                fullWidth={true}
                keepMounted
            >
                <DialogTitle><FontAwesomeIcon icon="fas fa-xmark" size="lg" className={ `${dialogClasses.closeIcon} btn-animation` } onClick={closeTeacherDialog} /></DialogTitle>
                <DialogContent className={dialogClasses.form}>
                    <TeacherComponent data={teacherList[selected]} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Teachers;