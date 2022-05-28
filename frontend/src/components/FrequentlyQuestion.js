import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

const FrequentlyQuestion = props => {
    return (
        <div className="question-section">
            <h2 className="title">
                <span>Frequently <i>Asked Questions</i></span>
            </h2>
            <div className="question-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is MusicalBEST?</Accordion.Header>
                        <Accordion.Body>
                            Musical BEST - Bootcamp exploring Skills &amp; Talents is a educational network platform for 
                            professionals from around the world from musical theater industry. 
                            With MusicalBEST you learn live from the best and at the comfort of your own home. 
                            Whether it be work on your acting skills, extension and enhancement of your audition 
                            material, getting under control your stage fright and more, MusicalBEST delivers 
                            a world class live online learning experience to enhance your profecional skill and 
                            talents. 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Who are the teachers at MusicalBEST?</Accordion.Header>
                        <Accordion.Body>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Which classes are right for me?</Accordion.Header>
                        <Accordion.Body>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How much does Class cost?</Accordion.Header>
                        <Accordion.Body>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took 
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default FrequentlyQuestion;