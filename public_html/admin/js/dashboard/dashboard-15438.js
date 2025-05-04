jQuery("#home-servey-chart").length && am4core.ready(function () {
    var options = {
        series: [{
            name: 'Cash Flow',
            data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
                5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
                48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
            ]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: -100,
                        to: -46,
                        color: '#e64141'
                    }, {
                        from: -45,
                        to: 0,
                        color: '#089bab'
                    }, {
                        from: 0,
                        to: 20,
                        color: '#FC9F5B'
                    }]
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            title: {
                text: 'Growth',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0) + "%";
                }
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
                '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
                '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
                '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
                '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
                '2013-07-01', '2013-08-01', '2013-09-01'
            ],
            labels: {
                rotate: -90
            }
        }
    };

    options.chart.rtl = true;

    var chart = new ApexCharts(document.querySelector("#home-servey-chart"), options);
    chart.render();
});

/*---------------------------------------------------------------------
      Swiper Slider
      -----------------------------------------------------------------------*/
function initializeSwipers() {
    jQuery('.ele-widget-swiper.swiper').each(function () {
        let slider = jQuery(this);
        let navTarget = slider.data('navtarget');
        let navNext = (slider.data('navnext')) ? "#" + slider.data('navnext') : "";
        let navPrev = (slider.data('navprev')) ? "#" + slider.data('navprev') : "";
        let pagination = (slider.data('pagination')) ? "#" + slider.data('pagination') : "";
        let sliderAutoplay = slider.data('autoplay') ? { delay: slider.data('autoplay') } : false;
        let iqonicPagination = {
            el: pagination,
            clickable: true,
            dynamicBullets: true,
        };

        let sw_config = {
            loop: slider.data('loop'),
            speed: slider.data('speed'),
            spaceBetween: slider.data('spacebtslide'),
            slidesPerView: slider.data('slide'),
            centeredSlides: slider.data('center'),
            mousewheel: slider.data('mousewheel'),
            autoplay: sliderAutoplay,
            effect: slider.data('effect'),
            navigation: {
                nextEl: navTarget + ' .swiper-button-next',
                prevEl: navTarget + ' .swiper-button-prev'
            },
            pagination: (slider.data('pagination')) ? iqonicPagination : "",
            // direction: swiper.changeLanguageDirection(getDirection()),
            breakpoints: {
                // when window width is >= 0px
                0: {
                    slidesPerView: slider.data('mobile-sm'),
                    spaceBetween: slider.data('spacemobile'),
                },
                576: {
                    slidesPerView: slider.data('mobile'),
                    spaceBetween: slider.data('spacemobile'),
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: slider.data('tab'),
                    spaceBetween: slider.data('spacetablet'),
                },
                // when window width is >= 1025px
                1025: {
                    slidesPerView: slider.data('laptop'),
                    spaceBetween: slider.data('spacelaptop'),
                },
                // when window width is >= 1500px
                1500: {
                    slidesPerView: slider.data('slide'),
                    spaceBetween: slider.data('spacebtslide'),
                },
            }
        };

        let swiper = new Swiper(slider[0], sw_config);
        // function getDirection() {
        //     let direction = document.getElementsByClassName('theme-fs-sm');
        //     direction = direction[0].dir

        //     return direction;
        // }
        jQuery(document).trigger('after_slider_init', { sliderId: slider.attr('id'), swiper: swiper });
    });
}

initializeSwipers();

// Custom Navigation
jQuery(document).on('after_slider_init', function (event, data) {
    let slider = jQuery('#' + data.sliderId);
    if (slider.length === 0) return;

    let navTarget = slider.data('navtarget');
    let navigation = jQuery(navTarget).find('.swiper-buttons');
    const Slider = document.querySelector(navTarget);

    if (Slider && Slider.swiper && navigation.length > 0) {
        const sliderParam = Slider.swiper.passedParams;
        sliderParam.navigation.nextEl = navigation[0].querySelector('.swiper-button-next');
        sliderParam.navigation.prevEl = navigation[0].querySelector('.swiper-button-prev');
        Slider.swiper.destroy(true, true);
        new Swiper(navTarget, sliderParam);
    }
});



