/**
 * module:设备管理-升降机
 * author:Cohen.Lee
 * date:2018-11-14
 */

(function () {


    let cacheData = {};
    let seriesData = [];
    /**
     * 渲染塔吊图形
     * 
     */
    function renderlift(rootElem, data) {
        cacheData = {};
        seriesData = [];
        //处理图表数据
        var scaleData = [];
        for (var i = 0; i < data.length; i++) {
            let obj = {};
            obj.name = data[i].name;
            obj.value = (100 / data.length);
            obj.state = data[i].state;
            scaleData.push(obj);
        }
        //图标样式
        var rich = {
            white: {
                color: '#ddd',
                align: 'center',
                padding: [5, 0]
            }
        };

        var placeHolderStyle = {
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

        for (var i = 0; i < scaleData.length; i++) {
            seriesData.push({
                value: scaleData[i].value,
                name: scaleData[i].name,
                state: scaleData[i].state,
                //visualMap: false,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        shadowBlur: 50,
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    },
                    emphasis: {
                        color: '#da7b55'
                    }
                },
            }, {
                value: 2,
                name: '',
                itemStyle: placeHolderStyle
            });
        }

        var seriesObj = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ['55%', '80%'],
            center: ['50%', '50%'],
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#fff',
                        formatter: function (params) {
                            if (params.name != '') {
                                return params.data.name + '\n状态：' + params.data.state;
                            } else {
                                return '';
                            }
                        },
                        rich: rich
                    },
                    labelLine: {
                        show: true
                    }
                }
            },
            data: seriesData
        }];
        //图形选项
        let option = {
            title: {
                text: data.length + '个\n升降机监测点位置',
                left: 'center',
                x: 'center',
                y: 'center',
                padding: [24, 0],
                textStyle: {
                    color: '#fff',
                    fontSize: 18,
                    align: 'center'
                }
            },
            tooltip: {
                show: false
            },
            legend: {
                show: false
            },
            color: ['#2fe2f0', '#2fe2f0', '#2fe2f0', '#2fe2f0', '#2fe2f0'],
            toolbox: {
                show: false
            },
            series: seriesObj
        }

        if (option && typeof option === "object") {
            rootElem.setOption(option, true);
        }
    }

    /**
     * 渲染塔吊基本信息
     */
    function renderLiftTableInfo(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                cacheData[data[i]['name']] = data[i];
                str += "<tr data-name='" + data[i]['name'] + "'>";
                str += "<td>" + data[i]['name'] + "</td>";
                str += "<td>" + data[i]['model'] + "</td>";
                str += "<td>" + data[i]['manufacturer'] + "</td>";
                str += "<td>" + data[i]['linker'] + "</td>";
                str += "</tr>";
            }
        } else {
            str += '<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>';
        }
        rootElem.html(str);
    }
    $$.moduleDeviceManageLift = function () {
        function handler(data) {
            let getAllElevatorInfoData = data.data.liftInfo;
            let mychart = echarts.init($('#lift-chart').get(0));
            renderlift(mychart, data.data.liftInfo);
            renderLiftTableInfo($('.dev-manage-lift-title-info .table tbody'), getAllElevatorInfoData);
            $('.dev-manage-lift-title-info table').on('mouseover', function (event) {
                let key = event.target.parentNode.getAttribute('data-name');
                if (key) {
                    let str = "";
                    str += "<ul>";
                    str += "<li class='popup-title'>基本信息</li>";
                    str += "<li><span>名称：</span><span>" + cacheData[key]['name'] + "</span></li>";
                    str += "<li><span>型号/规格：</span><span>" + cacheData[key]['model'] + "</span></li>";
                    str += "<li><span>厂家：</span><span>" + cacheData[key]['manufacturer'] + "</span></li>";
                    str += "<li><span>联系人：</span><span>" + cacheData[key]['linker'] + "</span></li>";
                    str += "<li><span>联系电话：</span><span>" + cacheData[key]['linkerPhone'] + "</span></li>";
                    str += "<li class='popup-title'>巡检记录</li>";
                    str += "<li><span>检查时间：</span><span>" + cacheData[key]['checkDate'] + "</span></li>";
                    str += "<li><span>检查人：</span><span>" + cacheData[key]['checkUser'] + "</span></li>";
                    str += "</ul>";
                    //str += "</div>";
                    $('.popup-message ul').remove();
                    $('.popup-message').append($(str));
                    $('.popup-message').css('display', 'block');
                }
            });
            $('.dev-manage-lift-title-info table').on('mouseout', function (event) {
                $(".popup-message").css('display', 'none');
            });
        }

        $$.ajax($$.baseUrl, $$.moduleUrls.getAllElevatorInfo, handler);
    }

})()