/**
 * module：计划进度
 * author：Cohen.lee
 * date：2018-11-13
 *
 */
(function(){

    
    /**
     * 渲染项目信息
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

    $$.moduleProjectprogressPlan = function(){
        $$.ajax($$.baseUrl, $$.moduleUrls.planschedule).then((data)=>{
            renderProjectInfo($('.projectprogress-plan .table tbody'), data.data.projectInfos);
        });
    }

})()