if (jQuery('#apex-radialbar-chart').length) {
    var options = {
        chart: {
            height: 290,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return 249
                        }
                    }
                }
            }
        },
        series: [44, 55, 67, 83],
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
        colors: ['#089bab', '#FC9F5B', '#75DDDD', '#ffb57e'],

    }

    var chart = new ApexCharts(
        document.querySelector("#apex-radialbar-chart"),
        options
    );

    chart.render();
}

var lastDate = 0;
var data = [];
var TICKINTERVAL = 86400000;
let XAXISRANGE = 777600000;

function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        data.push({
            x,
            y
        });
        lastDate = baseval;
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
    min: 10,
    max: 90
});

function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate;
    for (var i = 0; i < data.length - 10; i++) {
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
        data[i].y = 0;
    }
    data.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })

}

function resetData() {
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    data = data.slice(data.length - 10, data.length);
}


var options = {
    chart: {
        height: 150,
        type: 'area',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        sparkline: {
            enabled: true
        },
        group: 'sparklines',
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: 3
    },
    series: [{
        data: data
    }],
    markers: {
        size: 4
    },
    xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
    },
    yaxis: {
        max: 100
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    legend: {
        show: false
    },
};
options.colors = ['#089bab'];

if (jQuery('#wave-chart-7').length) {
    options.markers.size = 0;
    options.chart.type = 'area';
    options.stroke.curve = "smooth";
    options.chart.height = '100%';
    var wave_chart_7 = new ApexCharts(
        document.querySelector("#wave-chart-7"),
        options
    );
    wave_chart_7.render();
}
if (jQuery('#chart-7').length) {
    var chart_7 = new ApexCharts(
        document.querySelector("#chart-7"),
        options
    );
    chart_7.render();
}


options.colors = ['#FC9F5B'];
if (jQuery('#wave-chart-8').length) {
    options.markers.size = 0;
    options.chart.height = '100%';
    options.stroke.curve = "smooth";
    options.chart.type = 'area';
    var wave_chart_8 = new ApexCharts(
        document.querySelector("#wave-chart-8"),
        options
    );
    wave_chart_8.render();
}
if (jQuery('#chart-8').length) {
    var chart_8 = new ApexCharts(
        document.querySelector("#chart-8"),
        options
    );
    chart_8.render();
}
options.colors = ['#00d0ff'];
if (jQuery('#wave-chart-9').length) {
    options.markers.size = 0;
    options.chart.height = 70;
    options.stroke.curve = "smooth";
    options.chart.type = 'area';
    var wave_chart_9 = new ApexCharts(
        document.querySelector("#wave-chart-9"),
        options
    );
    wave_chart_9.render();
}
if (jQuery('#chart-9').length) {
    var chart_9 = new ApexCharts(
        document.querySelector("#chart-9"),
        options
    );
    chart_9.render();
}
options.colors = ['#e64141'];
if (jQuery('#wave-chart-10').length) {
    options.markers.size = 0;
    options.chart.height = 70;
    options.stroke.curve = "smooth";
    options.chart.type = 'area';
    var wave_chart_10 = new ApexCharts(
        document.querySelector("#wave-chart-10"),
        options
    );
    wave_chart_10.render();
}
if (jQuery('#chart-10').length) {
    var chart_10 = new ApexCharts(
        document.querySelector("#chart-10"),
        options
    );
    chart_10.render();
}
if (jQuery('#wave-chart-7').length || jQuery('#wave-chart-8')?.length || jQuery('#wave-chart-9')?.length || jQuery('#wave-chart-10')?.length) {
    window.setInterval(function () {
        getNewSeries(lastDate, {
            min: 10,
            max: 90
        });
        const seriesData = [{
            name: 'Series',  // Replace with the actual name for each chart
            data: data
        }];
        if (jQuery('#wave-chart-7').length) {
            wave_chart_7?.updateSeries(seriesData);
        }
        if (jQuery('#wave-chart-8').length) {
            wave_chart_8?.updateSeries(seriesData)
        }
        if (jQuery('#wave-chart-9').length) {
            wave_chart_9?.updateSeries([{
                data: data
            }])
        }
        if (jQuery('#wave-chart-10').length) {
            wave_chart_10?.updateSeries([{
                data: data
            }])
        }
    }, 1000);
}