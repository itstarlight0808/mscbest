import React, {useState, useEffect} from "react";
import { TextField } from "@material-ui/core"

import FrequentlyQuestion from "../components/FrequentlyQuestion";

const ContactUs = (props) => {
    return (
        <div className="contact-us">
            <div className="main-section">
                <div className="contact-form">
                    <h2 className="title">Get In Touch</h2>
                    <div className="form-control-container">
                        <h3>Leave us a message</h3>
                        <div className="contact-form-control">
                            <TextField label="Name" placeholder="First_Name Last_Name" variant="outlined" size="small"/>
                        </div>
                        <div className="contact-form-control">
                            <TextField placeholder="Email Address" variant="outlined" size="small" />
                        </div>
                        <div className="contact-form-control">
                            <TextField
                                placeholder="Your Message"
                                multiline
                                rows={6}
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="ctrl-container">
                        <button className="btn btn-purple">Send</button>
                    </div>
                </div>
            </div>
            <FrequentlyQuestion />
        </div>
    )
}

export default ContactUs;