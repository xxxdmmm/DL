
$.ajax({
    url: "/getdata/b1-5-2-1",
    type: "get",
    dataType: "JSON",
    success: function (res) {
        var chartDom = document.getElementById('b1.5-2-1');
        var myChart = echarts.init(chartDom);
        var option;
        var data1 = res.pub;
        var data2 = res.pri;
        // console.log(data1);
        // 从 data1 和 data2 中提取日期和数值
        var dateList1 = data1.map(function (item) {
            return item[0];
        });
        var valueList1 = data1.map(function (item) {
            return item[1];
        });
        var dateList2 = data2.map(function (item) {
            return item[0];
        });
        var valueList2 = data2.map(function (item) {
            return item[1];
        });
        option = {
            // Make gradient line here
            visualMap: [
                {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 400
                },

                {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    dimension: 0,
                    min: 0,
                    max: dateList1.length - 1
                }
            ],
            title: [
                {
                    left: 'center',
                    text: '城镇居民人均年消费支出(元)',
                    textStyle: {
                        color: 'white' // 设置标题文字颜色为白色
                    }
                },
                {
                    top: '55%',
                    left: 'center',
                    text: '农村居民人均年消费支出(元)',
                    textStyle: {
                        color: 'white' // 设置标题文字颜色为白色
                    }
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    axisLabel: {
                        fontSize: 30,// 设置 x 轴文字大小为 12px
                        color: 'white' // 设置 x 轴文字颜色为白色
                    },
                    data: dateList1
                },//
                {
                    data: dateList2,
                    gridIndex: 1,
                    axisLabel: {
                        fontSize: 30,// 设置 x 轴文字大小为 12px
                        color: 'white' // 设置 x 轴文字颜色为白色
                    },
                }
            ],
            yAxis: [
                {
                    axisLabel: {
                        color: 'white' // 设置 x 轴文字颜色为白色
                    }
                },
                {
                    gridIndex: 1,
                    axisLabel: {
                        color: 'white' // 设置 x 轴文字颜色为白色
                    }
                }
            ],
            grid: [
                {
                    bottom: '60%'
                },
                {
                    top: '60%'
                }
            ],
            series: [
                {
                    type: 'line',
                    // showSymbol: false,
                    data: valueList1
                },
                {
                    type: 'line',
                    // showSymbol: false,
                    data: valueList2,
                    xAxisIndex: 1,
                    yAxisIndex: 1
                }
            ]
        };
        myChart.setOption(option);
    }
});



