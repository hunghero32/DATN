document.addEventListener('DOMContentLoaded', function () {
/*===============
Basic Line Chart
====================*/
    let echartBaseLineElement = document.getElementById('echart-basic-line');
    if (echartBaseLineElement) {
        let echartBaseLine = echarts.init(echartBaseLineElement);
        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                // type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                itemStyle: {
                    color: 'rgba(8, 155, 171, 1)'
                }
            }]
        };

        echartBaseLine.setOption(option);
        window.addEventListener('resize', function () {
            echartBaseLine.resize();
        });
    }

/*===============
Bar Chart
====================*/
    let echartBarElement = document.getElementById('echart-bar');
    if (echartBarElement) {
        let echartBar = echarts.init(echartBarElement);
        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                itemStyle: {
                    color: 'rgba(8, 155, 171, 1)',
                }
            }]
        };

        echartBar.setOption(option);
        window.addEventListener('resize', function () {
            echartBar.resize();
        });
    }

/*===============
pie Chart
====================*/
    let echartPieElement = document.getElementById('echart-pie');
   
    if (echartPieElement) {
        const isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        var myChart = echarts.init(echartPieElement,  isDarkTheme ? 'dark' : '');
        let echartPie = echarts.init(echartPieElement);
        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'January' },
                        { value: 735, name: 'February' },
                        { value: 580, name: 'March' },
                        { value: 484, name: 'April' },
                        { value: 300, name: 'May' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        function initializeChart() {
            if (myChart) {
                myChart.dispose(); 
            }
            const isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
            myChart = echarts.init(echartPieElement, isDarkTheme ? 'dark' : 'light');
            myChart.setOption(option);
            const backgroundColor = isDarkTheme ? 'transparent' : '';
            myChart.setOption({
                ...option,
                backgroundColor: backgroundColor
            });
            $(window).on('resize', function () {
                myChart.resize();
            });
            
        }

        initializeChart();

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'data-bs-theme') {
                    initializeChart(); 
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        echartPie.setOption(option);
        window.addEventListener('resize', function () {
            echartPie.resize();
        });
    }
/*===============
 Bubble Chart
====================*/ 
    const echartBubbleData = [
        [
            [5, 30, 27662440, 'Product 1'],
            [10, 50, 27662441, 'Product 1'],
            [20, 60, 27662442, 'Product 1'],
            [30, 50, 27662443, 'Product 1'],
            [40, 77.4, 27662444, 'Product 1'],
        ],
        [
            [10, 60, 276624470, 'Product 2'],
            [20, 45, 276624471, 'Product 2'],
            [30, 60, 276624472, 'Product 2'],
            [40, 40, 276624473, 'Product 2'],
            [50, 50, 276624474, 'Product 2'],
        ],
        [
            [5, 40, 276624450, 'Product 3'],
            [20, 70, 276624451, 'Product 3'],
            [30, 40, 276624452, 'Product 3'],
            [40, 55, 276624453, 'Product 3'],
            [50, 65, 276624454, 'Product 3'],
        ]
    ];

    let echartBubbleElement = document.getElementById('echart-bubble');
    if (echartBubbleElement) {
        let echartBubble = echarts.init(echartBubbleElement);
        let option = {
            legend: {
                left: '25%',
                bottom: '3%',
                data: ['Product 1', 'Product 2', 'Product 3']
            },
            grid: {
                left: '8%',
                top: '10%'
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: echartBubbleData.map(function (bubbleData, idx) {
                return {
                    name: 'Bubble ' + idx,
                    data: bubbleData,
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    emphasis: {
                        focus: 'series'
                    }
                };
            })
        };

        echartBubble.setOption(option);
        window.addEventListener('resize', function () {
            echartBubble.resize();
        });
    }

    // Area Chart
    let echartAreaElement = document.getElementById('echart-area');
    if (echartAreaElement) {
        let echartArea = echarts.init(echartAreaElement);
        let option = {
            color: "#089bab",
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [320, 332, 301, 334, 390, 330, 320],
                type: 'line',
                areaStyle: {}
            }]
        };

        echartArea.setOption(option);
        window.addEventListener('resize', function () {
            echartArea.resize();
        });
    }

    // Doughnut Chart
    let echartDoughnutElement = document.getElementById('echart-doughnut1');
    if (echartDoughnutElement) {
        const isDarkTheme1 = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        var myChart1 = echarts.init(echartDoughnutElement,  isDarkTheme1 ? 'dark' : '');
        let echartDoughnut = echarts.init(echartDoughnutElement);
        function getLegendPosition() {
            return window.innerWidth <= 768 ? { top: '0%', left: 'center' } : { top: '5%', left: 'center' };
        }
        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: 
                getLegendPosition()
            ,
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'January' },
                        { value: 735, name: 'February' },
                        { value: 580, name: 'March' },
                        { value: 484, name: 'April' },
                        { value: 300, name: 'May' }
                    ]
                }
            ]
        };
        function initializeChart() {
          
            if (myChart1) {
                myChart1.dispose();
            }
    
          
            const isDarkTheme1 = document.documentElement.getAttribute('data-bs-theme') === 'dark';
            
           
            myChart1 = echarts.init(echartDoughnutElement, isDarkTheme1 ? 'dark' : '');
    
          
            myChart1.setOption({
                ...option,
                legend: getLegendPosition(),
                backgroundColor: isDarkTheme1 ? 'transparent' : ''
            });
    
           
            $(window).on('resize', function () {
                myChart1.resize();
                myChart1.setOption({
                    legend: getLegendPosition() // Update legend position on resize
                });
            });
            myChart1.setOption({
                legend: getLegendPosition()
            });
        }
     
        initializeChart();

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'data-bs-theme') {
                    initializeChart();
                }
            });
        });
    
      
        observer.observe(document.documentElement, {
            attributes: true
        });
        echartDoughnut.setOption(option);
        window.addEventListener('resize', function () {
            echartDoughnut.resize();
            if (myChart1) {
                myChart1.setOption({
                    legend: getLegendPosition()
                });
            }
        });
    }

    // Radar Chart
    let echartRadarElement = document.getElementById('echart-radar');
    if (echartRadarElement) {
        let echartRadar = echarts.init(echartRadarElement);
        let option = {
            tooltip: {},
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 }
                ]
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
            }],
            
        };

        echartRadar.setOption(option);
        window.addEventListener('resize', function () {
            echartRadar.resize();
        });
    }

    // Scatter Chart
    let echartScatterElement = document.getElementById('echart-scatter');
    if (echartScatterElement) {
        let echartScatter = echarts.init(echartScatterElement);
        let option = {
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter'
            }]
        };

        echartScatter.setOption(option);
        window.addEventListener('resize', function () {
            echartScatter.resize();
        });
    }
});