$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-5-3-2",
    success: function (res) {
        var chartDom = document.getElementById('b1.5-3-2');
        var myChart = echarts.init(chartDom);
        var option;

        let data = res;
        let seriesData = data.map((item) => {
            return [item.days, item.cost, item.name];
        });

        option = {
            grid: {
                top: '5%',
                bottom: '20%'
            },
            xAxis: {},
            yAxis: {},
            visualMap: {
                min: 0,
                max: 120000,
                calculable: true,
                inRange: {
                    color: ['#FF3333', '#FFCC00', '#33FF33'] // 渐变色范围
                },
                dimension: 1, // 映射到颜色的数据维度，这里是平均医药费
                orient: 'horizontal', // 设置水平放置
                left: 'center', // 水平居中
                top: 'bottom', // 垂直居中
                textStyle: {
                    color: '#fff' // 文字颜色设置为白色
                },
                itemHeight: 400
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.data[2]}<br/>平均住院日：${params.data[0]}日<br/>平均医药费：${params.data[1]}元`;
                }
            },
            series: [
                {
                    symbolSize: 20,
                    data: seriesData,
                    type: 'scatter'
                }
            ]
        };

        option && myChart.setOption(option);


    }
});


















