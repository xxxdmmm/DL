
var chartDom = document.getElementById('b3-3-1');
var myChart = echarts.init(chartDom);
var option;

option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Healthcare ' +
              'data ' +
              'visualization',
          fontSize: 95,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 0.5,
              style: {
                fill: 'black'
              }
            }
          ]
        }
      }
    ]
  }
};

option && myChart.setOption(option);
