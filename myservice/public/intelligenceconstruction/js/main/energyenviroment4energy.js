/**
 * module:能源环境管理——能源管理
 * author:Cohen.Lee
 * date:2018-11-15
 */
(function(){

    let powerConsumptionClassifyDatas = {
        "illumination":"照明用电",
        "airConditioner":"空调用电",
        "dynamicElectricity":"动力用电",
        "other":"其他"
    };
    
    let powerConsembleClassifyItemDatas =  {
        "civil":"土建",
        "curtainWall":"慕墙",
        "install":"安装",
        "refinedDecoration":"精装"
    };
    let waterConsumptionClassifyDatas = {
        "livingQuarters":"生活区",
        "constructionArea":"施工区",
        "officeArea":"办公区"
    };
    
    let waterConsembleClassifyItemDatas =  {
        "civil":"土建",
        "curtainWall":"慕墙",
        "install":"安装",
        "refinedDecoration":"精装"
    };
    
    /**
     * 渲染总耗量图
     * @param {*} rootElem 
     * @param {*} data 
     */
    function renderConsumption(rootElem, data, title, lineColor){
        let option = {
            title: {
                left: 'left',
                text: title,
            },
            xAxis: {
                type: 'category',
                data: data[0].month,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [{
                data: data[0].data,
                type: 'line',
                smooth: true,
                itemStyle : {
                    normal : {
                        label : {show: true},
                        lineStyle:{
                            color:lineColor
                        }
                    }
                },
            }]
        };
        if (option && typeof option === "object") {
            rootElem.setOption(option, true);
        }
    }
    
    
    
    
    /**
     * 渲染耗电分类图
     * @param {*} rootElem 
     * @param {*} data 
     */
    function renderConsumptionClassify(rootElem, data, title, datas){
    
        let legendDatas = [];
        let chartDatas = [];
        for(let key in data){
            let obj = {};
            obj['name'] = datas[key];
            obj['value'] = data[key];
            legendDatas.push(datas[key]);
            chartDatas.push(obj);
        }
        let option = {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: "{b}: {d}%"
            },
            legend: {
                orient: 'horizontal',
                data: legendDatas,
                bottom:0,
                textStyle:{
                    color:'#fff',
                    fontSize:16,
                    align:'center'
                }
            },
            series: [{
                type: 'pie',
                hoverAnimation: true,
                radius: ['40%', '67%'],
                color: ['#f3975c','#ed4d7d','#44add0','#9f53ed'],
                data: chartDatas
            }]
        };
        if (option && typeof option === "object") {
            rootElem.setOption(option, true);
        }
    }
    
    
    
    
    /**
     * 渲染耗电分项图
     * @param {*} rootElem 
     * @param {*} data 
     */
    function renderConsembleClassifyItem(rootElem, data, title, datas){
        let legendDatas = [];
        let serietDatas = [];
        for(let key in data){
            let obj = {};
            obj['name'] = datas[key];
            obj['value'] = data[key];
            legendDatas.push(datas[key]);
            serietDatas.push(obj);
        }
        let color=['#17a7ca','#fde0ac','#ef6c75','#5ed566'];
        let option = {
            title: {
                text: title,
            },
            legend: {
                show: true,
                orient: 'horizontal',
                data: legendDatas,
                textStyle:{
                    color:'#fff',
                    fontSize:16,
                    align:'center'
                },
                bottom:0
            },
            series: [{
                name: '',
                type: 'pie',
                clockWise: false,
                radius: [75, 120],
                hoverAnimation: false,
                data: serietDatas,
                color:color
            }]
        }
        if (option && typeof option === "object") {
            rootElem.setOption(option, true);
        }
    }

    $$.moduleEnergyEnviromentEnergy = function(){
        let chartPowerConsumption = echarts.init($('.power-chart').get(0));
        let chartPowerConsumptionClassify = echarts.init($('.power-chart').get(1));
        let chartPowerConsembleClassifyItem = echarts.init($('.power-chart').get(2));
        let charWaterConsumption = echarts.init($('.water-chart').get(0));
        let chartWaterConsumptionClassify = echarts.init($('.water-chart').get(1));
        let chartWaterConsembleClassifyItem = echarts.init($('.water-chart').get(2));
        $$.ajax($$.baseUrl, $$.moduleUrls.energyenviroment4energy).then(res => {
            renderConsumption(chartPowerConsumption, 
                res.data.powerConsemble.ensemblePowerConsemble, 
                '总耗电量','#fbd481');
            renderConsumptionClassify(chartPowerConsumptionClassify,
                res.data.powerConsemble.powerConsembleClassify,
                '耗电分类',
                powerConsumptionClassifyDatas);
            renderConsembleClassifyItem(chartPowerConsembleClassifyItem, 
                res.data.powerConsemble.powerConsembleClassifyItem, 
                '耗电分项', 
                powerConsembleClassifyItemDatas);
            /////////////////////////////////////////////////////////////////////////
            renderConsumption(charWaterConsumption, 
                res.data.waterConsemble.ensembleWaterConsemble, 
                '总耗水量','#6de9f5');
            renderConsumptionClassify(chartWaterConsumptionClassify,
                res.data.waterConsemble.waterConsembleClassify,
                '耗水分类',
                waterConsumptionClassifyDatas);
            renderConsembleClassifyItem(chartWaterConsembleClassifyItem, 
                res.data.waterConsemble.waterConsembleClassifyItem, 
                '耗水分项', 
                waterConsembleClassifyItemDatas);
        });
    }

})()
