// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function Page2() {
  return (
    <div className="App">
      <header className="App-header">

      <form action="" id="time_form">
        <div className="image-container">

        {/* word */}
        <tr>  
        <div id = "word"> The number of products</div>
        </tr>
        <div class="table-container h2">
          <tr>  
          <img id="green" class="led_right" alt="logo" />                                   
          <img id="red" class="led_right" alt="logo" />
          </tr>
        </div>
        {/* the number values */}
        <div class="table-container h1">
          <table> 
          <tr>  
              <img src={logo} className="App-logo h1" alt="logo" />                       
                <td id="num1"></td>               
              <img src={logo} className="App-logo h1" alt="logo" />
          </tr>
          </table>
        </div>



        {/* the conveyor */}
        <tr>  
          <img id="fanA" class="conveyor"  alt="GIF Image" />
        </tr>

        </div>
        
        <button type="submit" class="touched-button">Reset</button>
        </form>

        </header>
    </div>
  );
}

export default Page2;
