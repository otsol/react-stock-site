import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import StockForm from './components/StockForm';
import { StockChart } from './components/StockChart';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path='stock_chart' element={<StockChart />} />
          <Route path='stock_search' element={<StockForm />} />
          <Route path='react' element={<ReactPage />} />
        </Route>
        
      </Routes>
    </Router>
  )
}


function ReactPage() {
  console.log(process.env);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='App-div'>
          Yes, this was made with react. I quite enjoyed using React, because it gave a lot of freedom.
          I thought that Angular had a more strict file stucture because each module had multiple files (ts, html, css)
          and many of the features like observables were a little bit confusing at first.
          I don't have a lot of experience in either of the frameworks but this was easier to kick off.
        </p>
        <p className='App-div'>
          Again, I don't have a lot of things to say in the TypeScript vs JavaScript debate, but the most annoying thing was that
          some of the popular JS libraries lacked TS type definitions. I was left feeling a little bit confused.
          Should I create my own interfaces, modify the classes or maybe just name every type any? (probably not)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <NameForm /> */}
    </div>
  );
}
export default App;
