$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-3-2-1",
    success: function (res) {
        var chartDom = document.getElementById('b1.3-2-1');
        var myChart = echarts.init(chartDom);
        var option;
        var builderJson = res;
        var downloadJson = res.block;
        var themeJson = res.city;

        var colors1 = [
            'rgba(211,136,136,0.8)',
            'rgba(189,252,189,0.8)',
            'rgba(178,178,245,0.8)',
            'rgba(248,248,169,0.8)',
            'rgba(169,243,243,0.8)',
            'rgba(246,162,222,0.8)',
            'rgba(243,195,169,0.8)',
        ];

        var colors2 = [
            'rgba(238,134,134,0.7)',
            'rgba(245,252,124,0.7)',
            'rgba(132,132,248,0.7)',
        ];

        option = {
            tooltip: {},
            grid: [{
                top: 0,
                width: '55%',
                bottom: '63%',
                left: 10,
                containLabel: true
            }, {
                top: '40%',
                width: '55%',
                bottom: 10,
                left: 10,
                containLabel: true
            }],
            xAxis: [{
                type: 'value',
                max: builderJson.all,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false, //隐藏x轴
                },
                axisLabel: {
                    show: false, //隐藏刻度值
                },
            }, {
                type: 'value',
                axisLine: {
                    show: false, //隐藏y轴
                },
                axisLabel: {
                    show: false, //隐藏刻度值
                },
                max: builderJson.all,
                gridIndex: 1,
                splitLine: {
                    show: false
                }
            }],
            yAxis: [{
                type: 'category',
                data: Object.keys(builderJson.block),
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                    textStyle: {color: "#fff", margin: 15}
                },
                splitLine: {
                    show: false
                }
            }, {
                gridIndex: 1,
                type: 'category',
                data: Object.keys(builderJson.city),
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                    textStyle: {color: "#fff", margin: 15}
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                type: 'bar',
                stack: 'chart',
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(161,246,255,0.8)'
                    }
                },
                data: Object.keys(builderJson.block).map(function (key) {
                    return builderJson.block[key];
                })
            }, {
                type: 'bar',
                stack: 'component',
                xAxisIndex: 1,
                yAxisIndex: 1,
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(248,228,151,0.8)'
                    }
                },
                data: Object.keys(builderJson.city).map(function (key) {
                    return builderJson.city[key];
                })
            }, {
                type: 'bar',
                stack: 'component',
                silent: true,
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)'
                    }
                },

                data: Object.keys(builderJson.city).map(function (key) {
                    return builderJson.all - builderJson.city[key];
                })
            }, {
                type: 'pie',
                radius: [0, '40%'],
                center: ['75%', '20%'],
                label: {
                    formatter: "{b}",
                    textStyle: {
                        fontSize: '15px',
                        color: "white"
                    }
                },
                itemStyle: {
                    color: function (params) {
                        return colors2[params.dataIndex % colors2.length]; // 使用颜色数组中的颜色
                    }
                },
                data: Object.keys(downloadJson).map(function (key) {
                    return {
                        name: key.replace('.js', ''),
                        value: downloadJson[key]
                    }
                })
            }, {
                type: 'pie',
                radius: [0, '40%'],
                center: ['75%', '70%'],
                label: {
                    formatter: "{b}",
                    textStyle: {
                        fontSize: '15px',
                        color: "white"
                    }
                },
                itemStyle: {
                    color: function (params) {
                        return colors1[params.dataIndex % colors1.length]; // 使用颜色数组中的颜色
                    }
                },
                data: Object.keys(themeJson).map(function (key) {
                    return {
                        name: key.replace('.js', ''),
                        value: themeJson[key]
                    }
                })
            }]
        }

        myChart.setOption(option);
    }
});





