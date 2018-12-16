let express = require('express');
let router = express.Router();

let msgHeader =  {
    "error": false,
    "msg": "成功",
    "code": "3131",
    "extra": "",
    "data": null
};


router.post('/', (req, res) => {
    let data = req.body;
    console.log(data);
    if(data.staffName == 'admin' && data.password == '123'){
        msgHeader.status = '100000';
    } else if (data.staffName == 'a'){
        msgHeader.status = '100002';
    } else if (data.password == '111'){
        msgHeader.status = '100003';
    }
    res.send(msgHeader);
})

module.exports = router;