import '../App.css'
import React from "react";
import { api, StockPoint } from "../api";
import { StockChart } from "./StockChart";

function StockForm() {
    return(
      <div>
          <header className="App-header">
                <h2>Stock information</h2>
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
        let apiUrl ="http://localhost:8080/stock/".concat(this.state.value)
        event.preventDefault();
        api<Array<StockPoint>>(apiUrl)
        .then( l => {
            let elements = l.map(
                (p) =>
                <li key={p.datestring}>
                    <ul>
                        <li>{p.datestring}</li>
                        <li>{p.open}</li>
                        <li>{p.close}</li>
                    </ul>
                </li>
            )
            this.setState({points: elements})
        })
        alert('A name was submitted: ' + this.state.value);
        
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ul>{this.state.points}</ul>
        </div>


        );
    }
}




class DateInput extends React.Component<{}, { value: any}> {
    state: Readonly<{ value: any; }>;
    constructor(props: any) {
        super(props)
        this.state = {
        value: " "
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.value);
        
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}
// {"datestring":"2022-02-11","open":256.87,"high":258.76,"low":254.73,"close":255.16,"adjustedClose":255.16,"volume":3592116,"name":"MCD"}


export default StockForm; 

