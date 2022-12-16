<template>
  <div ref="permissionManagementRef">
    <el-tabs type="border-card">
      <el-tab-pane label="用户详情">
        <el-table ref="userInfoRef" :data="tableData.list" border>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="用户名" prop="userName">
            <template v-slot="scope">
              {{scope.row.userName}}
              <el-icon @click="toEditUserName(scope.row.id)"> <i-ep-edit></i-ep-edit></el-icon>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="角色" prop="roles">
            <template v-slot="scope">
              <div v-if="RolesShow">
                {{ userRolesView
                }}<el-icon @click="RolesShow = false"><i-ep-view /></el-icon>
              </div>
              <div v-else>
                {{ userRolesHide
                }}<el-icon @click="showRoles(scope.row.id)"
                  ><i-ep-hide
                /></el-icon>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色配置">
        <el-table>
          <el-table-column label="角色" prop="role"></el-table-column>
          <el-table-column label="权限" prop=""></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div>
      <edit-user-roles ref="editRolesRef" @refresh="queryUserInfo"></edit-user-roles>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { userInfoInt } from "@/type/permissionManagement";
import { onMounted, reactive, ref } from "vue";
import { getUserInfo, getUserRoles } from "@/request/permissionManagement";
import EditUserRoles from "@/views/user/components/editUser.vue";

let editRolesRef = ref(null);
let tableData: { list: userInfoInt[] } = reactive({ list: [] });
onMounted(() => {
  queryUserInfo();
});

const toEditUserName = (id: number) => {
  let target: string = "编辑用户名";
  editRolesRef?.value?.handleEdit(id, target);
};
let RolesShow = ref(false);
let userRolesView = ref([]);
let userRolesHide = ref("******");
const showRoles = (id: number) => {
  getUserRoles(id).then((res) => {
    if (res.status == 200) {
      userRolesView.value=[]
      userRolesView.value.push(... res.data[0]);
      RolesShow.value = true;
    } else {
      ElMessage({
        message: res.message,
        type: "error",
      });
    }
  });
};
//查询用户列表
const queryUserInfo = () => {
  tableData.list = [];
  getUserInfo().then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error",
      });
    } else {
      if (res.data[0]?.length > 0) {
        for (let curr of res.data[0]) {
          curr.createAt = new Date(curr.createAt)
            .toLocaleString()
            .split(" ")[0];
          curr.updateAt = new Date(curr.updateAt)
            .toLocaleString()
            .split(" ")[0];
          tableData.list.push(curr);
        }
      }
    }
  });
};
</script>

<style scoped></style>
