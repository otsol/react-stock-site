import React, { useEffect, useRef, useState} from 'react';
import '../App.css'
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
//import faker from 'faker';

// let dataPoints = Array<StockPoint>();
// let duuduu = api<Array<StockPoint>>(apiUrl)
//     .then( l => {
//       console.log(l[3]);
//       l;
//     })
//     .catch(error => {
//       /* show error message */
//     })
  
// function getDataPoints() {
//   let apiUrl = "http://0.0.0.0:8080/date1/";
//   let points = Array<StockPoint>();
//   return(
//   api<Array<StockPoint>>(apiUrl)
//     .then( l => {
//       console.log(l[3]);
//       points = l;
//     })
//     .catch(error => {
//       /* show error message */
//     })
//   )
// }

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
    
    let apiUrl = "http://localhost:8080/date";


    const labelsDefault = ['2018-01-01', '2018-04-23', '2019-03-26', '2019-12-24', '2020-06-15', '2021-07-01', '2022-01-01'];
    const data0Default = [1,2,3,4,5,6,7];
    const data1Default =  [23,34, 17, 56,34,7,3];

    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [dates, setDates] = useState(labelsDefault);
    const [data0, setData0] = useState(data0Default);
    const [data1, setData1] = useState(data1Default);

    
    // useEffect to prevent infinite loop
    useEffect(() => {
    api<Array<StockPoint>>(apiUrl)
      .then( l => {
        console.log(l[3]);
        setDates(l.map(p => p.datestring));
        setData0(l.map(p => p.open));
        setData1(l.map(p => p.adjustedClose));
      })
      .catch(error => {
        /* show error message */
      })
    }, []
    )

    
    // let currentDate = new Date(); max date ei suurempi kun t'm'nhetkinen p'iv'
    //let yyyy = currentDate.getDate

      
    let options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
    };


    let labels = dates;

    let data = {
    labels,
    datasets: [
        {
        label: 'Dataset 1',
        data: data0,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
        label: 'Dataset 2',
        data: data1,//labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };

    // function FilterDataPoints(beginDate: string, endDate: string) {
    //     let indexStart = labelsDefault.indexOf(beginDate);
    //     let indexEnd = labelsDefault.indexOf(endDate);
    //     let newLabels = labelsDefault.slice(indexStart, indexEnd + 1)
    //     let newData0 = data.datasets[0].data.slice(indexStart, indexEnd + 1)
    //     let newData1 = data.datasets[1].data.slice(indexStart, indexEnd + 1)

    // }
    function FilterDataPoints() {
        let indexStart = labelsDefault.indexOf(dateBegin);
        let indexEnd = labelsDefault.indexOf(dateEnd);
        let newLabels = labelsDefault.slice(indexStart, indexEnd + 1);
        let newData0 = data.datasets[0].data.slice(indexStart, indexEnd + 1);
        let newData1 = data.datasets[1].data.slice(indexStart, indexEnd + 1);
        setDates(newLabels);
        setData0(newData0);
        setData1(newData1);

    }

    return(
        <header className='App-header'>    
            <div>
                <select value={stock} onChange={event => setStock(event.target.value)}>
                  <option value="MCD">McDonalds</option>
                  <option value="AAPL">Apple</option>
                  <option value="VTI">Vanguard Total ... (VTI)</option>
                </select>
                <input type='date' value={dateBegin} min='2018-01-01'
                    onChange={event => {
                        setDateBegin(event.target.value)
                        FilterDataPoints()
                      }
                    }/>
                <input type='date' value={dateEnd} min='2018-01-01'
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
