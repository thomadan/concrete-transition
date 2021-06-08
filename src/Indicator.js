// indicator component:
//	 a line draggable by its endpoints,
//   indicating what pixels from underlying image to process.
//   for use in frame component

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';  // import react-draggable, which is installed via npm, for dragging elements
import './Indicator.css';
 
function Indicator (props) {

  const [endpointStrokeWidth, setEndpointStrokeWidth] = useState('0.42em');

  // dynamic styles
  const indicatorDivStyle = {
    position: 'relative',
    //backgroundColor: 'red',

    width: '100%',
    height: '100%',
    //top: '50%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
  };

  const lineStyle = {
    position: 'absolute',
    stroke: '#6b6b6b',
    strokeWidth: '0.2em',
    opacity: '0.7',
  };

  const circleDivStyle = {
    display: 'inline-block',
    height: '30px',
    width: '30px',
    zIndex: 2
  };

  const circleStyleDark = {
    stroke: '#554444',
    opacity: '0.3',
    fill: 'none',
    strokeWidth: endpointStrokeWidth
  };

  const circleStyle = {
    stroke: '#554444',
    opacity: '0.3',
    fill: 'none',
    strokeWidth: endpointStrokeWidth
  };

  const svgteststyle = {
    transform: 'translate(-2.5em, -2.5em)',
    top: '30px',
    //backgroundColor: 'red',
    preserveAspectRatio: "none",
  }

  const svgLineStyle = {
    position: 'absolute'
  }

  // on every change in state
  useEffect(() => {
      console.log('useeffect indicator with x, y ' + props.x1 + ', ' + props.y1);

  });

  function handleMove5 (e, ui) {
    props.xyChange(0, ui.x, ui.y);
    // console.log('handle1 ui x ' + ui.x + ' ui y ' + ui.y);
  }

  function handleMove6 (e, ui) {
    props.xyChange(1, ui.x, ui.y);
    // console.log('handle2 ui x ' + ui.x + ' ui y ' + ui.y);
  }

  return (
    
    // indicator container div
    // line is 0 + because otherwise it assumes some default strange pos
    // +0 because style transform needs an int in  order to work
    <div id="indicator" style={indicatorDivStyle}>
      
      {/*line*/}
      <svg style={svgLineStyle} width="100%" height="100%" >
        <line id='line'
              style={lineStyle}
              x1={props.x1 + 0}
              y1={props.y1 + 0}
              x2={props.x2 + 0}
              y2={props.y2 + 0} />
      </svg>

      {/*handle l*/}
      <Draggable
        id='draggable1'
        axis="both"
        handle=".handle"
        position={{x: props.x1, y: props.y1}}
        scale={1}
        onDrag={handleMove5}
        // onStop={handleStop5p}
        >  
        
        <div id='handle1'>
    
          <svg style={svgteststyle}    
            className="handle"
            width='5em'
            height="5em"
            viewBox="56 56 112 112">

            <circle style={circleStyle} cx={'112'} cy={'112'} r={'25'}/>
          </svg>
        </div>
      </Draggable>

      {/*handle r*/}
      <Draggable
        id='draggable2'
        axis="both"
        handle=".handle"
        position={{x: props.x2, y: props.y2}}
        scale={1}
        onDrag={handleMove6}
        >  
        
        <div id='handle2'>
      
          <svg style={svgteststyle}    
            className="handle"
            width='5em'
            height="5em"
            viewBox="0 0 112 112">

            <circle style={circleStyle} cx={'56'} cy={'56'} r={'25'}/>
          </svg>
        </div>
      </Draggable>


    </div>
  );
}

export default Indicator;