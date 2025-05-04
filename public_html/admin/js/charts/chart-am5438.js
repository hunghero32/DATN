am4core.options.commercialLicense = true;

if (jQuery("#am-simple-chart").length && am4core.ready(function () {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-simple-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab")], e.data = [{
        country: "USA",
        visits: 2025
    }, {
        country: "China",
        visits: 1882
    }, {
        country: "Japan",
        visits: 1809
    }, {
        country: "UK",
        visits: 1122
    }, {
        country: "France",
        visits: 1114
    }];
    var t = e.xAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "country", t.renderer.grid.template.location = 0, t.renderer.minGridDistance = 30, t.renderer.labels.template.adapter.add("dy", function (e, t) {
        return t.dataItem && !0 & t.dataItem.index ? e + 25 : e
    });
    e.yAxes.push(new am4charts.ValueAxis);
    var a = e.series.push(new am4charts.ColumnSeries);
    a.dataFields.valueY = "visits", a.dataFields.categoryX = "country", a.name = "Visits", a.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]", a.columns.template.fillOpacity = .8;
    var n = a.columns.template;
    n.strokeWidth = 2, n.strokeOpacity = 1
}));


jQuery("#am-layeredcolumn-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-layeredcolumn-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#fc9f5b"), am4core.color("#089bab")], e.numberFormatter.numberFormat = "#.#'%'", e.data = [{
        country: "USA",
        year2004: 3.5,
        year2005: 4.2
    }, {
        country: "UK",
        year2004: 1.7,
        year2005: 3.1
    }, {
        country: "Canada",
        year2004: 2.8,
        year2005: 2.9
    }, {
        country: "Japan",
        year2004: 2.6,
        year2005: 2.3
    }, {
        country: "France",
        year2004: 1.4,
        year2005: 2.1
    }, {
        country: "Brazil",
        year2004: 2.6,
        year2005: 4.9
    }];
    var t = e.xAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "country", t.renderer.grid.template.location = 0, t.renderer.minGridDistance = 30;
    var a = e.yAxes.push(new am4charts.ValueAxis);
    a.title.text = "GDP growth rate", a.title.fontWeight = 800;
    var n = e.series.push(new am4charts.ColumnSeries);
    n.dataFields.valueY = "year2004", n.dataFields.categoryX = "country", n.clustered = !1, n.tooltipText = "GDP grow in {categoryX} (2004): [bold]{valueY}[/]";
    var o = e.series.push(new am4charts.ColumnSeries);
    o.dataFields.valueY = "year2005", o.dataFields.categoryX = "country", o.clustered = !1, o.columns.template.width = am4core.percent(50), o.tooltipText = "GDP grow in {categoryX} (2005): [bold]{valueY}[/]", e.cursor = new am4charts.XYCursor, e.cursor.lineX.disabled = !0, e.cursor.lineY.disabled = !0
})

jQuery("#am-barline-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-barline-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab"), am4core.color("#fc9f5b")], e.data = [{
        year: "2005",
        income: 23.5,
        expenses: 18.1
    }, {
        year: "2006",
        income: 26.2,
        expenses: 22.8
    }, {
        year: "2007",
        income: 30.1,
        expenses: 23.9
    }, {
        year: "2008",
        income: 29.5,
        expenses: 25.1
    }, {
        year: "2009",
        income: 24.6,
        expenses: 25
    }];
    var t = e.yAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "year", t.renderer.inversed = !0, t.renderer.grid.template.location = 0, e.xAxes.push(new am4charts.ValueAxis).renderer.opposite = !0;
    var a = e.series.push(new am4charts.ColumnSeries);
    a.dataFields.categoryY = "year", a.dataFields.valueX = "income", a.name = "Income", a.columns.template.fillOpacity = .5, a.columns.template.strokeOpacity = 0, a.tooltipText = "Income in {categoryY}: {valueX.value}";
    var n = e.series.push(new am4charts.LineSeries);
    n.dataFields.categoryY = "year", n.dataFields.valueX = "expenses", n.name = "Expenses", n.strokeWidth = 3, n.tooltipText = "Expenses in {categoryY}: {valueX.value}";
    var o = n.bullets.push(new am4charts.CircleBullet);
    o.circle.fill = am4core.color("#fff"), o.circle.strokeWidth = 2, e.cursor = new am4charts.XYCursor, e.cursor.behavior = "zoomY", e.legend = new am4charts.Legend
})

jQuery("#am-linescrollzomm-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-linescrollzomm-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab")], e.data = function() {
        var e = [],
            t = new Date;
        t.setDate(t.getDate() - 1e3);
        for (var a = 1200, n = 0; n < 500; n++) {
            var o = new Date(t);
            o.setDate(o.getDate() + n), a += Math.round((Math.random() < .5 ? 1 : -1) * Math.random() * 10), e.push({
                date: o,
                visits: a
            })
        }
        return e
    }();
    var t = e.xAxes.push(new am4charts.DateAxis);
    t.renderer.minGridDistance = 50;
    e.yAxes.push(new am4charts.ValueAxis);
    var a = e.series.push(new am4charts.LineSeries);
    a.dataFields.valueY = "visits", a.dataFields.dateX = "date", a.strokeWidth = 2, a.minBulletDistance = 10, a.tooltipText = "{valueY}", a.tooltip.pointerOrientation = "vertical", a.tooltip.background.cornerRadius = 20, a.tooltip.background.fillOpacity = .5, a.tooltip.label.padding(12, 12, 12, 12), e.scrollbarX = new am4charts.XYChartScrollbar, e.scrollbarX.series.push(a), e.cursor = new am4charts.XYCursor, e.cursor.xAxis = t, e.cursor.snapToSeries = a
})

