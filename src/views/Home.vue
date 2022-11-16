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
        <el-tree
          :props="props"
          :load="loadNode"
          :data="data"
          lazy
          node-key="id"
        />
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
import { getAllMenuCurrentCategory, getTopCategory } from "@/request/home";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { Tree } from "@/type/home";

export default defineComponent({
  name: "Home",
  setup() {
    const props = {
      id: "id",
      label: "name",
      isLeaf: "leaf",
      children: "children",
    };
    let data: Tree[] = [];
    const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
      if (node.level === 0) {
        getTopCategory().then((res) => {
          data = res.data[0].map((item: any) => {
            return {
              ...item,
              leaf: item.type != "category",
            };
          });
          resolve(data);
        });
      } else {
        getAllMenuCurrentCategory(node.id).then((res) => {
          data = res.data[0].map((item: any) => {
            return {
              ...item,
              leaf: item.type != "category",
            };
          });
          resolve(data);
        });
      }
    };
    return { props, data, loadNode };
  },
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
  > div {
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
