// THIS MODULE WILL EXPORT A LINEGRAPH OF THE PURCHASE DATA

import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { getAllProducts } from "../json/ApiManger.js";
import { UserData } from "./TempData.js";
import "./Chart.css"
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
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


//  ONCE WE G

// Fetch and filter products by user id
// Fetch and filter purchases by user id

// Put useStates for chart in an if/else that checks if filtered data has been sorted
// if not, return a message that says, "still lodaing"
// when filtered data gets pushed to appropriate arrays
// Return chart with data matching the sorted/filtered data

// For each product, 
// Filter data again where the purchase' productId matches a product id
// If there are no purchases, console log a message
// When there are matching purchases, update the chart - HOW????

// Iterate though useState (which is an array of arrays)
// for each array, create a dataset of all the objects and save it

// set useState with all previous purchase-arrays and current product's matching purchase-array



// Declare an empty array for saving data to
// Fetch purchases from json
// catch repsonse and iterate throuh response
// Push data to empty array

// Set x to purchase.date for every purchase on the purchaseArray
// Set y to purchase.price for every purchase on the purchaseArray
// Set a label of purchase.product.description to each line in the chart 
// Graph x and y on the chart for every purchase on the purchase Array


// // Returns a div with the chart and handles chart data through useState
// export const GraphInflation = () => {

//     Chart.defaults.elements.pointStyle = true


//     // const isMounted = useRef(true);
//     // useEffect(() => () => { isMounted.current = false }, [])


//     // CHANGE DATASET TO MANUAL LIST OF DATA TO SEE IF YOU CAN CONTROL THE OPTIONS AND VERIFY IIT'S WORKING


// // Sets up the structure of the data that comes in from Json for the Linechart from ChartJS to understand/use
// const [userData, setUserData] = useState(
//     // const userData =
//     {
//         // UserData is the imported dataset from TempData.js, not Json data yet...
//         labels: UserData.map((data) => data.date),
//         // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//         datasets: [
//             {
//                 // labels: ["product descriptions"],
//                 labels: 'product descriptions',
//                 // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//                 data: UserData.map((data) => data.price),
//                 fill: false,
//                 pointBorderColor: "aliceblue",
//                 pointBorderWidth: 1,
//                 pointRadius: 2,
//                 lineTension: 0.4,
//                 backgroundColor: "aliceblue", // NEED TO ADD LOGIC HERE FOR ASSIGNING A RANDOM COLOR TO EACH DATASET INTEGER
//                 // Won't need this, applies to bar graphs
//                 borderColor: "green"
//             },
//             // Won't need this second dataset, actual data will come in from Json and ^ will apply to each,
//             // SECOND (AND THIRD) OBJECT MIGHT BE SOLUTION FOR CATEGORY AND VENDOR GRAPHING
//             {
//                 labels: "Quantity",
//                 data: [3.25, 4],
//                 backgroundColor: "Red"
//             },
//         ]
//     }
// )

//     // Sets options properties in chart, ie the legend and chart structure
//     const [options, setOptions] = useState({
//         // const options = {
//         responsive: true,
//         maintainAspectRatio: true,
//         plugins: {
//             legend: {
//                 position: 'left',
//                 display: true
//             }
//         },
//         title: {
//             display: true,
//             text: "Inflation by Product"
//         },
//         layout: {
//             padding: {
//                 top: 50,
//                 left: 0,
//                 right: 50,
//                 bottom: 50
//             }
//         },
//         scales: {

//             y: {
//                 ticks: {
//                     color: "black",
//                     font: { size: 18 },
//                     beginAtZero: true
//                 },
//                 grid: {
//                     color: "98ef89"
//                 }
//             },

//             x: {
//                 ticks: {
//                     color: "black",
//                     font: {
//                         size: 18
//                     },
//                     beginAtZero: true
//                 }
//             },

//             // More ways of writing out the option properties
//             //     yAxes: [{
//             //         ticks: {
//             //             beginAtZero: true
//             //         }
//             //     }]

//             // },
//             // legend: {
//             //     labels: {
//             //         fontSize: 8,
//             //     }
//             // }
//         }
//     }
//     )

//     useEffect(
//         () => {
//             let purchaseArray = []
//             fetch(`http://localhost:8088/purchases?userId=${localStorage.getItem("groce_user")}`)
//                 .then(res => res.json())
//                 .then((res) => {
//                     for (purchase of res) {
//                         // Organize purcahses by product here, 
//                         // and somehow create a dataset for each group of purchases

//                         // ORGANIZE THE DATA HERE, BEFORE SETTING STATE, WITH A FUNCTION THAT 
//                         // ORGANIZES THE PURCHASES INTO AN ARRAY OF ARRAYS OF PURCHASES THAT MATCH EACH PRODUCT
//                         // CREATES A DATASET FOR EACH ARRAY OF PURCHASES


