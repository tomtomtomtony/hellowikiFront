<template>
  <el-tree
    :props="props"
    :load="loadNode"
    :data="data"
    lazy
    node-key="id"
    @node-click="toArticleDetail"
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
import { useRouter } from "vue-router";
const props = {
  id: "id",
  label: "name",
  isLeaf: "leaf",
};
const router = useRouter();
const toArticleDetail = (node: Node) => {
  window.console.log(node)
  if (node.leaf) {
    router.replace({
      path: "/article/getArticle",
      query: {
        path: node.path,
        parentPath:node.parentPath,
      },
    });
  }
}
let data: Tree[] = [];
//懒加载函数
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    let item1 = { id: 1, name: "分类", isLeaf: false, rootMenuFlag: true };
    data.push(item1);
    resolve(data);
  } else if (node.level === 1) {
    getTopCategory().then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        data = res.data[0]?.map((item: any) => {
          return {
            ...item,
            leaf: item.type != "category",
          };
        });
        resolve(data);
      }
    });
  } else {
    getAllMenuCurrentCategory(node.data.path).then((res) => {
      if (res.status != 200) {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
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
