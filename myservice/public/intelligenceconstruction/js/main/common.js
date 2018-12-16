/**
 *  module：公共的函数库
 *  author：Cohen.Lee
 *  date：2018-11-12
 */
(function(){
  let baseUrl = "http://localhost:3000";
  let moduleUrls = {
      "overview":"/api/projectinfooverviews",                                         //总览
      "home":"/api/home",
      "globalprogress":"/api/globalprogress",                                         //总体进度
      "planschedule":"/api/planschedule",                                             //计划进度
      "projectprogress4milestone":"/api/projectprogress4milestone",                   //里程碑进度
      "projectprogress4comparison":"/api/projectprogress4comparison",                 //进度对比
      "quality4problemsummarizing":"/api/quality4problemsummarizing",                 //问题汇总
      "quality4pollingcheck":"/api/quality4pollingcheck",                             //质量巡检
      "quality4craft":"/api/quality4craft",                                           //重点工艺
      "safety4pollingcheck":"/api/safety4pollingcheck",                               //问题汇总
      "safety4fireprotection":"/api/safety4fireprotection",                           //消防管理
      // "devicemanage4towercrane":"/api/devicemanage4towercrane",                       //塔吊
      // "devicemanage4lift":"/api/devicemanage4lift",                                   //升降机
      "getAllElevatorInfo":"/api/getAllElevatorInfo",                                 //升降机
      "getAllTowerInfo":"/api/getAllTowerInfo",                                       //塔吊
      "labourdev4person":"/api/labourdev4person",                                     //人员管理
      //"getAllPeopleInfo":"/api/getAllPeopleInfo",                                     //人员管理中工人实时信息
      //"getAllWorkerNum":"/api/getAllWorkerNum",                                       //获取全部人员在场数据以及工种分类的人员在场数据
      "labourdev4entranceguard":"/api/labourdev4entranceguard",                       //实名制门禁
      "energyenviroment4energy":"/api/energyenviroment4energy",                       //能源管理
      "energyenviroment4enviroment":"/api/energyenviroment4enviroment",               //环境管理
      "login":"/login",
      "loginSuccess":"/intelligenceconstruction/overview.html",
      "loginFailure":"/intelligenceconstruction/login.html",
      "index":"/intelligenceconstruction/index.html",
  };

  /**
  * 异步ajax获取数据的方法
  */
  // function ajax(baseUrl,file){
  //     return new Promise((resolve,reject)=>{
  //         let xhr = new XMLHttpRequest();
  //         let url = !file ? baseUrl :  baseUrl + file;
  //         xhr.open("get" ,url ,true);
  //         xhr.send();
  //         xhr.onreadystatechange = function(){
  //             if(xhr.readyState == 4){
  //                 if(xhr.status == 200){
  //                     resolve(JSON.parse(xhr.responseText));
  //                 }else{
  //                     reject(xhr.status);
  //                 }
  //             }
  //         }
  //     })
  // }
  function ajax(baseUrl,file, fn){
      let xhr = new XMLHttpRequest();
      let url = !file ? baseUrl :  baseUrl + file;
      xhr.open("get" ,url ,true);
      xhr.send();
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  fn(JSON.parse(xhr.responseText));
              }
          }
      }
  }
  window.$$ = {};
  window.$$.baseUrl = baseUrl;
  window.$$.moduleUrls = moduleUrls;
  window.$$.ajax = ajax;


  //---------------------------------------------------
  // 日期格式化
  // 格式 YYYY/yyyy/YY/yy 表示年份
  // MM/M 月份
  // W/w 星期
  // dd/DD/d/D 日期
  // hh/HH/h/H 时间
  // mm/m 分钟
  // ss/SS/s/S 秒
  //---------------------------------------------------
  Date.prototype.Format = function(formatStr){
      var str = formatStr;
      var Week = ['日','一','二','三','四','五','六'];
      
      str=str.replace(/yyyy|YYYY/,this.getFullYear());
      str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
      
      str=str.replace(/MM/,this.getMonth() >= 9 ? (this.getMonth() + 1): '0' + (this.getMonth() + 1));
      str=str.replace(/M/g,this.getMonth() + 1);
      
      str=str.replace(/w|W/g,Week[this.getDay()]);
      
      str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
      str=str.replace(/d|D/g,this.getDate());
      
      str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
      str=str.replace(/h|H/g,this.getHours());
      str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
      str=str.replace(/m/g,this.getMinutes());
      
      str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
      str=str.replace(/s|S/g,this.getSeconds());
      
      return str;
  }

  //+---------------------------------------------------
  //| 求两个时间的天数差 日期格式为 YYYY-MM-dd
  //+---------------------------------------------------
  function daysBetween(DateOne, DateTwo){
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));
     
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));
     
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return Math.abs(cha);
  }
   
   
  //+---------------------------------------------------
  //| 日期计算
  //+---------------------------------------------------
  Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
      case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
      case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
      case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
      case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
      case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
      case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
  }
   
  //+---------------------------------------------------
  //| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
  //+---------------------------------------------------
  Date.prototype.DateDiff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string' ){ //如果是字符串转换为日期型
      dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
      case 's' :return parseInt((dtEnd - dtStart) / 1000);
      case 'n' :return parseInt((dtEnd - dtStart) / 60000);
      case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
      case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
      case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
      case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
      case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
  }
   

   
  //+---------------------------------------------------
  //| 日期合法性验证
  //| 格式为：YYYY-MM-DD或YYYY/MM/DD
  //+---------------------------------------------------
  function IsValidDate(DateStr){
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;
    if(sDate=='') return true;
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');
    if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
    {
    var t=new Date(sDate.replace(/\-/g,'/'));
    var ar = sDate.split(/[-/:]/);
    if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())
    {
    //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
    return false;
    }
    }
    else
    {
    //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
    return false;
    }
    return true;
  }
   
  //+---------------------------------------------------
  //| 日期时间检查
  //| 格式为：YYYY-MM-DD HH:MM:SS
  //+---------------------------------------------------
  function CheckDateTime(str){
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
    var r = str.match(reg);
    if(r==null)return false;
    r[2]=r[2]-1;
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);
    if(d.getFullYear()!=r[1])return false;
    if(d.getMonth()!=r[2])return false;
    if(d.getDate()!=r[3])return false;
    if(d.getHours()!=r[4])return false;
    if(d.getMinutes()!=r[5])return false;
    if(d.getSeconds()!=r[6])return false;
    return true;
  }
   
  //+---------------------------------------------------
  //| 把日期分割成数组
  //+---------------------------------------------------
  Date.prototype.toArray = function(){
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
  }
   
  //+---------------------------------------------------
  //| 取得日期数据信息
  //| 参数 interval 表示数据类型
  //| y 年 m月 d日 w星期 ww周 h时 n分 s秒
  //+---------------------------------------------------
  Date.prototype.DatePart = function(interval){
    var myDate = this;
    var partStr='';
    var Week = ['日','一','二','三','四','五','六'];
    switch (interval){
      case 'y' :partStr = myDate.getFullYear();break;
      case 'm' :partStr = myDate.getMonth()+1;break;
      case 'd' :partStr = myDate.getDate();break;
      case 'w' :partStr = Week[myDate.getDay()];break;
      case 'ww' :partStr = myDate.WeekNumOfYear();break;
      case 'h' :partStr = myDate.getHours();break;
      case 'n' :partStr = myDate.getMinutes();break;
      case 's' :partStr = myDate.getSeconds();break;
    }
    return partStr;
  }
   
  //+---------------------------------------------------
  //| 取得当前日期所在月的最大天数
  //+---------------------------------------------------
  Date.prototype.MaxDayOfDate = function(){
    var myDate = this;
    var ary = myDate.toArray();
    var date1 = (new Date(ary[0],ary[1]+1,1));
    var date2 = date1.dateAdd(1,'m',1);
    var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));
    return result;
  }
  
   
  //+---------------------------------------------------
  //| 字符串转成日期类型
  //| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
  //+---------------------------------------------------
  function StringToDate(DateStr){
     
    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate)){
      //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
      var arys= DateStr.split('-');
      myDate = new Date(arys[0],--arys[1],arys[2]);
    }
    return myDate;
  }

  $$.StringToDate = StringToDate;


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
    
    
    function timingDate(){
      let currentDate = new Date().Format('yyyy年MM月DD日 HH:mm:ss 星期w').toString();
      $('.current-date').html(currentDate);
      setTimeout(timingDate, 1000);
    }
    timingDate();
})();

 

