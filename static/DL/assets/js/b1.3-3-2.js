$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-3-3-2",
    success: function (res) {

        var chartDom = document.getElementById('b1.3-3-2');
        var myChart = echarts.init(chartDom);
        var option;
        var colors = [
            'rgba(246,93,93,0.7)',
            'rgba(245,252,124,0.7)',
            'rgba(132,132,248,0.7)',
            'rgba(160,231,85,0.7)',
        ];
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '80%',
                left: 'center',
                textStyle: {
                    color: 'white' // 设置图例文字颜色
                },
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    center: ['50%', '40%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10,
                        color: function (params) {
                        return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                    }
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },

                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: res
                }
            ]
        };

        option && myChart.setOption(option);

    }
});













