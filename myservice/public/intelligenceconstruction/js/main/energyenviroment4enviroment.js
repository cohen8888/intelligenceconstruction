let lineColor = new echarts.graphic.LinearGradient(
    0, 0, 0, 1, [{
            offset: 0,
            color: '#00feff'
        },
        {
            offset: 0.5,
            color: '#ee7eff'
        },
        {
            offset: 1,
            color: '#4486ff'
        }
    ]
);

let temperatureMaxHighData = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
let humidityMaxHighData = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
let pm25MaxHighData = [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
let pm10MaxHighData = [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
let noiseMaxHighData = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
let windSpeedMaxHighData = [220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220];
function renderChart(rootElem, datas, columnarColor, unit, min, max, maxHighData){
    let xData = [],yData = [];
    datas.map(function(a, b) {
        xData.push(a.name);
        if (a.value === 0) {
            yData.push(a.value + min);
        } else {
            yData.push(a.value);
        }
    });
    let option = {
        // color: ['#3398DB'],
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
                    return "合格率：0%";
                } else {
                    return "合格率：" + prams[0].data;
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
            data: xData,
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
                max: max,
                axisLine: {
                    lineStyle: {
                        color: '#0c3b71'
                    }
                },
                axisLabel: {
                    color: 'rgb(170,170,170)',
                    formatter: '{value} '+ unit
                }
            },
            {
                type: 'value',
                gridIndex: 0,
                min: min,
                max: max,
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
                        color: columnarColor
                    }
                },
                data: yData,
                zlevel: 11
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: '50%',
                xAxisIndex: 0,
                yAxisIndex: 1,
                barGap: '-135%',
                data: maxHighData,
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
    $$.ajax($$.baseUrl, $$.moduleUrls.energyenviroment4enviroment).then( res =>{
        renderChart(echarts.init(charts[0]), res.data.temperature.data,  lineColor, '°C', 0, 50, temperatureMaxHighData);           //温度
        renderChart(echarts.init(charts[1]), res.data.humidity.data,  lineColor, '%', 0, 100, humidityMaxHighData);                 //湿度
        renderChart(echarts.init(charts[2]), res.data.pm25.data,  lineColor, '', 0, 400, pm25MaxHighData);                          //pm2.5
        renderChart(echarts.init(charts[3]), res.data.pm10.data,  lineColor, '', 0, 400, pm10MaxHighData);                          //pm10
        renderChart(echarts.init(charts[4]), res.data.noise.data,  lineColor, 'dB', 0, 100, noiseMaxHighData);                      //dB
        renderChart(echarts.init(charts[5]), res.data.windSpeed.data,  lineColor, 'Km/h', 0, 220, windSpeedMaxHighData);            //Km/h
    });

});