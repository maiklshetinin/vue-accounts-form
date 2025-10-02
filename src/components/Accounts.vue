<script setup lang="ts">
import { useAccountsStore } from "../stores";
import AccountForm from "./AccountForm.vue";
import { ElButton } from "element-plus";
import { storeToRefs } from "pinia";
import { QuestionFilled, Plus } from "@element-plus/icons-vue";

//STORES
const store = useAccountsStore();

//ACTIONS
const { addAccount } = store;

//STORE_TO_REFS
const { accounts } = storeToRefs(store);
</script>

<template>
  <div class="container">
    <div style="display: flex; align-items: center; gap: 10px">
      <h2>Учетные записи</h2>
      <el-button @click="addAccount"
        ><el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <p class="hint">
      <el-icon :size="20" color="#409efc"><QuestionFilled /></el-icon>
      <span>Для указания нескольких меток используйте ;</span>
    </p>

    <div class="accounts-header">
      <div class="container-row">
        <span>Метки</span>
        <span>Тип записи</span>
      </div>

      <div class="container-row">
        <span>Логин</span>
        <span>Пароль</span>
      </div>

      <span style="width: 46px"></span>
    </div>

    <AccountForm
      v-for="account in accounts"
      :key="account.id"
      :account="account"
    />
  </div>
</template>

<style scoped>
.container {
  min-width: 1000px;
}

.hint {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgb(0, 0, 0);
  font-size: 14px;
  margin: 10px 0;
  padding: 5px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 4px;
}

.accounts-header {
  display: flex;
  gap: 10px;
  padding: 6px 0;
  font-weight: 500;
  font-size: 13px;
  color: #909399;
}

.accounts-header .container-row {
  display: flex;
  gap: 10px;
  flex: 1;
}

.accounts-header .container-row span {
  flex: 1;
  text-align: start;
}
</style>
