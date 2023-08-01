// App.js
import React from 'react';
import './App.css';
import info from './info.jpg';


function Page1() {
  return (
    
      <header className="App-header-info">
      <img src={info}/>

      <div class="table-container info">
                        <table>                                
                            <h2>What is the checking system?</h2>                       
                            <table>
                                <div class="monitor__form-group">  
                                <p>                                                              
                                A checking system typically refers to a quality control process that ensures the products meet certain standards and specifications before they are released to the market or delivered to customers. The checking system is an essential part of the product development and manufacturing process, and it involves various inspection and testing procedures to verify the product's quality and conformity to the intended design.                                                                 
                                </p>  
                                <p> 
                                The checking system is critical for ensuring customer satisfaction, reducing product recalls, and maintaining a positive brand reputation. Companies that implement effective checking systems can produce reliable and high-quality products that meet customer expectations and comply with relevant industry standards and regulations.
                                </p>
                                </div>
                            </table>                                  
                        </table>
      </div>
      </header>
      
  );
}

export default Page1;
