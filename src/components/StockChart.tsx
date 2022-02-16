import { useEffect, useState} from 'react';
import '../App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { api, StockPoint } from '../api';

let apiUrl = process.env.REACT_APP_API_ENDPOINT!.concat(process.env.REACT_APP_DATES!)


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export function StockChart() {


    const [stock, setStock] = useState("MCD");
    console.log(process.env.REACT_APP_API_ENDPOINT)
    


    const labelsDefault = ['2018-01-01', '2018-04-23', '2019-03-26', '2019-12-24', '2020-06-15', '2021-07-01', '2022-01-01'];
    const data0Default = [1,2,3,4,5,6,7];
    const data1Default =  [23,34, 17, 56,34,7,3];

    const [dateBegin, setDateBegin] = useState("2020-01-01");
    const [dateEnd, setDateEnd] = useState("2022-01-01");

    //  Used to save the full dataset
    const [saveDates, setSDates] = useState(labelsDefault);
    const [saveData0, setSData0] = useState(data0Default);
    const [saveData1, setSData1] = useState(data1Default);

    //  These are for saving the points that are on display "current state"
    const [dates, setDates] = useState(labelsDefault);
    const [data0, setData0] = useState(data0Default);
    const [data1, setData1] = useState(data1Default);

    
    // useEffect to prevent infinite loop
    useEffect(() => {
    api<Array<StockPoint>>(apiUrl!)
      .then( l => {
        console.log(l[3]);
        setSDates(l.map(p => p.datestring));
        setSData0(l.map(p => p.open));
        setSData1(l.map(p => p.adjustedClose));

        setDates(l.map(p => p.datestring));
        setData0(l.map(p => p.open));
        setData1(l.map(p => p.adjustedClose));
      })
      .catch(error => {
        /* show error message */
      })
    }, []
    )


    let options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: "McDonald's",
        },
    },
    };


    let labels = dates;

    let data = {
    labels,
    datasets: [
        {
        label: 'Open',
        data: data0,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
        label: 'Adjusted Close',
        data: data1,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };


    function FilterDataPoints() { // dates strings in YYYY-MM-DD format can be sorted alphabetically as string
        let indexStart = saveDates.findIndex(i => i >= dateBegin)//saveDates.indexOf(dateBegin);
        let indexEnd = saveDates.findIndex(i => i >= dateEnd) //saveDates.indexOf(dateEnd);
        let newLabels = saveDates.slice(indexStart, indexEnd + 1);
        let newData0 = saveData0.slice(indexStart, indexEnd + 1);
        let newData1 = saveData1.slice(indexStart, indexEnd + 1);
        setDates(newLabels);
        setData0(newData0);
        setData1(newData1);

    }
    

    return(
        <header className='App-header'>    
            <div>
                <select value={stock} onChange={event => setStock(event.target.value)}>
                  <option value="MCD">McDonalds</option>
                  {/* <option value="AAPL">Apple</option> */}
                  {/* <option value="VTI">Vanguard Total ... (VTI)</option> */}
                </select>
                <input type='date' value={dateBegin} min='1984-11-05' max='2022-02-14'
                    onChange={event => {
                        setDateBegin(event.target.value)
                        FilterDataPoints()
                      }
                    }/>
                <input type='date' value={dateEnd} min='1984-11-05' max='2022-02-14'
                    onChange={event => {
                        setDateEnd(event.target.value)
                        FilterDataPoints()
                      }
                        } />
            </div>

            <Line options={options} data={data} /> 
        </header>
    );

}