//                         // RETURN STILL LOADING JSX
//                         // GET PRODUCTS
//                         // GET PURCHASES
//                         // CATCH THE RESPONSE
//                         // DECLARE A NEW ORGANIZED-DATA ARRAY
//                         // ITERATE THROUGH PRODUCTS
//                         // ITERATE THROUGH PURCHASES
//                         // WHEN THERE ARE NO MATCHING PURCHASES, CONSOLE LOG A MESSAGE
//                         // WHEN THERE ARE MATCHES, CREATE NEW ARRAY OF ALL MATCHING PURCHASES
//                         // PUSH MATCHED PURCHASES TO THE ORGANIZED-DATA ARRAY
//                         // DECLARE A NEW CHART-DATA ARRAY
//                         // DECLARE A NEW PRODUCT-DATA ARRAY
//                         // ITERATE THROUGH THE ORGANIZED-DATA ARRAY
//                         // ITERATE THROUGH THE NESTED ARRAY OF MATCHED PURCHASES
//                         // SAVE PRICE AND DATE DATA TO A NEW OBJECT AND PUSH IT TO THE PRODUCT-DATA ARRAY
//                         // CREATE A NEW DATASET OBJECT WITH 
//                         // A LABEL THAT MATCHES PRODUCT DESCRIPTION,
//                         // DATA THAT MATCHES PRODUCT-DATA
//                         // AND A NOVEL LABEL COLOR
//                         // PUSH NEW DATASET TO CHART-DATA ARRAY
//                         // RESET PRODUCT-DATA ARRAY
//                         // SET CHART DATA STATE EQUAL TO CHART-DATA ARRAY
//                         // RETURN LINE CHART WITH UPDATED CHART DATA STATE PASSED AS AN ARGUMENT



//                         // THIS IS AN EXAMPLE OF SOMEONE DOING A SIMILAR THING:

//                         // // THIS FETCHES THE DATA FROM AN API
//                         //      .get(
//                         //         `${process.env.REACT_APP_BASE_URL}admin/charts/sales?${selectedIds}period=${period}${selectStart}${selectEnd}`,
//                         //         headers,
//                         //       )


//                         //             // WHEN THE RESPONSE COMES BACK GOOD, PARSE THE DATA AND SAVE IT IN A NEW VARIABLE
//                         //       .then((response) => {
//                         //         if (!isCancelled) {
//                         //           let groupsValues = Object.values(response.data.groups)
//                         //           let groupsData = Object.entries(response.data.groups)
//                         //           console.log('groupsValues', groupsValues)
//                         //           console.log('groupsData:', groupsData)
//                         //           // check if any groupID is selected otherwise it displays all groups
//                         //           if (/\d/.test(selectedIds)) {

//                         //             // LOOPING THOUGH THE ARRAY OF ARRAYS THAT WAS JUST SAVED TO A VARIABLE FROM API
//                         //                         groupsData.forEach((group) => {

//                         //                 // LOOPING THROUGH EACH NESTED ARRAY
//                         //                 let x_y_data = group[1].map((i) => ({

//                         //                     //SAVE DATE AND PRICE DATA OF EACH OBJECT TO NEW VARIABLES
//                         //                     y: i.sales.toString().slice(0, -2),
//                         //                 x: format(new Date(i.date), 'yyyy-MM-dd'),
//                         //               }))
//                         //               console.log('x_y_data:', x_y_data)
//                         //               let color = dynamicColors()

//                         //               // CREATE A NEW OBJECT WITH A LABEL AND DATASET THAT MATCH CURRENT OBJECT 
//                         // (USES A COLOR GENERATING FUNCTION TO GET NOVEL LABEL COLORS FOR EACH NEW DATASET)
//                         //               const newDataset = {
//                         //                 label: group[0].toString(),
//                         //                 backgroundColor: color,
//                         //                 borderColor: color,
//                         //                 data: x_y_data,
//                         //               }

//                         //               // PUSH OBJECT TO ARRAY OF OBJECTS THAT WILL GET PASSED TO LINECHART
//                         //               datasets.push(newDataset)
//                         //               console.log('datasets:', datasets)
//                         //             })
//                         //             setChartData({
//                         //               datasets,
//                         //             })

//                         // EXAMPLE OF RANDOM COLOR GENERATOR FOR LABELS:

//                         //      // creating colors for datasets
//                         //   const dynamicColors = function () {
//                         //     let r = Math.floor(Math.random() * 255)
//                         //     let g = Math.floor(Math.random() * 255)
//                         //     let b = Math.floor(Math.random() * 255)
//                         //     return 'rgb(' + r + ',' + g + ',' + b + ')'
//                         //   }

//                         // THIS ^

//                     }
//                     setUserData({
//                         // Put all the datasets that were created into useState
//                     })
//                 })
//         },
//         []
//     )


//     return (
//         <section className="main-container-linechart">
//             <div className="chart-container">
//                 {/* // Sets the two objects passed to Chart to useStates */}
//                 <Line data={userData} options={options} id="lineChart" />
//             </div>
//         </section>
//     )

// }

