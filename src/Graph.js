//image from which to extract data, based on position of indicator line overlay
//cutout       <p id='graphTitle'>graph represents image brightness along line between circles</p>


import React, { useEffect } from 'react';
import './Graph.css';

function Graph (props) {
  return (
    <div className='graph'> {/*comment here*/}
      <canvas ref={props.passRef} id="drawingCanvas" width={props.drawingCanvasWidth} height={props.drawingCanvasHeight}></canvas>
      <svg id='playIndexLine' width="10%" height="100%" >
        <line id='line' x1='22' y1='0' x2='22' y2='200' />
      </svg>
    </div>
  );
}

export default Graph;