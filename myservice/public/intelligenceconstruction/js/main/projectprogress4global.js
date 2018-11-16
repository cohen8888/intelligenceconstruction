/**
 * module：总进度
 * author：Cohen.lee
 * date：2018-11-13
 *
 */


 /**
  * 渲染总进度表格数据
  */
function renderTable(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
            str += `<tr>`;
            str += `<td>${item['taskName']}</td>`;
            str += `<td>${item['projectPeriod']}</td>`;
            str += `<td>${item['startDatetime']}</td>`;
            str += `<td>${item['completeDate']}</td>`;
            str +=`</tr>`;
        });
    }else{
        str += `<tr><td colspan="4" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
    }
    rootElem.html(str);
}

/**
 * 渲染任务信息
 */
function renderTaskInfo(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
           str += `<p><h5>${item['taskName']}</h5>`;
           str += `<ul><li><span>总工期：</span><span>${item['globalPeriod']}</span></li>`;
           str += `<li><span>已完成工期：</span><span>${item['completePeriod']}</span></li></ul></p>`;      
        });
    }else{
        str += `<p>没有数据显示，请检查网络或者联系系统管理员！</p>`;
    }
    rootElem.html(str);
}


$(document).ready(function(){
   $$.ajax($$.baseUrl, $$.moduleUrls.globalprogress).then( res =>{
       renderTable($('.projectprogress4globalTable tbody'), res.data.globalprogress);
       renderTaskInfo($('.task-info'), res.data.taskInfo);
   });
})