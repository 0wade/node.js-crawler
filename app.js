//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
//目标网址


var url = 'http://pic.enrz.com/';
//本地存储目录
var dir = './images';
//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});



//发送请求
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('img').each(function() {
            var src = $(this).attr('src');
            if (!src) {return;}
            console.log('正在下载' + src);
            download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
            console.log('下载完成');
        });
    }
});


//下载方法
var download = function(url, dir, filename){
	if (filename.indexOf('gif')>=0||filename.indexOf('png')>=0||filename.indexOf('jpg')>=0){
	    request.head(url, function(err, res, body){
	    	console.log(filename);
	        request(url).on('error',function(error){
	        	console.log(error);
	        }).pipe(fs.createWriteStream(dir + "/" + filename)).on('error',function(error){
	        	console.log(error);
	        });
	    });
	}else{
		return;
	}
};
