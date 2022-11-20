<template>
  <div class="login_contain">
    <div class="login_box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="loginForm"
        label-width="0"
        status-icon
      >
        <h2>登录</h2>
        <el-form-item label="用户名" label-width="70px" prop="userName">
          <el-input
            v-model="loginForm.userName"
            autocomplete="off"
            type="text"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input
            v-model="loginForm.password"
            autocomplete="off"
            type="password"
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <div class="login_btns">
          <el-form-item>
            <el-button
              auto-insert-space
              type="primary"
              @click="submitForm(ruleFormRef)"
              >确认</el-button
            >
            <el-button auto-insert-space type="info" @click="resetForm"
              >重置</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "@/type/login";
import type { FormInstance } from "element-plus";
export default defineComponent({
  name:"Login",
  setup() {
    const data = reactive(new LoginData());
    const loginRules = {
      userName: [
        { required: true, message: "请输入用户名", trigger: "change" },
        { max: 15, min: 6, message: "用户名应为6-15个字符", trigger: "change" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "change" },
        { max: 25, min: 6, message: "密码应为6-25个字符", trigger: "change" },
      ],
    };
    const loginFormRef = ref<FormInstance>();
    const submitForm = (formEI: FormInstance | undefined) => {
      if (!formEI) return;
      formEI.validate((valid) => {});
    };
    const resetForm = () => {
      (data.loginForm.userName = ""), (data.loginForm.password = "");
    };
    return { ...toRefs(data), loginRules, resetForm, loginFormRef, submitForm };
  },
});
</script>
<style lang="less" scoped>
.login_contain {
  height: 100%;
  background-color: #2b4b6b;
}

.login_box {
  background-color: burlywood;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  width: 450px;
  height: 200px;
}

.loginForm {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 20px;
  border-radius: 20;
  box-sizing: border-box;
}

.login_btns {
  display: flex;
  justify-content: flex-end;
}
</style>
