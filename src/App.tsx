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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
