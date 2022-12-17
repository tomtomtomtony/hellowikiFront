<template>
  <div ref="permissionManagementRef">
    <el-tabs type="border-card">
      <el-tab-pane label="用户详情">
        <el-table ref="userInfoRef" :data="userInfoTableData.list" border>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="用户名" prop="userName">
            <template v-slot="scope">
              {{ scope.row.userName }}
              <el-icon @click="toEditUserName(scope.row.id)">
                <i-ep-edit></i-ep-edit
                >
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="角色" prop="roles">
            <template #default="scope">
              <div v-if="scope.row.RolesShow">
                {{ scope.row.userRolesView
                }}
                <el-icon @click="scope.row.RolesShow = false"
                >
                  <i-ep-view
                  />
                </el-icon>
              </div>
              <div v-else>
                {{ userRolesHide
                }}
                <el-icon @click="showRoles(scope.row)">
                  <i-ep-hide />
                </el-icon>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色配置">
        <el-row :style="{margin: '6px 0 16px 0'}" justify="space-between" type="flex">
          <el-button round size="small" type="primary" @click="toAddRole">新增</el-button>
        </el-row>
        <el-table :data="roleInfoTableData.list" stripe>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="角色" prop="roleName"></el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="权限" prop=""></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div>
      <EditUserInfo
        ref="editUserInfoRef"
        @refresh="queryUserInfo"
      ></EditUserInfo>
      <EditRole ref="editRoleRef" @refresh="queryRoleInfo"></EditRole>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { roleInfoInt, userInfoInt } from "@/type/permissionManagement";
import { onMounted, reactive, ref } from "vue";
import {
  getAllRoles,
  getUserInfo,
  getUserRoles,
} from "@/request/permissionManagement";
import EditUserInfo from "@/views/user/components/editUser.vue";
import EditRole from "@/views/user/components/editRole.vue";
import { RoleInfoData, UserInfoData } from "@/type/permissionManagement";
let editUserInfoRef = ref(null);
let editRoleRef = ref(null);

let userInfoTableData: { list: userInfoInt[] } = reactive({ list: [] });
let roleInfoTableData: { list: roleInfoInt[] } = reactive({ list: [] });
onMounted(() => {
  queryUserInfo();
  queryRoleInfo();
});

const toEditUserName = (id: number) => {
  let target: string = "编辑用户名";
  editUserInfoRef?.value?.handleEdit(id, target);
};
const toAddRole = () => {
  editRoleRef?.value?.handleAdd();
}
//获取指定用户的角色
let userRolesHide = ref("******");
const showRoles = (row) => {
  getUserRoles(row.id).then((res) => {
    if (res.status == 200) {
      Reflect.set(row, "userRolesView", []);
      row.userRolesView.push(...res.data[0]);
      Reflect.set(row, "RolesShow", true);
      // userRolesView.value = [];
      // userRolesView.value.push(... res.data[0]);
      // RolesShow.value = true;
    } else {
      ElMessage({
        message: res.message,
        type: "error",
      });
    }
  });
};
let ueserQueryCondition = new UserInfoData().userInfo;
//查询用户列表
const queryUserInfo = () => {
  userInfoTableData.list = [];
  getUserInfo(ueserQueryCondition).then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error"
      });
    } else {
      if (res.data[0]?.userList.length > 0) {
        for (let curr of res.data[0].userList) {
          curr.createAt = new Date(curr.createAt)
            .toLocaleString()
            .split(" ")[0];
          curr.updateAt = new Date(curr.updateAt)
            .toLocaleString()
            .split(" ")[0];
          userInfoTableData.list.push(curr);
        }
      }
    }
  });
};
let roleQueryCondition = new RoleInfoData().roleInfo;
//查询角色列表
const queryRoleInfo = () => {
  roleInfoTableData.list = [];
  getAllRoles(roleQueryCondition).then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error"
      });
    } else {
      if (res.data[0]?.roleList?.length > 0) {
        for (let curr of res.data[0].roleList) {
          curr.createAt = new Date(curr.createAt)
            .toLocaleString()
            .split(" ")[0];
          curr.updateAt = new Date(curr.updateAt)
            .toLocaleString()
            .split(" ")[0];
          roleInfoTableData.list.push(curr);
        }
      }
    }
    window.console.log(res)

  });
};

</script>

<style scoped></style>
