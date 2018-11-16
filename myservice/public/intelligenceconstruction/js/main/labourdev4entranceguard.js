/**
 * module:劳务实名制管理——实名制管理
 * author:Cohen.Lee
 * date:2018-11-15
 */







/**
 * 渲染实名制门禁管理列表
 * @param {*} rootElem 
 * @param {*} data 
 */
 function renderTableInfo(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
            str += `<tr>`;
            str += `<td>${item['workNo']}</td>`;
            str += `<td>${item['name']}</td>`;
            str += `<td>${item['gender']}</td>`;
            str += `<td>${item['company']}</td>`;
            str +=`</tr>`;
        });
    }else{
        str += `<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>`;
    }
    rootElem.html(str);
 }

 
$(document).ready(function(){
    $$.ajax($$.baseUrl, $$.moduleUrls.labourdev4entranceguard).then(res => {
        renderTableInfo($('.labour-entranceguard-info .table tbody'), res.data.workerInfos);
        $('#currentWorker').html(res.data.globalInfo.currentWorker);
        $('#grandTotalWorker').html(res.data.globalInfo.grandTotalWorker);
    });
})