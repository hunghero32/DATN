(function (jQuery) {
  "use strict";

  // Areaa Charts
  if (document.querySelectorAll("#areachart").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary];
    const options = {
      series: [
        {
          name: "series1",
          data: [100, 80, 90, 85, 60, 109, 100, 80, 100, 40, 51, 60, 109, 100],
        },
      ],
      colors: colors,
      chart: {
        height: 125,
        type: "area",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:00:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
          "2018-09-19T11:30:00.000Z",
          "2018-09-19T12:30:00.000Z",
          "2018-09-19T13:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // Hide the Y-axis line and labels
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#areachart"), options);
    chart.render();
  }

  if (document.querySelectorAll("#appointment-line-chart").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary, variableColors.secondary,];
    const options = {
      series: [
        {
          name: "Female",
          data: [7, 4, 9, 4, 7, 3, 8],
        },
        {
          name: "Male",
          data: [3, 5, 3, 7, 4, 6, 9],
        },
      ],
      chart: {
        height: 200,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
        labels: {
                    minHeight:22,
                    maxHeight:22,
                    show: true,
  
                },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          offsetX: -15,
        },
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#appointment-line-chart"),
      options
    );
    chart.render();

    document.addEventListener("theme_color", (e) => {
      const variableColors = IQUtils.getVariableColor();
      const colors = [variableColors.primary, variableColors.info];

      const newOpt = {
        colors: colors,
      };
      chart.updateOptions(newOpt);
    });

    document.addEventListener("body_font_family", (e) => {
      let prefix =
        getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
      if (prefix) {
        prefix = prefix.trim();
      }
      const font_1 = getComputedStyle(document.body).getPropertyValue(
        `--${prefix}body-font-family`
      );
      const fonts = [font_1.trim()];
      const newOpt = {
        chart: {
          fontFamily: fonts,
        },
      };
      chart.updateOptions(newOpt);
    });
  }

  if (document.querySelectorAll("#patient-chart-01").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.secondary];
    const options = {
      series: [
        {
          name: "series1",
          data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
        },
      ],
      colors: colors,
      chart: {
        type: "area",
        height: 100,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:00:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
          "2018-09-19T11:30:00.000Z",
          "2018-09-19T12:30:00.000Z",
          "2018-09-19T13:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // Hide the Y-axis line and labels
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#patient-chart-01"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-chart-02").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary];
    const options = {
      series: [
        {
          name: "series1",
          data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
        },
      ],
      colors: colors,
      chart: {
        type: "area",
        height: 100,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:00:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
          "2018-09-19T11:30:00.000Z",
          "2018-09-19T12:30:00.000Z",
          "2018-09-19T13:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // Hide the Y-axis line and labels
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#patient-chart-02"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-chart-03").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.secondary];
    const options = {
      series: [
        {
          name: "series1",
          data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
        },
      ],
      colors: colors,
      chart: {
        type: "area",
        height: 100,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:00:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
          "2018-09-19T11:30:00.000Z",
          "2018-09-19T12:30:00.000Z",
          "2018-09-19T13:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // Hide the Y-axis line and labels
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#patient-chart-03"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-chart-04").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary];
    const options = {
      series: [
        {
          name: "series1",
          data: [40, 30, 35, 40, 35, 55, 60, 50, 60, 40, 51, 60, 70, 50],
        },
      ],
      colors: colors,
      chart: {
        type: "area",
        height: 100,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        labels: {
          show: false,
        },
        type: "datetime",
        lines: {
          show: false
        },
        grid: {
          show: false,
        },
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:00:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
          "2018-09-19T11:30:00.000Z",
          "2018-09-19T12:30:00.000Z",
          "2018-09-19T13:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // Hide the Y-axis line and labels
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#patient-chart-04"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-activity-status").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary, variableColors.secondary];
    const options = {
      series: [
        {
          name: "Walking",
          data: [5, 5.8, 9, 6, 7, 3, 6],
        },
        {
          name: "Exercise",
          data: [4, 6, 5.8, 5.5, 5.3, 4.3, 4],
        },
      ],
      colors: colors,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            // Custom y-axis label formatting
            if (value === 2) return "00";
            if (value === 4) return "20";
            if (value === 6) return "40";
            if (value === 8) return "60";
            if (value === 10) return "80";
            return value;
          },
          offsetX: -15
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#patient-activity-status"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-overview-line-chart").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary, variableColors.secondary];
    const options = {
      series: [
        {
          name: "Old Patient",
          data: [7, 4, 9, 4, 7, 3, 8],
        },
        {
          name: "New Patient",
          data: [3, 5, 3, 7, 4, 6, 9],
        },
      ],
      colors: colors,
      chart: {
        height: 230,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
      },
      xaxis: {
        categories: ["80", "70", "60", "50", "40", "30", "20", "10"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          offsetX: -15,
        },
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#patient-overview-line-chart"),
      options
    );
    chart.render();

    document.addEventListener("theme_color", (e) => {
      const variableColors = IQUtils.getVariableColor();
      const colors = [variableColors.primary, variableColors.info];
      const newOpt = {
        colors: colors,
      };
      chart.updateOptions(newOpt);
    });

    document.addEventListener("body_font_family", (e) => {
      let prefix =
        getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
      if (prefix) {
        prefix = prefix.trim();
      }
      const font_1 = getComputedStyle(document.body).getPropertyValue(
        `--${prefix}body-font-family`
      );
      const fonts = [font_1.trim()];
      const newOpt = {
        chart: {
          fontFamily: fonts,
        },
      };
      chart.updateOptions(newOpt);
    });
  }

  // Column Charts
  if (document.querySelectorAll('#payment-history').length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary, variableColors.secondary];
    const options = {
      series: [{
        name: 'Online',
        data: [30, 50, 35, 60, 40, 60, 60, 30]
      }, {
        name: 'Offline',
        data: [40, 50, 55, 50, 30, 80, 30, 40]
      }],
      chart: {
        type: 'bar',
        height: 230,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
          borderRadius: 10,
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['80', '70', '60', '50', '40', '30', '20', '10'],
        labels: {
          minHeight: 20,
          maxHeight: 20,
          style: {
            colors: "#8A92A6",
          },
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        }
      },
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
    const chart = new ApexCharts(document.querySelector("#payment-history"), options);
    chart.render();
    //color customizer
    document.addEventListener("theme_color", (e) => {
      const variableColors = IQUtils.getVariableColor();
      const colors = [variableColors.primary, variableColors.info];

      const newOpt = {
        colors: colors,
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: colors, // optional, if not defined - uses the shades of same color in series
            opacityFrom: 1,
            opacityTo: 1,
            colors: colors,
          },
        },
      };
      chart.updateOptions(newOpt);
    });
    //Font customizer
    document.addEventListener("body_font_family", (e) => {
      let prefix =
        getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
      if (prefix) {
        prefix = prefix.trim();
      }
      const font_1 = getComputedStyle(document.body).getPropertyValue(
        `--${prefix}body-font-family`
      );
      const fonts = [font_1.trim()];
      const newOpt = {
        chart: {
          fontFamily: fonts,
        },
      };
      chart.updateOptions(newOpt);
    });
  }

  if (document.querySelectorAll("#patient-weight").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary];
    const weightData = [
      { month: "January", weight: 60, unit: "kg" },
      { month: "February", weight: 65, unit: "kg" },
      { month: "March", weight: 70, unit: "kg" },
      { month: "April", weight: 75, unit: "kg" },
      { month: "May", weight: 70, unit: "kg" },
      { month: "June", weight: 65, unit: "kg" },
      { month: "July", weight: 60, unit: "kg" },
    ];

    const labels = weightData.map(data => data.month);
    const data = weightData.map(data => data.weight);

    const options = {
      series: [{
        name: "Weight",
        data: data,
      }],
      chart: {
        height: 52,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '8%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#patient-weight"), options);
    chart.render();
  }

  if (document.querySelectorAll("#patient-height").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary];
    const weightData = [
      { month: "January", height: 120, unit: "cm" },
      { month: "February", height: 140, unit: "cm" },
      { month: "March", height: 150, unit: "cm" },
      { month: "April", height: 155, unit: "cm" },
      { month: "May", height: 160, unit: "cm" },
      { month: "June", height: 175, unit: "cm" },
      { month: "July", height: 180, unit: "cm" },
    ];

    const labels = weightData.map(data => data.month);
    const data = weightData.map(data => data.height);

    const options = {
      series: [{
        name: "Height",
        data: data,
      }],
      chart: {
        height: 52,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '8%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#patient-height"), options);
    chart.render();
  }

  //Pie charts
  if (document.querySelectorAll("#monthly-progress-donut-chart").length) {
    const variableColors = IQUtils.getVariableColor();
    const colors = [variableColors.primary, variableColors.secondary, variableColors.success, variableColors.danger];
    const options = {
      series: [44, 55, 13, 33],
      labels: ['January', 'February', 'March', 'April'],
      colors: colors,
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    };

    const chart = new ApexCharts(document.querySelector("#monthly-progress-donut-chart"), options);
    chart.render();

    function appendData() {
      var arr = chart.w.globals.series.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      return arr;
    }

    function removeData() {
      var arr = chart.w.globals.series.slice()
      arr.pop()
      return arr;
    }

    function randomize() {
      return chart.w.globals.series.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      })
    }

    function reset() {
      return options.series
    }

    document.querySelector("#randomize").addEventListener("click", function () {
      chart.updateSeries(randomize())
    })

    document.querySelector("#add").addEventListener("click", function () {
      chart.updateSeries(appendData())
    })

    document.querySelector("#remove").addEventListener("click", function () {
      chart.updateSeries(removeData())
    })

    document.querySelector("#reset").addEventListener("click", function () {
      chart.updateSeries(reset())
    })
  }

// Radial Bar Charts
if (document.querySelectorAll("#patient-water-level").length) {
  const variableColors = IQUtils.getVariableColor();
  const colors = [variableColors.primary];
  const options = {
    series: [75],
    chart: {
      type: 'radialBar',
      height: 300,
      offsetY: -20,
      sparkline: {
        enabled: true
      },
    },
    colors: colors,
    plotOptions: {
      radialBar: {
        track: {
          background: colors[0] + '1a',
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          strokeWidth: '97%',
          opacity: 1,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        dataLabels: {
          name: {
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--bs-primary-shade-80)',
            offsetY: 140,
          },
          value: {
            offsetY: -10,
            fontSize: '25px',
            fontWeight: '700',
            color: 'var(--bs-primary-shade-80)',
            formatter: function (val) {
              return val + "%";
            }
          },

        }
      }
    },
    labels: [' '],
  };

  const chart = new ApexCharts(document.querySelector("#patient-water-level"), options);
  chart.render();
}

})(jQuery);