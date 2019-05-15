/**
 * 参数介绍：
 * 1. PORT : 服务端口号 默认 ：8082
 * 2. FILENAME : 第一个入口文件名称 默认 ：index.html
 * 3. DIR : 入口文件所在跟目录: 默认 ：当前server.js 所在目录
 * 
 * 使用：
 * 1. 直接修改 PORT FILENAME DIR 执行：node server.js
 * 2. 直接执行 node server.js 8081 index2.html /home/bjsasc/sjs
 */

if (process.argv[2] == "help" || process.argv[2] == "--help" || process.argv[2] == "-h") {
    console.log('\n---- 帮助信息 ----\n');
    console.log('使用：node server.js [options] \n');
    console.log('options: \n');
    console.log('PORT        服务端口号 默认 ：8082');
    console.log('FILENAME    第一个入口文件名称 默认 ：index.html');
    console.log('DIR         入口文件所在跟目录: 默认 ：当前server.js 所在目录 \n');
    console.log('示列:       node server.js 8081 index2.html /home/bjsasc/sjs');
} else {
    // server port 
    const PORT = process.argv[2] || 8082;
    // init filename
    const FILENAME = process.argv[3] || "index.html";
    // server dir
    const DIR = process.argv[4] || __dirname;

    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var path = require('path');

    var mine = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };

    var server = http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname;
        if (pathname == '' || pathname == '/') pathname = FILENAME;
        var realPath = path.join(DIR, pathname);
        //console.log(realPath);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end();
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    });
    server.listen(PORT);
    console.log("Server runing at port: " + PORT + ".");
}