jQuery("#am-radar-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-radar-chart", am4charts.RadarChart);
    e.colors.list = [am4core.color("#089bab")], e.data = [{
        country: "Lithuania",
        litres: 501
    }, {
        country: "Czechia",
        litres: 301
    }, {
        country: "Ireland",
        litres: 266
    }, {
        country: "Germany",
        litres: 165
    }, {
        country: "Australia",
        litres: 139
    }, {
        country: "Austria",
        litres: 336
    }, {
        country: "UK",
        litres: 290
    }, {
        country: "Belgium",
        litres: 325
    }, {
        country: "The Netherlands",
        litres: 40
    }], e.xAxes.push(new am4charts.CategoryAxis).dataFields.category = "country";
    var t = e.yAxes.push(new am4charts.ValueAxis);
    t.renderer.axisFills.template.fill = e.colors.getIndex(2), t.renderer.axisFills.template.fillOpacity = .05;
    var a = e.series.push(new am4charts.RadarSeries);
    a.dataFields.valueY = "litres", a.dataFields.categoryX = "country", a.name = "Sales", a.strokeWidth = 3
})

jQuery("#am-polar-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-polar-chart", am4charts.RadarChart);
    e.data = [{
        direction: "N",
        value: 8
    }, {
        direction: "NE",
        value: 9
    }, {
        direction: "E",
        value: 4.5
    }, {
        direction: "SE",
        value: 3.5
    }, {
        direction: "S",
        value: 9.2
    }, {
        direction: "SW",
        value: 8.4
    }, {
        direction: "W",
        value: 11.1
    }, {
        direction: "NW",
        value: 10
    }];
    var t = e.xAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "direction";
    e.yAxes.push(new am4charts.ValueAxis);
    var a = t.axisRanges.create();
    a.category = "NW", a.endCategory = "NW", a.axisFill.fill = am4core.color("#0dd6b8"), a.axisFill.fillOpacity = .3;
    var n = t.axisRanges.create();
    n.category = "N", n.endCategory = "N", n.axisFill.fill = am4core.color("#0dd6b8"), n.axisFill.fillOpacity = .3;
    var o = t.axisRanges.create();
    o.category = "SE", o.endCategory = "SW", o.axisFill.fill = am4core.color("#fbc647"), o.axisFill.fillOpacity = .3, o.locations.endCategory = 0;
    var r = e.series.push(new am4charts.RadarSeries);
    r.dataFields.valueY = "value", r.dataFields.categoryX = "direction", r.name = "Wind direction", r.strokeWidth = 3, r.fillOpacity = .2
})

jQuery("#am-columnlinr-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-columnlinr-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab")], e.exporting.menu = new am4core.ExportMenu;
    var t = e.xAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "year", t.renderer.minGridDistance = 30;
    e.yAxes.push(new am4charts.ValueAxis);
    var a = e.series.push(new am4charts.ColumnSeries);
    a.name = "Income", a.dataFields.valueY = "income", a.dataFields.categoryX = "year", a.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]", a.columns.template.propertyFields.fillOpacity = "fillOpacity", a.columns.template.propertyFields.stroke = "stroke", a.columns.template.propertyFields.strokeWidth = "strokeWidth", a.columns.template.propertyFields.strokeDasharray = "columnDash", a.tooltip.label.textAlign = "middle";
    var n = e.series.push(new am4charts.LineSeries);
    n.name = "Expenses", n.dataFields.valueY = "expenses", n.dataFields.categoryX = "year", n.stroke = am4core.color("#0dd6b8"), n.strokeWidth = 3, n.propertyFields.strokeDasharray = "lineDash", n.tooltip.label.textAlign = "middle";
    var o = n.bullets.push(new am4charts.Bullet);
    o.fill = am4core.color("#fdd400"), o.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    var r = o.createChild(am4core.Circle);
    r.radius = 4, r.fill = am4core.color("#fff"), r.strokeWidth = 3, e.data = [{
        year: "2009",
        income: 23.5,
        expenses: 21.1
    }, {
        year: "2010",
        income: 26.2,
        expenses: 30.5
    }, {
        year: "2011",
        income: 30.1,
        expenses: 34.9
    }, {
        year: "2012",
        income: 29.5,
        expenses: 31.1
    }, {
        year: "2013",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5"
    }, {
        year: "2014",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: .2,
        additional: "(projection)"
    }]
})

