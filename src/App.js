/*

this, App.js, is the container for the frame object.
its purpose is
  to be a full screen colored background on which to center the frame
  
*/


import './App.css';          // import style sheet for this js file
import Frame from './Frame'; // import frame object to display

function App() {
  return (
    
    <div id='wrapperDiv'>
      <Frame />
    </div>
  );
}

export default App;
