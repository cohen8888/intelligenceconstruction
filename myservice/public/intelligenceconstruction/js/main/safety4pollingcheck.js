/**
 * module:质量管理-问题汇总
 * author:Cohen.Lee
 * date:2018-11-14
 */


 
/**
 * 安全巡检——问题汇总
 * @param {*} rootChart 
 * @param {*} data 
 */
function generateSafetySummarizingChart(rootChart, data){
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
                name:'安全问题汇总',
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

 function generateSafetyProblemClassfyChart(rootChart, data){
    let datas = {
        "scaffold":"脚手架",
        "nearEdgeProtective":"临边防护",
        "aside":"通道",
        "distributionBox":"配电箱",
        "locateFence":"现场围挡",
        "locateFireproofing":"现场防火"
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
            text:'安全问题分类',
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

 /**
  * 渲染巡检问题
  * @param {*} rootElem 
  * @param {*} data 
  */
 function renderPollingCheckInfo(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
            str += `<div class="row">`;
            str += `<div class="info-img"><img src="${item['imgUrl']}"></div>`;
            str += `<div class="info-msg"><div class="info-content">${item['content']}</div>`;
            str += `<div class="info-tilte"><span>${item['author']}</span> <span>${item['findDatetime']}</span></div></div></div>`;
        });
    }else{
        str += `<div class="row">没有数据显示，请检查网络或者联系系统管理员！</div>`;
    }
    rootElem.html(str);
}

$(document).ready(function(){
    let mychart = echarts.init($('.safetyProblemSummarizing-chart').get(0));
    let mychart1 = echarts.init($('.safetyProblemClassfy-chart').get(0));
    $('.safty-polling-check-title').on('click', function(event){
        let btnConent = event.target.innerHTML;
        if (btnConent == '问题汇总'){
            $('.safetydev-pollingcheck-questionsummarizing').css('display','block');
            $('.safetydev-pollingcheck-problem').css('display','none');
        }else{
            $('.safetydev-pollingcheck-questionsummarizing').css('display','none');
            $('.safetydev-pollingcheck-problem').css('display','block');
        }
    })
    $$.ajax($$.baseUrl, $$.moduleUrls.safety4pollingcheck).then(res => {
        generateSafetySummarizingChart(mychart, res.data.problemSummarizing.safetyProblemSummarizing);
        generateSafetyProblemClassfyChart(mychart1, res.data.problemSummarizing.safetyProblemClassify);
        renderPollingCheckInfo($('.safetydev-pollingcheck-problem-info .panel-body'), res.data.questionInfos);
    });
})