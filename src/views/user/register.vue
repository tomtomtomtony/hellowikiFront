<template>
  <div class="register_contain">
    <el-card class="register_box" header="注册">
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="loginForm"
        label-width="0"
        status-icon
      >
        <el-form-item label="用户名" label-width="70px" prop="userName">
          <el-input
            v-model="registerForm.userName"
            autocomplete="off"
            type="text"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input
            v-model="registerForm.password"
            autocomplete="off"
            type="password"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="70px" prop="confirmPwd">
          <el-input
            v-model="registerForm.confirmPwd"
            autocomplete="off"
            type="password"
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <div class="register_btns">
          <el-form-item>
            <el-button
              auto-insert-space
              type="primary"
              @click="submitForm(registerFormRef)"
              >确认</el-button
            >
            <el-button auto-insert-space type="info" @click="resetForm"
              >重置</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { RegisterData } from "@/type/register";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { register } from "@/request/register";

const registerRules = {
  userName: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { max: 15, min: 6, message: "用户名应为6-15个字符", trigger: "change" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "change" },
    { max: 25, min: 6, message: "密码应为6-25个字符", trigger: "change" },
  ],
  confirmPwd:[
    { required: true, message: "请再次输入密码", trigger: "change" },
    { max: 25, min: 6, message: "密码应为6-25个字符", trigger: "change" },
  ]
};

const data = new RegisterData();
let registerForm = reactive(data.registerForm);
const registerFormRef = ref<FormInstance>();
const submitForm = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    register(data.registerForm).then((res) => {
      if (res.status != 200) {
        ElMessage({
          message: res.message,
          type: "error",
        });
      }else{
        resetForm();
        ElMessage({
          message: res.message,
          type: "success",
        });
      }
    })
  });
};



const resetForm = () => {
  (data.registerForm.userName = ""), (data.registerForm.password = ""),(data.registerForm.confirmPwd="");
};
</script>

<style scoped lang="less">
.register_contain {
  height: 100%;
  background-color: #2b4b6b;
}

.register_box {
  background-color: burlywood;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  width: 550px;
  height: 300px;
}

.registerForm {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 20px;
  border-radius: 20;
  box-sizing: border-box;
}

.register_btns {
  display: flex;
  justify-content: flex-end;
}
</style>
