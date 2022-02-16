import '../App.css'
import React from "react";
import { api, StockPoint } from "../api";

function StockForm() {
    return(
      <div>
          <header className="App-header">
                <h2>Stock information</h2>
                <p className='App-div'>You can search recent information about US market stocks by typing an abbreviation of a name.
                    Example: type GOOGL (Alphabet Inc. Class A), NFLX (Netlfix, Inc.) or WMT (Wal-Mart Stores, Inc.).
                </p>
                <p className='App-div'>
                    Note: this website uses a free API key for https://eodhistoricaldata.com/ on my own server. This means that the api has a limited
                    number of requests. Not the best solution. (:|)
                </p>
                <NameForm />
          </header>
      </div>
    )
}



// Written with alternative component annoation (instead of a function)
class NameForm extends React.Component<{}, { }> {
    state: Readonly<{ value: any, points: any }>;
    constructor(props: any) {
        super(props)
        this.state = {
        value: " ",
        points: null
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event: any) { 
        let apiUrl = process.env.REACT_APP_API_ENDPOINT! // not null or undefined hopefully
            .concat(process.env.REACT_APP_STOCKS!).concat(this.state.value)
        event.preventDefault();
        api<Array<StockPoint>>(apiUrl)
        .then( l => {
            let elements = l.map(
                (p) =>
                // <li key={p.datestring} className="App-list">
                    <div className='navbar' key={p.datestring}>
                        <span className="active" >{p.datestring}</span> 
                        <span >{p.open}</span>
                        <span >{p.high}</span>
                        <span >{p.low}</span>
                        <span >{p.close}</span>
                        <span >{p.volume}</span>
                         
                    </div>
                // </li>
            )
            this.setState({points: elements})
        })
        //alert('A name was submitted: ' + this.state.value);
        
    }

    render() {
        return (
        <div>
            <div>          
                <form onSubmit={this.handleSubmit}>
                    <label>
                    {/* Name: */}
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
            <div className='navbar'>
                        <span className="active" >Date</span> 
                        
                        <span >Open</span>
                        <span >High</span>
                        <span >Low</span>
                        <span >Close</span>
                        <span >Volume</span>
                         
                </div>
                {/* <ul> */}
                    {this.state.points}
                {/* </ul> */}
            </div>
        </div>


        );
    }
}


// {"datestring":"2022-02-11","open":256.87,"high":258.76,"low":254.73,"close":255.16,"adjustedClose":255.16,"volume":3592116,"name":"MCD"}

export default StockForm; 

