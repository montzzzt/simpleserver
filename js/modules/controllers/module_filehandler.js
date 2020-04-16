/*
文件请求模块
*/

class fileHandlerModule{
	
	constructor(options){
        if(!options){
            options = {};  
		}

		this.basePath = options.basePath ? options.basePath : './files/';

		this.filename = 'DataBlock';
		this.fileCachePool = {};

		this.saferBuffer = require('safer-buffer').Buffer;
        this.commonsio = require('../../utils/common/commons_io');
	}

	/*
	
	privates

	*/
	_buildFilePath(type){
		var t = typeof type === 'string' ? type.trim().toLowerCase().charAt(0) : 'n';
		if(t === 'r'){
			return this.basePath + 'Raspberry.txt';	
		}else{
			return this.basePath + 'Nintendo.txt';
		}
	}

	/*
	
	publics

	*/
	deliverFile(type){
		return new Promise(function(resolve, reject){
			if(this.fileCachePool[type]){
				resolve({
					code: 1000,   //成功解码源文件
					message: 'ok',
					content: this.fileCachePool[type].toString('utf8')
				});
			}else{
				this.commonsio.readFile(this._buildFilePath(type)).then(function(content){
					if(!content){
						reject({
							code: '1052',   //1052错误：解码密钥无法解码源文件
							message: 'error in decrypting source file'
						});
						return;
					}
					this.fileCachePool[type] = this.saferBuffer.from(content, 'utf8');
					resolve({
						code: 1000,   //成功解码源文件
						message: 'ok',
						content: content
					});
				}.bind(this)).catch(function(err){
					reject({
						code: '1061',   //1061错误：指定的源文件无法打开
						message: 'source file could not be opened'
					});
				}.bind(this));
			}
		}.bind(this));
	};

	clearCache (){
		for(var i = 0, attrs = Object.keys(this.fileCachePool), len = attr.length; i< len; i++){
			delete this.fileCachePool[attrs[i]];
		}
	};

}

module.exports = fileHandlerModule;