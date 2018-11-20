/**
 * module：质量管理——重点工艺
 * author：Cohen.Lee
 * date: 2018-11-14
 */

(function () {
    /**
     * 渲染问题信息
     * @param {*} rootElem 
     * @param {*} data 
     */
    function renderQuestionInfo(rootElem, data) {
        let str = "";
        if (typeof data == 'object' && data instanceof Array && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                str += '<div class="row">';
                str += '<div class="info-img"><img src="' + data[i]['imgUrl'] + '"></div>';
                str += '<div class="info-msg"><div class="info-content">' + data[i]['content'] + '</div>';
                str += '<div class="info-tilte"><span>' + data[i]['author'] + '</span> <span>' + data[i]['findDatetime'] + '</span></div></div></div>';
            }
        } else {
            str += '<div class="row">没有数据显示，请检查网络或者联系系统管理员！</div>';
        }
        rootElem.html(str);
    }

    $$.moduleQualityCraft = function () {
        function handler(data) {
            renderQuestionInfo($('.quality-craft-info .panel-body'), data.data.questionInfos);
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.quality4craft, handler);
    }

})()