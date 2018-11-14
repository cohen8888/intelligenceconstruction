/**
 * module: 质量管理——问题汇总
 * author：Cohen.lee
 * date：2018-11-13
 * 
 */


/**
 * 质量问题汇总
 * @param {*} rootChart 
 * @param {*} data 
 */
 function generateQualityQuestionChart(rootChart, data){
    //饼形图显示样式对象
    let datas = {
        noRectifyReformProblem:'未整改问题',
        overNoRectifyReformProblem:'超期未整改问题',
        otherProblem:''      
    };
    let legendDatas = [];
    let chartDatas = [];
    let sumProblemCount = 0;
    for(let key in data){
        let obj = {};
        obj['name'] = datas[key];
        obj['value'] = data[key];
        legendDatas.push(datas[key]);
        chartDatas.push(obj);
        sumProblemCount += Number(data[key]);
    }
    let option = {
        title: {
            text:sumProblemCount+'\n所有问题',
            left:'center',
            top:'40%',
            padding:[24,0],
            textStyle:{
                color:'#fff',
                fontSize:18,
                align:'center'
            }
        },
        legend: {
            selectedMode: false,
            orient: 'vertical',
            x: 'center',
            textStyle:{
                color:'#fff',
                fontSize:18,
                align:'center'
            },
            formatter:function(name){
                let result = "";
                chartDatas.forEach((elem, index) => {
                    if (elem['name'] == name){
                        result = name + elem['value'] + '个';
                    }
                })
                return result;
            },
            bottom: 5,
            data:legendDatas
        },
        series: [
            {
                name:'质量问题汇总',
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
                color:['#1fcec2','#8868ff','#2c2d3c'],
                data:chartDatas
            }
        ]
    };

    if (option && typeof option === "object") {
	    rootChart.setOption(option, true);
	}
 }

 function generateQualityProblemClassifyChart(rootChart, data){
    let datas = {
        "rebar":'钢筋',
        "foundation":'地基',
        "concrete":'混凝土',
        "steelStructure":'钢结构',
        "template":'模板',
        "curtain":'幕墙',
        "buildingWall":'砌体',
        "other":'其它'     
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
            text:'质量问题分类',
            left:'center',
            padding:[24,0],
            textStyle:{
                color:'#fff',
                fontSize:18,
                align:'center'
            }
        },
        legend: {
            selectedMode: false,
            orient: 'vertical',
            x: 'right',
            textStyle:{
                color:'#fff',
                fontSize:18,
                align:'center'
            },
            bottom: 5,
            data:legendDatas
        },
        series: [
            {
                name:'质量问题分类',
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
                color:['#7652fa','#b824e2','#fbb741','#1196e7','#18d468','#ec7a82','#fde2b2','#7ae591'],
                data:chartDatas
            }
        ]
    };

    if (option && typeof option === "object") {
	    rootChart.setOption(option, true);
	}
 }


$(document).ready(function(){
    let mychart = echarts.init($('.quality-question-chart').get(0));
    let mychart1 = echarts.init($('.quality-problem-classify').get(0));
    $$.ajax($$.baseUrl, $$.moduleUrls.quality4problemsummarizing).then(res => {
        generateQualityQuestionChart(mychart, res.data.qualityQuestionSummarizing);
        generateQualityProblemClassifyChart(mychart1, res.data.qualityProblemClassify);
    });
})