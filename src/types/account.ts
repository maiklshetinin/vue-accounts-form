export const AccountTypeEnum = {
  Local: "Локальная",
  LDAP: "LDAP",
} as const;

export type AccountType = typeof AccountTypeEnum[keyof typeof AccountTypeEnum];

export interface Account {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string | null;
  password: string | null;
  valid: boolean;
}