jQuery("#am-stackedcolumn-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-stackedcolumn-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab"), am4core.color("#fc9f5b"), am4core.color("#e64141")], e.data = [{
        year: "2016",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: .3,
        meast: .2
    },
    {
        year: "2017",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: .3,
        meast: .3
    }, {
        year: "2018",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: .3,
        meast: .3
    }];
    var t = e.xAxes.push(new am4charts.CategoryAxis);
    t.dataFields.category = "year", t.renderer.grid.template.location = 0;
    var a = e.yAxes.push(new am4charts.ValueAxis);

    function n(t, a) {
        var n = e.series.push(new am4charts.ColumnSeries);
        n.name = a, n.dataFields.valueY = t, n.dataFields.categoryX = "year", n.sequencedInterpolation = !0, n.stacked = !0, n.columns.template.width = am4core.percent(60), n.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        var o = n.bullets.push(new am4charts.LabelBullet);
        return o.label.text = "{valueY}", o.locationY = .5, n
    }
    a.renderer.inside = !0, a.renderer.labels.template.disabled = !0, a.min = 0, n("europe", "Europe"), n("namerica", "North America"), n("asia", "Asia-Pacific"), e.legend = new am4charts.Legend
})

jQuery("#am-datedata-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-datedata-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab")], e.data = [{
        date: "2012-07-27",
        value: 13
    }, {
        date: "2012-07-28",
        value: 11
    }, {
        date: "2012-07-29",
        value: 15
    }, {
        date: "2012-07-30",
        value: 16
    }, {
        date: "2012-07-31",
        value: 18
    }, {
        date: "2012-08-01",
        value: 13
    }, {
        date: "2012-08-02",
        value: 22
    }, {
        date: "2012-08-03",
        value: 23
    }, {
        date: "2012-08-04",
        value: 20
    }, {
        date: "2012-08-05",
        value: 17
    }, {
        date: "2012-08-06",
        value: 16
    }, {
        date: "2012-08-07",
        value: 18
    }, {
        date: "2012-08-08",
        value: 21
    }, {
        date: "2012-08-09",
        value: 26
    }, {
        date: "2012-08-10",
        value: 24
    }, {
        date: "2012-08-11",
        value: 29
    }, {
        date: "2012-08-12",
        value: 32
    }, {
        date: "2012-08-13",
        value: 18
    }, {
        date: "2012-08-14",
        value: 24
    }, {
        date: "2012-08-15",
        value: 22
    }, {
        date: "2012-08-16",
        value: 18
    }, {
        date: "2012-08-17",
        value: 19
    }, {
        date: "2012-08-18",
        value: 14
    }, {
        date: "2012-08-19",
        value: 15
    }, {
        date: "2012-08-20",
        value: 12
    }, {
        date: "2012-08-21",
        value: 8
    }, {
        date: "2012-08-22",
        value: 9
    }, {
        date: "2012-08-23",
        value: 8
    }, {
        date: "2012-08-24",
        value: 7
    }, {
        date: "2012-08-25",
        value: 5
    }, {
        date: "2012-08-26",
        value: 11
    }, {
        date: "2012-08-27",
        value: 13
    }, {
        date: "2012-08-28",
        value: 18
    }, {
        date: "2012-08-29",
        value: 20
    }, {
        date: "2012-08-30",
        value: 29
    }, {
        date: "2012-08-31",
        value: 33
    }, {
        date: "2012-09-01",
        value: 42
    }, {
        date: "2012-09-02",
        value: 35
    }, {
        date: "2012-09-03",
        value: 31
    }, {
        date: "2012-09-04",
        value: 47
    }, {
        date: "2012-09-05",
        value: 52
    }, {
        date: "2012-09-06",
        value: 46
    }, {
        date: "2012-09-07",
        value: 41
    }, {
        date: "2012-09-08",
        value: 43
    }, {
        date: "2012-09-09",
        value: 40
    }, {
        date: "2012-09-10",
        value: 39
    }, {
        date: "2012-09-11",
        value: 34
    }, {
        date: "2012-09-12",
        value: 29
    }, {
        date: "2012-09-13",
        value: 34
    }, {
        date: "2012-09-14",
        value: 37
    }, {
        date: "2012-09-15",
        value: 42
    }, {
        date: "2012-09-16",
        value: 49
    }, {
        date: "2012-09-17",
        value: 46
    }, {
        date: "2012-09-18",
        value: 47
    }, {
        date: "2012-09-19",
        value: 55
    }, {
        date: "2012-09-20",
        value: 59
    }, {
        date: "2012-09-21",
        value: 58
    }, {
        date: "2012-09-22",
        value: 57
    }, {
        date: "2012-09-23",
        value: 61
    }, {
        date: "2012-09-24",
        value: 59
    }, {
        date: "2012-09-25",
        value: 67
    }, {
        date: "2012-09-26",
        value: 65
    }, {
        date: "2012-09-27",
        value: 61
    }, {
        date: "2012-09-28",
        value: 66
    }, {
        date: "2012-09-29",
        value: 69
    }, {
        date: "2012-09-30",
        value: 71
    }, {
        date: "2012-10-01",
        value: 67
    }, {
        date: "2012-10-02",
        value: 63
    }, {
        date: "2012-10-03",
        value: 46
    }, {
        date: "2012-10-04",
        value: 32
    }, {
        date: "2012-10-05",
        value: 21
    }, {
        date: "2012-10-06",
        value: 18
    }, {
        date: "2012-10-07",
        value: 21
    }, {
        date: "2012-10-08",
        value: 28
    }, {
        date: "2012-10-09",
        value: 27
    }, {
        date: "2012-10-10",
        value: 36
    }, {
        date: "2012-10-11",
        value: 33
    }, {
        date: "2012-10-12",
        value: 31
    }, {
        date: "2012-10-13",
        value: 30
    }, {
        date: "2012-10-14",
        value: 34
    }, {
        date: "2012-10-15",
        value: 38
    }, {
        date: "2012-10-16",
        value: 37
    }, {
        date: "2012-10-17",
        value: 44
    }, {
        date: "2012-10-18",
        value: 49
    }, {
        date: "2012-10-19",
        value: 53
    }, {
        date: "2012-10-20",
        value: 57
    }, {
        date: "2012-10-21",
        value: 60
    }, {
        date: "2012-10-22",
        value: 61
    }, {
        date: "2012-10-23",
        value: 69
    }, {
        date: "2012-10-24",
        value: 67
    }, {
        date: "2012-10-25",
        value: 72
    }, {
        date: "2012-10-26",
        value: 77
    }, {
        date: "2012-10-27",
        value: 75
    }, {
        date: "2012-10-28",
        value: 70
    }, {
        date: "2012-10-29",
        value: 72
    }, {
        date: "2012-10-30",
        value: 70
    }, {
        date: "2012-10-31",
        value: 72
    }, {
        date: "2012-11-01",
        value: 73
    }, {
        date: "2012-11-02",
        value: 67
    }, {
        date: "2012-11-03",
        value: 68
    }, {
        date: "2012-11-04",
        value: 65
    }, {
        date: "2012-11-05",
        value: 71
    }, {
        date: "2012-11-06",
        value: 75
    }, {
        date: "2012-11-07",
        value: 74
    }, {
        date: "2012-11-08",
        value: 71
    }, {
        date: "2012-11-09",
        value: 76
    }, {
        date: "2012-11-10",
        value: 77
    }, {
        date: "2012-11-11",
        value: 81
    }, {
        date: "2012-11-12",
        value: 83
    }, {
        date: "2012-11-13",
        value: 80
    }, {
        date: "2012-11-14",
        value: 81
    }, {
        date: "2012-11-15",
        value: 87
    }, {
        date: "2012-11-16",
        value: 82
    }, {
        date: "2012-11-17",
        value: 86
    }, {
        date: "2012-11-18",
        value: 80
    }, {
        date: "2012-11-19",
        value: 87
    }, {
        date: "2012-11-20",
        value: 83
    }, {
        date: "2012-11-21",
        value: 85
    }, {
        date: "2012-11-22",
        value: 84
    }, {
        date: "2012-11-23",
        value: 82
    }, {
        date: "2012-11-24",
        value: 73
    }, {
        date: "2012-11-25",
        value: 71
    }, {
        date: "2012-11-26",
        value: 75
    }, {
        date: "2012-11-27",
        value: 79
    }, {
        date: "2012-11-28",
        value: 70
    }, {
        date: "2012-11-29",
        value: 73
    }, {
        date: "2012-11-30",
        value: 61
    }, {
        date: "2012-12-01",
        value: 62
    }, {
        date: "2012-12-02",
        value: 66
    }, {
        date: "2012-12-03",
        value: 65
    }, {
        date: "2012-12-04",
        value: 73
    }, {
        date: "2012-12-05",
        value: 79
    }, {
        date: "2012-12-06",
        value: 78
    }, {
        date: "2012-12-07",
        value: 78
    }, {
        date: "2012-12-08",
        value: 78
    }, {
        date: "2012-12-09",
        value: 74
    }, {
        date: "2012-12-10",
        value: 73
    }, {
        date: "2012-12-11",
        value: 75
    }, {
        date: "2012-12-12",
        value: 70
    }, {
        date: "2012-12-13",
        value: 77
    }, {
        date: "2012-12-14",
        value: 67
    }, {
        date: "2012-12-15",
        value: 62
    }, {
        date: "2012-12-16",
        value: 64
    }, {
        date: "2012-12-17",
        value: 61
    }, {
        date: "2012-12-18",
        value: 59
    }, {
        date: "2012-12-19",
        value: 53
    }, {
        date: "2012-12-20",
        value: 54
    }, {
        date: "2012-12-21",
        value: 56
    }, {
        date: "2012-12-22",
        value: 59
    }, {
        date: "2012-12-23",
        value: 58
    }, {
        date: "2012-12-24",
        value: 55
    }, {
        date: "2012-12-25",
        value: 52
    }, {
        date: "2012-12-26",
        value: 54
    }, {
        date: "2012-12-27",
        value: 50
    }, {
        date: "2012-12-28",
        value: 50
    }, {
        date: "2012-12-29",
        value: 51
    }, {
        date: "2012-12-30",
        value: 52
    }, {
        date: "2012-12-31",
        value: 58
    }, {
        date: "2013-01-01",
        value: 60
    }, {
        date: "2013-01-02",
        value: 67
    }, {
        date: "2013-01-03",
        value: 64
    }, {
        date: "2013-01-04",
        value: 66
    }, {
        date: "2013-01-05",
        value: 60
    }, {
        date: "2013-01-06",
        value: 63
    }, {
        date: "2013-01-07",
        value: 61
    }, {
        date: "2013-01-08",
        value: 60
    }, {
        date: "2013-01-09",
        value: 65
    }, {
        date: "2013-01-10",
        value: 75
    }, {
        date: "2013-01-11",
        value: 77
    }, {
        date: "2013-01-12",
        value: 78
    }, {
        date: "2013-01-13",
        value: 70
    }, {
        date: "2013-01-14",
        value: 70
    }, {
        date: "2013-01-15",
        value: 73
    }, {
        date: "2013-01-16",
        value: 71
    }, {
        date: "2013-01-17",
        value: 74
    }, {
        date: "2013-01-18",
        value: 78
    }, {
        date: "2013-01-19",
        value: 85
    }, {
        date: "2013-01-20",
        value: 82
    }, {
        date: "2013-01-21",
        value: 83
    }, {
        date: "2013-01-22",
        value: 88
    }, {
        date: "2013-01-23",
        value: 85
    }, {
        date: "2013-01-24",
        value: 85
    }, {
        date: "2013-01-25",
        value: 80
    }, {
        date: "2013-01-26",
        value: 87
    }, {
        date: "2013-01-27",
        value: 84
    }, {
        date: "2013-01-28",
        value: 83
    }, {
        date: "2013-01-29",
        value: 84
    }, {
        date: "2013-01-30",
        value: 81
    }], e.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    var t = e.xAxes.push(new am4charts.DateAxis),
        a = (e.yAxes.push(new am4charts.ValueAxis), e.series.push(new am4charts.LineSeries));
    a.dataFields.valueY = "value", a.dataFields.dateX = "date", a.tooltipText = "{value}", a.strokeWidth = 2, a.minBulletDistance = 15, a.tooltip.background.cornerRadius = 20, a.tooltip.background.strokeOpacity = 0, a.tooltip.pointerOrientation = "vertical", a.tooltip.label.minWidth = 40, a.tooltip.label.minHeight = 40, a.tooltip.label.textAlign = "middle", a.tooltip.label.textValign = "middle";
    var n = a.bullets.push(new am4charts.CircleBullet);
    n.circle.strokeWidth = 2, n.circle.radius = 4, n.circle.fill = am4core.color("#fff"), n.states.create("hover").properties.scale = 1.3, e.cursor = new am4charts.XYCursor, e.cursor.behavior = "panXY", e.cursor.xAxis = t, e.cursor.snapToSeries = a, e.scrollbarY = new am4core.Scrollbar, e.scrollbarY.parent = e.leftAxesContainer, e.scrollbarY.toBack(), e.scrollbarX = new am4charts.XYChartScrollbar, e.scrollbarX.series.push(a), e.scrollbarX.parent = e.bottomAxesContainer, t.start = .79, t.keepSelection = !0
})

