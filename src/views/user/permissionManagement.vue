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
                <i-ep-edit></i-ep-edit>
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="角色" prop="roles">
            <template #default="scope">
              {{
                scope.row.RolesShow ? scope.row.userRolesView : userRolesHide
              }}
              <el-icon
                @click="
                  scope.row.RolesShow
                    ? (scope.row.RolesShow = false)
                    : showRoles(scope.row)
                "
              >
                <div v-if="scope.row.RolesShow"><i-ep-view /></div>
                <div v-else><i-ep-hide /></div>
              </el-icon>
              <el-button
                link
                v-show="scope.row.RolesShow"
                :icon="Edit"
                @click="
                  toEditRolesForUser(scope.row.id, scope.row.userRolesView)
                "
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色配置">
        <el-row
          :style="{ margin: '6px 0 16px 0' }"
          justify="space-between"
          type="flex"
        >
          <el-button round size="small" type="primary" @click="toAddRole"
            >新增</el-button
          >
        </el-row>
        <el-table :data="roleInfoTableData.roleList" stripe>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="角色" prop="roleName"></el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="权限" prop="">
            <template #default="scope">
              {{
                scope.row.permissionShow
                  ? scope.row.permissionView
                  : permissionHide
              }}
              <el-icon
                @click="
                  scope.row.permissionShow
                    ? (scope.row.permissionShow = false)
                    : showPermissions(scope.row)
                "
              >
                <div v-if="scope.row.permissionShow"><i-ep-view /></div>
                <div v-else><i-ep-hide /></div>
              </el-icon>
              <el-button
                link
                v-show="scope.row.permissionShow"
                :icon="Edit"
                @click="toEditRolesForUser(scope.row.id, scope.row.permissionView)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="权限类型配置">
        <el-row
          :style="{ margin: '6px 0 16px 0' }"
          justify="space-between"
          type="flex"
        >
          <el-button round size="small" type="primary" @click="toAddPermission"
            >新增</el-button
          >
        </el-row>
        <el-table :data="permissionInfoTableData.permissionList" stripe>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="权限" prop="permissionName"></el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div>
      <EditUserInfo
        ref="editUserInfoRef"
        @queryUserInfo="queryUserInfo"
      ></EditUserInfo>
      <EditRole
        ref="editRoleRef"
        @queryRoleInfo="queryRoleInfo"
        @queryUserInfo="queryUserInfo"
      ></EditRole>
      <EditPermission ref="editPermissionRef"></EditPermission>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import type {
  permissionInfoInt,
  roleInfoInt,
  userInfoInt,
} from "@/type/permissionManagement";
import { onMounted, reactive, ref } from "vue";
import {
  getAllPermission,
  getAllRoles,
  getUserInfo,
  getUserRoles,
} from "@/request/permissionManagement";
import EditUserInfo from "@/views/user/components/editUser.vue";
import EditRole from "@/views/user/components/editRole.vue";
import {
  PermissionInfoData,
  RoleInfoData,
  UserInfoData,
} from "@/type/permissionManagement";
import EditPermission from "@/views/user/components/editPermission.vue";
let editUserInfoRef = ref(null);
let editRoleRef = ref(null);
let editPermissionRef = ref(null);

let userInfoTableData: { list: userInfoInt[] } = reactive({ list: [] });
let roleInfoTableData: { roleList: roleInfoInt[] } = reactive({ roleList: [] });
let permissionInfoTableData: { permissionList: permissionInfoInt[] } = reactive(
  { permissionList: [] }
);

onMounted(() => {
  queryUserInfo();
  queryRoleInfo();
  queryPermissionInfo();
});
const toEditUserName = (id: number) => {
  editUserInfoRef?.value?.handleEdit(id);
};
const toAddRole = () => {
  editRoleRef?.value?.handleAdd();
};
const toEditRolesForUser = (id: number, userRolesView: []) => {
  editRoleRef?.value?.handleEditRoleForUser(
    id,
    roleInfoTableData.roleList,
    userRolesView
  );
};
//获取指定角色的权限
let permissionHide = ref("******");
const showPermissions = (row) => {};

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
        type: "error",
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
  roleInfoTableData.roleList = [];
  getAllRoles(roleQueryCondition).then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error",
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
          roleInfoTableData.roleList.push(curr);
        }
      }
    }
    window.console.log(res);
  });
};
let permissionQueryCondition = new PermissionInfoData().permissionInfo;
//查询权限列表
const queryPermissionInfo = () => {
  permissionInfoTableData.permissionList = [];
  getAllPermission(permissionQueryCondition).then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error",
      });
    } else {
      if (res.data[0]?.permissionList?.length > 0) {
        for (let curr of res.data[0].permissionList) {
          curr.createAt = new Date(curr.createAt)
            .toLocaleString()
            .split(" ")[0];
          curr.updateAt = new Date(curr.updateAt)
            .toLocaleString()
            .split(" ")[0];
          permissionInfoTableData.permissionList.push(curr);
        }
      }
    }
  });
};

</script>

<style scoped></style>
