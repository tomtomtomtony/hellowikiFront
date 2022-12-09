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
            clearable
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input
            v-model="loginForm.password"
            autocomplete="off"
            clearable
            type="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <div class="login_btns">
          <el-form-item>
            <el-button
              auto-insert-space
              type="primary"
              @click="submitForm(loginFormRef)"
              >确认
            </el-button>
            <el-button auto-insert-space type="info" @click="resetForm"
              >重置
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LoginData } from "@/type/login";
import type { FormInstance } from "element-plus";
import { useLoginStore } from "@/stores/userState";
import { login } from "@/request/login";
import { setItemLocalStorage } from "@/stores/storage";
import { useRouter } from "vue-router";

const data = new LoginData();
let loginForm = reactive(data.loginForm);

const loginRules = {
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { max: 15, min: 6, message: "用户名应为6-15个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { max: 25, min: 6, message: "密码应为6-25个字符", trigger: "blur" },
  ],
};

const loginFormRef = ref<FormInstance>();
const authStore = useLoginStore();
const router = useRouter();

const submitForm = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    login(data.loginForm).then((res) => {
      if (res.status != 200) {
        ElMessage({
          message: res.message,
          type: "error",
        });
      } else {
        authStore.user = res.data[0];
        setItemLocalStorage("userAndToken", authStore.user);
        router.go(0);
        resetForm();
        ElMessage({
          message: "登陆成功",
          type: "success",
        });
      }
    });
  });
};

const resetForm = () => {
  (data.loginForm.userName = ""), (data.loginForm.password = "");
};
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
  justify-content: right;
}
</style>
