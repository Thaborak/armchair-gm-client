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
    return (
        
        <span className="search-results">
        <img src={img}/>
            <p>{Position} {FirstName} {LastName}</p>
            <p>2018 STATS COMING SOON</p>
        </span>
    );
}


export default connect()(Card);