// This module exports a line chart of teh purchase data

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getAllProducts } from "../json/ApiManger.js";
import "./LineChart.css"
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Button } from "reactstrap";

export const GraphInflation = () => {
    const [chartIsReady, setChartIsReady] = useState(false)
    const [products, setProducts] = useState([])

    // Sets options properties in chart, ie the legend and chart structure
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'left',
                display: true
            },
        },
        layout: {
            padding: {
                top: 50,
                left: 5,
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
                type: 'time',
                min: '2019-11-07 00:00:00',
                time: {
                    unit: 'month',
                    unitStepSize: 10,
                  },
                ticks: {
                    color: "black",
                    font: { size: 18 },
                }
            },
        }
    })

    const [userData, setUserData] = useState(
    )

    // GETs and filters products upon initialization of useStates
    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data.filter(product => product.userId === parseInt(localStorage.getItem("groce_user"))))
            })
    },
        []
    )


    // THE ORIGINAL USEEFFECT CAN HANDLE THE INITIAL RENDERING OF THE CHART

    // CREATE A HANDLER FUNCTION THAT IS INVOKED BY A BUTTON AND SETS USERDATA WITH NEWLY ARRANGED DATASETS REPRESENTING VENDOR' DATA
        // CREATE AN ORGANIZEDVENDORPURCHASE ARRAY
        // CREATE A CHARTDATA ARRAY
        // FETCH PURCHASES AND CATCH THE RESPONSE
            // ITERATE THROUGH VENDORPRODUCTS
                // FILTER PURCHASES BY VENDORPRODUCT.ID
                // PRINT A MESSAGE FOR VENDORPORDUCTS WITHOUT MATCHES
                // PUSH MATCHES TO THE ORGANIZEDVENDORPURCHASE ARRAY
            
                // SEPARATE THESE TWO RESPONSIBILITIES INTO DIFFERENT FUNCTIONS:
                    // CREATE FUNCTION THAT FETCHES AND ORGANIZES DATA (LINES 77-84) WHEN USER ARRIVES ON THE PAGE
                    // CREATE A SEPARATE FUNCTION THAT SETS CHARTDATA STATE (LINES 90-93) WHEN A USER CLICKS RELEVANT BUTTON
            
                // ITERATE THROUGH ORGANIZEDVENDORPURCHASE ARRAY
                // BUILD NEW DATASET FOR EACH ARRAY OF MATCHES
                // PUSH DATASET TO CHARTDATA ARRAY
            // SET USERDATA WITH CHARTDATA

    // CREATE A HANDLER FUNCTION THAT IS INVOKED BY A BUTTON AND SETS USERDATA WITH ORIGINAL DATASETS REPRESENTING PRODUCT' DATA

    // GETs and filters purchases then sets userData with matching datasets
    useEffect(
        () => {

            // This array will store the purchase objects that inform the line chart
            let organizedPurchaseArray = []

            // This array will copy the objects formatted properly for the line chart
            let chartData = []

            if (products.length > 0) {
                fetch(`http://localhost:8088/purchases?userId=${localStorage.getItem("groce_user")}&_expand=product`)
                    .then(res => res.json())
                    // Catching the response allows us to perform a number of functions before proceeding in the response chain
                    .then((res) => {
                        // Iterating through nested arrays lets us build an array of purchases that match products
                        for (const product of products) {
                            const filteredPurchases = res.filter(purchase => {
                                return purchase.productId === product.id
                            })

                            // When there are no matches of a purchase to a product, console log a message
                            if (filteredPurchases < 1) {

                                console.log(`Current user has not purchased ${product.description}\(s\) yet`)

                            } else {
                                // When there are matches, push matched purchases to teh organizedPurchaseArray
                                organizedPurchaseArray.push(filteredPurchases)
                            }
                        }

                        // Iterate through the organized-data array which creates a new dataset for every group of purchases
                        organizedPurchaseArray.forEach((purchaseArray) => {

                            // this is the array that will be set to useState
                            let x_y_data = purchaseArray.map((purchase) => ({

                                // Save price and date data of current purchase object to a new object on the returned array from the .map method
                                y: purchase.price,
                                x: purchase.date
                            }))

                            // Create a new dataset object with
                                // A label that matches product description,
                                // A novel label color,
                                // and data that matches x_y_data,

                            let color = dynamicColors()

                            const datasets = {
                                label: purchaseArray[0].product.description,
                                fill: false,
                                pointBorderColor: "aliceblue",
                                pointBorderWidth: 1,
                                pointRadius: 2,
                                lineTension: 0.4,
                                backgroundColor: color,
                                borderColor: color,
                                data: x_y_data,
                            }

                            // Push new data set to chartData array
                            chartData.push(datasets)

                        })
                    })
                    // Set chartData state equal to chartData array
                    .then(() => {
                        if (chartData.length > 0) {
                            setUserData(
                                {
                                    labels: organizedPurchaseArray.map((p) => p.date),
                                    datasets: chartData
                                }

                            )
                        }
                    })
            }
        },
        [products]
    )

    useEffect(
        () => {
            console.log("State when invoked", userData)
            // if (typeof userData === "object") { setChartIsReady(!chartIsReady) }
            if (typeof userData === "object") { setChartIsReady(true) }
        },
        [userData]
    )

    // creating colors for datasets
    const dynamicColors = () => {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
    }

    // Return still loading message
    if (!chartIsReady) {
        return (
            <div>Still Loading...</div>
        )
    }
    else {
        // Return line chart with options passed as an argument and updated chartData state passed as another argument
        return (
            <section className="main-container-linechart">
                <div className="chart-container">
                    {/* // Sets the two objects passed to Chart to useStates */}
                    <Line data={userData} options={options} id="lineChart" />
                </div>
            </section>
        )
    }
}