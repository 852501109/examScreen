<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">健康体检可视化大屏</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username" label="账号" label-width="100">
                    <el-input v-model="param.username" placeholder="用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="passwd" label="密码" label-width="100">
                    <el-input type="passwd" placeholder="密码" v-model="param.passwd"
                        @keyup.enter="submitForm()">
                    </el-input>
                </el-form-item>
                <div class="login-btn" @click="submitForm()">
                    登录
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { loginApi } from "../api/index.js"
export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            username: "",
            passwd: "",
        });
        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            passwd: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                    loginApi(param).then(res => {
                        if(res.code === "200") {
                            sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                            router.push("/");
                        } else {
                            ElMessage.error(res.msg)
                        }
                    })
                } else {
                    // ElMessage.error(res.msg)
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        return {
            param,
            rules,
            login,
            submitForm,
        };
    },
};
</script>

<style scoped lang="less">
:deep(.el-form-item__label)  {
    color: #fff!important;
}
:deep(.el-input__inner)  {
    width: 16.25rem /* 260/16 */;
    height: 3rem /* 48/16 */;
    border: 2px solid #005BC7;
    box-shadow: inset 0px 0px 14px #00D1FF;
}
:deep(.el-form-item__error) {
    padding-left: 1.875rem /* 30/16 */;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(/assets/img/denglu.gif);
    background-size: 100%;
}
.ms-title {
    width: 22.5rem /* 360/16 */;
    text-align: center;
    font-size: 2.5rem /* 40/16 */;
    color: #fff;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 14.75rem /* 236/16 */;
    width: 23.125rem /* 370/16 */;
    transform: translate(-50%);
    /* background: rgba(255, 255, 255, 0.3); */
    button {
        background: transparent;
    }
}
.ms-content {
    margin-top: 3.75rem /* 60/16 */;
    text-align: center;
}
.login-btn {
    width: 12.5rem /* 200/16 */;
    height: 3.75rem /* 60/16 */;
    line-height: 3.75rem;
    background-image: url('@/assets/img/btn-bg_bmp.bmp');
    background-repeat: no-repeat;
    background-size: 100% 90%;
    background-position: 30% 30%;
    text-align: center;
    margin: 5rem auto 0 auto;
    cursor: pointer;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>