import React from "react";

import './Custom-button.styles.css';

const CustomButton = ({ handleClick, children }) => {
    return (
        <div className="toLeft">
            <button className="custom-button" onClick={handleClick}> {children} </button>
        </div>
    )
}

export default CustomButton;