export const GraphInflation = () => {
    const [chartIsReady, setChartIsReady] = useState(false)
    const [products, setProducts] = useState([])

    // Sets options properties in chart, ie the legend and chart structure
    const [options, setOptions] = useState({
        // const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'left',
                display: true
            },
            title: {
                display: true,
                text: "Inflation by Product"
            },
            // time: {
            //     parser: "DD.MM.YYYY",
            //     unit: "month",
            //     displayFormats: {
            //         month: "DD MM YYYY",
            //     }
            // },
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
                type: 'time',
                // distribution: "series",
                time: {
                    // min: 2000,
                    // max: 2023,
                    // parser: 'MM/DD/YYYY HH:mm',
                    // tooltipFormat: 'll HH:mm',
                    unit: 'month',
                    // unitStepSize: 10,
                    // displayFormats: {
                    //   'month': 'MM/DD/YYYY'
                    // }
                  },
                // time: {
                //     unit: "month"
                // },
                ticks: {
                    color: "black",
                    font: { size: 18 },
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
    })

    const [userData, setUserData] = useState(
        // {
        //     // UserData is the imported dataset from TempData.js, not Json data yet...
        //     labels: "Purchase Dates",
        //     // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        //     datasets: [
        //         {
        //             labels: "Product Description",
        //             fill: false,
        //             pointBorderColor: "aliceblue",
        //             pointBorderWidth: 1,
        //             pointRadius: 2,
        //             lineTension: 0.4,
        //             backgroundColor: "Random Color",
        //             borderColor: "Random Color",
        //             data: "x_y_data",
        //         },
        //     ]
        // }
    )

    // GET PRODUCTS
    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data.filter(product => product.userId === parseInt(localStorage.getItem("groce_user"))))
            })
    },
        []
    )

    // GET PURCHASES
    useEffect(
        () => {
            // DECLARE A NEW ORGANIZED-DATA ARRAY
            let organizedPurchaseArray = []
            // DECLARE A NEW CHART-DATA ARRAY
            let chartData = []
            if (products.length > 0) {
                fetch(`http://localhost:8088/purchases?userId=${localStorage.getItem("groce_user")}&_expand=product`)
                    .then(res => res.json())
                    // CATCH THE RESPONSE
                    .then((res) => {
                        // ITERATE THROUGH PRODUCTS
                        for (const product of products) {

                            // ITERATE THROUGH PURCHASES
                            // WHEN THERE ARE MATCHES, CREATE NEW ARRAY OF ALL MATCHING PURCHASES
                            const filteredPurchases = res.filter(purchase => {
                                return purchase.productId === product.id
                            })
                            // WHEN THERE ARE NO MATCHING PURCHASES, CONSOLE LOG A MESSAGE
                            console.log("filtered data", filteredPurchases)
                            if (filteredPurchases < 1) {

                                console.log(`Current user has not purchased ${product.description}\(s\) yet`)

                            } else {
                                // PUSH MATCHED PURCHASES TO THE ORGANIZED-DATA ARRAY
                                organizedPurchaseArray.push(filteredPurchases)
                            }
                        }

                        // DECLARE A NEW PRODUCT-DATA ARRAY
                        // let productData = []
                        // ITERATE THROUGH THE ORGANIZED-DATA ARRAY
                        organizedPurchaseArray.forEach((purchaseArray) => {

                            // ITERATE THROUGH THE NESTED ARRAY OF MATCHED PURCHASES
                            let x_y_data = purchaseArray.map((purchase) => ({

                                // SAVE PRICE AND DATE DATA TO A NEW OBJECT AND PUSH IT TO THE PRODUCT-DATA ARRAY
                                y: purchase.price,
                                x: purchase.date
                            }))
                            // productData.push(x_y_data)

                            // CREATE A NEW DATASET OBJECT WITH 
                            // A LABEL THAT MATCHES PRODUCT DESCRIPTION,
                            // DATA THAT MATCHES PRODUCT-DATA
                            // AND A NOVEL LABEL COLOR

                            let color = dynamicColors()


                            // DOES IT MATTER THAT THE KEYS GET REORGANIZED WHEN VIEWED IN THE DOM??
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

                            // console.log("dataset", datasets)

                            // PUSH NEW DATASET TO CHART-DATA ARRAY
                            chartData.push(datasets)

                            // WHAT IS HAPPENING IS THAT USERDATA IS GETTING SET TO AN EMPTY OBJECT AND THEN CHARTISREADY IS GOING OFF

                            // RESET PRODUCT-DATA ARRAY
                            // productData = []

                        })

                        console.log("chartdata", chartData)
                        console.log("Filtered and organized purchases", organizedPurchaseArray)
                    })
                    // SET CHART DATA STATE EQUAL TO CHART-DATA ARRAY
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

                // .then(() => {if (typeof userData === "object") setChartIsReady(!chartIsReady)})

            }
            console.log(userData)
        },
        [products]
    )

    useEffect(
        () => {
            console.log("State when invoked", userData)
            if (typeof userData === "object") { setChartIsReady(!chartIsReady) }
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

    // RETURN STILL LOADING JSX
    if (!chartIsReady) {
        return (
            <div>Still Loading...</div>
        )
    }
    else {
        // RETURN LINE CHART WITH UPDATED CHART DATA STATE PASSED AS AN ARGUMENT
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