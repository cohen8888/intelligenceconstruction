var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get("*",(req,res)=>{
	var result = {};
		result.error = false;
		result.status = "100000";
		result.msg = "成功";
		result.extra = "";
		result.code = "3131";
		console.log(req.url)
		fs.readFile('./routes/data'+req.url+".json","utf-8", function(err, data){
			if (!err){
				result.data = JSON.parse(data.toString());
				console.log("数据获取成功" + result);
				res.end(JSON.stringify(result));
			}else{
				console.log(err);
				console.log("读取数据文件失败")
			}
		});
})

module.exports = router;