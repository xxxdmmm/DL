$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-2-1-1",
    success: function (res) {
        var chartDom = document.getElementById('b1.2-1-1');
        var myChart = echarts.init(chartDom);
        var option;

        var year = res.year;
        var value = res.value;
        option = {
            tooltip: {
                trigger: 'axis',
            },
            legend:{},
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,

                data: year
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: 'hospital beds',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }
                        ])
                    },
                    data: value
                }
            ]
        };

        option && myChart.setOption(option);

    }
});


