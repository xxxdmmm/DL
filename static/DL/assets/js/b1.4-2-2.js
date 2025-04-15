$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-4-2-2",
    success: function (res) {
        var chartDom = document.getElementById('b1.4-2-2');
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
                max:5000000,
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: '执业医师',
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
                    data: value[0]
                },
                {
                    name: '注册护士',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(13,239,153)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(8,225,207)'
                            }
                        ])
                    },
                    data: value[1]
                },
                 {
                    name: '药师',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(250,94,10)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(236,102,7)'
                            }
                        ])
                    },
                    data: value[2]
                },
                 {
                    name: '检验师',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(152,20,182)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(183,19,201)'
                            }
                        ])
                    },
                    data: value[3]
                },
                {
                    name: '乡村医生和卫生员',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(12,5,248)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(54,8,253)'
                            }
                        ])
                    },
                    data: value[4]
                }
            ]
        };

        option && myChart.setOption(option);

    }
});


