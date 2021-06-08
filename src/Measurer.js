
import './Measurer.css';
import React, { useEffect } from 'react';

function Measurer (props) {

    return (
        <div id={props.id}>
          <p>bildet: {props.x1}, {props.y1}</p>
        </div>
    )
}

export default Measurer;