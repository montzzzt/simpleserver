/*

权限验证模块

*/

class VerifyModule {

  constructor (options){
		if(!options){
			options = {};  
    }
    
    this.express = require("express");
    this.router = this.express.Router();
    this.KeyHandler = require('../controllers/module_keyhandler');
    this.keyHandler = new this.KeyHandler();
    this._initRouter.call(this);
  };

  _initRouter (){
    this.router.get('/', function (req, res, next) {
      var ak = req.param('ak');
      if(ak){
        this.keyHandler.verifyAK(ak).then(function(infoObj){
          if(infoObj['code'] !== 1000){
            console.log('Error in keyChecker: access of ' + ak + ' forbidden by unknown error with status 1000');
            res.sendStatus(403);
            return;
          }
          console.log('Info in keyChecker: ak passed by ak '+ak);
          next();
        }.bind(this)).catch(function(errObj){
          console.log('Error in keyChecker: access of ' + ak + ' forbidden');
          console.log('status: ' + errObj['code'] +  ', message: ' + errObj['message']);
          res.sendStatus(403);
        }.bind(this));
      }else{
        console.log('Error in keyChecker: ak is not exisited...');
        res.sendStatus(404);
      }

    }.bind(this));
  }

  getRouter (){
    return this.router;
  }

};

module.exports = VerifyModule;