jQuery("#am-zoomable-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-zoomable-chart", am4charts.XYChart);
    e.colors.list = [am4core.color("#089bab")], e.data = [{
        date: "2012-07-27",
        value: 13
    }, {
        date: "2012-07-28",
        value: 11
    }, {
        date: "2012-07-29",
        value: 15
    }, {
        date: "2012-07-30",
        value: 16
    }, {
        date: "2012-07-31",
        value: 18
    }, {
        date: "2012-08-01",
        value: 13
    }, {
        date: "2012-08-02",
        value: 22
    }, {
        date: "2012-08-03",
        value: 23
    }, {
        date: "2012-08-04",
        value: 20
    }, {
        date: "2012-08-05",
        value: 17
    }, {
        date: "2012-08-06",
        value: 16
    }, {
        date: "2012-08-07",
        value: 18
    }, {
        date: "2012-08-08",
        value: 21
    }, {
        date: "2012-08-09",
        value: 26
    }, {
        date: "2012-08-10",
        value: 24
    }, {
        date: "2012-08-11",
        value: 29
    }, {
        date: "2012-08-12",
        value: 32
    }, {
        date: "2012-08-13",
        value: 18
    }, {
        date: "2012-08-14",
        value: 24
    }, {
        date: "2012-08-15",
        value: 22
    }, {
        date: "2012-08-16",
        value: 18
    }, {
        date: "2012-08-17",
        value: 19
    }, {
        date: "2012-08-18",
        value: 14
    }, {
        date: "2012-08-19",
        value: 15
    }, {
        date: "2012-08-20",
        value: 12
    }, {
        date: "2012-08-21",
        value: 8
    }, {
        date: "2012-08-22",
        value: 9
    }, {
        date: "2012-08-23",
        value: 8
    }, {
        date: "2012-08-24",
        value: 7
    }, {
        date: "2012-08-25",
        value: 5
    }, {
        date: "2012-08-26",
        value: 11
    }, {
        date: "2012-08-27",
        value: 13
    }, {
        date: "2012-08-28",
        value: 18
    }, {
        date: "2012-08-29",
        value: 20
    }, {
        date: "2012-08-30",
        value: 29
    }, {
        date: "2012-08-31",
        value: 33
    }, {
        date: "2012-09-01",
        value: 42
    }, {
        date: "2012-09-02",
        value: 35
    }, {
        date: "2012-09-03",
        value: 31
    }, {
        date: "2012-09-04",
        value: 47
    }, {
        date: "2012-09-05",
        value: 52
    }, {
        date: "2012-09-06",
        value: 46
    }, {
        date: "2012-09-07",
        value: 41
    }, {
        date: "2012-09-08",
        value: 43
    }, {
        date: "2012-09-09",
        value: 40
    }, {
        date: "2012-09-10",
        value: 39
    }, {
        date: "2012-09-11",
        value: 34
    }, {
        date: "2012-09-12",
        value: 29
    }, {
        date: "2012-09-13",
        value: 34
    }, {
        date: "2012-09-14",
        value: 37
    }, {
        date: "2012-09-15",
        value: 42
    }, {
        date: "2012-09-16",
        value: 49
    }, {
        date: "2012-09-17",
        value: 46
    }, {
        date: "2012-09-18",
        value: 47
    }, {
        date: "2012-09-19",
        value: 55
    }, {
        date: "2012-09-20",
        value: 59
    }, {
        date: "2012-09-21",
        value: 58
    }, {
        date: "2012-09-22",
        value: 57
    }, {
        date: "2012-09-23",
        value: 61
    }, {
        date: "2012-09-24",
        value: 59
    }, {
        date: "2012-09-25",
        value: 67
    }, {
        date: "2012-09-26",
        value: 65
    }, {
        date: "2012-09-27",
        value: 61
    }, {
        date: "2012-09-28",
        value: 66
    }, {
        date: "2012-09-29",
        value: 69
    }, {
        date: "2012-09-30",
        value: 71
    }, {
        date: "2012-10-01",
        value: 67
    }, {
        date: "2012-10-02",
        value: 63
    }, {
        date: "2012-10-03",
        value: 46
    }, {
        date: "2012-10-04",
        value: 32
    }, {
        date: "2012-10-05",
        value: 21
    }, {
        date: "2012-10-06",
        value: 18
    }, {
        date: "2012-10-07",
        value: 21
    }, {
        date: "2012-10-08",
        value: 28
    }, {
        date: "2012-10-09",
        value: 27
    }, {
        date: "2012-10-10",
        value: 36
    }, {
        date: "2012-10-11",
        value: 33
    }, {
        date: "2012-10-12",
        value: 31
    }, {
        date: "2012-10-13",
        value: 30
    }, {
        date: "2012-10-14",
        value: 34
    }, {
        date: "2012-10-15",
        value: 38
    }, {
        date: "2012-10-16",
        value: 37
    }, {
        date: "2012-10-17",
        value: 44
    }, {
        date: "2012-10-18",
        value: 49
    }, {
        date: "2012-10-19",
        value: 53
    }, {
        date: "2012-10-20",
        value: 57
    }, {
        date: "2012-10-21",
        value: 60
    }, {
        date: "2012-10-22",
        value: 61
    }, {
        date: "2012-10-23",
        value: 69
    }, {
        date: "2012-10-24",
        value: 67
    }, {
        date: "2012-10-25",
        value: 72
    }, {
        date: "2012-10-26",
        value: 77
    }, {
        date: "2012-10-27",
        value: 75
    }, {
        date: "2012-10-28",
        value: 70
    }, {
        date: "2012-10-29",
        value: 72
    }, {
        date: "2012-10-30",
        value: 70
    }, {
        date: "2012-10-31",
        value: 72
    }, {
        date: "2012-11-01",
        value: 73
    }, {
        date: "2012-11-02",
        value: 67
    }, {
        date: "2012-11-03",
        value: 68
    }, {
        date: "2012-11-04",
        value: 65
    }, {
        date: "2012-11-05",
        value: 71
    }, {
        date: "2012-11-06",
        value: 75
    }, {
        date: "2012-11-07",
        value: 74
    }, {
        date: "2012-11-08",
        value: 71
    }, {
        date: "2012-11-09",
        value: 76
    }, {
        date: "2012-11-10",
        value: 77
    }, {
        date: "2012-11-11",
        value: 81
    }, {
        date: "2012-11-12",
        value: 83
    }, {
        date: "2012-11-13",
        value: 80
    }, {
        date: "2012-11-18",
        value: 80
    }, {
        date: "2012-11-19",
        value: 87
    }, {
        date: "2012-11-20",
        value: 83
    }, {
        date: "2012-11-21",
        value: 85
    }, {
        date: "2012-11-22",
        value: 84
    }, {
        date: "2012-11-23",
        value: 82
    }, {
        date: "2012-11-24",
        value: 73
    }, {
        date: "2012-11-25",
        value: 71
    }, {
        date: "2012-11-26",
        value: 75
    }, {
        date: "2012-11-27",
        value: 79
    }, {
        date: "2012-11-28",
        value: 70
    }, {
        date: "2012-11-29",
        value: 73
    }, {
        date: "2012-11-30",
        value: 61
    }, {
        date: "2012-12-01",
        value: 62
    }, {
        date: "2012-12-02",
        value: 66
    }, {
        date: "2012-12-03",
        value: 65
    }, {
        date: "2012-12-04",
        value: 73
    }, {
        date: "2012-12-05",
        value: 79
    }, {
        date: "2012-12-06",
        value: 78
    }, {
        date: "2012-12-07",
        value: 78
    }, {
        date: "2012-12-08",
        value: 78
    }, {
        date: "2012-12-09",
        value: 74
    }, {
        date: "2012-12-10",
        value: 73
    }, {
        date: "2012-12-11",
        value: 75
    }, {
        date: "2012-12-12",
        value: 70
    }, {
        date: "2012-12-13",
        value: 77
    }, {
        date: "2012-12-14",
        value: 67
    }, {
        date: "2012-12-15",
        value: 62
    }, {
        date: "2012-12-16",
        value: 64
    }, {
        date: "2012-12-17",
        value: 61
    }, {
        date: "2012-12-18",
        value: 59
    }, {
        date: "2012-12-19",
        value: 53
    }, {
        date: "2012-12-20",
        value: 54
    }, {
        date: "2012-12-21",
        value: 56
    }, {
        date: "2012-12-22",
        value: 59
    }, {
        date: "2012-12-23",
        value: 58
    }, {
        date: "2012-12-24",
        value: 55
    }, {
        date: "2012-12-25",
        value: 52
    }, {
        date: "2012-12-26",
        value: 54
    }, {
        date: "2012-12-27",
        value: 50
    }, {
        date: "2012-12-28",
        value: 50
    }, {
        date: "2012-12-29",
        value: 51
    }, {
        date: "2012-12-30",
        value: 52
    }, {
        date: "2012-12-31",
        value: 58
    }, {
        date: "2013-01-01",
        value: 60
    }, {
        date: "2013-01-02",
        value: 67
    }, {
        date: "2013-01-03",
        value: 64
    }, {
        date: "2013-01-04",
        value: 66
    }, {
        date: "2013-01-05",
        value: 60
    }, {
        date: "2013-01-06",
        value: 63
    }, {
        date: "2013-01-07",
        value: 61
    }, {
        date: "2013-01-08",
        value: 60
    }, {
        date: "2013-01-09",
        value: 65
    }, {
        date: "2013-01-10",
        value: 75
    }, {
        date: "2013-01-11",
        value: 77
    }, {
        date: "2013-01-12",
        value: 78
    }, {
        date: "2013-01-13",
        value: 70
    }, {
        date: "2013-01-14",
        value: 70
    }, {
        date: "2013-01-15",
        value: 73
    }, {
        date: "2013-01-16",
        value: 71
    }, {
        date: "2013-01-17",
        value: 74
    }, {
        date: "2013-01-18",
        value: 78
    }, {
        date: "2013-01-19",
        value: 85
    }, {
        date: "2013-01-20",
        value: 82
    }, {
        date: "2013-01-21",
        value: 83
    }, {
        date: "2013-01-22",
        value: 88
    }, {
        date: "2013-01-23",
        value: 85
    }, {
        date: "2013-01-24",
        value: 85
    }, {
        date: "2013-01-25",
        value: 80
    }, {
        date: "2013-01-26",
        value: 87
    }, {
        date: "2013-01-27",
        value: 84
    }, {
        date: "2013-01-28",
        value: 83
    }, {
        date: "2013-01-29",
        value: 84
    }, {
        date: "2013-01-30",
        value: 81
    }];
    var t = e.xAxes.push(new am4charts.DateAxis);
    t.renderer.grid.template.location = 0, t.renderer.minGridDistance = 50;
    e.yAxes.push(new am4charts.ValueAxis);
    var a = e.series.push(new am4charts.LineSeries);
    a.dataFields.valueY = "value", a.dataFields.dateX = "date", a.strokeWidth = 3, a.fillOpacity = .5, e.scrollbarY = new am4core.Scrollbar, e.scrollbarY.marginLeft = 0, e.cursor = new am4charts.XYCursor, e.cursor.behavior = "zoomY", e.cursor.lineX.disabled = !0
})

