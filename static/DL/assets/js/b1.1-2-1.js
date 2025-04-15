$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-1-2-1",
    success: function (res) {
        var chartDom = document.getElementById('b1.1-2-1');
        var myChart = echarts.init(chartDom);
        var option;
        var colors = [
            'rgba(234,174,174,0.8)',
            'rgba(198,246,198,0.8)',
            'rgba(165,165,234,0.8)',
            'rgba(234,234,182,0.8)',
            'rgba(224,181,224,0.8)',
            'rgba(170,227,227,0.8)',
            'rgba(229,168,168,0.8)',
            'rgba(150,227,150,0.8)',
            'rgba(167,167,231,0.8)',
            'rgba(225,225,192,0.8)',
            'rgba(232,139,232,0.8)',
            'rgba(113,232,232,0.8)',
            'rgba(238,143,143,0.8)'
        ];
        // console.log(res);
        option = {
            title: [
                {
                    subtext: '综合医院数据',
                    left: '15%',
                    top: '45%',
                    textAlign: 'center',
                    subtextStyle: {
                            color: 'white' // 设置标题文字颜色
                        }
                },
                {
                    subtext: '中医医院数据',
                    left: '85%',
                    top: '45%',
                    textAlign: 'center',
                     subtextStyle: {
                            color: 'white' // 设置标题文字颜色
                        }
                },
                {
                    subtext: '中西医结合医院数据',
                    left: '15%',
                    top: '95%',
                    textAlign: 'center',
                     subtextStyle: {
                            color: 'white' // 设置标题文字颜色
                        }
                },
                {
                    subtext: '民族医院数据',
                    left: '85%',
                    top: '95%',
                    textAlign: 'center',
                     subtextStyle: {
                            color: 'white' // 设置标题文字颜色
                        }
                },
                {
                    subtext: '专科医院数据',
                    left: '50%',
                    top: '69%',
                    textAlign: 'center',
                     subtextStyle: {
                            color: 'white' // 设置标题文字颜色
                        }
                }
            ],
            legend: {},
            tooltip: {},
            dataset: {
                source: res
            },
            series: [
                {
                    type: 'pie',
                    radius: '30%',
                    center: ['15%', '28%'],
                    label: {
                        formatter: "{b}",
                        textStyle: {
                            fontSize: '15px',
                            color:"rgba(239,236,236,0.8)"
                        }
                    },
                    itemStyle: {
                        color: function(params) {
                            return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                        }
                    }
                },
                {
                    type: 'pie',
                    radius: '30%',
                    center: ['85%', '28%'],
                    encode: {
                        itemName: 'level',
                        value: res[0][1]
                    },
                    label: {
                        formatter: "{b}",
                        textStyle: {
                            fontSize: '15px',
                            color:"rgba(239,236,236,0.8)"
                        }
                    },
                    itemStyle: {
                        color: function(params) {
                            return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                        }
                    }
                },
                {
                    type: 'pie',
                    radius: '30%',
                    center: ['15%', '71%'],
                    encode: {
                        itemName: 'level',
                        value: res[0][2]
                    },
                    label: {
                        formatter: "{b}",
                        textStyle: {
                            fontSize: '15px',
                            color:"rgba(239,236,236,0.8)"
                        }
                    },
                    itemStyle: {
                        color: function(params) {
                            return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                        }
                    }
                },
                {
                    type: 'pie',
                    radius: '30%',
                    center: ['85%', '71%'],
                    encode: {
                        itemName: 'level',
                        value: res[0][3]
                    },
                    label: {
                        formatter: "{b}",
                        textStyle: {
                            fontSize: '15px',
                            color:"rgba(239,236,236,0.8)"
                        }
                    },
                    itemStyle: {
                        color: function(params) {
                            return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                        }
                    }
                },
                {
                    type: 'pie',
                    radius: '30%',
                    center: ['50%', '50%'],
                    encode: {
                        itemName: 'level',
                        value: res[0][4]
                    },
                    label: {
                        formatter: "{b}",
                        textStyle: {
                            fontSize: '15px',
                            color:"rgba(239,236,236,0.8)"
                        }
                    },
                    itemStyle: {
                        color: function(params) {
                            return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                        }
                    }
                },

            ]
        };
        myChart.setOption(option);
    }
});