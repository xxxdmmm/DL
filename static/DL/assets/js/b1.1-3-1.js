$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-1-3-1",
    success: function (res) {
        var chartDom = document.getElementById('b1.1-3-1');
        var myChart = echarts.init(chartDom);
        var option;
        var year = res.year;
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
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    axisLabel: {
                        color: 'white' // 设置 x 轴文字颜色为白色
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: year
                }
            ],
            yAxis: [
                {
                    axisLabel: {
                        color: 'white' // 设置 x 轴文字颜色为白色
                    },
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '疾病预防控制中心',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.row1
                },
                {
                    name: '妇幼保健院',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.row2
                },
                {
                    name: '急救中心',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.row3
                },
                {
                    name: '采供血机构',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: res.row4
                },
                {
                    name: '计划生育技术服务机构',
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
                    data: res.row5
                }
            ]
        };
        myChart.setOption(option);

    }
});



