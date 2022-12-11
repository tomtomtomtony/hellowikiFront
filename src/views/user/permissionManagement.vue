<template>
  <div ref="permissionManagementRef">
    <el-tabs type="border-card">
      <el-tab-pane label="用户详情">
        <el-table ref="userInfoRef" :data="tableData.list" border>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="用户名" prop="userName"></el-table-column>
          <el-table-column label="创建时间" prop="createAt"></el-table-column>
          <el-table-column label="更新时间" prop="updateAt"></el-table-column>
          <el-table-column label="角色" prop="role">
            <template v-slot="scope">
              <el-icon>
                <i-ep-edit @click="toEditUserRole(scope.row.id)" />
              </el-icon>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div >
    <edit-user-roles ref="editRolesRef"></edit-user-roles>
    </div>
  </div>

</template>
<script lang="ts" setup>
import type { userInfoInt } from "@/type/permissionManagement";
import { onMounted, reactive, ref } from "vue";
import { getUserInfo } from "@/request/permissionManagement";
import EditUserRoles from "@/views/user/components/editUserRoles.vue";
let editRolesRef = ref(null);
let tableData: { list: userInfoInt[] } = reactive({ list: [] });
onMounted(() => {
  queryUserInfo();
});

const toEditUserRole = (id) => {
  window.console.log("hello");
  editRolesRef?.value.handleEdit();
};
//查询用户列表
const queryUserInfo = () => {
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
