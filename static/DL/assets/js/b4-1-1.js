$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b4-1-1",
    success: function (res) {
        var chartDom = document.getElementById('b4-1-1');
        var myChart = echarts.init(chartDom);
        option = {
            color: ['#0C65F6', '#00FFA6', '#F4DF58'],
            tooltip: {
                confine: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 24,
                },
                padding: [5, 10],
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                formatter(params) {	// 根据条件修改
                    let unit = '人'
                    let relVal = params[0].name
                    for (let i = 0; i < params.length; i++) {
                        if (i === 1) {
                            unit = '人'
                        }
                        if (typeof (params[i].color) === 'string') {
                            relVal += `<div class="g-flex"><div style="width: 13px;height: 5px; margin-right: 5px; background: ${params[i].color}"></div><div class="g-p-r-20">${params[i].seriesName}</div>${params[i].value} ${unit}</div>`
                        } else {
                            relVal += `<div class="g-flex"><div style="width: 13px;height: 5px; margin-right: 5px; background: ${params[i].color.colorStops[0].color}"></div><div class="g-p-r-20">${params[i].seriesName}</div>${params[i].value} ${unit}</div>`
                        }
                    }
                    return relVal
                },
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '25%',
                top: '10%',
            },
            legend: {
                icon: 'rect',
                orient: 'horizontal',
                x: 'center',
                y: '23%',
                itemWidth: 12,
                itemHeight: 12,
                formatter: ['{a|{name}}'].join('\n'),
                textStyle: {
                    color: '#fff',
                    height: 8,
                    rich: {
                        a: {
                            verticalAlign: 'bottom',
                        },
                    },
                },
                data: ['发病人数', '死亡人数'],
            },
            xAxis: {
                type: 'category',
                data: res.x,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.45)',
                    },
                },
                axisLabel: { //坐标轴刻度标签的相关设置
                    color: 'white',
                    fontSize: 10,
                    rotate: 45
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: [{
                type: 'value',
                name: '(人)',
                nameTextStyle: {
                    color: '#fff',
                    padding: [0, 0, 0, 30],
                },
                min: 0,
                minInterval: 1,
                splitArea: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.15)',
                    },
                },
                axisLabel: {
                    color: '#FFF',
                    formatter: (params) => (params === 1 ? 0 : params),
                },
            }, {
                type: 'value',
                name: '(人)',
                nameTextStyle: {
                    color: '#fff',
                    padding: [0, 0, 0, 15],
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    formatter: '{value}人', // 右侧Y轴文字显示
                    color: '#FFF',
                },
                splitArea: {
                    show: false,
                },
                min: 0,
                max: 20000,
            }],
            series: [
                {
                    name: '发病人数',
                    type: 'bar',
                    barWidth: 16,
                    barMinHeight: 10,
                    itemStyle: {
                        shadowColor: '#ffffff33',
                        shadowBlur: 1,
                        shadowOffsetX: 4,
                        shadowOffsetY: -3,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#5FD5EC'},
                            {offset: 1, color: 'rgba(95, 213, 236, 0)'},
                        ]),
                    },
                    data: res.y1,
                },
                {
                    name: '死亡人数',
                    type: 'line',
                    yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用QUANMEI
                    smooth: false, // 平滑曲线显示
                    symbol: 'circle', // 标记的图形为实心圆
                    symbolSize: 8, // 标记的大小
                    data: res.y2,
                    itemStyle: {color: '#FFCF5F'},
                },
            ],
        };
        option && myChart.setOption(option);
    }
});











