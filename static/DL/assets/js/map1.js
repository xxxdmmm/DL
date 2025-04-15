(function () {
    const data_list = [{'name': '北京', 'value': 26}, {'name': '天津', 'value': 39}, {
        'name': '河北',
        'value': 89
    }, {'name': '山西', 'value': 146}, {'name': '内蒙古', 'value': 87}, {'name': '辽宁', 'value': 47}, {
        'name': '吉林',
        'value': 108
    }, {'name': '黑龙江', 'value': 34}, {'name': '上海', 'value': 11}, {'name': '江苏', 'value': 134}, {
        'name': '浙江',
        'value': 197
    }, {'name': '安徽', 'value': 155}, {'name': '福建', 'value': 241}, {'name': '江西', 'value': 223}, {
        'name': '山东',
        'value': 1093
    }, {'name': '河南', 'value': 72}, {'name': '湖北', 'value': 107}, {'name': '湖南', 'value': 879}, {
        'name': '广东',
        'value': 187
    }, {'name': '广西', 'value': 212}, {'name': '海南', 'value': 82}, {'name': '重庆', 'value': 70}, {
        'name': '四川',
        'value': 390
    }, {'name': '贵州', 'value': 701}, {'name': '云南', 'value': 1455}, {'name': '陕西', 'value': 110}, {
        'name': '甘肃',
        'value': 88
    }, {'name': '青海', 'value': 11}, {'name': '宁夏', 'value': 45}, {'name': '新疆', 'value': 34}, {
        'name': '西藏',
        'value': 28
    }];


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
                            ${'发生件数'}：${num}
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