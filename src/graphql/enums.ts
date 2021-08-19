import { enumType } from "nexus";

export const RoleEnum = enumType({
  name: "RoleEnum",
  members: ["ADMIN", "MONITOR", "USER"],
});

export const StatusEnum = enumType({
  name: "StatusEnum",
  members: ["PAID", "UNPAID", "NOTAPPLICABLE", "NOTYETPAYABLE"],
});

export const OptionEnum = enumType({
  name: "OptionEnum",
  members: ["INSSURANCE", "MEMBERSH1PFEE1", "MEMBERSHIPFEE2"],
});
