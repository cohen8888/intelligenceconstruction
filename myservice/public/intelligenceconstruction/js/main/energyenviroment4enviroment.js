var data = [{
    "name": "02:00",
    "value": 80
}, {
    "name": "04:00",
    "value": 87.8
}, {
    "name": "06:00",
    "value": 71
}, {
    "name": "08:00",
    "value": 80
}, {
    "name": "10:00",
    "value": 66
}, {
    "name": "12:00",
    "value": 80
}, {
    "name": "14:00",
    "value": 180
},{
    "name": "16:00",
    "value": 80
},{
    "name": "18:00",
    "value": 80
},{
    "name": "20:00",
    "value": 80
},{
    "name": "22:00",
    "value": 80
},{
    "name": "24:00",
    "value": 80
}];
var xData = [],
    yData = [];
var min = 50; 
data.map(function(a, b) {
    xData.push(a.name);
    if (a.value === 0) {
        yData.push(a.value + min);
    } else {
        yData.push(a.value);
    }
});

function renderChart(rootElem, datas, x, y){
    let option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    opacity: 0
                }
            },
            formatter: function(prams) {
                if (prams[0].data === min) {
                    return "合格率：0%"
                } else {
                    return "合格率：" + prams[0].data + "%"
                }
            }
        },
        legend: {
            data: ['直接访问', '背景'],
            show: false
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '5%',
            top: '7%',
            height: '85%',
            containLabel: true,
            z: 22
        },
        xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: x,
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: '#0c3b71'
                }
            },
            axisLabel: {
                show: true,
                 color: 'rgb(170,170,170)',
                 fontSize:16
            }
        }],
        yAxis: [{
                type: 'value',
                gridIndex: 0,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                min: min,
                max: 200,
                axisLine: {
                    lineStyle: {
                        color: '#0c3b71'
                    }
                },
                axisLabel: {
                    color: 'rgb(170,170,170)',
                    formatter: '{value} %'
                }
            },
            {
                type: 'value',
                gridIndex: 0,
                min: min,
                max: 200,
                splitNumber: 12,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                    }
                }
            }
        ],
        series: [{
                name: '合格率',
                type: 'bar',
                barWidth: '15%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00feff'
                                },
                                {
                                    offset: 0.5,
                                    color: '#027eff'
                                },
                                {
                                    offset: 1,
                                    color: '#0286ff'
                                }
                            ]
                        )
                    }
                },
                data: y,
                zlevel: 11
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: '50%',
                xAxisIndex: 0,
                yAxisIndex: 1,
                barGap: '-135%',
                data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                zlevel: 9
            },
        ]
    };

    if (option && typeof option === "object") {
	    rootElem.setOption(option, true);
	}
}



$(document).ready(function(){
    let charts = $('.chart');
    charts.each((index, elem) => {
        renderChart(echarts.init(elem),null, xData, yData);
    })
});