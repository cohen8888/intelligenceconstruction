/**
 * module：计划进度
 * author：Cohen.lee
 * date：2018-11-13
 *
 */
(function () {
    
    /**
     * 渲染项目信息
     */
    function renderProjectInfo(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                str += '<tr>';
                str += '<td>' + data[i]['taskName'] + '</td>';
                str += '<td>' + data[i]['duration'] + '</td>';
                str += '<td>' + data[i]['startDate'] + '</td>';
                str += '</tr>';
            }
        } else {
            str += '<tr><td colspan="3" style="text-align:center;">没有数据显示，请检查网络或者联系系统管理员！</td></tr>';
        }
        rootElem.html(str);
    }

    $$.moduleProjectprogressPlan = function () {
        function handler(data) {
            renderProjectInfo($('.projectprogress-plan .table tbody'), data.data.projectInfos);
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.planschedule, handler);
    }

})()
