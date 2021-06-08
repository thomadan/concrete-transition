
/*
image from which to extract data,
based on position of indicator line overlay
alternatively not background but html element: <img src={image} alt="" style={imageStyle}/>

there are two spots for css: Image.css and const divStyle
  this is because some elements are supposed to be dynamic, like opacity and image choice

cutout       <p id='bildetTitle' >draggable circles adjust line measuring image brightness</p>


*/

// todo: get size of parent on which to stretch canvas

import React, { useEffect } from 'react';
// import image from './images/texture.jpg'; // here we are importing the image
import image from "./images/stones.jpg"
import Indicator from './Indicator';
import './Bildet.css';

function Bildet (props) {

  // for things that should not happen before render
  //   in this case, get element by id cannot happen before render, as it does not exist then
  //
  // added second parameter [] to useEffect if to run just once (not everytime state gets updated)
  // the second param [] is an array of variables that the component will check to make sure changed before re-rendering
  useEffect(() => {

    // this cannot happen before render as the canvas does not exist before render (or can it now?)
    initCanvas();
  }, []);

  function initCanvas () {
    var canvasPic = document.getElementById("canvasPic");
    var ctx = canvasPic.getContext("2d");

    ctx.clearRect(0, 0, 120, 400);
    ctx.fillStyle = "#0000F2";         // make background fill (is this necessary?)
    ctx.fillRect(0, 0, 1120, 364);

    var imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = function() {
      //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      ctx.drawImage(imageObj, 0, 0, 2500, 600, 0, 0, 2500, 600);
    };

    // test drawing
    ctx.strokeStyle = "#AA9999";
    ctx.lineWidth = 3;
    ctx.moveTo(50, 300);
    ctx.lineTo(90, 210);
    ctx.stroke();
  }

  return (
    <div id='bildet'>
      <canvas ref={props.passRef} id="canvasPic" width={'1120'} height="364"></canvas>
      <Indicator 
        frameWidth={props.frameWidth}
        bildetHeight={props.bildetHeight}
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        xyChange={props.xyChange}/>
    </div>
  );
}

export default Bildet;