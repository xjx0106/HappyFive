var http = require("http"); //获取http请求（前面的文章有详细注释）
// var arr = []; //新建消息容器，存放消息集
var happyFiveWhiteBall = []; //新建消息容器，存放消息集
var happyFiveBlackBall = []; //新建消息容器，存放消息集

var server = http.createServer((req, res) => {
  // 接收请求参数
  var data = "";
  req.on("data", d => {
    data += d;
  });

  // 解析请求参数
  req.on("end", () => {
    var obj = JSON.parse(data);
    if (obj.type === "play") {
      // 添加棋子
      if (obj.user == "black") {
        happyFiveBlackBall.push([obj.x, obj.y]);
      } else if (obj.user == "white") {
        happyFiveWhiteBall.push([obj.x, obj.y]);
      }
    } else if (obj.type === "delete") {
      // 置空棋盘
      happyFiveBlackBall = [];
      happyFiveWhiteBall = [];
    } else if (obj.type === "query") {
      // 普通请求，无需修改数据
    }

    // 返回数组和错误信息（没有则为空）
    var result = {
      resu: { happyFiveBlackBall, happyFiveWhiteBall },
      error: null
    };

    // 写状态
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(result)); //将打包好的对象传到前端
    res.end();
  });
});
// 监听服务
server.listen(8080, "10.20.20.74", () => {
  console.log("侦听开始");
});
