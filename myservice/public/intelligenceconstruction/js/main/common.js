/**
 *  module：公共的函数库
 *  author：Cohen.Lee
 *  date：2018-11-12
 */

(function(){
    let baseUrl = "http://localhost:3000";
    let moduleUrls = {
        "globalprogress":"/api/globalprogress",                                         //总体进度
        "planschedule":"/api/planschedule",                                             //计划进度
        "projectprogress4comparison":"/api/projectprogress4comparison",                 //进度对比
        "quality4problemsummarizing":"/api/quality4problemsummarizing",                 //问题汇总
        "quality4pollingcheck":"/api/quality4pollingcheck",                             //质量巡检
        "quality4craft":"/api/quality4craft",                                           //重点工艺
        "safety4pollingcheck":"/api/safety4pollingcheck",                               //问题汇总
        "safety4fireprotection":"/api/safety4fireprotection",                           //消防管理
        "devicemanage4towercrane":"/api/devicemanage4towercrane",                       //塔吊
        "devicemanage4lift":"/api/devicemanage4lift",                                   //升降机
        "labourdev4person":"/api/labourdev4person",                                     //人员管理
        "labourdev4entranceguard":"/api/labourdev4entranceguard",                       //实名制门禁
        "energyenviroment4energy":"/api/energyenviroment4energy",                       //能源管理
        "energyenviroment4enviroment":"/api/energyenviroment4enviroment",               //环境管理
    };

    /**
    * 异步ajax获取数据的方法
    */
    function ajax(baseUrl,file){
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            let url = !file ? baseUrl :  baseUrl + file;
            xhr.open("get" ,url ,true);
            xhr.send();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.status);
                    }
                }
            }
        })
    }

    window.$$ = {};
    window.$$.baseUrl = baseUrl;
    window.$$.moduleUrls = moduleUrls;
    window.$$.ajax = ajax;

})();