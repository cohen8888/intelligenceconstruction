
(function(){
	$("#global .container-fluid").load("./html/home.html");
	
	$$.moduleHomeLoad = function(){
		function handler(data){
			let projectObj = data.data.projectInfo;
			let dataObj = data.data.projectDataInfo;
			$('.prj-info-detail').get(0).innerHTML = projectObj.projectName;
			$('.prj-info-detail').get(1).innerHTML = projectObj.developmentOrganization;
			$('.prj-info-detail').get(2).innerHTML = projectObj.designOrganization;
			$('.prj-info-detail').get(3).innerHTML = projectObj.constructionOrganization;
			$('.prj-info-detail').get(4).innerHTML = projectObj.constructionAddress;
			$('.prj-info-detail').get(5).innerHTML = "总面积 " + projectObj.areaStructure + "，地上 " + 
				projectObj.overfloorArea + "，地下 " + projectObj.undergroundArea;
			$('.prj-info-detail').get(6).innerHTML = projectObj.projectConstitute;
			$('.prj-info-detail').get(7).innerHTML = projectObj.complexBuilding;
			$('.prj-info-detail').get(8).innerHTML = projectObj.teachingBuilding;
	
			$('.prj-data-info').get(0).innerHTML = dataObj.startDate;
			$('.prj-data-info').get(1).innerHTML = dataObj.temperature;
			$('.prj-data-info').get(2).innerHTML = dataObj.humidity;
			$('.prj-data-info').get(3).innerHTML = dataObj.pm25;
			$('.prj-data-info').get(4).innerHTML = dataObj.pm10;
			$('.prj-data-info').get(5).innerHTML = dataObj.nose;
			$('.prj-data-info').get(6).innerHTML = dataObj.windPower;
		}
		$$.ajax($$.baseUrl, $$.moduleUrls.home, handler);

	}
})();