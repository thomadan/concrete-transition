/*
this, Frame.js, is the container
  for the image object and indicator objects and graph object and settings
its purpose is
  to be a centered, dynamically resizing container in which to place its children
it is vertically centered and full screen width up to 70 em

NOW:
  title should center vertically in available space, also on resize

todo today
  play button should not go out of right bounds
  subtitles should fit narrow width/height
  play line should be same style as scan line
  play line should be accurately placed
  graph should have a solid relation to its borders

TODO BUGS:
  check performance on low end devices
  when dragging outside canvas, crash: set dragging bounds
  sometimes a line of background is visible, depending on width of window
  when resizing small horizontally, top disappears
  title is jumping with bars
  when dragging circle, it cuts edge (make margin bigger?)

TODO ADJUST:
  dynamic contrast of circles
  limit to 100 points for animation export
  currently only red is used?
  white screen before load rather than flashing random stuff

TODO CLEANUP:
  use return rather than method props ... in order to encapsulate
  clean up code so far
  clean up warnings in console
  combine useeffect in one, not two?
  consider baking usestates inside one object
  make sure that all references to size is pointing to a var
  check all prop sends are good style

TODO FEATURES:
  circles are hand drawn on transparent
  get it on git
  make lowpass filter damping dynamic by fader
  l and r markers of handles are missing
  settings menu is missing, with smooth
  handle should transform on hover
  framing of graph is missing

TODO DOCUMENT:
  credit: drag and drop library
  credit: LPF library: https://www.npmjs.com/package/lpf
  credit: curve library
  credit new draggable from https://levelup.gitconnected.com/create-an-easy-custom-react-hook-for-dragging-components-3779b30d08b5
  credit translate values from https://sagarpansuriya.wordpress.com/2020/08/08/how-to-get-css-translate-values-with-javascript/
  moving average: https://github.com/kaelzhang/moving-averages#readme
  useWindowSize: https://usehooks.com/useWindowSize/

DONE: 
  filter starts at strange position - must pad start values?
  position handles and line mid-canvas at start
  svg container for line is not in place
  bug: line is not always centering within circle: x and y on mark
  main issue: image canvas is too big, skewing scan coordinates
  filter is strange behavior - suspect filter or curve does not like minus values - convert all to +?
  handles are off screen: check position:relative, etc.
  line is not centering in handles: follow and ... reqth
  graph is not scaling correctly: drawingcanvaswidth should be replaced with winwos wideth
  how to get portion of image that i want
  filter has strange shark fin curve on hard onsets - get better filter? yes, get or make second order filter
  when handle/line position is not scaling: x1 should be dynamic width of canvas + something 
  graph is too high: on resize get height of graph, etc.
*/

import React, {useState, useEffect, useRef} from 'react';
import './Frame.css';
import Bildet from './Bildet'; // import image object to display
import Graph from './Graph';
import Animator from './Animator';
import useWindowSize from './useWindowSize';
import './curve.js';
import LPF from './LPF.js';
import {ma, dma, ema, sma, wma} from 'moving-averages'
import image from "./images/stones.jpg"

