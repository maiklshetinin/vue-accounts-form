<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Account } from "../types/account";
import { AccountTypeEnum } from "../types/account";
import { useAccountsStore } from "../stores";
import { Delete } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";

//STORES
const store = useAccountsStore();

//ACTIONS
const { updateAccount, removeAccount } = store;

const props = defineProps<{ account: Account }>();

const formRef = ref<FormInstance | null>(null);

const form = reactive({
  ...props.account,
  labels: props.account.labels.map((l) => l.text).join("; "),
});

const submitForm = async (formEl: FormInstance | null): Promise<boolean> => {
  if (!formEl) return false;
  try {
    await formEl.validate(); // ждем завершения валидации

    handleBlur();

    return true;
  } catch (error) {
    console.error("Ошибка валидации:", error);
    return false;
  }
};

const handleBlur = () => {
  const newLabels = form.labels
    .split(";")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((text) => ({ text }));

  const dto = {
    ...form,
    labels: newLabels,
  };

  updateAccount(dto);
};

const handleChange = (val: string) => {
  if (val === AccountTypeEnum.LDAP) {
    form.password = null;
  }
  submitForm(formRef.value);
};

const rules = reactive({
  labels: [
    { required: false },
    {
      validator: (_: any, value: string, callback: any) => {
        if (value && value.length > 50) {
          callback(new Error("Максимум 50 символов"));
        } else callback();
      },
    },
  ],
  login: [
    { required: true, message: "Логин обязателен" },
    {
      validator: (_: any, value: string, callback: any) => {
        if (value && value.length > 100) {
          callback(new Error("Максимум 100 символов"));
        } else callback();
      },
    },
  ],
  password: [
    { required: true, message: "Пароль обязателен" },
    {
      validator: (_: any, value: string, callback: any) => {
        if (form.type === AccountTypeEnum.Local && value?.length > 100) {
          callback(new Error("Максимум 100 символов"));
        } else {
          callback();
        }
      },
    },
  ],
});
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    class="account-item"
    label-width="0"
  >
    <div class="container-row">
      <el-form-item prop="labels">
        <el-input
          v-model="form.labels"
          placeholder="Метки через ;"
          @blur="submitForm(formRef)"
        />
      </el-form-item>

      <el-form-item prop="type">
        <el-select v-model="form.type" placeholder="Тип" @change="handleChange">
          <el-option
            :label="AccountTypeEnum.Local"
            :value="AccountTypeEnum.Local"
          />
          <el-option
            :label="AccountTypeEnum.LDAP"
            :value="AccountTypeEnum.LDAP"
          />
        </el-select>
      </el-form-item>
    </div>

    <div class="container-row">
      <el-form-item prop="login">
        <el-input
          v-model="form.login"
          placeholder="Логин"
          @blur="submitForm(formRef)"
        />
      </el-form-item>

      <el-form-item v-if="form.type === AccountTypeEnum.Local" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="Пароль"
          @blur="submitForm(formRef)"
        />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button class="delete-btn" type="text" @click="removeAccount(form.id)">
        <el-icon :size="20"><Delete /></el-icon>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.account-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.account-item .el-form-item {
  margin-bottom: 5px;
  flex: 1;
}

.container-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.delete-btn {
  width: 40px;
  padding: 0;
  color: #909399;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #f56c6c;
}
</style>
