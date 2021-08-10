//image from which to extract data, based on position of indicator line overlay
//cutout       <p id='graphTitle'>graph represents image brightness along line between circles</p>


import React, { useEffect } from 'react';
import './Graph.css';

function Graph (props) {
  return (
    <div className='graph'> {/*comment here*/}
      <canvas ref={props.passRef} id="drawingCanvas" width={props.drawingCanvasWidth} height={props.drawingCanvasHeight}></canvas>
      <svg id='playIndexLine' viewBox="0 0 100 100" preserveAspectRatio="none" >
        <line id='line' x1='50' y1='0' x2='50' y2='100' />
      </svg>
    </div>
  );
}

export default Graph;

// <rect x="0" y="0" width="100%" height="100%" />

