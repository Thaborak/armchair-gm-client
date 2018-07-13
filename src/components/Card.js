import React from 'react';
import { connect } from 'react-redux';


export function Card({
    FirstName,
    ID,
    JerseyNumber,
    LastName,
    Position,
    img,
}) {
    console.log(FirstName)
    return (
        <span className="search-results">
        <img src={img}/>
            <p>{Position} {FirstName} {LastName}</p>
        </span>
    );
}


export default connect()(Card);