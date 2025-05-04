jQuery("#home-chart-05").length && am4core.ready(function () {
    var options = {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
        }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
        }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
        }],
        colors: ['#089bab', '#FC9F5B', '#5bc5d1'],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT'
            ],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };

    options.chart.rtl = true;

    var chart = new ApexCharts(document.querySelector("#home-chart-05"), options);
    chart.render();
})

jQuery("#doc-chart-01").length && am4core.ready(function () {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end


        var chart = am4core.create("doc-chart-01", am4charts.RadarChart);

        chart.data = [{
            "country": "USA",
            "visits": 2025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "Germany",
            "visits": 1322
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Spain",
            "visits": 711
        }, {
            "country": "Netherlands",
            "visits": 665
        }, {
            "country": "Russia",
            "visits": 580
        }, {
            "country": "South Korea",
            "visits": 443
        }, {
            "country": "Canada",
            "visits": 441
        }];
        chart.rtl = true;

        chart.innerRadius = am4core.percent(40)

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.grid.template.strokeOpacity = 0.08;

        chart.seriesContainer.zIndex = -10;


        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "visits";
        series.tooltipText = "{valueY.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.radarColumn.cornerRadius = 5;
        series.columns.template.radarColumn.innerCornerRadius = 0;
        chart.colors.list = [am4core.color("#279fac"),
        am4core.color("#ffb57e"),
        am4core.color("#279fac"),
        am4core.color("#ffb57e"),
        am4core.color("#279fac"),
        am4core.color("#ffb57e"),
        am4core.color("#279fac"),
        am4core.color("#ffb57e"),
        am4core.color("#279fac"),
        am4core.color("#ffb57e"),
        am4core.color("#279fac"),
        am4core.color("#ffb57e")
        ];

        chart.zoomOutButton.disabled = true;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });

        setInterval(() => {
            am4core.array.each(chart.data, (item) => {
                item.visits *= Math.random() * 0.5 + 0.5;
                item.visits += 10;
            })
            chart.invalidateRawData();
        }, 2000)

        categoryAxis.sortBySeries = series;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.behavior = "none";
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;

        chart.logo.disabled = true;

    });
});


var options = {
    chart: {
        height: 400,
        type: 'bar',
        sparkline: {
            show: false

        },
        toolbar: {
            show: false
        },
    },
    colors: ['#089bab', '#ffd400'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '30%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: false,
        width: 5,
        colors: ['#ffffff'],
    },
    series: [{
        name: 'Male',
        enabled: 'true',
        data: [44, 90, 90, 60, 115]
    }, {
        name: 'Female',
        data: [35, 80, 100, 70, 95]
    }],


    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands"
            }
        }
    }
};
options.colors = ['#089bab', '#FC9F5B'];
if (jQuery('#bar-chart-6').length) {
    var chart = new ApexCharts(
        document.querySelector("#bar-chart-6"),
        options
    );

    chart.render();
}