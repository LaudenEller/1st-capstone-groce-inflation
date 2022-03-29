// THIS MODULE WILL EXPORT A LINEGRAPH OF THE PURCHASE DATA

import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { UserData } from "./TempData.js";
import "./Chart.css"
import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Defaults
} from 'chart.js'


// Set x to purchase.date for every purchase on the purchaseArray
// Set y to purchase.price for every purchase on the purchaseArray
// Set a label of purchase.product.description to each line in the chart 
// Graph x and y on the chart for every purchase on the purchase Array


// Returns a div with the chart and handles chart data through useState
export const GraphInflation = () => {

    Chart.defaults.elements.pointStyle = true


    // const isMounted = useRef(true);
    // useEffect(() => () => { isMounted.current = false }, [])


    // CHANGE DATASET TO MANUAL LIST OF DATA TO SEE IF YOU CAN CONTROL THE OPTIONS AND VERIFY IIT'S WORKING


    // Sets up the structure of the data that comes in from Json for the Linechart from ChartJS to understand/use
    // const [userData, setUserData] = useState(
    const userData =
    {
        // UserData is the imported dataset from TempData.js, not Json data yet...
        labels: UserData.map((data) => data.date),
        // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                // labels: ["product descriptions"],
                labels: 'product descriptions',
                // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                data: UserData.map((data) => data.price),
                fill: false,
                pointBorderColor: "aliceblue",
                pointBorderWidth: 1,
                pointRadius: 2,
                lineTension: 0.4,
                backgroundColor: "aliceblue", // NEED TO ADD LOGIC HERE FOR ASSIGNING A RANDOM COLOR TO EACH DATASET INTEGER
                // Won't need this, applies to bar graphs
                borderColor: "green"
            },
            // Won't need this second dataset, actual data will come in from Json and ^ will apply to each,
            // SECOND (AND THIRD) OBJECT MIGHT BE SOLUTION FOR CATEGORY AND VENDOR GRAPHING
            {
                labels: "Quantity",
                data: [3.25, 4],
                backgroundColor: "Red"
            },
        ]
    }
    // )

    // Sets options properties in chart, ie the legend and chart structure
    // const [options, setOptions] = useState({
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'left',
                display: true
            }
        },
        title: {
            display: true,
            text: "Inflation by Product"
        },
        layout: {
            padding: {
                top: 50,
                left: 0,
                right: 50,
                bottom: 50
            }
        },
        scales: {

            y: {
                ticks: {
                    color: "black",
                    font: { size: 18 },
                    beginAtZero: true
                },
                grid: {
                    color: "98ef89"
                }
            },

            x: {
                ticks: {
                    color: "black",
                    font: {
                        size: 18
                    },
                    beginAtZero: true
                }
            },

            // More ways of writing out the option properties
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero: true
            //         }
            //     }]

            // },
            // legend: {
            //     labels: {
            //         fontSize: 8,
            //     }
            // }
        }
    }
    // )


    return (
        <section className="main-container-linechart">
            <div className="chart-container">
                {/* // Sets the two objects passed to Chart to useStates */}
                <Line data={userData} options={options} id="lineChart" />
            </div>
        </section>
    )

}