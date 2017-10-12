import React, {Component} from 'react';

export default function Marker (props){
    return (
        <div className="marker" style={{opacity: props.opacity || 0}}></div>
    );
}


