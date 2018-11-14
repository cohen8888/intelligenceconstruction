/**
 * module：质量管理——重点工艺
 * author：Cohen.Lee
 * date: 2018-11-14
 */

 /**
  * 渲染问题信息
  * @param {*} rootElem 
  * @param {*} data 
  */
 function renderQuestionInfo(rootElem, data){
    let str = "";
    if (typeof data == 'object' && data instanceof Array && data.length > 0 ){
        data.forEach((item, index) => {
            str += `<div class="row">`;
            str += `<div class="info-img"><img src="${item['imgUrl']}"></div>`;
            str += `<div class="info-msg"><div class="info-content">${item['content']}</div>`;
            str += `<div class="info-tilte"><span>${item['author']}</span> <span>${item['findDatetime']}</span></div></div></div>`;
        });
    }else{
        str += `<div class="row">没有数据显示，请检查网络或者联系系统管理员！</div>`;
    }
    rootElem.html(str);
}

$(document).ready(function(){

    $$.ajax($$.baseUrl, $$.moduleUrls.quality4craft).then(res => {
        renderQuestionInfo($('.quality-craft-info .panel-body'), res.data.questionInfos);
    });
})