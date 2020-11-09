<template>
  <div>
    <!-- 放在主页面某处。选手选择器 -->
    <div>
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
    <div>
      <el-switch
        v-model="constantHappyQuery"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
    <!-- 放在主页面某处。清除happyFive盘，重新开始按钮 -->
    <div><span @click="startHappyFive">连接词</span></div>
    <!-- 放在主页面某处。显示happyFive -->
    <span @click="showHappyFive">询问词</span>
    <!-- 放在主页面某处。显示是否轮到自己的红点绿点 -->
    <div>
      <span v-if="!nowYourTurnHappyFive" class="status-text" status-red
        >关系链</span
      ><span v-if="nowYourTurnHappyFive" class="status-text" status-green
        >关系链</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
