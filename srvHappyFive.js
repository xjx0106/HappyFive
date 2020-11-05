var http = require("http"); //获取http请求（前面的文章有详细注释）
var arr = []; //新建消息容器，存放消息集

var server = http.createServer(function(req, res) {
  var data = "";
  req.on("data", function(d) {
    data += d;
  });
  req.on("end", function() {
    var obj = JSON.parse(data);
    //解析对象，将user和msg取出
    // if (obj.id === 1) {
    arr.push(obj.x + "," + obj.y);
    // }

    // 返回数组和错误信息（没有则为空）
    var result = {
      resu: arr,
      error: null
    };
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(result)); //将打包好的对象传到前端
    res.end();
  });
});
// 监听服务
server.listen(8080, "10.20.20.74", function() {
  console.log("侦听开始");
});
