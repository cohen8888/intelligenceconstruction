/**
 * module:劳务实名制管理——人员管理
 * author:Cohen.Lee
 * date:2018-11-14
 */
(function(){
    function generatePersonChart(rootChart, data){
        let datas = {
            "woodworking":"木工",
            "steelBender":"钢筋工",
            "bricklayer":"砌筑工",
            "backman":"杂工",
            "coagulationGeotechnicalWorker":"怒凝土工",
            "plasterer":"抹灰工",
            "waterproofWorker":"防水工",
            "electricWelder":"电焊工",
            "electrician":"电工"
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
            legend: {
                selectedMode: false,
                orient: 'horizontal',
                x: 'center',
                textStyle:{
                    color:'#9b9ba0',
                    fontSize:14,
                    align:'bottom'
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
                bottom: 45,
                itemWidth: 10,  // 设置宽度
                itemHeight: 10, // 设置高度
                itemGap: 20, // 设置间距
                data:legendDatas
            },
            series: [
                {
                    name:'人员管理',
                    type:'pie',
                    radius: ['25%', '50%'],
                    center: ['50%', '40%'],
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
                    color:['#8aeda9','#7652fa','#b423dd','#fbb02f','#1296e8','#18d469','#ec7981','#fddda2','#ffa551'],
                    data:chartDatas
                }
            ]
        };
    
        if (option && typeof option === "object") {
            rootChart.setOption(option, true);
        }
     }
    
    
    
    /**
      * 渲染人员管理表格信息
      */
     function renderTableInfo(rootElem, data){
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
            data.forEach((item, index) => {
                str += `<tr>`;
                str += `<td>${item['numNo']}</td>`;
                str += `<td>${item['name']}</td>`;
                str += `<td>${item['workNo']}</td>`;
                str += `<td>${item['gender']}</td>`;
                str +=`</tr>`;
            });
        }else{
            str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
        }
        rootElem.html(str);
     }
    
    
    $$.moduleLabourdevPerson = function(){
        let mychart = echarts.init($('#person-info').get(0));
        $$.ajax($$.baseUrl, $$.moduleUrls.labourdev4person).then(res => {
            generatePersonChart(mychart, res.data.localeWorkerDistribution);
            renderTableInfo($('.labourdev-person-info .table tbody'), res.data.workerInfos);
            $('#currentWorker').html(res.data.globalInfo.currentWorker);
            $('#grandTotalWorker').html(res.data.globalInfo.grandTotalWorker);
        });
    }

})()