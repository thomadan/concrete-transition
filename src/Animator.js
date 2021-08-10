
/*
image from which to extract data,
based on position of indicator line overlay
alternatively not background but html element: <img src={image} alt="" style={imageStyle}/>

there are two spots for css: Image.css and const divStyle
  this is because some elements are supposed to be dynamic, like opacity and image choice
*/

// todo: get size of parent on which to stretch canvas
// cutout <p id='animatorTitle' >play CSS transition following brightness graph left to right</p>


import './Animator.css';

function Animator (props) {

  return (
    <div id='ani' className='animator'>
      <svg onClick={props.animate} id='playTriangle' viewBox="0 0 85 100">
        <polygon points="0,0 0,100 85,50"/>
      </svg>
    </div>
  );
}

export default Animator;