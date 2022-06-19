import React, {useState} from "react";

import StartDoubleQuote from "../assets/images/components/quote/start-double-quote.svg";
import EndDoubleQuote from "../assets/images/components/quote/end-double-quote.svg";

const Quote = props => {
    return (
        <div className="quote-container">
            <div className="quote">
                <div className="start-quote">
                    <img src={StartDoubleQuote} alt="double quote" />
                </div>
                <div className="quote-words">
                    <span>
                        {props.quote}
                    </span>
                </div>
                <div className="end-quote">
                    <div className="speaker-name">
                        <span>- {props.writer}</span>
                    </div>
                    <img src={EndDoubleQuote} alt="double quote" />
                </div>
            </div>
        </div>
    )
}

export default Quote;