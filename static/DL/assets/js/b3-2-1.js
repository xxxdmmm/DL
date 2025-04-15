var chartDom = document.getElementById('b3-2-1');
var myChart = echarts.init(chartDom);
areaData = [
    {
        name: '兽 药 残 留 限 量',
        max: 50,
        value: 36,
    },
    {
        name: '农药残留限量',
        max: 50,
        value: 4,
    },
    {
        name: '理化检验方法标准',
        max: 50,
        value: 8,
    },
    {
        name: '营养强化剂质量规格标准',
        max: 50,
        value: 3,
    },
    {
        name: '食品添加剂质量规格标准',
        max: 50,
        value: 44,
    },
    {
        name: '食品安全基础标准',
        max: 50,
        value: 3,
    },
];
data = [];
areaData.forEach((item) => {
    data.push(item.value);
});
let maxNum = Math.max(...data); //获取数组中最大的值
// 向上取整十，整百，整千，整万的方法
function ceilNumber(number) {
    let bite = 0;
    if (number < 10) {
        return 10;
    }
    while (number >= 10) {
        number /= 10;
        bite += 1;
    }
    return Math.ceil(number) * Math.pow(10, bite);
}

let allMax = ceilNumber(maxNum); //将最大的值进行向上取整
areaData.forEach((item) => {
    item.max = allMax;
});
data1 = [0, 0, 0, 0, 0, 0];
data2 = [0, 0, 0, 0, 0, 0];
data3 = [0, 0, 0, 0, 0, 0];
data4 = [0, 0, 0, 0, 0, 0];
data5 = [0, 0, 0, 0, 0, 0];
data6 = [0, 0, 0, 0, 0, 0];
data1[0] = data[0];
data2[1] = data[1];
data3[2] = data[2];
data4[3] = data[3];
data5[4] = data[4];
data6[5] = data[5];
option = {
    color: ['#2E64FF', '#F0D418', '#FF9B42', '#FF6B6B', '#8E42FF', '#00e4ff'],
    legend: {
        trigger: 'item',
        orient: 'vertical',
        top: '20px',
        left: '20px',
        textStyle: {
            color: '#fff',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ': ' + params.value + '次';
        },
    },
    radar: {
        zlevel: 11,
        shape: 'circle',
        scale: true,
        indicator: areaData,
        center: ['50%', '50%'],
        radius: '40%',
        nameGap: '0',
        startAngle: 90,
        name: {
            show: false,
            color: 'red',
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(32,126,255, .5)',
            },
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(32,126,255, .5)',
            },
        },
        splitArea: {
            areaStyle: {
                color: 'rgba(32,126,255, 0.1)',
            },
        },
    },
    polar: {
        radius: '40%',
    },
    angleAxis: {
        zlevel: 0,
        min: 0,
        max: 360,
        axisLabel: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    radiusAxis: {
        zlevel: 0,
        min: 0,
        max: allMax,
        axisLabel: {
            textStyle: {
                color: 'rgba(29,208,240,.5)',
            },
        },
        splitLine: {
            show: false,
        },
    },
    series: [
        {
            type: 'radar',
            symbolSize: 12,
            symbol: 'circle',
            tooltip: {
                trigger: 'none',
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: function (params) {
                            if (params.value !== 0) {
                                return params.value + '次';
                            } else {
                                return '';
                            }
                        },
                        color: '#ffffff',
                        fontSize: 12,
                        distance: 0,
                    },
                },
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(32,126,255, 0.5)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(32,126,255, 0.1)', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
            data: [
                {
                    value: data,
                },
                {
                    value: data1,
                    itemStyle: {
                        color: '#2e64ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data2,
                    itemStyle: {
                        color: '#f0d418',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data3,
                    itemStyle: {
                        color: '#ff9b42',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data4,
                    itemStyle: {
                        color: '#ff6b6b',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data5,
                    itemStyle: {
                        color: '#8e42ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data6,
                    itemStyle: {
                        color: '#00e4ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: [0, 0, 0, 0, 0, 0],
                    // name: '违章占比',
                    symbolSize: 13,
                    itemStyle: {
                        color: 'rgba(40, 97, 132)',
                    },
                },
            ],
            zlevel: 20,
            z: 4,
        },
        {
            type: 'pie',
            startAngle: 90,
            clockwise: false, //逆时针
            data: areaData.map((item) => {
                return {
                    name: item.name,
                    value: item.value,
                };
            }),
            radius: ['45%', '60%'],
            zlevel: -1,
            label: {
                normal: {
                    formatter: '{d}%',
                    position: 'top',
                    fontSize: '24',
                    color: '#fff',
                },
            },
        },
    ],
};


myChart.setOption(option);
