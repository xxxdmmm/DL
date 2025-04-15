$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-3-1-3",
    success: function (res) {
        var chartDom = document.getElementById('b1.3-1-3');
        var myChart = echarts.init(chartDom);
        var option;

        const colors = ['rgba(248,130,143,0.8)', 'rgba(140,236,250,0.8)', 'rgba(253,213,160,0.8)'];
        option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '30%'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {},
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        fontSize: 12, // 设置文字大小
                        rotate: 45,   // 设置文字倾斜角度
                        color: 'white'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    // prettier-ignore
                    data: res.type,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '入院人次数',
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        show: false, // 隐藏 y 轴文字
                        formatter: '{value} 人次'
                    }
                },
                {
                    type: 'value',
                    name: '出院人次数',
                    position: 'right',
                    alignTicks: true,
                    offset: 80,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 人次'
                    }
                },
                {
                    type: 'value',
                    name: '病死率',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: "入院人次数",
                    type: 'bar',
                    data: res.in_number
                },
                {
                    name: "出院人次数",
                    type: 'bar',
                    yAxisIndex: 1,
                    data: res.out_number
                },
                {
                    name: "病死率",
                    type: 'line',
                    yAxisIndex: 2,
                    data: res.die_rate
                }
            ]
        };

        option && myChart.setOption(option);


    }
});



