<template>
  <div class="happy-five">
    <div
      id="happy-five-canvas"
      class="happy-five-canvas"
      @click="clickHappyFive"
    ></div>
  </div>
</template>
<script>
import G6 from "@antv/g6"; // 导入G6图引擎
export default {
  name: "HappyFive",
  data() {
    return {
      //happFive
      happyX: "", // 所下的x坐标
      happyY: "", // 所下的y坐标
      happyFiveBlackBall: [], // 黑子数据
      happyFiveWhiteBall: [], // 白子数据
      happyFiveScale: 15, // 缩放美化
      happyFiveUser: "black", // 默认玩家
      nowYourTurnHappyFive: true, // 是否轮到自己（用于显示红绿点和是否持续请求）
      constantHappyQuery: false, // 是否开启持续请求
      isStartHappy: false, // 开始happy了吗？
      isShowHappyFive: true // 是否显示
    };
  },
  created() {},
  mounted() {},
  watch: {
    constantHappyQuery() {
      console.log("触动了游戏开关 " + this.constantHappyQuery);
      if (this.constantHappyQuery) {
        this.constantHappy();
      }
    }
  },
  methods: {
    // 清空happyFive并开始
    startHappyFive() {
      this.playHappyFive("delete");
      this.isStartHappy = false;
      this.isShowHappyFive = true;
    },
    // 提交请求
    playHappyFive(type) {
      // type: delete play query
      var httpRequest = new XMLHttpRequest();
      // httpRequest.addEventListener("load", res => {
      //   console.log(res);
      // });
      httpRequest.onreadystatechange = res => {
        // Process the server response here.
        // console.log(res);
        // console.log(res.target);
        // console.log(res.target.response);
        if (res.target.response !== "") {
          this.happyFiveWhiteBall = JSON.parse(
            res.target.response
          ).resu.happyFiveWhiteBall;
          this.happyFiveBlackBall = JSON.parse(
            res.target.response
          ).resu.happyFiveBlackBall;
        }

        // console.log(JSON.parse(res.target.response).resu.lastPlayer);
        if (res.target.response !== "") {
          if (
            this.happyFiveUser !==
            JSON.parse(res.target.response).resu.lastPlayer
          ) {
            this.nowYourTurnHappyFive = true;
          } else {
            this.nowYourTurnHappyFive = false;
          }
        }

        this.renderHappyFive();
      };

      // 声明请求体
      let obj = {
        x: this.happyX,
        y: this.happyY,
        type: type,
        user: this.happyFiveUser
      };

      httpRequest.open("POST", "http://10.20.20.74:8090/", true);
      httpRequest.send(JSON.stringify(obj));
    },
    // 按了画布，获取坐标
    clickHappyFive(e) {
      if (!this.isShowHappyFive) {
        return this.$message.warning("happy five隐藏着，要先显示出来");
      }
      // 点击第一颗，开始
      if (this.isStartHappy === false) {
        this.isStartHappy = true;
      }
      if (!this.nowYourTurnHappyFive) {
        return this.$message.info("还没轮到你");
      }
      console.log("click pos: " + e.offsetX + " " + e.offsetY);
      let currentX = Math.round(e.offsetX / this.happyFiveScale);
      let currentY = Math.round(e.offsetY / this.happyFiveScale);
      // let currentBall = [currentX, currentY];
      // if (this.happyFiveUser === "black") {
      //   this.happyFiveBlackBall.push(currentBall);
      // } else if (this.happyFiveUser === "white") {
      //   this.happyFiveWhiteBall.push(currentBall);
      // }
      // this.happyY = currentY;
      // this.happyX = currentX;
      this.happyY = currentY;
      this.happyX = currentX;
      // this.renderHappyFive();
      this.playHappyFive("play");
      this.nowYourTurnHappyFive = false;
    },
    // 隐藏整个happyFive
    hideHappyFive() {
      console.log("隐藏happy five");
      this.isShowHappyFive = false;
      this.renderHappyFive();
    },
    // 显示整个happyFive
    showHappyFive() {
      console.log("显示happy five");
      this.isShowHappyFive = true;
      this.renderHappyFive();
    },
    // 渲染本地happyFive数据
    renderHappyFive() {
      console.log("渲染");
      document.getElementById("happy-five-canvas").innerHTML = "";
      let currentId = 0;
      let currentNodes = [];
      if (this.happyFiveBlackBall && this.happyFiveBlackBall.length > 0) {
        this.happyFiveBlackBall.forEach(item => {
          let singleBall = {
            id: JSON.parse(JSON.stringify(currentId)),
            x: item[0] * this.happyFiveScale,
            y: item[1] * this.happyFiveScale,
            type: "circle",
            size: [10, 10],
            style: {
              fill: "#708090",
              stroke: "#708090"
            }
          };
          currentNodes.push(singleBall);
          currentId++;
        });
      }
      if (this.happyFiveWhiteBall && this.happyFiveWhiteBall.length > 0) {
        this.happyFiveWhiteBall.forEach(item => {
          let singleBall = {
            id: JSON.parse(JSON.stringify(currentId)),
            x: item[0] * this.happyFiveScale,
            y: item[1] * this.happyFiveScale,
            type: "circle",
            size: [10, 10],
            style: {
              fill: "	#DCDCDC",
              stroke: "	#DCDCDC"
            }
          };
          currentNodes.push(singleBall);
          currentId++;
        });
      }
      const data = {
        nodes: currentNodes
      };
      if (!this.isShowHappyFive) {
        console.log("不显示，清空nodes");
        data.nodes = [];
      }
      const graph = new G6.Graph({
        container: "happy-five-canvas",
        width: 820,
        height: 572,
        modes: {
          // 支持的 behavior
          default: ["drag-node", "drag-canvas"]
        }
      });
      graph.data(data);
      graph.render();
    },
    // 持续请求
    constantHappy() {
      // 没轮到自己的时候一直请求
      console.log("保状态式请求");
      if (this.constantHappyQuery) {
        this.playHappyFive("query");
        setTimeout(() => {
          this.constantHappy();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.happy-five {
  height: 100%;
  width: 50%;
  // background: gold;
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  .happy-five-canvas {
    background-size: 80px;
    background-image: url("~@/assets/img/SketchpadBackground.png");
    height: 576px;
    width: 824px;
    // border: 1px solid gold;
    // background-size: 84px;
  }
}
</style>
