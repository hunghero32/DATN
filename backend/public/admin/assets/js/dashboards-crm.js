document.addEventListener("DOMContentLoaded", function(o) {
    let e, r, t, a, s, i, n, l, d, p, c;
    p = (d = isDarkStyle ? (s = "dark", n = "#333457", l = "#3c3e75", "#484b9b") : (s = "", n = "#ededff", l = "#d5d6ff", "#b7b9ff"), "#696cff"), e = config.colors.cardColor, r = config.colors.headingColor, t = config.colors.textMuted, a = config.colors.bodyColor, i = config.colors.borderColor, c = config.fontFamily;
    const h = {
        series1: "#66C732",
        series2: "#8DE45F",
        series3: "#AAEB87",
        series4: "#E3F8D7"
    };
    var y = document.querySelectorAll(".chart-progress"),
        y = (y && y.forEach(function(o) {
            var e = config.colors[o.dataset.color],
                r = o.dataset.series,
                e = {
                    chart: {
                        height: 55,
                        width: 45,
                        type: "radialBar"
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: "25%"
                            },
                            dataLabels: {
                                show: !1
                            },
                            track: {
                                background: config.colors_label.secondary
                            }
                        }
                    },
                    stroke: {
                        lineCap: "round"
                    },
                    colors: [e],
                    grid: {
                        padding: {
                            top: -15,
                            bottom: -15,
                            left: -5,
                            right: -15
                        }
                    },
                    series: [r],
                    labels: ["Progress"]
                };
            new ApexCharts(o, e).render()
        }), document.querySelector("#customerRatingsChart")),
        g = {
            chart: {
                height: 212,
                toolbar: {
                    show: !1
                },
                zoom: {
                    enabled: !1
                },
                type: "line",
                dropShadow: {
                    enabled: !0,
                    enabledOnSeries: [1],
                    top: 13,
                    left: 4,
                    blur: 3,
                    color: config.colors.primary,
                    opacity: .09
                }
            },
            series: [{
                name: "Last Month",
                data: [20, 54, 20, 38, 22, 28, 16, 19, 11]
            }, {
                name: "This Month",
                data: [20, 32, 22, 65, 40, 46, 34, 70, 75]
            }],
            stroke: {
                curve: "smooth",
                dashArray: [8, 0],
                width: [3, 4]
            },
            legend: {
                show: !1
            },
            colors: [i, config.colors.primary],
            grid: {
                show: !1,
                borderColor: i,
                padding: {
                    top: -20,
                    bottom: -10,
                    left: 0
                }
            },
            markers: {
                size: 6,
                colors: "transparent",
                strokeColors: "transparent",
                strokeWidth: 5,
                hover: {
                    size: 6
                },
                discrete: [{
                    fillColor: config.colors.white,
                    seriesIndex: 1,
                    dataPointIndex: 8,
                    strokeColor: config.colors.primary,
                    size: 6
                }, {
                    fillColor: config.colors.white,
                    seriesIndex: 1,
                    dataPointIndex: 3,
                    strokeColor: config.colors.black,
                    size: 6
                }],
                offsetX: -3
            },
            xaxis: {
                labels: {
                    style: {
                        colors: t,
                        fontSize: "13px"
                    }
                },
                axisTicks: {
                    show: !1
                },
                categories: [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", " "],
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                show: !1
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#salesActivityChart")),
        g = {
            chart: {
                type: "bar",
                height: 235,
                stacked: !0,
                toolbar: {
                    show: !1
                }
            },
            series: [{
                name: "PRODUCT A",
                data: [75, 50, 55, 60, 48, 82, 59]
            }, {
                name: "PRODUCT B",
                data: [25, 29, 32, 35, 34, 18, 30]
            }],
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "40%",
                    borderRadius: 9,
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadiusApplication: "around"
                }
            },
            dataLabels: {
                enabled: !1
            },
            stroke: {
                curve: "smooth",
                width: 6,
                lineCap: "round",
                colors: [e]
            },
            legend: {
                show: !1
            },
            colors: [config.colors.danger, config.colors.secondary],
            fill: {
                opacity: 1
            },
            grid: {
                show: !1,
                strokeDashArray: 7,
                padding: {
                    top: -40,
                    left: 0,
                    right: 0
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                labels: {
                    show: !0,
                    style: {
                        colors: t,
                        fontSize: "15px",
                        fontFamily: c
                    }
                },
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                }
            },
            yaxis: {
                show: !1
            },
            responsive: [{
                breakpoint: 1440,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "50%"
                        }
                    }
                }
            }, {
                breakpoint: 1300,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 11,
                            columnWidth: "55%"
                        }
                    }
                }
            }, {
                breakpoint: 1200,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "45%"
                        }
                    }
                }
            }, {
                breakpoint: 1040,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "50%"
                        }
                    }
                }
            }, {
                breakpoint: 992,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 12,
                            columnWidth: "40%"
                        }
                    },
                    chart: {
                        type: "bar",
                        height: 320
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 11,
                            columnWidth: "25%"
                        }
                    }
                }
            }, {
                breakpoint: 576,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "35%"
                        }
                    }
                }
            }, {
                breakpoint: 440,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "45%"
                        }
                    }
                }
            }, {
                breakpoint: 360,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 8,
                            columnWidth: "50%"
                        }
                    }
                }
            }],
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#sessionsChart")),
        g = {
            chart: {
                height: 104,
                type: "area",
                toolbar: {
                    show: !1
                },
                sparkline: {
                    enabled: !0
                }
            },
            markers: {
                size: 6,
                colors: "transparent",
                strokeColors: "transparent",
                strokeWidth: 4,
                discrete: [{
                    fillColor: e,
                    seriesIndex: 0,
                    dataPointIndex: 8,
                    strokeColor: config.colors.warning,
                    strokeWidth: 2,
                    size: 5,
                    radius: 8
                }],
                hover: {
                    size: 7
                }
            },
            grid: {
                show: !1,
                padding: {
                    right: 8
                }
            },
            colors: [config.colors.warning],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: .4,
                    gradientToColors: [config.colors.cardColor],
                    opacityTo: .4,
                    stops: [0, 85, 100]
                }
            },
            dataLabels: {
                enabled: !1
            },
            stroke: {
                width: 2,
                curve: "straight"
            },
            series: [{
                data: [340, 340, 300, 300, 240, 240, 320, 320, 370]
            }],
            xaxis: {
                show: !1,
                lines: {
                    show: !1
                },
                labels: {
                    show: !1
                },
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                show: !1
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#leadsReportChart")),
        g = {
            chart: {
                height: 157,
                width: 135,
                parentHeightOffset: 0,
                type: "donut"
            },
            labels: ["Electronic", "Sports", "Decor", "Fashion"],
            series: [20, 30, 20, 30],
            colors: [h.series1, h.series4, h.series3, h.series2],
            stroke: {
                width: 0
            },
            dataLabels: {
                enabled: !1,
                formatter: function(o, e) {
                    return parseInt(o) + "%"
                }
            },
            legend: {
                show: !1
            },
            tooltip: {
                theme: !1
            },
            grid: {
                padding: {
                    top: 5,
                    bottom: 5
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "75%",
                        labels: {
                            show: !0,
                            value: {
                                fontSize: "1.5rem",
                                fontFamily: c,
                                color: r,
                                fontWeight: 500,
                                offsetY: -15,
                                formatter: function(o) {
                                    return parseInt(o) + "%"
                                }
                            },
                            name: {
                                offsetY: 20,
                                fontFamily: c
                            },
                            total: {
                                show: !0,
                                fontSize: "15px",
                                fontFamily: c,
                                label: "Average",
                                color: a,
                                formatter: function(o) {
                                    return "25%"
                                }
                            }
                        }
                    }
                }
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#reportBarChart")),
        g = {
            chart: {
                height: 150,
                type: "bar",
                toolbar: {
                    show: !1
                }
            },
            plotOptions: {
                bar: {
                    barHeight: "60%",
                    columnWidth: "50%",
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadius: 4,
                    distributed: !0
                }
            },
            grid: {
                show: !1,
                padding: {
                    top: -20,
                    bottom: 0,
                    left: -10,
                    right: -10
                }
            },
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            },
            colors: [config.colors_label.primary, config.colors_label.primary, config.colors_label.primary, config.colors_label.primary, config.colors.primary, config.colors_label.primary, config.colors_label.primary],
            dataLabels: {
                enabled: !1
            },
            series: [{
                data: [40, 95, 60, 45, 90, 50, 75]
            }],
            legend: {
                show: !1
            },
            xaxis: {
                categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                labels: {
                    style: {
                        colors: t,
                        fontSize: "13px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: !1
                }
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#salesAnalyticsChart")),
        g = {
            chart: {
                height: 350,
                type: "heatmap",
                parentHeightOffset: 0,
                offsetX: -10,
                toolbar: {
                    show: !1
                }
            },
            series: [{
                name: "1k",
                data: [{
                    x: "Jan",
                    y: "250"
                }, {
                    x: "Feb",
                    y: "350"
                }, {
                    x: "Mar",
                    y: "220"
                }, {
                    x: "Apr",
                    y: "290"
                }, {
                    x: "May",
                    y: "650"
                }, {
                    x: "Jun",
                    y: "260"
                }, {
                    x: "Jul",
                    y: "274"
                }, {
                    x: "Aug",
                    y: "850"
                }]
            }, {
                name: "2k",
                data: [{
                    x: "Jan",
                    y: "750"
                }, {
                    x: "Feb",
                    y: "3350"
                }, {
                    x: "Mar",
                    y: "1220"
                }, {
                    x: "Apr",
                    y: "1290"
                }, {
                    x: "May",
                    y: "1650"
                }, {
                    x: "Jun",
                    y: "1260"
                }, {
                    x: "Jul",
                    y: "1274"
                }, {
                    x: "Aug",
                    y: "850"
                }]
            }, {
                name: "3k",
                data: [{
                    x: "Jan",
                    y: "375"
                }, {
                    x: "Feb",
                    y: "1350"
                }, {
                    x: "Mar",
                    y: "3220"
                }, {
                    x: "Apr",
                    y: "2290"
                }, {
                    x: "May",
                    y: "2650"
                }, {
                    x: "Jun",
                    y: "2260"
                }, {
                    x: "Jul",
                    y: "1274"
                }, {
                    x: "Aug",
                    y: "815"
                }]
            }, {
                name: "4k",
                data: [{
                    x: "Jan",
                    y: "575"
                }, {
                    x: "Feb",
                    y: "1350"
                }, {
                    x: "Mar",
                    y: "2220"
                }, {
                    x: "Apr",
                    y: "3290"
                }, {
                    x: "May",
                    y: "3650"
                }, {
                    x: "Jun",
                    y: "2260"
                }, {
                    x: "Jul",
                    y: "1274"
                }, {
                    x: "Aug",
                    y: "315"
                }]
            }, {
                name: "5k",
                data: [{
                    x: "Jan",
                    y: "875"
                }, {
                    x: "Feb",
                    y: "1350"
                }, {
                    x: "Mar",
                    y: "2220"
                }, {
                    x: "Apr",
                    y: "3290"
                }, {
                    x: "May",
                    y: "3650"
                }, {
                    x: "Jun",
                    y: "2260"
                }, {
                    x: "Jul",
                    y: "1274"
                }, {
                    x: "Aug",
                    y: "965"
                }]
            }, {
                name: "6k",
                data: [{
                    x: "Jan",
                    y: "575"
                }, {
                    x: "Feb",
                    y: "1350"
                }, {
                    x: "Mar",
                    y: "2220"
                }, {
                    x: "Apr",
                    y: "2290"
                }, {
                    x: "May",
                    y: "2650"
                }, {
                    x: "Jun",
                    y: "3260"
                }, {
                    x: "Jul",
                    y: "1274"
                }, {
                    x: "Aug",
                    y: "815"
                }]
            }, {
                name: "7k",
                data: [{
                    x: "Jan",
                    y: "575"
                }, {
                    x: "Feb",
                    y: "1350"
                }, {
                    x: "Mar",
                    y: "1220"
                }, {
                    x: "Apr",
                    y: "1290"
                }, {
                    x: "May",
                    y: "1650"
                }, {
                    x: "Jun",
                    y: "1260"
                }, {
                    x: "Jul",
                    y: "3274"
                }, {
                    x: "Aug",
                    y: "815"
                }]
            }, {
                name: "8k",
                data: [{
                    x: "Jan",
                    y: "575"
                }, {
                    x: "Feb",
                    y: "350"
                }, {
                    x: "Mar",
                    y: "220"
                }, {
                    x: "Apr",
                    y: "290"
                }, {
                    x: "May",
                    y: "650"
                }, {
                    x: "Jun",
                    y: "260"
                }, {
                    x: "Jul",
                    y: "274"
                }, {
                    x: "Aug",
                    y: "815"
                }]
            }],
            plotOptions: {
                heatmap: {
                    enableShades: !1,
                    radius: "6px",
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 1e3,
                            name: "1k",
                            color: n
                        }, {
                            from: 1001,
                            to: 2e3,
                            name: "2k",
                            color: l
                        }, {
                            from: 2001,
                            to: 3e3,
                            name: "3k",
                            color: d
                        }, {
                            from: 3001,
                            to: 4e3,
                            name: "4k",
                            color: p
                        }]
                    }
                }
            },
            dataLabels: {
                enabled: !1
            },
            stroke: {
                width: 4,
                colors: [e]
            },
            legend: {
                show: !1
            },
            grid: {
                show: !1,
                padding: {
                    top: -10,
                    left: 16,
                    right: -15,
                    bottom: 0
                }
            },
            xaxis: {
                labels: {
                    show: !0,
                    style: {
                        colors: t,
                        fontSize: "15px",
                        fontFamily: c
                    }
                },
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: t,
                        fontSize: "15px",
                        fontFamily: c
                    }
                }
            },
            responsive: [{
                breakpoint: 1441,
                options: {
                    chart: {
                        height: "325px"
                    },
                    grid: {
                        padding: {
                            right: -15
                        }
                    }
                }
            }, {
                breakpoint: 1045,
                options: {
                    chart: {
                        height: "300px"
                    },
                    grid: {
                        padding: {
                            right: -50
                        }
                    }
                }
            }, {
                breakpoint: 992,
                options: {
                    chart: {
                        height: "320px"
                    },
                    grid: {
                        padding: {
                            right: -50
                        }
                    }
                }
            }, {
                breakpoint: 767,
                options: {
                    chart: {
                        height: "400px"
                    },
                    grid: {
                        padding: {
                            right: 0
                        }
                    }
                }
            }, {
                breakpoint: 568,
                options: {
                    chart: {
                        height: "330px"
                    },
                    grid: {
                        padding: {
                            right: -20
                        }
                    }
                }
            }],
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            }
        },
        y = (null !== y && new ApexCharts(y, g).render(), document.querySelector("#salesStats")),
        g = {
            chart: {
                height: 315,
                type: "radialBar"
            },
            series: [75],
            labels: ["Sales"],
            plotOptions: {
                radialBar: {
                    startAngle: 0,
                    endAngle: 360,
                    strokeWidth: "70",
                    hollow: {
                        margin: 50,
                        size: "75%",
                        image: assetsPath + "img/icons/misc/arrow-star.png",
                        imageWidth: 65,
                        imageHeight: 55,
                        imageOffsetY: -35,
                        imageClipped: !1
                    },
                    track: {
                        strokeWidth: "50%",
                        background: i
                    },
                    dataLabels: {
                        show: !0,
                        name: {
                            offsetY: 60,
                            show: !0,
                            color: a,
                            fontSize: "15px",
                            fontFamily: c
                        },
                        value: {
                            formatter: function(o) {
                                return parseInt(o) + "%"
                            },
                            offsetY: 20,
                            color: r,
                            fontSize: "28px",
                            fontWeight: "500",
                            fontFamily: c,
                            show: !0
                        }
                    }
                }
            },
            fill: {
                type: "solid",
                colors: config.colors.success
            },
            stroke: {
                lineCap: "round"
            },
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            }
        };
    null !== y && new ApexCharts(y, g).render()
});