class CommonIO {

	constructor (options){
		if(!options){
			options = {};  
    	}
    
		this.fs = require('fs');
	};

	readFile (path, encoding, callback_ok, callback_err){
		if(!path){
			return;
		}

		var enc = encoding ? encoding : 'utf8', datablock = '';
		return new Promise(function(resolve, reject){
			this.rs_ = this.fs.createReadStream(path); 
			this.rs_.setEncoding(enc);  
			this.rs_.on('data', function(block){
				datablock += block;
			}.bind(this));
			this.rs_.on('end', function(){
				console.log('Info: data read finished...');
				resolve(datablock);
				if(callback_ok){
					callback_ok.call(this);
				}
			}.bind(this));
			this.rs_.on('error', function(err){
				console.log('Error: data read error...');
				console.log(err.message);
				reject(err.message);
				if(callback_err){
					callback_err.call(this, err);
				}
			}.bind(this));
		}.bind(this));
	};

	writeFile (datablock, path, interval, encoding, callback_ok, callback_err){
		if(!datablock || !path){
			return;
		}
		var data = typeof datablock === 'string' ? datablock: JSON.stringify(datablock);
		var interv = interval ? interval : 50, enc = encoding ? encoding : 'utf8';
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				this.ws = this.fs.createWriteStream(path, {
					encoding: enc,
					flag: 'w'
				});
				this.ws.setDefaultEncoding(enc);
				this.ws.end(data);
				this.ws.on('finish', function(){
					console.log('Info: data written finished...');
					resolve(1);
					if(callback_ok){
						callback_ok.call(this);
					}
				}.bind(this));
				this.ws.on('error',  function(err){
					console.log('Error: data write error...');
					console.log(err.message);
					reject(-1);
					if(callback_err){
						callback_err.call(this, err);
					}
				}.bind(this));
			}.bind(this), interv);
		}.bind(this));
	};
	
}

module.exports = new CommonIO();