class FileHandlerModule{
	
	constructor (options){
		if(!options){
			options = {};  
		}

		this.fs = require('fs');
		this.commonsDate = require('../../utils/common/commons_date');

		//后期：需要将key部分放到数据库中
		this.fs.readFile('files/keys/keysdata.json', function (err, datastr) {
            if (!err) {
                console.log('keysdata read succeeds...');
                this.data=JSON.parse(datastr);
            } else {
            	console.log('keysdata read errors...');
				console.log(err.message);
				this.data = null;
            }
        }.bind(this));
	}
	
	

	/*
	* 改：增加类型判断并返回错误代码
	* 后期：增加频次限制
	*/
	verifyAK (ak){
		if(this.data==null){
			return Promise.reject({
				code: 1001, //1001错误：key信息库不可用
				message: 'Error From keyHandler: key info is not avaliable...'
			});
		}
		var ctimemill = new Date().getTime();
		var keys_u = this.data.using;
		for(var i=0;i<keys_u.length;i++){
			var key_u = keys_u[i];
			if(key_u.ak == ak){
				var date = this.commonsDate.parseDate(key_u.expires);
				if(date){
					if(date.getTime()>ctimemill){
						return Promise.resolve({
							code: 1000,  //验证通过
						}); 
					}else{
						return Promise.reject({
							code: 1003, //1001错误：key过期
							message: 'Error From keyHandler: key is outof date...'
						});
					}
				}else{
					return Promise.reject({
						code: 1003, //1001错误：key过期
						message: 'Error From keyHandler: key is outof date...'
					});
				}
			}
		}
		return Promise.reject({
			code: 1002, //1002错误：找不到key
			message: 'Error From keyHandler: could not find ak...'
		});
	}
	
};

module.exports = FileHandlerModule;