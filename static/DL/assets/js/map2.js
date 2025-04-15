(function () {
    const data_list = [{'name': '北京', 'value': 130259}, {'name': '天津', 'value': 68681}, {
        'name': '河北',
        'value': 454994
    }, {'name': '山西', 'value': 228946}, {'name': '内蒙古', 'value': 166598}, {
        'name': '辽宁',
        'value': 324528
    }, {'name': '吉林', 'value': 176546}, {'name': '黑龙江', 'value': 260536}, {
        'name': '上海',
        'value': 160378
    }, {'name': '江苏', 'value': 548560}, {'name': '浙江', 'value': 369875}, {
        'name': '安徽',
        'value': 411023
    }, {'name': '福建', 'value': 223813}, {'name': '江西', 'value': 307292}, {
        'name': '山东',
        'value': 673920
    }, {'name': '河南', 'value': 721329}, {'name': '湖北', 'value': 433965}, {
        'name': '湖南',
        'value': 532668
    }, {'name': '广东', 'value': 588964}, {'name': '广西', 'value': 319045}, {
        'name': '海南',
        'value': 61408
    }, {'name': '重庆', 'value': 240741}, {'name': '四川', 'value': 662029}, {
        'name': '贵州',
        'value': 296902
    }, {'name': '云南', 'value': 330278}, {'name': '西藏', 'value': 19650}, {
        'name': '陕西',
        'value': 284545
    }, {'name': '甘肃', 'value': 183166}, {'name': '青海', 'value': 42153}, {
        'name': '宁夏',
        'value': 41191
    }, {'name': '新疆', 'value': 186127}];


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
                            ${'数量'}：${num}
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