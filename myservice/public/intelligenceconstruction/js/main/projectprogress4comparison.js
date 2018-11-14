/**
 * module：进度对比
 * author：Cohen.lee
 * date：2018-11-13
 *
 */


 /**
  * 
  * @param {*} rootElem 渲染元素的根元素
  * @param {*} data 渲染的数据
  */
function renderProjectInfo(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
            str += `<tr>`;
            str += `<td>${item['taskName']}</td>`;
            str += `<td>${item['duration']}</td>`;
            str += `<td>${item['startDate']}</td>`;
            str +=`</tr>`;
        });
    }else{
        str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
    }
    rootElem.html(str);
}


$(document).ready(function(){
    $$.ajax($$.baseUrl, $$.moduleUrls.projectprogress4comparison).then(res => {
        renderProjectInfo($('.col-sm-4 .panel .panel-body .table tbody'), res.data.projectInfos);
    });
})