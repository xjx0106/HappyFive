<template>
  <div>
    <!-- 放在主页面某处。选手选择器 -->
    <div v-if="componentType === 'userSelector'">
      <el-select
        style="width: 80px;margin-left:8px;margin-right:8px"
        id="happyFiveUser"
        v-model="happyFiveUser"
        placeholder="选手!"
      >
        <el-option
          v-for="item in [
            { value: 'black', label: '黑色' },
            { value: 'white', label: '白色' }
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 放在主页面某处。运行器，打开则开始保持连接和运行 -->
    <div v-if="componentType === 'launcher'">
      <el-switch
        v-model="tempConstantHappyQuery"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
    <!-- 放在主页面某处。清除happyFive盘，重新开始按钮 -->
    <span v-if="componentType === 'restart'" @click="startHappyFive"
      >连接词</span
    >
    <!-- 放在主页面某处。显示happyFive -->
    <span v-if="componentType === 'show'" @click="showHappyFive">询问词</span>
    <!-- 放在主页面某处。显示是否轮到自己的红点绿点 -->
    <span
      v-if="!nowYourTurnHappyFive && componentType === 'status'"
      class="status-text"
      status-red
      >关系链</span
    ><span
      v-if="nowYourTurnHappyFive && componentType === 'status'"
      class="status-text"
      status-green
      >关系链</span
    >
  </div>
</template>
<script>
export default {
  props: {
    componentType: {
      type: String
    },
    // 默认用户
    happyFiveUser: {
      type: String,
      default: "black"
    },
    // 是否开启持续请求
    constantHappyQuery: {
      type: Boolean,
      default: false
    },
    // 是否轮到自己（用于显示红绿点和是否持续请求）
    nowYourTurnHappyFive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // happyFiveUser: "",
      tempConstantHappyQuery: false
      // nowYourTurnHappyFive: false
    };
  },
  created() {},
  mounted() {
    this.tempConstantHappyQuery = this.props.constantHappyQuery;
  },
  watch: {
    constantHappyQuery() {
      this.tempConstantHappyQuery = this.constantHappyQuery;
      this.$emit("update: constantHappyQuery", this.tempConstantHappyQuery);
      console.log("触动了游戏开关 " + this.constantHappyQuery);
      if (this.constantHappyQuery) {
        this.$refs.happyFive.constantHappy();
      }
    }
  },
  methods: {
    startHappyFive() {
      this.$refs.happyFive.startHappyFive();
    },
    showHappyFive() {
      this.$refs.happyFive.showHappyFive();
    }
  }
};
</script>
