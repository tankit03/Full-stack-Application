import React from 'react';

function PropertyFeaturePopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-icon" onClick={() => props.setTrigger(false)}
                >x</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PropertyFeaturePopup;