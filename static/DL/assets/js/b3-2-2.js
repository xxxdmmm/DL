$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b3-2-2",
    success: function (res) {

        var chartDom = document.getElementById('b3-2-2');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: res.legend,
                textStyle: {
                    color: '#fff',
                },
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: res.x,
                    axisLabel: { //坐标轴刻度标签的相关设置
                    color: 'white',
                    fontSize: 15,
                    rotate: 45
                }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: res.legend[0],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.y[0]
                },
                {
                    name: res.legend[1],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.y[1]
                },
                {
                    name: res.legend[2],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.y[2]
                },
                {
                    name: res.legend[3],
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.y[3]
                },
                {
                    name: res.legend[4],
                    type: 'line',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.y[4]
                }
            ]
        };

        option && myChart.setOption(option);


    }
});





