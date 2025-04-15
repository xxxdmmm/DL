(function () {
    const data_list = [{'name': '北京', 'value': 94.57}, {'name': '天津', 'value': 138.35}, {
        'name': '河北',
        'value': 134.23
    }, {'name': '山西', 'value': 211.66}, {'name': '内蒙古', 'value': 262.64}, {
        'name': '辽宁',
        'value': 164.27
    }, {'name': '吉林', 'value': 105.56}, {'name': '黑龙江', 'value': 132.22}, {
        'name': '上海',
        'value': 135.23
    }, {'name': '江苏', 'value': 105.94}, {'name': '浙江', 'value': 144.35}, {
        'name': '安徽',
        'value': 235.01
    }, {'name': '福建', 'value': 209.49}, {'name': '江西', 'value': 200.4}, {
        'name': '山东',
        'value': 138.31
    }, {'name': '河南', 'value': 147.92}, {'name': '湖北', 'value': 199.38}, {
        'name': '湖南',
        'value': 302.0
    }, {'name': '广东', 'value': 272.44}, {'name': '广西', 'value': 272.05}, {
        'name': '海南',
        'value': 342.07
    }, {'name': '重庆', 'value': 194.67}, {'name': '四川', 'value': 209.56}, {
        'name': '贵州',
        'value': 245.94
    }, {'name': '云南', 'value': 191.41}, {'name': '西藏', 'value': 333.32}, {
        'name': '陕西',
        'value': 155.42
    }, {'name': '甘肃', 'value': 155.81}, {'name': '青海', 'value': 392.09}, {
        'name': '宁夏',
        'value': 174.59
    }, {'name': '新疆', 'value': 331.86}];


    let new_data_list = data_list.map((item, index) => {
        return item.value;
    })
    let data_list_max = Math.max(...new_data_list);
    var map_Chart = echarts.init(document.getElementById('map'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                let num;
                let showHtml = '';
                if (isNaN(params.value)) {
                    num = '0';
                } else {
                    num = params.value;
                }
                showHtml += `
                        <span style="display: flex;">
                            ${'省份'}：${params.name}</br>
                            ${'发病率(十万分之一)'}：${num}
                        </span>
                    `;
                return showHtml;

            }
        },

        dataRange: {
            x: 'left',
            y: 'bottom',
            min: 0,
            max: data_list_max,
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            inRange: {
                color: ['#d1e7fe', '#1989fa'],

            }
        },
        series: [{
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: false, // 设置为true允许地图放缩
            selectedMode: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: 'black'
                        }
                    }
                },
                emphasis: {
                    areaColor: '#95ec69',
                    label: {
                        show: true

                    }
                }
            },
            data: data_list
        }]
    };

    map_Chart.setOption(option);
})();