/**
 * module:安全管理——视频监控
 * author:Cohen.Lee
 * date:2018-11-14
 */
(function (){
    //图表数据
    let scaleData = [
        {
            'name': '1号监控',
            'value': 20
        },
        {
            'name': '2号监控',
            'value': 20
        },
        {
            'name': '3号监控',
            'value': 20
        },
        {
            'name': '4号监控',
            'value': 20
        },
        {
            'name': '5号监控',
            'value': 20
        }
    ];
    //图标样式
    let rich = {
        white: {
            color: '#ddd',
            align: 'center',
            padding: [5, 0]
        }
    };
    let placeHolderStyle = {
        normal: {
            label: {
                show: true
            },
            labelLine: {
                show: true
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
    };
    let data = [];
    for (let i = 0; i < scaleData.length; i++) {
        data.push({
            value: scaleData[i].value,
            name: scaleData[i].name,
            //visualMap: false,
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    shadowBlur: 50,
                    shadowColor: 'rgba(142, 152, 241, 0.6)'
                },emphasis:{
                    color:'#da7b55'
                }
            },
        }, {
            value: 2,
            name: '',
            itemStyle: placeHolderStyle
        });
    }
    let seriesObj = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [70, 100],
        hoverAnimation: true,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside',
                    color: '#ddd',
                    rich: rich
                },
                labelLine: {
                    show: true
                }
            }
        },
        data: data
    }];
    //图形选项
    let option = {
        //backgroundColor: '#04243E',
        title: {
            text:'5个\n视频监控点位',
            left:'center',
            x:'center',
            y:'center',
            padding:[24,0],
            textStyle:{
                color:'#fff',
                fontSize:18,
                align:'center'
            }
        },
        tooltip: {
            show: false
        },
        legend: {
            show: false
        },
        color:['#2fe2f0','#2fe2f0','#2fe2f0','#2fe2f0','#2fe2f0'],
        toolbox: {
            show: false
        },
        series: seriesObj
    }
    $$.moduleVideoMonitoring = function() {
        
        let mychart = echarts.init($('#video-point-chart').get(0));
        if (option && typeof option === "object") {
            mychart.setOption(option, true);
        }
    }
})()