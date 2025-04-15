$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b2-1-1",
    success: function (res) {

        var chartDom = document.getElementById('b2-1-1');
        var myChart = echarts.init(chartDom);
        var aqsgsw = [{
                value: 138,
                ratio: 184
            },
                {
                    value: 114,
                    ratio: 29
                },
                {
                    value: 114,
                    ratio: 179
                },
                {
                    value: 114,
                    ratio: 79
                },
                {
                    value: 114,
                    ratio: 79
                }
            ],

            option = {
                grid: {
                    top: '10%',
                    left: '5%',
                    bottom: '10%',
                    right: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                xAxis: [{
                    type: 'category',
                    show: false,
                    data: res.country,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 15,
                        textStyle: {
                            color: '#fff',
                        }

                    }
                },
                    {
                        type: 'category',
                        position: "bottom",
                        data: res.country,
                        boundaryGap: true,
                        // offset: 40,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            rotate: 45,
                            fontSize: 15,
                            textStyle: {
                                color: '#fff',

                            }
                        }
                    }

                ],
                yAxis: [{
                    show: true,
                    type: 'value',
                    name: "%",
                    nameTextStyle: {
                        color: "#fff",
                        fontSize: 11,
                    },
                    //offset: 52,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#fff'
                    }
                },
                    {
                        type: 'value',
                        name: "%",
                        min: 0,
                        position: 'right',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 11,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0a3e98'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0a3e98',
                                type: "dotted",
                            }
                        },
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: "#fff",
                            }
                        },
                    }
                ],
                color: ['#e54035'],
                series: [{
                    name: '死亡率%',
                    type: 'bar',
                    yAxisIndex: 1,
                    barWidth: 15,
                    // barCategoryGap: '%',
                    barGap: '2%', //柱子之间间距
                    symbolOffset: [0, -6],
                    // barCategoryGap: '-5%',
                    symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(254,215,46,1)",
                            },
                                {
                                    offset: 1,
                                    color: "rgba(254,215,46,0)",
                                },
                            ]),
                            barBorderRadius: [30, 30, 0, 0] //圆角大小
                        },
                    },
                    data: res.rate,
                },
                    {
                        name: '死亡率%',
                        type: 'line',
                        xAxisIndex: 1,
                        barCategoryGap: '50%',
                        barGap: '20%', //柱子之间间距
                        symbolOffset: [0, -6],
                        // barCategoryGap: '-5%',
                        symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
                        itemStyle: {
                            normal: {
                                color: '#7BE09A'
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data: res.rate,
                    }
                ]
            }
        myChart.setOption(option);
    }
});







