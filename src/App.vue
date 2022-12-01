<template>

  <el-container class="home-container">
    <el-header class="el-header">
      <div>
        <span>Hello Wiki</span>
      </div>
      <div>
        <el-button
          id="registerButton"
          v-show="registerShowFlag"
          auto-insert-space
          type="primary"
          round
          @click="toRegister"
          >注册</el-button
        >
        <el-button
          id="loginButton"
          v-show="loginShowFlag"
          auto-insert-space
          type="primary"
          round
          @click="toLogin"
          >登录</el-button
        >
        <el-button v-show="logoutShowFlag" round type="primary" @click="logout">退出</el-button>
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
        <router-view ></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import SideBar_menu from "@/views/menu/index.vue";
import type { MenuOptions } from "@imengyu/vue3-context-menu";
import { computed, reactive, ref } from "vue";
import Category_manage from "@/views/category/categoryManage.vue";
import { useRouter } from "vue-router";
import { getItemlLocalStorage, removeItemLocalStorage } from "@/stores/storage";
import { useLoginStore } from "@/stores/userState";

const router = useRouter();
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
  if (data.type === "category") {
    handlCategory(data);
  } else if (data.type === "article") {
    handlArticle();
  }
  optionsComopnent.x = event.x;
  optionsComopnent.y = event.y;
  //Show menu
  showRightMenu.value = true;
};

let categoryManageRef = ref(null);
const handlCategory = (currNodeInfo: object) => {
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
    }
  );
};

const handlArticle = () => {
  optionsComopnent.items.push({ label: "新增文章" }, { label: "删除文章" });
};

const authStore = useLoginStore();
const loginShowFlag = computed(() => {
  return getItemlLocalStorage("userAndToken") == null;
});

const registerShowFlag = computed(() => {
  return getItemlLocalStorage("userAndToken") == null;
});

const logoutShowFlag = computed(() => {
  return !!getItemlLocalStorage("userAndToken");
});

const logout = () => {
  authStore.user = null;
  removeItemLocalStorage("userAndToken");
  router.go(0);
};
</script>
<style scoped lang="less">
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
