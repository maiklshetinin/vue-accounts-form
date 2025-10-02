import { defineStore } from "pinia";
import type { Account } from "../types/account";
import { AccountTypeEnum } from "../types/account";

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem("accounts") || "[]") as Account[],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: AccountTypeEnum.Local,
        login: null,
        password: null,
        valid: false,
      });
      this.syncLocalStorage();
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
      this.syncLocalStorage();
    },

    updateAccount(updated: Account) {
      const index = this.accounts.findIndex(a => a.id === updated.id);
      if (index !== -1) this.accounts[index] = updated;
      this.syncLocalStorage();
    },

    syncLocalStorage() {
      localStorage.setItem("accounts", JSON.stringify(this.accounts));
    },
  },
});
