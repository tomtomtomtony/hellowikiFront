<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="createAt" label="创建时间"></el-table-column>
      <el-table-column prop="updateAt" label="更新时间"></el-table-column>
      <el-table-column prop="role" label="角色">
        <template v-slot="scope">
          <el-icon> <Edit></Edit> </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getUserInfo } from "@/request/permissionManagement";
import {Edit} from "@element-plus/icons-vue"
export default {
  name: "UserManage",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.queryUserInfo();
  },
  methods: {
    queryUserInfo() {
      getUserInfo().then((res) => {
        if (res.status != 200) {
          ElMessage({
            message: res.message,
            type: "error",
          });
          return;
        }
        //tableData.push(...[1, 2, 3]);
        this.tableData = [];
        res.data[0].forEach((e) => {
          window.console.log(e)

          e.createAt = new Date(e.createAt).toLocaleString();
          e.updateAt = new Date(e.updateAt).toLocaleString();
          this.tableData.push(e);
        });
      });
    },
  },
};
</script>

<style scoped></style>