jQuery("#am-polarscatter-chart").length && am4core.ready(function() {
    am4core.useTheme(am4themes_animated);
    var e = am4core.create("am-polarscatter-chart", am4charts.RadarChart);
    e.colors.list = [am4core.color("#089bab"), am4core.color("#fc9f5b"), am4core.color("#e64141")], e.data = [{
        country: "Lithuania",
        litres: 501,
        units: 250
    }, {
        country: "Czech Republic",
        litres: 301,
        units: 222
    }, {
        country: "Ireland",
        litres: 266,
        units: 179
    }, {
        country: "Germany",
        litres: 165,
        units: 298
    }, {
        country: "Australia",
        litres: 139,
        units: 299
    }], e.xAxes.push(new am4charts.ValueAxis).renderer.maxLabelPosition = .99;
    var t = e.yAxes.push(new am4charts.ValueAxis);
    t.renderer.labels.template.verticalCenter = "bottom", t.renderer.labels.template.horizontalCenter = "right", t.renderer.maxLabelPosition = .99, t.renderer.labels.template.paddingBottom = 1, t.renderer.labels.template.paddingRight = 3;
    var a = e.series.push(new am4charts.RadarSeries);
    a.bullets.push(new am4charts.CircleBullet), a.strokeOpacity = 0, a.dataFields.valueX = "x", a.dataFields.valueY = "y", a.name = "Series #1", a.sequencedInterpolation = !0, a.sequencedInterpolationDelay = 10, a.data = [{
        x: 83,
        y: 5.1
    }, {
        x: 44,
        y: 5.8
    }, {
        x: 76,
        y: 9
    }, {
        x: 2,
        y: 1.4
    }, {
        x: 100,
        y: 8.3
    }, {
        x: 96,
        y: 1.7
    }, {
        x: 68,
        y: 3.9
    }, {
        x: 0,
        y: 3
    }, {
        x: 100,
        y: 4.1
    }, {
        x: 16,
        y: 5.5
    }, {
        x: 71,
        y: 6.8
    }, {
        x: 100,
        y: 7.9
    }, {
        x: 35,
        y: 8
    }, {
        x: 44,
        y: 6
    }, {
        x: 64,
        y: .7
    }, {
        x: 53,
        y: 3.3
    }, {
        x: 92,
        y: 4.1
    }, {
        x: 43,
        y: 7.3
    }, {
        x: 15,
        y: 7.5
    }, {
        x: 43,
        y: 4.3
    }, {
        x: 90,
        y: 9.9
    }];
    var n = e.series.push(new am4charts.RadarSeries);
    n.bullets.push(new am4charts.CircleBullet), n.strokeOpacity = 0, n.dataFields.valueX = "x", n.dataFields.valueY = "y", n.name = "Series #2", n.sequencedInterpolation = !0, n.sequencedInterpolationDelay = 10, n.data = [{
        x: 178,
        y: 1.3
    }, {
        x: 129,
        y: 3.4
    }, {
        x: 99,
        y: 2.4
    }, {
        x: 80,
        y: 9.9
    }, {
        x: 118,
        y: 9.4
    }, {
        x: 103,
        y: 8.7
    }, {
        x: 91,
        y: 4.2
    }, {
        x: 151,
        y: 1.2
    }, {
        x: 168,
        y: 5.2
    }, {
        x: 168,
        y: 1.6
    }, {
        x: 152,
        y: 1.2
    }, {
        x: 138,
        y: 7.7
    }, {
        x: 107,
        y: 3.9
    }, {
        x: 124,
        y: .7
    }, {
        x: 130,
        y: 2.6
    }, {
        x: 86,
        y: 9.2
    }, {
        x: 169,
        y: 7.5
    }, {
        x: 122,
        y: 9.9
    }, {
        x: 100,
        y: 3.8
    }, {
        x: 172,
        y: 4.1
    }, {
        x: 140,
        y: 7.3
    }, {
        x: 161,
        y: 2.3
    }, {
        x: 141,
        y: .9
    }];
    var o = e.series.push(new am4charts.RadarSeries);
    o.bullets.push(new am4charts.CircleBullet), o.strokeOpacity = 0, o.dataFields.valueX = "x", o.dataFields.valueY = "y", o.name = "Series #3", o.sequencedInterpolation = !0, o.sequencedInterpolationDelay = 10, o.data = [{
        x: 419,
        y: 4.9
    }, {
        x: 417,
        y: 5.5
    }, {
        x: 434,
        y: .1
    }, {
        x: 344,
        y: 2.5
    }, {
        x: 279,
        y: 7.5
    }, {
        x: 307,
        y: 8.4
    }, {
        x: 279,
        y: 9
    }, {
        x: 220,
        y: 8.4
    }, {
        x: 201,
        y: 9.7
    }, {
        x: 288,
        y: 1.2
    }, {
        x: 333,
        y: 7.4
    }, {
        x: 308,
        y: 1.9
    }, {
        x: 330,
        y: 8
    }, {
        x: 408,
        y: 1.7
    }, {
        x: 274,
        y: .8
    }, {
        x: 296,
        y: 3.1
    }, {
        x: 279,
        y: 4.3
    }, {
        x: 379,
        y: 5.6
    }, {
        x: 175,
        y: 6.8
    }], e.legend = new am4charts.Legend, e.cursor = new am4charts.RadarCursor
})

