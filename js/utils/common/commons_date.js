class commonutils_Date{

	constructor(){
		this.regex1 = "-";
		this.regex2 = ":";
	}
	
	//将Date对象或UNIX时间戳格式化为字符串：yyyy-MM-dd HH:mm:ss 
	formateDate(d){
		var date;
		if((typeof d) == 'number'){
			date = new Date(d);
		}else if(d.constructor === Date){
			date = d; 
		}else{
			return null;
		}
		return date.getFullYear() + this.regex1 + (date.getMonth()+1) + this.regex1+date.getDate() + " " + date.getHours()+this.regex2+date.getMinutes()+this.regex2+date.getSeconds();
	}
	
	/*
	 * 将一定格式字符串格式化为Date对象
	 * (支持字符串格式：yyyy-MM-dd、 yyyy-MM-dd HH:mm:ss、yyyy-MM-dd HH:mm:ss.vv)
	 * */
	parseDate (str){  
		if(typeof str == 'string'){  
		    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);  
		    if(results && results.length>3&&results.length<=5)  
					return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3])); 
		    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);  
		    if(results && results.length==7)  
		      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));   
		    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);  
		    if(results && results.length>7)  
		      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));   
	  	}  
	  	return null;  
	}
	
};

module.exports = new commonutils_Date();