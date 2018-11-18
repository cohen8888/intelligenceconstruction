/**
 * 消防巡检
 */

(function(){
    let giftImageUrl = 'images/fire_fighting_logo.png';
    let keyPositionImageUrl = 'images/key_position_logo.png';
    let safetyImageUrl = 'images/safety_logo.png';

    /**
     * 消防设施管理图
     * @param {*} rootChart 
     * @param {*} data 
     */
    function generateFireFightingDeviceChart(rootChart, data){
        let datas = {
            "extinguisherCount":"灭火器数量",
            "microStationCount":"微站数量",
            "waterStationCount":"水源数量"
        };
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
                text:'消防设施管理',
                left:'left',
                padding:[24,0],
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:18,
                    align:'center'
                }
            },
            graphic: {
                elements: [{
                    type: 'image',
                    style: {
                        image: giftImageUrl,
                        width: 80,
                        height: 80
                    },
                    left: 'center',
                    top: 'center'
                }]
            },
            legend: {
                selectedMode: false,
                orient: 'horizontal',
                x: 'right',
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:14,
                    align:'center'
                },
                formatter:function(name){
                    let result = "";
                    chartDatas.forEach((elem, index) => {
                        if (elem['name'] == name){
                            result = name + ' ' + elem['value'] + '个';
                        }
                    })
                    return result;
                },
                bottom: 5,
                data:legendDatas
            },
            series: [
                {
                    name:'消防设施管理',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    color:['#f8d087','#55e5d1','#f25f69'],
                    data:chartDatas
                }
            ]
        };

        if (option && typeof option === "object") {
            rootChart.setOption(option, true);
        }
    }

    /**
     * 渲染消防设施管理信息
     */
    function renderFireFightingDeviceTableInfo(rootElem, data){
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
            data.forEach((item, index) => {
                str += `<tr>`;
                str += `<td>${item['name']}</td>`;
                str += `<td>${item['model']}</td>`;
                str += `<td>${item['manufacturer']}</td>`;
                str += `<td>${item['linker']}</td>`;
                str +=`</tr>`;
            });
        }else{
            str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
        }
        rootElem.html(str);
    }

    /**
     * 重点部位管理图
     * @param {*} rootChart 
     * @param {*} data 
     */
    function generateKeyPositionDeviceChart(rootChart, data){
        let datas = {
            "stockDumpCount":"堆场数量",
            "powerFireCount":"动火数量",
            "powerElectricityCount":"动电数量"
        };
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
                text:'重点部位管理：',
                left:'left',
                padding:[24,0],
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:18,
                    align:'center'
                }
            },
            graphic: {
                elements: [{
                    type: 'image',
                    style: {
                        image: keyPositionImageUrl,
                        width: 80,
                        height: 80
                    },
                    left: 'center',
                    top: 'center'
                }]
            },
            legend: {
                selectedMode: false,
                orient: 'horizontal',
                x: 'right',
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:14,
                    align:'center'
                },
                formatter:function(name){
                    let result = "";
                    chartDatas.forEach((elem, index) => {
                        if (elem['name'] == name){
                            result = name + ' ' + elem['value'] + '个';
                        }
                    })
                    return result;
                },
                bottom: 5,
                data:legendDatas
            },
            series: [
                {
                    name:'消防设施管理',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    color:['#f8d087','#55e5d1','#f25f69'],
                    data:chartDatas
                }
            ]
        };

        if (option && typeof option === "object") {
            rootChart.setOption(option, true);
        }
    }

    /**
     * 渲染重点部位管理信息
     */
    function renderKeyPositionTableInfo(rootElem, data){
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
            data.forEach((item, index) => {
                str += `<tr>`;
                str += `<td>${item['name']}</td>`;
                str += `<td>${item['uniqueId']}</td>`;
                str +=`</tr>`;
            });
        }else{
            str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
        }
        rootElem.html(str);
    }


    /**
     * 安全疏散管理图
     * @param {*} rootChart 
     * @param {*} data 
     */
    function generateSafetyEvacuateChart(rootChart, data){
        let datas = {
            "exitCount":"出口数量",
            "pathCount":"路径数据量"
        };
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
                text:'安全疏散管理：',
                left:'left',
                padding:[24,0],
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:18,
                    align:'center'
                }
            },
            graphic: {
                elements: [{
                    type: 'image',
                    style: {
                        image: safetyImageUrl,
                        width: 80,
                        height: 80
                    },
                    left: 'center',
                    top: 'center'
                }]
            },
            legend: {
                selectedMode: false,
                orient: 'horizontal',
                x: 'center',
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:18,
                    align:'center'
                },
                formatter:function(name){
                    let result = "";
                    chartDatas.forEach((elem, index) => {
                        if (elem['name'] == name){
                            result = name + ' ' + elem['value'] + '个';
                        }
                    })
                    return result;
                },
                bottom: 5,
                data:legendDatas
            },
            series: [
                {
                    name:'安全疏散管理：',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    color:['#5ae7d3','#f6d69a'],
                    data:chartDatas
                }
            ]
        };

        if (option && typeof option === "object") {
            rootChart.setOption(option, true);
        }
    }

    $$.moduleFireProtection = function(){
        $$.ajax($$.baseUrl, $$.moduleUrls.safety4fireprotection).then(res => {
            let mychart = echarts.init($('#fire-fighting-device-manage-chart').get(0));
            let mychart1 = echarts.init($('#key-position-chart').get(0));
            let mychart2 = echarts.init($('#safety-evacuate-chart').get(0));
            $('.title').on('click', function(event){
                let btnConent = event.target.innerHTML;
                if (btnConent == '消防设施'){
                    $('.fire-fighting-device').css('display','block');
                    $('.key-position').css('display','none');
                    $('.safety-evacuate').css('display','none');
                }else if(btnConent == '重点部位'){
                    $('.fire-fighting-device').css('display','none');
                    $('.key-position').css('display','block');
                    $('.safety-evacuate').css('display','none');
                }else if(btnConent == '安全疏散'){
                    $('.fire-fighting-device').css('display','none');
                    $('.key-position').css('display','none');
                    $('.safety-evacuate').css('display','block');
                }
            })
            //消防设施
            generateFireFightingDeviceChart(mychart, res.data.fireFightingDevice.fireFightingDeviceManage);
            renderFireFightingDeviceTableInfo($('.fire-fighting-device-manage-table table tbody'), res.data.fireFightingDevice.fireFightingDeviceExtinguisher);
            //重点部位
            generateKeyPositionDeviceChart(mychart1, res.data.keyPosition.keyPositionManage);
            renderKeyPositionTableInfo($('.key-position .col-sm-4 tbody'), res.data.keyPosition.info);
            //安全疏散
            generateSafetyEvacuateChart(mychart2, res.data.safetyEvacuate.safetyEvacuateManage);
        });
    }
})()