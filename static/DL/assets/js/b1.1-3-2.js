$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-1-3-2",
    success: function (res) {
        var chartDom = document.getElementById('b1.1-3-2');
        var myChart = echarts.init(chartDom);
        var option;
        var year = res.year;
        var value = res.value;
        console.log(res);
        console.log(value);
        option = {
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                bottom: 90
            },
            dataZoom: [
                {
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            xAxis: {
                data: year,
                silent: false,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            },
            yAxis: {
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    type: 'bar',
                    data: value,
                    // Set `large` for large data amount
                    large: true
                }
            ]
        };
        myChart.setOption(option);
    }
});


