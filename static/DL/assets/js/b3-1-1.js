$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b3-1-1",
    success: function (res) {
        var chartDom = document.getElementById('b3-1-1');
        var myChart = echarts.init(chartDom);
// 绘制左侧面
        const CubeLeft = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                // 会canvas的应该都能看得懂，shape是从custom传入的
                const xAxisPoint = shape.xAxisPoint
                const c0 = [shape.x, shape.y]
                const c1 = [shape.x - 13, shape.y - 13]
                const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13]
                const c3 = [xAxisPoint[0], xAxisPoint[1]]
                ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
            }
        })
// 绘制右侧面
        const CubeRight = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c1 = [shape.x, shape.y]
                const c2 = [xAxisPoint[0], xAxisPoint[1]]
                const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
                const c4 = [shape.x + 18, shape.y - 9]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
            }
        })
// 绘制顶面
        const CubeTop = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0,
            },
            buildPath: function (ctx, shape) {
                const c1 = [shape.x, shape.y]
                const c2 = [shape.x + 18, shape.y - 9]
                const c3 = [shape.x + 5, shape.y - 22]
                const c4 = [shape.x - 13, shape.y - 13]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
            }
        })
// 注册三个面图形
        echarts.graphic.registerShape('CubeLeft', CubeLeft)
        echarts.graphic.registerShape('CubeRight', CubeRight)
        echarts.graphic.registerShape('CubeTop', CubeTop)

        var MAX = [];
        var VALUE = res.data;
        for(var i=0;i<VALUE.length;i++){
            MAX.push(VALUE[i]+300);
        }

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params, ticket, callback) {
                    const item = params[1]
                    return item.name + ' : ' + item.value;
                }
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 25,
                top: 15,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: res.class,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'white'
                    }
                },
                offset: 25,
                axisTick: {
                    show: false,
                    length: 9,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#7DFFFD'
                    }
                },
                axisLabel: {
                    show: true,
                    fontSize: 15,
                    rotate:45
                },
            },
            yAxis: {
                min: 0,
                max: 2000,
                interval: 200,
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "rgba(255,255,255,0.1)"
                    },
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize: 16,

                },
                boundaryGap: ['20%', '20%']
            },
            series: [
                {
                    type: 'custom',
                    renderItem: function (params, api) {
                        const location = api.coord([api.value(0), api.value(1)])
                        return {
                            type: 'group',
                            children: [{
                                type: 'CubeLeft',
                                shape: {
                                    api,
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: '#1b83bb80'
                                }
                            }, {
                                type: 'CubeRight',
                                shape: {
                                    api,
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: '#1b83bb60'
                                }
                            }, {
                                type: 'CubeTop',
                                shape: {
                                    api,
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: '#1779b5'
                                }
                            }]
                        }
                    },
                    data: MAX
                }, {
                    type: 'custom',
                    renderItem: (params, api) => {
                        const location = api.coord([api.value(0), api.value(1)])
                        var color = api.value(1) > 10000 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#5cc4eb'
                        },
                            {
                                offset: 0.8,
                                color: '#21658c'
                            }
                        ])
                        return {
                            type: 'group',
                            children: [{
                                type: 'CubeLeft',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: color = api.value(1) > 10000 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#5cc4eb'
                                    },
                                        {
                                            offset: 0.8,
                                            color: '#21658c'
                                        }
                                    ])
                                }
                            }, {
                                type: 'CubeRight',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: color = api.value(1) > 10000 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#048fd4'
                                    },
                                        {
                                            offset: 0.8,
                                            color: '#195684'
                                        }
                                    ])
                                }
                            }, {
                                type: 'CubeTop',
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: color = api.value(1) > 10000 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#65c7ec'
                                    },
                                        {
                                            offset: 1,
                                            color: '#65c7ec'
                                        }
                                    ])
                                }
                            }]
                        }
                    },

                    data: VALUE
                }, {
                    type: 'bar',
                    itemStyle: {
                        color: 'transparent',
                    },
                    tooltip: {},
                    data: MAX
                }]
        };
        myChart.setOption(option);

    }
});







