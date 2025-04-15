$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-4-3-2",
    success: function (res) {

        var chartDom = document.getElementById('b1.4-3-2');
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
                    axisLabel: {
                        fontSize: 12, // 设置文字大小
                        rotate: 45,   // 设置文字倾斜角度
                        color: 'white'
                    },
                    data: res[0]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                     axisLabel: {
                        color: 'white'
                    },
                }
            ],
            series: [
                {
                    name: '城市',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res[1]
                },
                {
                    name: '农村',
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
                    data:res[2]
                }
            ]
        };

        option && myChart.setOption(option);

    }
});
















