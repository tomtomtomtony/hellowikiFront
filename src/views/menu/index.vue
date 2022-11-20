<template>
  <el-tree
    :props="props"
    :load="loadNode"
    :data="data"
    lazy
    node-key="id"
  />
</template>

<script lang="ts">
export default {
  name: "sideBar_menu",
};
</script>
<script lang="ts" setup>
import { getAllMenuCurrentCategory, getTopCategory } from "@/request/home";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { Tree } from "@/type/home";
const props = {
  id: "id",
  label: "name",
  isLeaf: "leaf",
};
let data: Tree[] = [];
//懒加载函数
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level == 0) {
    let item1 = { id: 1, name: "分类", isLeaf: false };
    data.push(item1);
    resolve(data);
  } else if (node.level === 1) {
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
    getAllMenuCurrentCategory(node.key).then((res) => {
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
</script>

<style scoped></style>
