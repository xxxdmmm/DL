$.ajax({
    type: "get",
    dataType: "JSON",
    url: "/getdata/b1-5-3-1",
    success: function (res) {
        var app = {};
        var chartDom = document.getElementById('b1.5-3-1');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: res
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                        fontSize: 14, // 设置文字大小
                        rotate: 45,   // 设置文字倾斜角度
                        color: 'white'
                    },
            },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar',
                 itemStyle: {
                        color: 'rgba(250,82,89,0.7)' // 设置第一个柱子的颜色为红色，透明度为0.7
                    }},
                {type: 'bar',
                 itemStyle: {
                        color: 'rgba(91,200,248,0.7)' // 设置第一个柱子的颜色为红色，透明度为0.7
                    }}
            ]
        };

        option && myChart.setOption(option);

    }
});

















