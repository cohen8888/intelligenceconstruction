/**
 *  module：公共的函数库
 *  author：Cohen.Lee
 *  date：2018-11-12
 */
    (function(){
        let baseUrl = "http://localhost:3000";
        let moduleUrls = {
            "home":"/api/home",
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

    var btn_cc = 'btn-primary';
    var navbar_cc = 'cm-navbar-primary';
	var pageArr = ["html/home.html", "", "html/projectprogress4global.html", "html/projectprogress4milestone.html",
					"html/projectprogress4plan.html","html/projectprogress4comparison.html","",
					"html/quality4problemsummarizing.html","html/quality4pollingcheck.html","html/quality4craft.html","",
					"html/safety4pollingcheck.html","html/safety4videomonitoring.html","html/safety4fireprotection.html",
					"html/safety4monitoring.html","","html/devicemanage4towercrane.html","html/devicemanage4lift.html","",
					"html/energyenviroment4energy.html","html/energyenviroment4enviroment.html","","html/labourdev4person.html",
					"html/labourdev4entranceguard.html","","html/informationdev4file.html","html/informationdev4repository.html",
					"html/setting.html"
				];
	$("#cm-menu-scroller a").on("click", function(event){
		let e = window.event || event;
		if(pageArr[$("#cm-menu-scroller a").index(e.target)] != ''){
			$('.cm-menu-items li').removeClass('active');
			$('.cm-submenu li').removeClass('active');
            this.parentNode.setAttribute('class', 'active');
            //$(this).attr('class', 'selected');
			$("#global .container-fluid").load(pageArr[$("#cm-menu-scroller a").index(e.target)]);
		}
	});