function Frame() {

  const [frameWidth, setFrameWidth] = useState(100);
  const [bildetHeight, setBildetHeight] = useState(100);

  // references for canvas before it is initialized
  const imageCanvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);

  // state variables
  const [x1, setX1] = useState(100);    // indicator endpoint 1 x coordinate
  const [y1, setY1] = useState(100);    //   and y coordinate
  const [x2, setX2] = useState(300);    // indicator endpoint 2 x coordinate
  const [y2, setY2] = useState(200);    //   and y coordinate

  const [x1p, setX1p] = useState(0.2);    // indicator endpoint 1 x coordinate
  const [y1p, setY1p] = useState(0.2);    //   and y coordinate
  const [x2p, setX2p] = useState(0.3);    // indicator endpoint 2 x coordinate
  const [y2p, setY2p] = useState(0.3);    //   and y coordinate

  const defaultX1 = 100;
  const defaultY1 = 270;
  const defaultX2 = 100;
  const defaultY2 = 200;

  const [drawingCanvasWidth, setDrawingCanvasWidth] = useState(null);
  const [drawingCanvasHeight, setDrawingCanvasHeight] = useState(null);
  const [graphHeight, setGraphHeight] = useState(null);

  const [smooth, setSmooth] = useState(3);    // indicator endpoint 1 x coordinate

  // dynamic number of points based on length of line, or static 100 points?
  const numberOfPoints = 100;
  const [calibratePoint, setCalibratePoint] = useState(0);

  // initialize array for points of color along line
  var points = [];

  // on first render
  useEffect(() => {

    console.log('bare første gang');

    // get width, height from frame, set canvas dimensions
    setDrawingCanvasWidth(document.getElementById('drawingCanvas').getBoundingClientRect().width);
    setDrawingCanvasHeight(document.getElementById('drawingCanvas').getBoundingClientRect().height);
    initCanvas(drawingCanvasWidth, drawingCanvasHeight);

    // add event listener for resizing
    window.addEventListener("resize", handleResize);

    // call handler right away so state gets updated with initial window size
    handleResize();
  }, []);

  // on every change in state
  useEffect(() => {
    console.log('hver gang noe endres i frame'); // som når resize trigger [set]

    plotLine();

    // this is what scales handles and line !!
    setX1(x1p * frameWidth);
    setY1(bildetHeight * y1p);
    console.log('x1p ' + x1p);

    setX2(frameWidth * x2p);
    setY2(bildetHeight * y2p);

    /*
    setX1(frameWidth/5);
    setX2(frameWidth/2);
    setY1(bildetHeight/10);
    setY2(bildetHeight/5);
    */
  });

  // initialize canvases
  function initCanvas (initx, inity) {

    const imageCtx = imageCanvasRef.current.getContext("2d");
    const drawCtx = drawingCanvasRef.current.getContext("2d");

    imageCtx.fillStyle = "#FAFAFA";

    // make background fill - is this necessary?
    drawCtx.fillStyle = "#FAF2F2";
    drawCtx.fillRect(0, 0, initx, inity);

    drawCtx.strokeStyle = "#AA9999";
    drawCtx.lineWidth = 2;
  }

  // record handle positions for use by line drawing and line scanning
  function setXY(handleID, xgot, ygot) {
    if (handleID == 0) {
      console.log('nå flytter vi');

      setX1p(xgot / frameWidth);
      console.log('xgot ' + xgot + ' frameWidth ' + frameWidth + ' x1p ' + x1p);
      setX1(frameWidth * x1p);
      setY1p(ygot / bildetHeight);
      setY1(frameWidth * y1p);
    }
    if (handleID == 1) {
      setX2p(xgot / frameWidth);
      setX2(frameWidth * x2p);
      setY2p(ygot / bildetHeight);
      setY2(frameWidth * y2p);
    }
  }

  function handleResize() {
    // Set window width/height to state
    setFrameWidth(document.getElementById('frame').getBoundingClientRect().width);
    setBildetHeight(document.getElementById('bildet').getBoundingClientRect().height);

    console.log('resized');
  }

  // function for drawing graph from line, walk through coordinates of line, for each point extract colo value and plot on graph
  function plotLine () {

    // is there a more ... way of doing this check for exist, etc.?
    const imageCtx = imageCanvasRef.current.getContext("2d");
    const drawCtx = drawingCanvasRef.current.getContext("2d");

    drawCtx.clearRect(0, 0, drawingCanvasWidth, drawingCanvasHeight);
    drawCtx.strokeStyle = "#AA9999";
    drawCtx.lineWidth = 1.0;
    drawCtx.lineCap = 'round';
    drawCtx.beginPath();

    // special coordinates for extracting data
    // here we are scaling x and y to account for mismatch due to static width image source vs potentially resized canvas
    const lx1 = x1 * (1120 / frameWidth);
    const ly1 = y1 * (1120 / frameWidth);
    const lx2 = x2 * (1120 / frameWidth);
    const ly2 = y2 * (1120 / frameWidth);

    var firstColorPoint = 255 - imageCtx.getImageData(lx1, ly1, 1, 1).data[0];
    var lastColorPoint = 255 - imageCtx.getImageData(lx2, ly2, 1, 1).data[0];

    console.log('first color point ' + firstColorPoint);

    // populate points array with color values along line
    for (var i=0; i<numberOfPoints; i++) {

      // get color data from pixel at current point along line
      var data = imageCtx.getImageData(lx1 + ((lx2 - lx1) / numberOfPoints * i), ly1 + ((ly2 - ly1) / numberOfPoints * i), 1, 1).data;

      // append new value to the array
      points.push(255 - data[1]);
    }

    // filter points
    points = filter(points, firstColorPoint, lastColorPoint);

    for (var i=1; i<numberOfPoints; i++) {
      drawCtx.lineTo(drawingCanvasWidth/numberOfPoints*i, points[i] / 255 * drawingCanvasHeight);
    }
    
    drawCtx.stroke();

    setCalibratePoint(points[0]);
    document.getElementById("playTriangle").style.transform = "translate(" + (480 - (points[0] + calibratePoint)) + "px)";
  }

  // filtering points to be graphed, using LPF library
  function filter (points, firstColorPoint, lastColorPoint) {

    // duplicate backwards 30 times for lowpass to be able to smooth backwards
    for (var i=0; i < 30; i++) {
      points.unshift(firstColorPoint);
    }

    // duplicate forwards 30 times for lowpass to be able to smooth forwards
    for (var i=0; i < 30; i++) {
      points.push(lastColorPoint);
    }

    //points = sma(points, 2, 1.7);
    //points = sma(points, 10, 2.1);
    //points = sma(points, 10, 2.1);
    //points = sma(points, 10, 2.1);
    //points = sma(points, 10, 2.1);
    //points = sma(points, 10, 2.1);
    
    points = ema(points, smooth);
    points = ema(points, smooth);
    points = ema(points, smooth);
    points = ema(points, smooth);
    points = ema(points, smooth);

    //console.log('smo ' + smooth);

    // remove 30 pre points again
    points.splice(0, 30);

    return points
  }

  function redraw() {

    /*
    var canvasPic = document.getElementById("canvasPic");
    var ctx = canvasPic.getContext("2d");

    ctx.clearRect(0, 0, 12, 40);
    ctx.fillStyle = "#00FFF2";         // make background fill (is this necessary?)
    ctx.fillRect(0, 0, 112, 36);

    var imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = function() {
      //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      ctx.drawImage(imageObj, 0, 0, frameWidth, 100);
    };
    */

    console.log('redraw ');
  }

  function startTransition () {

    var myVar = setInterval(myTimer, 15);

    var direction = 1;
    var i = 0;

    function myTimer() {

      //document.getElementById('playTriangle').style.top = (480 - (points[i] + calibratePoint));
      //document.getElementById('playTriangle').style.marginLeft = (480 - (points[i] + calibratePoint));
      //document.getElementById('playTriangle').style.opacity = (1 - (0 - ((points[i] - calibratePoint) / calibratePoint)));
      //document.getElementById('playTriangle').style.transform = "translate " + (480 - (points[i] + calibratePoint)) + "px";
      //document.getElementById('playTriangle').style.transform = {translate,};
      //document.getElementById("playTriangle").style.transform = "translate(200px)";
      //document.getElementById("myDIV").style.transform = "translate(20%,100%)";
      document.getElementById("playTriangle").style.transform = "translate(" + (480 - (points[i] + calibratePoint)) + "px)";

      if(direction === 1){
        i++;
      }

      if(direction === 0){
        i--;
      }

      if(i === numberOfPoints){
        direction = 0;
      }

      // draw index line
      document.getElementById("playIndexLine").style.transform = "translate(" + (((drawingCanvasWidth - 25)/numberOfPoints) * i) + "px)";


      if(i === -1){
        direction = 1;
        clearInterval(myVar);
      }
    }
  }

  return (
    <div id="frame">

      <p onClick={redraw} id='titlen'>CSS transition from image</p>

      <Bildet
        plotLine={plotLine}
        passRef={imageCanvasRef}
        x1={x1} y1={y1} x2={x2} y2={y2}
        xyChange={setXY}
        frameWidth={frameWidth}
        bildetHeight={bildetHeight}/>    
      <Graph
        passRef={drawingCanvasRef}
        drawingCanvasWidth={drawingCanvasWidth}
        drawingCanvasHeight={drawingCanvasHeight} />
      <Animator 
        startTransition={startTransition}/>
    </div>
  );
}

export default Frame;






/* 
    cutouts:

    // set low pass factor
    LPF.smoothing = 0.5;

    // do the filtering
    LPF.smoothArray(points)

    // for fill
    drawCtx.lineTo(drawingCanvasWidth, drawingCanvasHeight/2);      
    drawCtx.lineTo(drawingCanvasWidth, drawingCanvasHeight);      
    drawCtx.fillStyle = "#EEDDDD";
    drawCtx.fill();
    
    // for smooting (but do i need smooting when i have low pass?
    drawCtx.curve(points2, 0.2);




 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 

function getTranslateValues (element) {
  const style = window.getComputedStyle(element)
  const matrix = style.transform || style.webkitTransform || style.mozTransform

  // No transform property. Simply return 0 values.
  if (matrix === 'none') {
    return {
      x: 0,
      y: 0,
      z: 0
    }
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d'
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === '2d') {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0
    }
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === '3d') {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14]
    }
  }
}


    // console.log('x === ' + e.screenX);
    setSmooth(((e.screenX) / 50) - 7.3 );
    console.log('smooth ' + smooth);
    if (smooth <= 1.1) {
      setSmooth(1.11);
    }
*/



























