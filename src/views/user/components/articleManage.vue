<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="创建时间" prop="createAt"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt"></el-table-column>
      <el-table-column label="所属分类" prop="categoryName"></el-table-column>

      <el-table-column label="权限控制" prop="role">
        <template v-slot="scope">
          <el-icon>
            <i-ep-edit />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 30px">
      <el-pagination
        :page-size="quryForm.pageSize"
        :page-sizes="[15, 30, 50, 100]"
        :total="total"
        background
        layout="total">
      </el-pagination>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { getAllArticleInfo } from "@/request/articleManage";
import type { ArticleFormInt } from "@/type/articleManage";
import { reactive, ref } from "vue";
let tableData = reactive<ArticleFormInt>;
let total = ref(0);
let quryForm: ArticleFormInt;
const queryArticleInfo = (quryForm: ArticleFormInt) => {
  getAllArticleInfo(quryForm).then((res) => {
    if (res.status != 200) {
      ElMessage({
        message: res.message,
        type: "error"
      });
      return;
    }
    tableData = [];
    window.console.log(res);
    if (res.data[0]?.length > 0) {
      res.data[0].forEach((e) => {
        e.createAt = new Date(e.createAt).toLocaleString().split(" ")[0];
        e.updateAt = new Date(e.updateAt).toLocaleString().split(" ")[0];
        tableData.push(e);
      });
      total = res.data[1];
    }
  });
},

</script>

<style scoped></style>
