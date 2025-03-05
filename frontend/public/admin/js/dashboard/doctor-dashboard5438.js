jQuery("#home-chart-06").length && am4core.ready(function () {
    var options = {
        series: [{
            name: 'Series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 340,
            type: 'area'
        },
        colors: ["#089bab"],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };

    options.chart.rtl = true;

    var chart = new ApexCharts(document.querySelector("#home-chart-06"), options);
    chart.render();
});


// Patient overview pie chart
if (jQuery("#home-chart-03").length) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("home-chart-03", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0;

        chart.data = [
            {
                country: "USA",
                value: 401
            },
            {
                country: "India",
                value: 300
            },
            {
                country: "Australia",
                value: 200
            },
            {
                country: "Brazil",
                value: 100
            }
        ];
        chart.rtl = true;
        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "country";
        series.colors.list = [am4core.color("#089bab"), am4core.color("#2ca5b2"), am4core.color("#faa264"),
        am4core.color("#fcb07a")];

        series.slices.template.cornerRadius = 0;
        series.slices.template.innerCornerRadius = 0;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;
        series.alignLabels = false;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        chart.legend = new am4charts.Legend();

        chart.logo.disabled = true;

    });
}



