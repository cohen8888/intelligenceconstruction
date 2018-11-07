$(function(){

    var btn_cc = 'btn-primary';
    var navbar_cc = 'cm-navbar-primary';
	var pageArr = ["html/home.html", "", "html/projectprogress4global.html", "html/projectprogress4milestone.html",
					"html/projectprogress4plan.html","html/projectprogress4comparison.html","",
					"html/quality4problemsummarizing.html"];


	$("#cm-menu-scroller a").on("click", function(event){
		let e = window.event || event;
		$("#cm-menu-scroller a").each((index, elem) =>{
			$(elem).removeClass('selected');
		})
		$(e.target).addClass('selected')

		// if($(e.target).parent().attr('class') == 'cm-submenu open' ){
			
		// }

		if(pageArr[$("#cm-menu-scroller a").index(e.target)] != ''){
			$("#global .container-fluid").load(pageArr[$("#cm-menu-scroller a").index(e.target)]);
		}
		
	})

	$("#global .container-fluid").load("./html/home.html");

});
