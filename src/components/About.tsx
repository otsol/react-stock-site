import '../App.css'
import logo from '../logo.svg';
//import React from "react"; 


function About() {
    return(
      <div className='App'>
        <header className='App-header'>
          <h2>About</h2>
          <div className='App-div'>
            This website shows stock information from eodhistoricaldata.com, which is made by Unicorn Data Services.
            The website uses only free/demo API keys.

            Backend was made with Kotlin Ktor library and frontend with TypeScript and React.
            Plots are made with react-chartjs-2 library, which supports TypeScript type definitions.
          </div>
          <h2>
            Contact
          </h2>
          <div>
            Mady by Otso Luukkanen
          </div>
          <div>
            February 2022


          </div>
          <div >
          <a className="App-link"
          
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/otsoluukkanen/
          </a>
          </div>
          <div>
          <a className="App-link"
          
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
            https://github.com/otsol/react-stock-site
          </a>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        
      </div>
      
    )
}

export default About;