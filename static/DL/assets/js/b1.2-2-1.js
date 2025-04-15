$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-2-2-1",
    success: function (res) {
        var chartDom = document.getElementById('b1.2-2-1');
        var myChart = echarts.init(chartDom);
        var option;
        // console.log(res)
        var data = res;
        var count_num = 0;
        for (var m in data) {
            count_num = count_num + data[m]['value']
        }
        var colors = [
            'rgba(246,93,93,0.7)',
            'rgba(245,252,124,0.7)',
            'rgba(132,132,248,0.7)',
            'rgba(160,231,85,0.7)',
            'rgba(128,232,245,0.7)',
            'rgba(32,197,248,0.7)',
            'rgba(192,243,152,0.7)',
        ];

        option = {
            //显示series中信息，提示框组件
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '90%',
                left: 'center',
                textStyle: {
                    color: 'white' // 设置图例文字颜色
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',    //半径
                    center: ['50%', '40%'],
                    label: {
                        formatter: "{b}+{d}%",
                        textStyle: {
                            fontSize: '15px',
                            color: "white"
                        }
                    },

                    data: data,
                    itemStyle: {  //itemStyle有正常显示：normal，有鼠标hover的高亮显示：emphasis
                        emphasis: {  //normal显示阴影,与shadow有关的都是阴影的设置
                            shadowBlur: 10,  //阴影大小
                            shadowOffsetX: 0,  //阴影水平方向上的偏移
                            shadowColor: 'rgba(0, 0, 0, 0.5)'  //阴影颜色
                        },
                        color: function (params) {
                        return colors[params.dataIndex % colors.length]; // 使用颜色数组中的颜色
                    }
                    }
                }
            ]
        };
        myChart.setOption(option);

    }
});




