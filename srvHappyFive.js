var http = require("http"); //获取http请求（前面的文章有详细注释）
// var arr = []; //新建消息容器，存放消息集
var happyFiveWhiteBall = []; //新建消息容器，存放消息集
var happyFiveBlackBall = []; //新建消息容器，存放消息集
var lastPlayer = "any"; // 储存上一个玩家
var loading = 0;

var server = http.createServer((req, res) => {
  // 接收请求参数
  var data = "";
  req.on("data", d => {
    data += d;
  });

  // 解析请求参数
  req.on("end", () => {
    try {
      var obj = JSON.parse(data);
      if (obj.type === "play") {
        // 添加棋子
        if (obj.user == "black") {
          happyFiveBlackBall.push([obj.x, obj.y]);
          lastPlayer = "black";
        } else if (obj.user == "white") {
          happyFiveWhiteBall.push([obj.x, obj.y]);
          lastPlayer = "white";
        }
      } else if (obj.type === "delete") {
        // 置空棋盘
        happyFiveBlackBall = [];
        happyFiveWhiteBall = [];
        lastPlayer = "any";
      } else if (obj.type === "query") {
        // 只是请求而已。不做数据处理。
      }

      var loadingText = "";
      switch (loading) {
        case 0:
          loadingText = "——";
          loading++; // 1
          break;
        case 1:
          loadingText = "\\";
          loading++; // 2
          break;
        case 2:
          loadingText = "|";
          loading++; // 3
          break;
        case 3:
          loadingText = "/";
          loading = 0;
          break;
      }

      process.stdout.write("\r\x1b[K");
      process.stdout.write(
        loadingText +
          "\t服务端,请求上来的json正常!!!!!! :)\t时间" +
          new Date().getTime()
      );
    } catch {
      console.log("服务端,请求上来的json的parse出问题了...... :(");
    }

    // 返回数组和错误信息（没有则为空）
    var result = {
      resu: { happyFiveBlackBall, happyFiveWhiteBall, lastPlayer },
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
server.listen(8090, "10.20.20.74", () => {
  console.log("8090端口，Happy Five服务，侦听开始...\\O/");
  // process.stdout.write("000");
  // process.stdout.write("\n111");
  process.stdout.write("\n222");
  // process.stdout.write("333");
});
