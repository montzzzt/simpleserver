var express = require("express"),
	path = require('path'),
    app_main = express();
var filebasepath = './files/content/',
	basepathstr = '/LIM',
    port_server = 8078;
var Verifier = require('./js/modules/routes/module_verify'),
    Responser = require('./js/modules/routes/module_response'); 
    
//动态请求(ak验证，数据生成)
app_main.use(basepathstr+'/ContentDeliver', new Verifier().getRouter());
app_main.use(basepathstr+'/ContentDeliver', new Responser({
    basePath: filebasepath
}).getRouter());
app_main.listen(port_server, function(err){
    if(!err){
        console.log('Info in appMain: server starts, listening for port ' + port_server + '....');  
    }else{
        console.log('Error in appMain: error in server start, info is') 
        console.log(err.message);
    }
});

