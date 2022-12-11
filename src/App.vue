<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div>
        <span>Hello Wiki</span>
      </div>
      <div>
        <el-button
          v-show="registerShowFlag"
          id="registerButton"
          auto-insert-space
          round
          type="primary"
          size="small"
          @click="toRegister"
          >注册
        </el-button>
        <el-button
          v-show="loginShowFlag"
          id="loginButton"
          auto-insert-space
          round
          size="small"
          type="primary"
          @click="toLogin"
          >登录</el-button
        >
        <el-button
          v-show="logoutShowFlag"
          round
          type="primary"
          size="small"
          @click="logout"
          >退出</el-button
        >
        <el-button
          v-show="permissionShowFlag"
          round
          type="primary"
          size="small"
          @click="toPermissionManage"
          >权限管理</el-button
        >
      </div>
    </el-header>
    <!--    页面主体区域-->
    <el-container>
      <!--      侧边栏区域-->
      <el-aside width="200px">
        <side-bar_menu @node-contextmenu="rightClick"></side-bar_menu>
        <context-menu
          v-model:show="showRightMenu"
          :options="optionsComopnent"
        />
        <category_manage ref="categoryManageRef"></category_manage>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import SideBar_menu from "@/views/menu/index.vue";
import type { MenuOptions } from "@imengyu/vue3-context-menu";
import { computed, reactive, ref } from "vue";
import Category_manage from "@/views/category/categoryManage.vue";
import { useRouter } from "vue-router";

import { deleteArticle } from "@/request/articleManage";
import { ArticleData } from "@/type/articleManage";
import { getItemlLocalStorage, removeItemLocalStorage } from "@/stores/storage";
import { useLoginStore } from "@/stores/userState";

const router = useRouter();

let showRightMenu = ref<boolean>(false);
let optionsComopnent = reactive<MenuOptions>({
  items: [],
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200,
} as MenuOptions);

const rightClick = (event: MouseEvent, data: object) => {
  event.preventDefault();
  //Set the mouse position
  optionsComopnent.items = [];
  if (data.type === "category" || "分类") {
    handlCategory(data);
  } else if (data.type === "article") {
    handlArticle();
  }
  optionsComopnent.x = event.x;
  optionsComopnent.y = event.y;
  //Show menu
  showRightMenu.value = true;
};

//let categoryManageRef = ref(null);
let categoryManageRef = ref<InstanceType<typeof Category_manage> | null>(null);
const handlCategory = (currNodeInfo: object) => {
  //处理顶级菜单添加分类
  if ("rootMenuFlag" in currNodeInfo) {
    optionsComopnent.items.push({
      label: "新增分类",
      onClick: () => {
        categoryManageRef?.value?.handleAdd(currNodeInfo);
      },
    });
    return;
  }
  if (currNodeInfo.leaf) {
    handlArticle(currNodeInfo);
    return;
  }
  optionsComopnent.items.push(
    {
      label: "新增分类",
      onClick: () => {
        categoryManageRef?.value?.handleAdd(currNodeInfo);
      },
    },
    {
      label: "删除分类",
      onClick: () => {
        categoryManageRef?.value?.handleDel(currNodeInfo);
      },
    },
    {
      label: "新增文章",
      onClick: () => {
        router.replace({
          path: "/article/createEdit",
          query: {
            parentPath: currNodeInfo.path,
            articleTitle: "",
            categoryName: currNodeInfo.name,
            aimTo: "create",
          },
        });
      },
    }
  );
};

const handlArticle = (currNodeInfo: object) => {
  optionsComopnent.items.push({
    label: "删除文章",
    onClick: () => {
      window.console.log(currNodeInfo);
      let data = new ArticleData().articleForm;
      data.path = currNodeInfo.path;
      data.parentPath = currNodeInfo.parentPath;
      data.articleTitle = currNodeInfo.articleTitle;
      deleteArticle(data).then((res) => {
        if (res.status != 200) {
          ElMessage({
            message: res.message,
            type: "error",
          });
        } else {
          ElMessage({
            message: res.message,
            type: "success",
          });
          router.go(0);
        }
      });
    },
  });
};

const toPermissionManage = () => {
  router.replace({
    path: "/permission",
  });
};
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
const toRegister = () => {
  router.push({
    path: "/register",
  });
};
const loginShowFlag = computed(() => {
  return getItemlLocalStorage("userAndToken") == null;
});

const registerShowFlag = computed(() => {
  return getItemlLocalStorage("userAndToken") == null;
});

const logoutShowFlag = computed(() => {
  return !!getItemlLocalStorage("userAndToken");
});
const permissionShowFlag = computed(() => {
  return !!getItemlLocalStorage("userAndToken");
});
const authStore = useLoginStore();

const logout = () => {
  authStore.user = null;
  removeItemLocalStorage("userAndToken");
  router.go(0);
};
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
