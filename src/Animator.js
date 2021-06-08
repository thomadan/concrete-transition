
/*
image from which to extract data,
based on position of indicator line overlay
alternatively not background but html element: <img src={image} alt="" style={imageStyle}/>

there are two spots for css: Image.css and const divStyle
  this is because some elements are supposed to be dynamic, like opacity and image choice
*/

// todo: get size of parent on which to stretch canvas
import './Animator.css';

function Animator (props) {

  return (
    <div id='ani' className='animator'>
      <p id='animatorTitle' >play CSS transition following brightness graph left to right</p>
      <svg onClick={props.startTransition} id='playTriangle' viewBox="0 0 100 100">
        <polygon points="35,35 35,65 65,50"/>
      </svg>
    </div>
  );
}

export default Animator;