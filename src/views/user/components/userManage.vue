<template>
  <div>
    <el-table ref="userInfoRef" :data="tableData.list">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="userName">
        <!--        <template #default="scope">-->
        <!--         {{scope.row}}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="角色" prop="role">
        <template #default="scope">
          <el-icon>
            <i-ep-edit />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
    <!--    <edit-role ref="editRolesRef"></edit-role>-->
  </div>
</template>

<script lang="ts">
import { getUserInfo } from "@/request/permissionManagement";
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRaw,
} from "vue";
import type { userInfoInt } from "@/type/permissionManagement";

export default defineComponent({
  setup() {
    let editRolesRef = ref(null);
    const userInfoRef = ref(null);
    var tableData: { list: userInfoInt[] } = reactive({ list: [] });
    // let tableData: { list: userInfoInt[] } = { list: [] };

    // const editRole = (userId: number) => {
    //   window.console.log(userId);
    //   editRolesRef.value?.handlEdit(userId);
    // };
    onMounted(() => {
      queryUserInfo();
    });
    async function queryUserInfo() {
      //  getUserInfo().then((res) => {
      //   if (res.status != 200) {
      //     ElMessage({
      //       message: res.message,
      //       type: "error"
      //     });
      //     return;
      //   } else {
      //     //tableData. = [];
      //
      //     if (res.data[0]?.length > 0) {
      //       window.console.log("进入", res.data[0]);
      //       for (let curr of res.data[0]) {
      //         curr.createAt = new Date(curr.createAt).toLocaleString().split(" ")[0];
      //         curr.updateAt = new Date(curr.updateAt).toLocaleString().split(" ")[0];
      //         tableData.list.push(curr);
      //       }
      //     }
      //     window.console.log(tableData);
      //
      //   }
      //
      // });
      const res = await getUserInfo();
      tableData.list.push(...res.data[0]);
      window.console.log(tableData);
    }
    return { tableData, userInfoRef };
  },
});
</script>

<style scoped></style>
