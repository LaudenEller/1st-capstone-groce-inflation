// THIS MODULE WILL EXPORT A LINEGRAPH OF THE PURCHASE DATA

// Set x to purchase.date for every purchase on the purchaseArray
// Set y to purchase.price for every purchase on the purchaseArray
// Set a label of purchase.product.description to each line in the chart 
// Graph x and y on the chart for every purchase on the purchase Array

// import React from "react";
// import {Line} from "react-chartjs-2";
// import "./Graph.css";

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

// export default class GraphPurchases extends React.Component {
//   render() {
//     return (     
//       <div>
//           <canvas id="myChart"></canvas>
//         <Line
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />
//       </div>
//     );
//     }
// }
// // }


// // import React from "react";
// // import { Line } from "react-chartjs-2";

// // const [purchases, setPurchases] = useState()

// // componentDidMount() {
// //     fetch("http://localhost8088/purchases")
// //     .then(r => r.json())
// //     .then((data) => {
// //         setPurchases(data)
// //     });
// //     }

// // const data = {
// //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
// //   datasets: [
// //     {
// //       label: "First dataset",
// //       data: [33, 53, 85, 41, 44, 65],
// //       fill: true,
// //       backgroundColor: "rgba(75,192,192,0.2)",
// //       borderColor: "rgba(75,192,192,1)"
// //     },
// //     {
// //       label: "Second dataset",
// //       data: [33, 25, 35, 51, 54, 76],
// //       fill: false,
// //       borderColor: "#742774"
// //     }
// //   ]
// // };

// // export default function App() {
// //   return (
// //     <div className="App">
// //       <Line data={data} />
// //     </div>
// //   );
// // }

// // let purchasePriceArray = []

// // for (const purchase of purchases) {
// // purchasePriceArray.push(purchase.price)
// // }

// // class lineChart extends Component
// // {
// //   constructor() {
// //     super();
// //     this.state = {
// //       lineChartData: []
// //     }
// //     this.change0 = this.change0.bind(this);
// //     this.change1 = this.change1.bind(this);
// //     this.change2 = this.change2.bind(this);
// //   }

// //   componentDidMount() {
// //     this.change0();
// //     }


// //   change0(){
// //     this.setState({
// //       lineChartData:{
// //         labels: ['Q1, 2020', 'Q2, 2020', 'Q3, 2020', ' Q4, 2020', 'Q1, 2021', 'Q2, 2021', 'Q3, 2021', ' Q4, 2021', 'Q1, 2022', 'Q2, 2022', 'Q3, 2022', ' Q4, 2022',],
// //         datasets: [
// //           {
// //             label: 'Products',
// //             backgroundColor: 'rgba(255,99,132,0.2)',
// //             borderColor: 'rgba(255,99,132,1)',
// //             borderWidth: 1,
// //             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
// //             hoverBorderColor: 'rgba(255,99,132,1)',
// //             data: [purchases]
// //           }
// //         ]
// //       }
// //     })
// //   }

// //     change1(){
// //       this.setState({
// //         lineChartData:{
// //           labels: ['January', 'February', 'March','April','May','June'],
// //           datasets: [
// //             {
// //               label: '6 Months',
// //               backgroundColor: 'rgba(255,99,132,0.2)',
// //               borderColor: 'rgba(255,99,132,1)',
// //               borderWidth: 1,
// //               hoverBackgroundColor: 'rgba(255,99,132,0.4)',
// //               hoverBorderColor: 'rgba(255,99,132,1)',
// //               data: [49, 22, 23,65,43,21]
// //             }
// //           ]
// //         }
// //       })
// //     }

// //   change2(){
// //     this.setState({
// //       lineChartData:{
// //         labels: ['January', 'February', 'March','April','May','June', 'July', 'Aug', 'Sept','Oct', 'Nov', 'Dec'],
// //         datasets: [
// //           {
// //             label: 'One Year',
// //             backgroundColor: 'rgba(255,99,132,0.2)',
// //             borderColor: 'rgba(255,99,132,1)',
// //             borderWidth: 1,
// //             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
// //             hoverBorderColor: 'rgba(255,99,132,1)',
// //             data: [49, 22, 23,65,43,21,56,57, 100,23,43,21,]
// //           }
// //         ]
// //       }
// //     })
// //   }

// //   render() {
// //     return (
// //         <div>
// //           <lineChart data={this.state.lineChartData}  />
// //           <button onClick={this.change0}>Change to 3 months</button>
// //           <button onClick={this.change1}>Change to 6 months</button>
// //           <button onClick={this.change2}>Change to 1 year</button>
// //           {/*<button onClick={this.change2}></button>*/}
// //         </div>
// //   )
// //   }
// // }

// // export default (lineChart)