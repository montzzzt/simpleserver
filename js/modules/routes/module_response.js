/*

响应发送模块

*/

class ResponseModule {

  constructor (options){
		if(!options){
			options = {};  
    }
    
    this.express = require("express");
    this.router = this.express.Router();
    this.FileHandler = require('../controllers/module_filehandler')
    this.fileHandler = new this.FileHandler({
      basePath: options.basePath ? options.basePath : './files/content/'
    });
    this._initRouter.call(this);
  };

  _initRouter (){
    this.router.get('/', function (req, res, next) {
      var type = req.param('type');
      this.fileHandler.deliverFile(type).then(function(infoObj){
        if(infoObj['code'] !== 1000 || !infoObj['content']){
          res.sendStatus(500);
          console.log('Error in dataDeliver: unknown error with status 1000');
          return;
        }
        res.set('Content-Type','text/plain');
        res.end(infoObj['content']);
        res.on('finish', function(){
          console.log('Info in dataDeliver: content delivered of type `' + type + '`...');
        });
        res.on('error', function(err){
          console.log('Error in dataDeliver: info is');
          console.log(err);
        });
      }.bind(this)).catch(function(errObj){
        res.sendStatus(500);
        console.log('Error in dataDeliver: error ocurrs with');
        console.log('status: ' + errObj['code'] +  ', message: ' + errObj['message']);
      }.bind(this));
    }.bind(this));
    
  }

  getRouter (){
    return this.router;
  }

};

module.exports = ResponseModule;