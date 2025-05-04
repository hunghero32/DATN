/*====================================
charts
=========================================*/
/*===============
line chart
====================*/
const lineChart = document.getElementById('echart-basic-line');
if (lineChart) {
    new Chart(lineChart, {
        type: 'line',
        data: {
            labels: ['August', 'September', 'October', 'November', 'December', 'January', 'February'],
            datasets: [{
                label: 'Line Chart',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(8, 155, 171, 1)',
                tension: 0.1
            }]
        },

    });
}

/*===============
bar chart
====================*/
const barChart = document.getElementById('echart-bar');
if (barChart) {
    new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['August', 'September', 'October', 'November', 'December', 'January', 'February'],
            datasets: [{
                label: 'Bar Chart',
                data: [65, 59, 80, 91, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(8, 155, 171, 1)',
                borderColor: 'rgba(8, 155, 171, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 45,
                    stepSize: 5, // Specify your desired step size for y-axis here
                }
            }
        }
    });
}


/*===============
area chart
====================*/
const areaChart = document.getElementById('echart-area');
if (areaChart) {
    new Chart(areaChart, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Area Chart',
                    data: [10, 20, 15, 30, 25],
                    borderColor: 'rgba(8, 155, 171, 1)',
                    backgroundColor: 'rgba(8, 155, 171, 0.2)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


/*===============
donut chart
====================*/
const doughnutChart = document.getElementById('echart-doughnut');
        if (doughnutChart) {
            doughnutChart.width = 300; 
            doughnutChart.height = 348;

            new Chart(doughnutChart, {
                type: 'doughnut',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May'],
                    datasets: [
                        {
                            label: 'Donut Chart',
                            data: [10, 20, 15, 30, 25],
                            backgroundColor: [
                                'rgba(8, 155, 171, 1)',
                                'rgba(252, 159, 91, 1)',
                                'rgba(242, 99, 97, 1)',
                                'rgba(87, 222, 83, 1)',
                                'rgba(97, 226, 252, 1)',
                            ],
                            hoverOffset: 4
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false, 
                }
            });
        }


/*===============
pie chart
====================*/
const pieChart = document.getElementById('echart-pie-1');
if (pieChart) {
    pieChart.width = 300; 
    pieChart.height = 348;
    new Chart(pieChart, {
        type: 'pie',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Donut Chart',
                    data: [10, 20, 15, 30, 25],
                    backgroundColor: [
                        'rgba(8, 155, 171, 1)',
                        'rgba(252, 159, 91, 1)',
                        'rgba(242, 99, 97, 1)',
                        'rgba(87, 222, 83, 1)',
                        'rgba(97, 226, 252, 1)',
                    ],
                    hoverOffset: 4
                }
            ]
        },
        options: {
            maintainAspectRatio: false, 
        }
    });
}

/*===============
bubble chart
====================*/
const bubbleChart = document.getElementById('echart-bubble');
if (bubbleChart) {
    new Chart(bubbleChart, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Product One',
                    data: [
                        { x: 20, y: 29, r: 10 },
                        { x: 21, y: 25, r: 10 },
                        { x: 22, y: 24, r: 10 },
                        { x: 24, y: 28, r: 10 },
                        { x: 25, y: 21, r: 10 },
                        { x: 26, y: 26, r: 10 },
                        { x: 27, y: 25, r: 10 },
                        { x: 28, y: 22, r: 10 },
                        { x: 29, y: 23, r: 10 },
                        { x: 30, y: 20, r: 10 },
                    ],
                    backgroundColor: 'rgba(242, 99, 97, 1)'
                },
                {
                    label: 'Product Two',
                    data: [
                        { x: 20, y: 22, r: 10 },
                        { x: 22, y: 26, r: 10 },
                        { x: 23, y: 24, r: 10 },
                        { x: 24, y: 22, r: 10 },
                        { x: 25, y: 23, r: 10 },
                        { x: 26, y: 24, r: 10 },
                        { x: 27, y: 28, r: 10 },
                        { x: 28, y: 20, r: 10 },
                        { x: 29, y: 27, r: 10 },
                        { x: 30, y: 29, r: 10 },
                    ],
                    backgroundColor: 'rgba(8, 155, 171, 1)'
                },
                {
                    label: 'Product Three',
                    data: [
                        { x: 20, y: 26, r: 10 },
                        { x: 22, y: 28, r: 10 },
                        { x: 23, y: 22, r: 10 },
                        { x: 24, y: 25, r: 10 },
                        { x: 25, y: 25, r: 10 },
                        { x: 26, y: 20, r: 10 },
                        { x: 27, y: 30, r: 10 },
                        { x: 28, y: 28, r: 10 },
                        { x: 29, y: 25, r: 10 },
                        { x: 30, y: 22, r: 10 },
                    ],
                    backgroundColor: 'rgba(97, 226, 252, 1)'
                }
            ]
        }
    });
}

/*===============
scatter chart
====================*/
const scatterChart = document.getElementById('echart-scatter');
if (scatterChart) {
    new Chart(scatterChart, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Product 1',
                    data: [
                        { x: 10, y: 0.0 },
                        { x: 12, y: 0.1 },
                        { x: 13, y: 0.2 },
                        { x: 14, y: 0.2 },
                        { x: 15, y: 0.5 },
                        { x: 16, y: 0.4 },
                        { x: 17, y: 0.5 },
                        { x: 18, y: 0.3 },
                        { x: 19, y: 0.1 },
                        { x: 20, y: 0.5 },
                        { x: 21, y: 0.4 },
                        { x: 22, y: 0.2 }
                    ],
                    backgroundColor: 'rgba(242, 99, 97, 1)'
                },
                {
                    label: 'Product 2',
                    data: [
                        { x: 10, y: 0.5 },
                        { x: 12, y: 0.4 },
                        { x: 13, y: 0.3 },
                        { x: 14, y: 0.2 },
                        { x: 15, y: 0.1 },
                        { x: 16, y: 0.2 },
                        { x: 17, y: 0.1 },
                        { x: 18, y: 0.2 },
                        { x: 19, y: 0.3 },
                        { x: 20, y: 0.4 },
                        { x: 21, y: 0.5 },
                        { x: 22, y: 0.0 }
                    ],
                    backgroundColor: 'rgba(8, 155, 171, 1)'
                },
                {
                    label: 'Product 3',
                    data: [
                        { x: 10, y: 0.25 },
                        { x: 12, y: 0.3 },
                        { x: 13, y: 0.3 },
                        { x: 14, y: 0.4 },
                        { x: 15, y: 0.3 },
                        { x: 16, y: 0.1 },
                        { x: 17, y: 0.5 },
                        { x: 18, y: 0.2 },
                        { x: 19, y: 0.3 },
                        { x: 20, y: 0.4 },
                        { x: 21, y: 0.5 },
                        { x: 22, y: 0.0 }
                    ],
                    backgroundColor: 'rgba(97, 226, 252, 1)'
                }
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}

/*===============
radar chart
====================*/
const radarChart = document.getElementById('echart-radar');
if (radarChart) {
    radarChart.width = 300; 
    radarChart.height = 348;
    new Chart(radarChart, {
        type: 'radar',
        data: {
            labels: [
                'Eating',
                'Drinking',
                'Sleeping',
                'Designing',
                'Coding',
                'Cycling',
                'Running'
            ],
            datasets: [{
                label: 'Day 1',
                data: [65, 59, 90, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: 'Day 2',
                data: [28, 48, 40, 19, 96, 27, 100],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            maintainAspectRatio: false, 
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
        
    });
}
