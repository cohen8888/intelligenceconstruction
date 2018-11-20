/**
 * module：进度管理——里程碑
 * author：Cohen.Lee
 * date：2018-11-20
 * 
 */

 (function(){

    $$.moduleProjectprogressMilestone = function(){
        function handler(data){
            let contentElements = $('.projectprogress-milestone .elem-content');
            contentElements.each(function(index, elem){
                let obj = data.data[index];
                elem.children[0].src = obj.imgUrl;
                elem.children[1].innerHTML = obj.projectDate + "<br/>" + obj.description;
            });
        }
        $$.ajax($$.baseUrl, $$.moduleUrls.projectprogress4milestone, handler);
    }
 })()