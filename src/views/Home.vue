<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div>
        <span>Hello Wiki</span>
      </div>
      <el-button auto-insert-space type="primary">退出</el-button>
    </el-header>
    <!--    页面主体区域-->
    <el-container>
      <el-aside width="200px">

      </el-aside>
      <el-main>

        <el-button type="primary">
          <el-icon style="vertical-align: middle">
            <i-ep-search />
          </el-icon>
          <span style="vertical-align: middle"> Search </span>
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTopCategory } from "@/request/home";
import * as console from "console";


export default defineComponent({
  name: "Home",
  setup() {
    const topCategory = getTopCategory().then((res)=>{
      window.console.log(res.data);
    });
    return{topCategory}
  }
});


</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>