document.addEventListener("DOMContentLoaded", function() {
    var chartContainer = document.getElementById("am-3dpie-chart");
    if (chartContainer) {
        function setChartSize() {
            if (window.matchMedia("(max-width: 600px)").matches) { 
                chartContainer.style.height = "400px"; 
            } else { 
                chartContainer.style.height = "450px"; 
            }
        }

        setChartSize();
        window.addEventListener('resize', setChartSize);

        am4core.ready(function() {
            am4core.useTheme(am4themes_animated);
            var e = am4core.create("am-3dpie-chart", am4charts.PieChart3D);
            e.hiddenState.properties.opacity = 0;
            e.legend = new am4charts.Legend();
            e.data = [{
                country: "Lithuania",
                litres: 501.9
            }, {
                country: "Germany",
                litres: 165.8
            }, {
                country: "Australia",
                litres: 139.9
            }, {
                country: "Austria",
                litres: 128.3
            }, {
                country: "UK",
                litres: 99
            }, {
                country: "Belgium",
                litres: 60
            }];
            var t = e.series.push(new am4charts.PieSeries3D());
            t.colors.list = [
                am4core.color("#089bab"),
                am4core.color("#fc9f5b"),
                am4core.color("#57de73"),
                am4core.color("#f26361"),
                am4core.color("#ababab"),
                am4core.color("#61e2fc")
            ];
            t.dataFields.value = "litres";
            t.dataFields.category = "country";
        });
    }
});

